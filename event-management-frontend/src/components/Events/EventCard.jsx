import { Calendar, MapPin, User } from 'lucide-react';

const EventCard = ({ event, onRegister, onCancel, onEdit, onDelete, onViewRegistrations, isRegistered, isOrganizer }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="mb-4 rounded-lg overflow-hidden h-48">
        <img
          src={event.bannerImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
        
        <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.venue}</span>
          </div>

          {event.organizer && (
            <div className="flex items-center text-gray-600">
              <User className="w-4 h-4 mr-2" />
              <span>{event.organizer.name}</span>
            </div>
          )}
        </div>

        <div className="pt-4 flex gap-2">
          {!isOrganizer && !isRegistered && (
            <button
              onClick={() => onRegister(event._id)}
              className="flex-1 btn-primary"
            >
              Register
            </button>
          )}

          {!isOrganizer && isRegistered && (
            <button
              onClick={() => onCancel(event._id)}
              className="flex-1 btn-danger"
            >
              Cancel Registration
            </button>
          )}

          {isOrganizer && (
            <>
              <button
                onClick={() => onViewRegistrations(event._id)}
                className="flex-1 btn-primary text-sm"
              >
                View Registrations
              </button>
              <button
                onClick={() => onEdit(event)}
                className="flex-1 btn-secondary text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(event._id)}
                className="btn-danger text-sm px-3"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;