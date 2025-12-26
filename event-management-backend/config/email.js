const { Resend } = require('resend');

// Validate API key
if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️  WARNING: RESEND_API_KEY is not set in environment variables');
}

// Single Resend client instance
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';

    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html
    });

    if (result.error) {
      throw new Error(result.error.message || JSON.stringify(result.error));
    }

    if (!result.data || !result.data.id) {
      throw new Error('Invalid response from Resend API');
    }

    return { success: true, messageId: result.data.id };
  } catch (error) {
    return { success: false, error: error.message || 'Failed to send email' };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetUrl, userName) => {
  try {
    // Use Resend's default testing domain if no custom domain is configured
    // For production, you'll need to verify a domain in Resend dashboard
    const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';
    
    console.log('Attempting to send email:', { from: fromEmail, to: email });
    
    const result = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Password Reset Request - BMSCE Event Management',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 10px;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
              margin-bottom: 10px;
            }
            .content {
              background-color: white;
              padding: 25px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #2563eb;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin: 20px 0;
            }
            .button:hover {
              background-color: #1d4ed8;
            }
            .warning {
              background-color: #fef3c7;
              border-left: 4px solid #f59e0b;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #666;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
            }
            .link {
              word-break: break-all;
              color: #2563eb;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">BMSCE Event Management</div>
              <p>BMS College of Engineering</p>
            </div>

            <div class="content">
              <h2 style="color: #2563eb; margin-top: 0;">Password Reset Request</h2>
              
              <p>Hello ${userName},</p>
              
              <p>We received a request to reset your password for your BMSCE Event Management account.</p>
              
              <p>Click the button below to reset your password:</p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" style="display: inline-block; padding: 12px 30px; background-color: #2563eb; color: #ffffff !important; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; font-size: 16px;">Reset Password</a>
              </div>

              <p>Or copy and paste this link into your browser:</p>
              <p class="link">${resetUrl}</p>

              <div class="warning">
                <strong>⚠️ Important:</strong>
                <ul style="margin: 10px 0;">
                  <li>This link will expire in <strong>15 minutes</strong></li>
                  <li>If you didn't request this, please ignore this email</li>
                  <li>Your password won't change until you create a new one</li>
                </ul>
              </div>

              <p><strong>Password Requirements:</strong></p>
              <ul style="color: #666;">
                <li>At least 8 characters long</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character (!@#$%^&*)</li>
              </ul>
            </div>

            <div class="footer">
              <p>This is an automated email from BMSCE Event Management System.</p>
              <p>Please do not reply to this email.</p>
              <p>&copy; 2025 BMSCE Event Management. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // Resend returns { data, error } structure
    // Handle both error in response and thrown errors
    if (result.error) {
      console.error('Resend API error:', JSON.stringify(result.error, null, 2));
      throw new Error(result.error.message || JSON.stringify(result.error));
    }

    if (!result.data || !result.data.id) {
      console.error('Unexpected Resend response:', JSON.stringify(result, null, 2));
      throw new Error('Invalid response from Resend API');
    }

    const messageId = result.data.id;
    console.log('✅ Email sent successfully:', messageId);
    return { success: true, messageId };
  } catch (error) {
    console.error('❌ Email sending error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return { success: false, error: error.message || 'Failed to send email' };
  }
};

module.exports = { sendEmail, sendPasswordResetEmail };