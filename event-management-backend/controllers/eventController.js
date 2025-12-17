const Event = require('../models/Event');
const Registration = require('../models/Registration');

const createEvent = async (req, res) => {
  try {
    const { title, description, venue, date, bannerImage } = req.body;

    if (!title || !description || !venue || !date) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields'
      });
    }

    const event = await Event.create({
      title,
      description,
      venue,
      date,
      bannerImage,
      organizer: req.user._id
    });

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

const getAllEvents = async (req, res) => {
  try {
    const { search, organizer } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (organizer === 'me' && req.user) {
      query.organizer = req.user._id;
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

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

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
  getMyRegistrations,
  cancelRegistration,
  approveRegistration,
  rejectRegistration
};
