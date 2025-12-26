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

const attendanceReminderTemplate = ({ userName, event }) => {
  const eventDate = formatDateTime(event.date);

  return {
    subject: `Attendance reminder: ${event.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background: #059669; color: #fff; padding: 16px 20px;">
            <div style="font-size: 18px; font-weight: bold;">BMSCE Event Management</div>
            <div style="opacity: 0.9; font-size: 13px;">Event attendance reminder</div>
          </div>
          <div style="padding: 20px; background: #fff;">
            <p style="margin-top: 0;">Hello ${userName || 'Student'},</p>
            <p>This is a reminder for the event you registered for:</p>

            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px;">
              <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${event.title}</div>
              <div><strong>Date & time:</strong> ${eventDate}</div>
              <div><strong>Venue:</strong> ${event.venue}</div>
              ${event.specialInstructions ? `<div style=\"margin-top: 10px;\"><strong>Special instructions:</strong><br/>${event.specialInstructions}</div>` : ''}
            </div>

            <p style="margin-bottom: 0;">We look forward to seeing you there.</p>
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

module.exports = { attendanceReminderTemplate };
