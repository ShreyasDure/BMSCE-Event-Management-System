const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const validatePassword = require('../utils/passwordValidator');
const { sendPasswordResetEmail } = require('../config/email');

const ORGANIZER_CODE = 'bmsce1946';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const signup = async (req, res) => {
  try {
    const { name, usn, organizerCode, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields'
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        status: 'error',
        message: passwordValidation.message
      });
    }

    if (role === 'student') {
      if (!usn) {
        return res.status(400).json({
          status: 'error',
          message: 'USN is required for students'
        });
      }

      const usnRegex = /^1[A-Z0-9]{9}$/;
      if (!usnRegex.test(usn.toUpperCase())) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid USN format'
        });
      }

      const existingUserByUSN = await User.findOne({ usn: usn.toUpperCase() });
      if (existingUserByUSN) {
        return res.status(400).json({
          status: 'error',
          message: 'User with this USN already exists'
        });
      }
    } else if (role === 'organizer') {
      if (!organizerCode || organizerCode.toLowerCase() !== ORGANIZER_CODE) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid organizer code'
        });
      }
    }

    if (!email.endsWith('@bmsce.ac.in')) {
      return res.status(400).json({
        status: 'error',
        message: 'Please use a valid BMSCE email address'
      });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        status: 'error',
        message: 'User with this email already exists'
      });
    }

    const userData = { name, email, password, role };
    if (role === 'student') {
      userData.usn = usn.toUpperCase();
    }

    const user = await User.create(userData);
    const token = generateToken(user._id);

    const responseUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    if (role === 'student') {
      responseUser.usn = user.usn;
    }

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: { user: responseUser, token }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error creating user'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    
    if (!isPasswordMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user._id);

    const responseUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    if (user.role === 'student' && user.usn) {
      responseUser.usn = user.usn;
    }

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: { user: responseUser, token }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error logging in'
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide your email address'
      });
    }

    if (!email.endsWith('@bmsce.ac.in')) {
      return res.status(400).json({
        status: 'error',
        message: 'Please use your BMSCE email address'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'No account found with that email address'
      });
    }

    const resetToken = user.generatePasswordReset();
    await user.save({ validateBeforeSave: false });

    // Get FRONTEND_URL with fallback default for development
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    // Send email
    const emailResult = await sendPasswordResetEmail(user.email, resetUrl, user.name);

    if (!emailResult.success) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });

      console.error('Email sending failed:', emailResult.error);
      return res.status(500).json({
        status: 'error',
        message: emailResult.error || 'Error sending email. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? emailResult.error : undefined
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Password reset link has been sent to your email',
      data: {
        email: user.email,
        expiresIn: '15 minutes'
      }
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error processing forgot password request'
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a new password'
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({
        status: 'error',
        message: passwordValidation.message
      });
    }

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Password reset token is invalid or has expired'
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password has been reset successfully. You can now login with your new password'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error resetting password'
    });
  }
};

module.exports = { signup, login, forgotPassword, resetPassword };