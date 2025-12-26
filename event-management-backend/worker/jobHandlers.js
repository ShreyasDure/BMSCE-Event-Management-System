const Event = require('../models/Event');
const Registration = require('../models/Registration');
const User = require('../models/User');
const { sendEmailWithLog } = require('../services/notificationService');

const { eventCreatedTemplate } = require('../emails/templates/eventCreatedTemplate');
const { registrationDeadlineReminderTemplate } = require('../emails/templates/registrationDeadlineReminderTemplate');
const { attendanceReminderTemplate } = require('../emails/templates/attendanceReminderTemplate');
const { eventUpdatedTemplate } = require('../emails/templates/eventUpdatedTemplate');

const handleSendEventCreatedEmails = async (job) => {
  const { eventId } = job.payload;
  const event = await Event.findById(eventId);
  if (!event) return;

  const students = await User.find({ role: 'student' }).select('name email');

  for (const student of students) {
    const { subject, html } = eventCreatedTemplate({ userName: student.name, event });
    const dedupeKey = `EVENT_CREATED_ALL_USERS:${eventId}:${student._id.toString()}`;

    await sendEmailWithLog({
      type: 'EVENT_CREATED_ALL_USERS',
      dedupeKey,
      eventId,
      recipientUser: student,
      toEmail: student.email,
      subject,
      html
    });
  }
};

const handleSendEventUpdateEmails = async (job) => {
  const { eventId, changes } = job.payload;
  const event = await Event.findById(eventId);
  if (!event) return;

  const registrations = await Registration.find({
    event: eventId,
    status: { $in: ['pending', 'approved'] }
  }).populate('student', 'name email');

  for (const reg of registrations) {
    if (!reg.student) continue;
    const { subject, html } = eventUpdatedTemplate({
      userName: reg.student.name,
      event,
      changes
    });

    const dedupeKey = `EVENT_UPDATED_REGISTERED_USERS:${job._id.toString()}:${reg.student._id.toString()}`;

    await sendEmailWithLog({
      type: 'EVENT_UPDATED_REGISTERED_USERS',
      dedupeKey,
      eventId,
      recipientUser: reg.student,
      toEmail: reg.student.email,
      subject,
      html,
      metadata: { changes }
    });
  }
};

const handleSendRegistrationDeadlineReminders = async (job) => {
  const { eventId, daysLeft } = job.payload;
  const event = await Event.findById(eventId);
  if (!event) return;

  const now = new Date();
  if (event.registrationDeadline && event.registrationDeadline < now) return;

  const students = await User.find({ role: 'student' }).select('name email');
  for (const student of students) {
    const { subject, html } = registrationDeadlineReminderTemplate({
      userName: student.name,
      event,
      daysLeft
    });

    const dedupeKey = `REGISTRATION_DEADLINE_REMINDER:${eventId}:${daysLeft}:${student._id.toString()}`;

    await sendEmailWithLog({
      type: 'REGISTRATION_DEADLINE_REMINDER',
      dedupeKey,
      eventId,
      recipientUser: student,
      toEmail: student.email,
      subject,
      html,
      metadata: { daysLeft }
    });
  }
};

const handleSendEventAttendanceReminders = async (job) => {
  const { eventId } = job.payload;
  const event = await Event.findById(eventId);
  if (!event) return;

  const registrations = await Registration.find({
    event: eventId,
    status: { $in: ['pending', 'approved'] }
  }).populate('student', 'name email');

  for (const reg of registrations) {
    if (!reg.student) continue;

    const { subject, html } = attendanceReminderTemplate({
      userName: reg.student.name,
      event
    });

    const dedupeKey = `EVENT_ATTENDANCE_REMINDER:${eventId}:${reg.student._id.toString()}`;

    await sendEmailWithLog({
      type: 'EVENT_ATTENDANCE_REMINDER',
      dedupeKey,
      eventId,
      recipientUser: reg.student,
      toEmail: reg.student.email,
      subject,
      html
    });
  }
};

const jobHandlers = {
  SEND_EVENT_CREATED_EMAILS: handleSendEventCreatedEmails,
  SEND_EVENT_UPDATE_EMAILS: handleSendEventUpdateEmails,
  SEND_REGISTRATION_DEADLINE_REMINDERS: handleSendRegistrationDeadlineReminders,
  SEND_EVENT_ATTENDANCE_REMINDERS: handleSendEventAttendanceReminders
};

module.exports = { jobHandlers };
