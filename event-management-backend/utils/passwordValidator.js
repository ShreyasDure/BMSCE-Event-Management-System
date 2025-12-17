const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }

  if (password.length > 128) {
    return {
      isValid: false,
      message: 'Password is too long (max 128 characters)'
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter'
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character (!@#$%^&*)'
    };
  }

  const commonPatterns = [
    'password', 'Password', 'PASSWORD',
    '12345678', '123456789', '1234567890',
    'qwerty', 'qwertyuiop', 'QWERTY',
    'abc123', 'ABC123',
    'password123', 'Password123'
  ];

  for (let pattern of commonPatterns) {
    if (password.toLowerCase().includes(pattern.toLowerCase())) {
      return {
        isValid: false,
        message: 'Password contains common patterns. Please choose a stronger password'
      };
    }
  }

  if (/(.)\1{3,}/.test(password)) {
    return {
      isValid: false,
      message: 'Password cannot contain more than 3 repeating characters'
    };
  }

  const hasSequential = (str) => {
    for (let i = 0; i < str.length - 2; i++) {
      const char1 = str.charCodeAt(i);
      const char2 = str.charCodeAt(i + 1);
      const char3 = str.charCodeAt(i + 2);
      
      if (char2 === char1 + 1 && char3 === char2 + 1) {
        return true;
      }
      if (char2 === char1 - 1 && char3 === char2 - 1) {
        return true;
      }
    }
    return false;
  };

  if (hasSequential(password.toLowerCase())) {
    return {
      isValid: false,
      message: 'Password cannot contain sequential characters (abc, 123, etc.)'
    };
  }

  return {
    isValid: true,
    message: 'Password is strong'
  };
};

module.exports = validatePassword;