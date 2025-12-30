const Event = require('../models/Event');
const Registration = require('../models/Registration');
const { enqueueJob } = require('../queue/jobQueue');

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const scheduleEventJobs = async (event) => {
  await enqueueJob({
    type: 'SEND_EVENT_CREATED_EMAILS',
    payload: { eventId: event._id.toString() },
    runAt: new Date()
  });

  const deadline = new Date(event.registrationDeadline);
  const reminderDays = [7, 3, 1];

  for (const daysLeft of reminderDays) {
    const runAt = addDays(deadline, -daysLeft);
    if (runAt > new Date()) {
      await enqueueJob({
        type: 'SEND_REGISTRATION_DEADLINE_REMINDERS',
        payload: { eventId: event._id.toString(), daysLeft },
        runAt
      });
    }
  }

  const attendanceRunAt = addDays(new Date(event.date), -1);
  if (attendanceRunAt > new Date()) {
    await enqueueJob({
      type: 'SEND_EVENT_ATTENDANCE_REMINDERS',
      payload: { eventId: event._id.toString() },
      runAt: attendanceRunAt
    });
  }
};

const createEvent = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      venue,
      date,
      registrationDeadline,
      specialInstructions,
      bannerImage
    } = req.body;

    if (!title || !category || !description || !venue || !date || !registrationDeadline) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields'
      });
    }

    const event = await Event.create({
      title,
      category,
      description,
      venue,
      date,
      registrationDeadline,
      specialInstructions,
      bannerImage,
      organizer: req.user._id
    });

    await scheduleEventJobs(event);

    res.status(201).json({
      status: 'success',
      message: 'Event created successfully',
      data: { event }
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error creating event'
    });
  }
};

const getRegisteredStudentsForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    const myRegistration = await Registration.findOne({
      event: eventId,
      student: req.user._id,
      status: { $in: ['pending', 'approved'] }
    });

    if (!myRegistration) {
      return res.status(403).json({
        status: 'error',
        message: 'You must be registered for this event to view registered students'
      });
    }

    const registrations = await Registration.find({
      event: eventId,
      status: { $in: ['pending', 'approved'] }
    }).populate('student', 'name usn');

    const students = registrations
      .map((r) => r.student)
      .filter(Boolean);

    res.status(200).json({
      status: 'success',
      results: students.length,
      data: { students }
    });
  } catch (error) {
    console.error('Get registered students error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching registered students'
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const { search, organizer, category, venue, dateFrom, dateTo } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (organizer === 'me' && req.user) {
      query.organizer = req.user._id;
    }

    if (category) {
      query.category = category;
    }

    if (venue) {
      query.venue = venue;
    }

    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = new Date(dateFrom);
      if (dateTo) query.date.$lte = new Date(dateTo);
    }

    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort({ date: 1 });

    res.status(200).json({
      status: 'success',
      results: events.length,
      data: { events }
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching events'
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email');

    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { event }
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching event'
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this event'
      });
    }

    const allowedFields = [
      'title',
      'category',
      'description',
      'venue',
      'date',
      'registrationDeadline',
      'specialInstructions',
      'bannerImage'
    ];

    const updates = {};
    for (const key of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        updates[key] = req.body[key];
      }
    }

    const changes = [];
    const changeFields = ['title', 'category', 'description', 'venue', 'date', 'registrationDeadline', 'specialInstructions'];
    for (const field of changeFields) {
      if (Object.prototype.hasOwnProperty.call(updates, field)) {
        const before = event[field];
        const after = updates[field];
        
        // Format dates for human readability
        const formatDate = (date) => {
          if (date instanceof Date) {
            return date.toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short'
            });
          }
          // Also handle string dates by converting to Date first
          if (typeof date === 'string' && !isNaN(Date.parse(date))) {
            return new Date(date).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short'
            });
          }
          return String(date ?? '');
        };
        
        const beforeStr = formatDate(before);
        const afterStr = formatDate(after);
        if (beforeStr !== afterStr) {
          changes.push({ field, before: beforeStr, after: afterStr });
        }
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (changes.length > 0) {
      await enqueueJob({
        type: 'SEND_EVENT_UPDATE_EMAILS',
        payload: { eventId: updatedEvent._id.toString(), changes },
        runAt: new Date()
      });

      // If registration deadline changed, reschedule reminders
      if (changes.some(c => c.field === 'registrationDeadline')) {
        await scheduleEventJobs(updatedEvent);
      }

      // If event date changed, reschedule attendance reminders
      if (changes.some(c => c.field === 'date')) {
        await scheduleEventJobs(updatedEvent);
      }
    }

    res.status(200).json({
      status: 'success',
      message: 'Event updated successfully',
      data: { event: updatedEvent }
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error updating event'
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this event'
      });
    }

    await Registration.deleteMany({ event: req.params.id });
    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting event'
    });
  }
};

const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    if (event.registrationDeadline && new Date() > new Date(event.registrationDeadline)) {
      return res.status(400).json({
        status: 'error',
        message: 'Registration deadline has passed for this event'
      });
    }

    const existingRegistration = await Registration.findOne({
      event: eventId,
      student: req.user._id
    });

    if (existingRegistration) {
      return res.status(400).json({
        status: 'error',
        message: 'You are already registered for this event'
      });
    }

    const registration = await Registration.create({
      event: eventId,
      student: req.user._id
    });

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered for event',
      data: { registration }
    });
  } catch (error) {
    console.error('Register event error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error registering for event'
    });
  }
};

const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to view registrations'
      });
    }

    const registrations = await Registration.find({ event: eventId })
      .populate('student', 'name email')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      status: 'success',
      results: registrations.length,
      data: { registrations }
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching registrations'
    });
  }
};

const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user._id })
      .populate('event')
      .sort({ registeredAt: -1 });

    res.status(200).json({
      status: 'success',
      results: registrations.length,
      data: { registrations }
    });
  } catch (error) {
    console.error('Get my registrations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching registrations'
    });
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registration = await Registration.findOneAndDelete({
      event: eventId,
      student: req.user._id
    });

    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Registration cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error cancelling registration'
    });
  }
};

const approveRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.registrationId)
      .populate('event');

    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found'
      });
    }

    if (registration.event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized'
      });
    }

    registration.status = 'approved';
    await registration.save();

    res.status(200).json({
      status: 'success',
      message: 'Registration approved',
      data: { registration }
    });
  } catch (error) {
    console.error('Approve registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error approving registration'
    });
  }
};

const rejectRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.registrationId)
      .populate('event');

    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found'
      });
    }

    if (registration.event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized'
      });
    }

    registration.status = 'rejected';
    await registration.save();

    res.status(200).json({
      status: 'success',
      message: 'Registration rejected',
      data: { registration }
    });
  } catch (error) {
    console.error('Reject registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error rejecting registration'
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventRegistrations,
  getRegisteredStudentsForEvent,
  getMyRegistrations,
  cancelRegistration,
  approveRegistration,
  rejectRegistration
};
