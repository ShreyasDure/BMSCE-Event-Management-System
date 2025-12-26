const mongoose = require('mongoose');

const notificationLogSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'EVENT_CREATED_ALL_USERS',
      'REGISTRATION_DEADLINE_REMINDER',
      'EVENT_ATTENDANCE_REMINDER',
      'EVENT_UPDATED_REGISTERED_USERS'
    ]
  },
  dedupeKey: {
    type: String,
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    default: undefined
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: undefined
  },
  toEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  subject: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['queued', 'sent', 'failed', 'skipped'],
    default: 'queued'
  },
  resendMessageId: {
    type: String,
    default: undefined
  },
  errorMessage: {
    type: String,
    default: undefined
  },
  metadata: {
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  sentAt: {
    type: Date,
    default: undefined
  }
});

notificationLogSchema.index({ dedupeKey: 1 }, { unique: true });
notificationLogSchema.index({ type: 1, createdAt: -1 });
notificationLogSchema.index({ event: 1, type: 1, createdAt: -1 });
notificationLogSchema.index({ recipient: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model('NotificationLog', notificationLogSchema);
