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

const eventUpdatedTemplate = ({ userName, event, changes }) => {
  const eventDate = formatDateTime(event.date);

  const changeLines = (changes || [])
    .map((c) => `<li><strong>${c.field}:</strong> ${c.before} \u2192 ${c.after}</li>`)
    .join('');

  return {
    subject: `Updated: ${event.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background: #7c3aed; color: #fff; padding: 16px 20px;">
            <div style="font-size: 18px; font-weight: bold;">BMSCE Event Management</div>
            <div style="opacity: 0.9; font-size: 13px;">Event update notification</div>
          </div>
          <div style="padding: 20px; background: #fff;">
            <p style="margin-top: 0;">Hello ${userName || 'Student'},</p>
            <p>The event you registered for has been updated:</p>

            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 14px;">
              <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${event.title}</div>
              <div><strong>Date & time:</strong> ${eventDate}</div>
              <div><strong>Venue:</strong> ${event.venue}</div>
              <div style="margin-top: 12px;"><strong>What changed:</strong></div>
              <ul style="margin-top: 6px; padding-left: 20px;">
                ${changeLines || '<li>Details updated</li>'}
              </ul>
            </div>

            <p style="margin-bottom: 0;">Please review the updates before attending.</p>
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

module.exports = { eventUpdatedTemplate };
