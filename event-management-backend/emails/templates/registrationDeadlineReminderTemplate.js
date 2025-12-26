const formatDateTime = (date) => {
  try {
    return new Date(date).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  } catch {
    return String(date);
  }
};

const registrationDeadlineReminderTemplate = ({ userName, event, daysLeft }) => {
  const eventDate = formatDateTime(event.date);
  const deadline = formatDateTime(event.registrationDeadline);

  return {
    subject: `Reminder: ${daysLeft} day(s) left to register for ${event.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background: #111827; color: #fff; padding: 16px 20px;">
            <div style="font-size: 18px; font-weight: bold;">BMSCE Event Management</div>
            <div style="opacity: 0.9; font-size: 13px;">Registration deadline reminder</div>
          </div>
          <div style="padding: 20px; background: #fff;">
            <p style="margin-top: 0;">Hello ${userName || 'Student'},</p>
            <p><strong>${daysLeft} day(s)</strong> left to register for:</p>

            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px;">
              <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${event.title}</div>
              <div><strong>Event date & time:</strong> ${eventDate}</div>
              <div><strong>Venue:</strong> ${event.venue}</div>
              <div><strong>Category:</strong> ${event.category}</div>
              <div><strong>Deadline:</strong> ${deadline}</div>
            </div>

            <p style="margin-bottom: 0;">Please register before the deadline.</p>
          </div>
          <div style="padding: 14px 20px; background: #f3f4f6; font-size: 12px; color: #6b7280;">
            This is an automated email. Please do not reply.
          </div>
        </div>
      </body>
      </html>
    `
  };
};

module.exports = { registrationDeadlineReminderTemplate };
