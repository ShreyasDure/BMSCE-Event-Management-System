import { Calendar, MapPin, User, Tag, Clock, Users } from 'lucide-react';

const EventCard = ({ event, onRegister, onCancel, onEdit, onDelete, onViewRegistrations, onViewRegisteredStudents, isRegistered, isOrganizer }) => {
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

          {event.registrationDeadline && (
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>Deadline: {formatDate(event.registrationDeadline)}</span>
            </div>
          )}

          {event.category && (
            <div className="flex items-center text-gray-600">
              <Tag className="w-4 h-4 mr-2" />
              <span>{event.category}</span>
            </div>
          )}

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
            <>
              <button
                onClick={() => onCancel(event._id)}
                className="flex-1 btn-danger"
              >
                Cancel Registration
              </button>
              {onViewRegisteredStudents && (
                <button
                  onClick={() => onViewRegisteredStudents(event._id)}
                  className="btn-secondary text-sm px-3"
                  title="View registered students"
                >
                  <Users className="w-4 h-4" />
                </button>
              )}
            </>
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