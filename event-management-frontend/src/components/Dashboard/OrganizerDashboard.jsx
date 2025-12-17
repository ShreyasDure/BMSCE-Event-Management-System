import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Calendar, Users, CheckCircle, XCircle, Clock, X } from 'lucide-react';
import api from '../../utils/axios';
import { clearAuthData, getCurrentUser, showToast } from '../../utils/auth';
import EventCard from '../Events/EventCard';
import CreateEvent from '../Events/CreateEvent';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const [myEvents, setMyEvents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEventRegistrations, setSelectedEventRegistrations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/events?organizer=me');
      setMyEvents(response.data.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
      showToast('Error loading events', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (eventData) => {
    try {
      await api.post('/events', eventData);
      showToast('Event created successfully!', 'success');
      fetchMyEvents();
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateEvent = async (eventData) => {
    try {
      await api.put(`/events/${editingEvent._id}`, eventData);
      showToast('Event updated successfully!', 'success');
      fetchMyEvents();
      setEditingEvent(null);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event? All registrations will be removed.')) {
      try {
        await api.delete(`/events/${eventId}`);
        showToast('Event deleted successfully', 'success');
        fetchMyEvents();
      } catch (error) {
        showToast('Error deleting event', 'error');
      }
    }
  };

  const handleViewRegistrations = async (eventId) => {
    try {
      const response = await api.get(`/events/registrations/${eventId}`);
      const event = myEvents.find(e => e._id === eventId);
      setSelectedEventRegistrations({
        event,
        registrations: response.data.data.registrations
      });
    } catch (error) {
      showToast('Error loading registrations', 'error');
    }
  };

  const handleApproveRegistration = async (registrationId) => {
    try {
      await api.put(`/events/registrations/${registrationId}/approve`);
      showToast('Registration approved!', 'success');
      handleViewRegistrations(selectedEventRegistrations.event._id);
    } catch (error) {
      showToast('Error approving registration', 'error');
    }
  };

  const handleRejectRegistration = async (registrationId) => {
    try {
      await api.put(`/events/registrations/${registrationId}/reject`);
      showToast('Registration rejected', 'success');
      handleViewRegistrations(selectedEventRegistrations.event._id);
    } catch (error) {
      showToast('Error rejecting registration', 'error');
    }
  };

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  const getEventStats = () => {
    const totalEvents = myEvents.length;
    const upcomingEvents = myEvents.filter(e => new Date(e.date) > new Date()).length;
    return { totalEvents, upcomingEvents };
  };

  const stats = getEventStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BMSCE Event Management</h1>
              <p className="text-sm text-gray-600">Organizer Dashboard - {user?.name}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
              <Calendar className="w-12 h-12 text-primary-600" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Events</p>
                <p className="text-3xl font-bold text-gray-900">{stats.upcomingEvents}</p>
              </div>
              <Clock className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="card">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full btn-primary flex items-center justify-center gap-2 py-6"
            >
              <Plus className="w-5 h-5" />
              Create New Event
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Events</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : myEvents.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">You haven't created any events yet</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 btn-primary"
              >
                Create Your First Event
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onEdit={setEditingEvent}
                  onDelete={handleDeleteEvent}
                  onViewRegistrations={handleViewRegistrations}
                  isOrganizer={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {(showCreateModal || editingEvent) && (
        <CreateEvent
          onClose={() => {
            setShowCreateModal(false);
            setEditingEvent(null);
          }}
          onSuccess={editingEvent ? handleUpdateEvent : handleCreateEvent}
          editEvent={editingEvent}
        />
      )}

      {selectedEventRegistrations && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Registrations</h2>
                <p className="text-sm text-gray-600">{selectedEventRegistrations.event.title}</p>
              </div>
              <button
                onClick={() => setSelectedEventRegistrations(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {selectedEventRegistrations.registrations.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No registrations yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedEventRegistrations.registrations.map((registration) => (
                    <div key={registration._id} className="card flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{registration.student.name}</p>
                        <p className="text-sm text-gray-600">{registration.student.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Registered: {new Date(registration.registeredAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          registration.status === 'approved' ? 'bg-green-100 text-green-800' :
                          registration.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {registration.status}
                        </span>
                        
                        {registration.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveRegistration(registration._id)}
                              className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleRejectRegistration(registration._id)}
                              className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;