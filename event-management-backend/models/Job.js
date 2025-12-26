const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'SEND_EVENT_CREATED_EMAILS',
      'SEND_EVENT_UPDATE_EMAILS',
      'SEND_REGISTRATION_DEADLINE_REMINDERS',
      'SEND_EVENT_ATTENDANCE_REMINDERS'
    ]
  },
  payload: {
    type: Object,
    default: {}
  },
  runAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['queued', 'processing', 'completed', 'failed'],
    default: 'queued'
  },
  attempts: {
    type: Number,
    default: 0
  },
  maxAttempts: {
    type: Number,
    default: 5
  },
  lastError: {
    type: String,
    default: undefined
  },
  lockedAt: {
    type: Date,
    default: undefined
  },
  completedAt: {
    type: Date,
    default: undefined
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

jobSchema.index({ status: 1, runAt: 1 });
jobSchema.index({ type: 1, status: 1, runAt: 1 });

module.exports = mongoose.model('Job', jobSchema);
