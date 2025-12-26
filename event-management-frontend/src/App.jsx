import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './utils/auth';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import OrganizerDashboard from './components/Dashboard/OrganizerDashboard';
import RegisteredStudents from './components/Events/RegisteredStudents';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import HelpSupport from './pages/HelpSupport';
import FAQs from './pages/FAQs';
import Guidelines from './pages/Guidelines';

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }
  
  return children;
};

const PublicRoute = ({ children }) => {
  const user = getCurrentUser();
  
  if (user) {
    return <Navigate to={`/${user.role}-dashboard`} replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } 
        />
        <Route 
          path="/reset-password/:token" 
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          } 
        />
        
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:eventId/registered-students"
          element={
            <ProtectedRoute allowedRole="student">
              <RegisteredStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer-dashboard"
          element={
            <ProtectedRoute allowedRole="organizer">
              <OrganizerDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Static Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/guidelines" element={<Guidelines />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;