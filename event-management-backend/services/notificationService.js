const NotificationLog = require('../models/NotificationLog');
const { sendEmail } = require('../config/email');

const sendEmailWithLog = async ({
  type,
  dedupeKey,
  eventId,
  recipientUser,
  toEmail,
  subject,
  html,
  metadata = {}
}) => {
  let log;

  try {
    log = await NotificationLog.create({
      type,
      dedupeKey,
      event: eventId,
      recipient: recipientUser ? recipientUser._id : undefined,
      toEmail,
      subject,
      status: 'queued',
      metadata
    });
  } catch (err) {
    if (err && err.code === 11000) {
      return { skipped: true, reason: 'duplicate' };
    }
    throw err;
  }

  const result = await sendEmail({ to: toEmail, subject, html });

  if (result.success) {
    log.status = 'sent';
    log.resendMessageId = result.messageId;
    log.sentAt = new Date();
    await log.save();
    return { success: true, messageId: result.messageId };
  }

  log.status = 'failed';
  log.errorMessage = result.error;
  await log.save();
  return { success: false, error: result.error };
};

module.exports = { sendEmailWithLog };
