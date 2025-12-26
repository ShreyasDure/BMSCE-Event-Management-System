import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, Users, ArrowLeft, CreditCard, Key } from 'lucide-react';
import api from '../../utils/axios';
import { saveAuthData, showToast } from '../../utils/auth';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    usn: '',
    organizerCode: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [usnError, setUsnError] = useState('');
  const [organizerCodeError, setOrganizerCodeError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateUSN = (usn) => {
    // USN rules for students only:
    // - Starts with '1'
    // - Total length = 10 characters
    // - Alphanumeric (A-Z + 0-9)
    const usnRegex = /^1[A-Z0-9]{9}$/;
    
    if (!usn) {
      return 'USN is required for students';
    }
    if (usn.length !== 10) {
      return 'USN must be exactly 10 characters';
    }
    if (!usn.startsWith('1')) {
      return 'USN must start with 1';
    }
    if (!usnRegex.test(usn)) {
      return 'USN must contain only letters and numbers';
    }
    return '';
  };

  const validateOrganizerCode = (code) => {
    const correctCode = 'bmsce1946';
    
    if (!code) {
      return 'Organizer code is required';
    }
    if (code.toLowerCase() !== correctCode) {
      return 'Invalid organizer code';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear errors when user types
    setFormError('');
    setFieldErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
    
    // Handle role change - reset conditional fields
    if (name === 'role') {
      setFormData({
        ...formData,
        role: value,
        usn: '', // Clear USN when switching roles
        organizerCode: '' // Clear organizer code when switching roles
      });
      setUsnError('');
      setOrganizerCodeError('');
      return;
    }
    
    setFormData({
      ...formData,
      [name]: name === 'usn' ? value.toUpperCase() : value
    });
    
    if (name === 'usn') {
      setUsnError('');
    }
    if (name === 'organizerCode') {
      setOrganizerCodeError('');
    }
  };

  const handleUSNBlur = () => {
    if (formData.role === 'student' && formData.usn) {
      const error = validateUSN(formData.usn);
      setUsnError(error);
    }
  };

  const handleOrganizerCodeBlur = () => {
    if (formData.role === 'organizer' && formData.organizerCode) {
      const error = validateOrganizerCode(formData.organizerCode);
      setOrganizerCodeError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');

    const nextFieldErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!formData.name) {
      nextFieldErrors.name = 'Full name is required';
    }
    if (!formData.email) {
      nextFieldErrors.email = 'Email is required';
    }
    if (!formData.password) {
      nextFieldErrors.password = 'Password is required';
    }
    if (!formData.confirmPassword) {
      nextFieldErrors.confirmPassword = 'Confirm password is required';
    }

    if (
      nextFieldErrors.name ||
      nextFieldErrors.email ||
      nextFieldErrors.password ||
      nextFieldErrors.confirmPassword
    ) {
      setFieldErrors(nextFieldErrors);
      setLoading(false);
      return;
    }

    // Validate BMSCE email domain
    if (!formData.email.endsWith('@bmsce.ac.in')) {
      setFieldErrors((prev) => ({
        ...prev,
        email: 'Please use your BMSCE email address (@bmsce.ac.in)'
      }));
      setLoading(false);
      return;
    }

    // Role-specific validation
    if (formData.role === 'student') {
      // Validate USN for students
      const usnValidation = validateUSN(formData.usn);
      if (usnValidation) {
        setUsnError(usnValidation);
        setLoading(false);
        return;
      }
    } else if (formData.role === 'organizer') {
      // Validate organizer code
      const codeValidation = validateOrganizerCode(formData.organizerCode);
      if (codeValidation) {
        setOrganizerCodeError(codeValidation);
        setLoading(false);
        return;
      }
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setFieldErrors((prev) => ({
        ...prev,
        password: 'Password must be at least 8 characters'
      }));
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...signupData } = formData;
      const response = await api.post('/auth/signup', signupData);
      const { token, user } = response.data.data;

      saveAuthData(token, user);
      showToast('Account created successfully!', 'success');

      if (user.role === 'student') {
        navigate('/student-dashboard');
      } else {
        navigate('/organizer-dashboard');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed. Please try again.';
      const serverField = err.response?.data?.field;

      if (serverField && Object.prototype.hasOwnProperty.call(fieldErrors, serverField)) {
        setFieldErrors((prev) => ({
          ...prev,
          [serverField]: message
        }));
      } else if (message.toLowerCase().includes('password')) {
        setFieldErrors((prev) => ({
          ...prev,
          password: message
        }));
      } else {
        setFormError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="top" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">Join BMSCE Event Management today</p>
          </div>

          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={`input-field pl-10 ${fieldErrors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="role"
                  name="role"
                  required
                  className="input-field pl-10 appearance-none"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="organizer">Event Organizer</option>
                </select>
              </div>
            </div>

            {/* Conditional Field: USN for Students */}
            {formData.role === 'student' && (
              <div>
                <label htmlFor="usn" className="block text-sm font-medium text-gray-700 mb-2">
                  University Serial Number (USN) *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="usn"
                    name="usn"
                    type="text"
                    required
                    maxLength={10}
                    className={`input-field pl-10 ${usnError ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="1BM21CS001"
                    value={formData.usn}
                    onChange={handleChange}
                    onBlur={handleUSNBlur}
                  />
                </div>
                {usnError && (
                  <p className="mt-1 text-xs text-red-600">{usnError}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Format: Starts with 1, 10 alphanumeric characters (e.g., 1BM21CS001)
                </p>
              </div>
            )}

            {/* Conditional Field: Organizer Code */}
            {formData.role === 'organizer' && (
              <div>
                <label htmlFor="organizerCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Organizer Access Code *
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="organizerCode"
                    name="organizerCode"
                    type="password"
                    required
                    className={`input-field pl-10 ${organizerCodeError ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter organizer code"
                    value={formData.organizerCode}
                    onChange={handleChange}
                    onBlur={handleOrganizerCodeBlur}
                  />
                </div>
                {organizerCodeError && (
                  <p className="mt-1 text-xs text-red-600">{organizerCodeError}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Contact admin for organizer access code
                </p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                BMSCE Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`input-field pl-10 ${fieldErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="yourname@bmsce.ac.in"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Use your official BMSCE email address
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`input-field pl-10 ${fieldErrors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`input-field pl-10 ${fieldErrors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || (formData.role === 'student' && !!usnError) || (formData.role === 'organizer' && !!organizerCodeError)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;