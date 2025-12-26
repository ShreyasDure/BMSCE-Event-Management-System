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

const eventCreatedTemplate = ({ userName, event }) => {
  const eventDate = formatDateTime(event.date);
  const deadline = formatDateTime(event.registrationDeadline);

  return {
    subject: `New Event: ${event.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background: #2563eb; color: #fff; padding: 16px 20px;">
            <div style="font-size: 18px; font-weight: bold;">BMSCE Event Management</div>
            <div style="opacity: 0.9; font-size: 13px;">New event announcement</div>
          </div>
          <div style="padding: 20px; background: #fff;">
            <p style="margin-top: 0;">Hello ${userName || 'Student'},</p>
            <p>A new event has been created. Here are the details:</p>

            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px;">
              <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${event.title}</div>
              <div><strong>Date & Time:</strong> ${eventDate}</div>
              <div><strong>Venue:</strong> ${event.venue}</div>
              <div><strong>Category:</strong> ${event.category}</div>
              <div><strong>Registration deadline:</strong> ${deadline}</div>
            </div>

            <p style="margin-bottom: 0;">Log in to register before the deadline.</p>
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

module.exports = { eventCreatedTemplate };
