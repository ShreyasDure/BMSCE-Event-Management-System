import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Search, Calendar, CheckCircle } from 'lucide-react';
import api from '../../utils/axios';
import { clearAuthData, getCurrentUser, showToast } from '../../utils/auth';
import EventCard from '../Events/EventCard';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const [events, setEvents] = useState([]);
  const [myRegistrations, setMyRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchEvents();
    fetchMyRegistrations();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events');
      setEvents(response.data.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
      showToast('Error loading events', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRegistrations = async () => {
    try {
      const response = await api.get('/events/my-registrations');
      setMyRegistrations(response.data.data.registrations);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await api.post(`/events/register/${eventId}`);
      showToast('Successfully registered for event!', 'success');
      fetchMyRegistrations();
    } catch (error) {
      showToast(error.response?.data?.message || 'Registration failed', 'error');
    }
  };

  const handleCancelRegistration = async (eventId) => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      try {
        await api.delete(`/events/register/${eventId}`);
        showToast('Registration cancelled', 'success');
        fetchMyRegistrations();
      } catch (error) {
        showToast('Error cancelling registration', 'error');
      }
    }
  };

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  const isEventRegistered = (eventId) => {
    return myRegistrations.some(reg => reg.event?._id === eventId);
  };

  const getRegistrationStatus = (eventId) => {
    const registration = myRegistrations.find(reg => reg.event?._id === eventId);
    return registration?.status || null;
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const registeredEvents = myRegistrations.map(reg => ({
    ...reg.event,
    registrationStatus: reg.status
  })).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BMSCE Event Management</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title, description, or venue..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-3 px-2 font-medium transition-colors ${
                activeTab === 'all'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              All Events ({filteredEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('registered')}
              className={`pb-3 px-2 font-medium transition-colors ${
                activeTab === 'registered'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CheckCircle className="w-4 h-4 inline mr-2" />
              My Events ({registeredEvents.length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : (
          <>
            {activeTab === 'all' && (
              <>
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No events found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => {
                      const registered = isEventRegistered(event._id);
                      const status = getRegistrationStatus(event._id);
                      
                      return (
                        <div key={event._id} className="relative">
                          <EventCard
                            event={event}
                            onRegister={handleRegister}
                            onCancel={handleCancelRegistration}
                            isRegistered={registered}
                            isOrganizer={false}
                          />
                          {registered && (
                            <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
                              status === 'approved' ? 'bg-green-100 text-green-800' :
                              status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {status}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {activeTab === 'registered' && (
              <>
                {registeredEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">You haven't registered for any events yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {registeredEvents.map((event) => (
                      <div key={event._id} className="relative">
                        <EventCard
                          event={event}
                          onCancel={handleCancelRegistration}
                          isRegistered={true}
                          isOrganizer={false}
                        />
                        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${
                          event.registrationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                          event.registrationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.registrationStatus}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
