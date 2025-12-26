import { useState, useEffect } from 'react';
import { X, Calendar, MapPin, FileText, Image, Tag, Clock, Info } from 'lucide-react';

const CreateEvent = ({ onClose, onSuccess, editEvent = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    venue: '',
    date: '',
    registrationDeadline: '',
    specialInstructions: '',
    bannerImage: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editEvent) {
      setFormData({
        title: editEvent.title,
        category: editEvent.category || '',
        description: editEvent.description,
        venue: editEvent.venue,
        date: new Date(editEvent.date).toISOString().slice(0, 16),
        registrationDeadline: editEvent.registrationDeadline
          ? new Date(editEvent.registrationDeadline).toISOString().slice(0, 16)
          : '',
        specialInstructions: editEvent.specialInstructions || '',
        bannerImage: editEvent.bannerImage || ''
      });
    }
  }, [editEvent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSuccess(formData);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {editEvent ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="title"
                name="title"
                type="text"
                required
                className="input-field pl-10"
                placeholder="Tech Conference 2025"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="category"
                name="category"
                type="text"
                required
                className="input-field pl-10"
                placeholder="Technical / Cultural / Workshop"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows="4"
              className="input-field resize-none"
              placeholder="Describe your event..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-2">
              Venue *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="venue"
                name="venue"
                type="text"
                required
                className="input-field pl-10"
                placeholder="Main Auditorium"
                value={formData.venue}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Event Date & Time *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="date"
                name="date"
                type="datetime-local"
                required
                className="input-field pl-10"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700 mb-2">
              Registration Deadline *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="registrationDeadline"
                name="registrationDeadline"
                type="datetime-local"
                required
                className="input-field pl-10"
                value={formData.registrationDeadline}
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 16)}
                max={formData.date || undefined}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Must be before the event date/time.</p>
          </div>

          <div>
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <div className="relative">
              <Info className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                rows="3"
                className="input-field resize-none pl-10"
                placeholder="Bring your college ID card, laptop, etc."
                value={formData.specialInstructions}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700 mb-2">
              Banner Image URL
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="bannerImage"
                name="bannerImage"
                type="url"
                className="input-field pl-10"
                placeholder="https://example.com/image.jpg"
                value={formData.bannerImage}
                onChange={handleChange}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Optional: Provide a URL for the event banner image
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary"
            >
              {loading ? 'Saving...' : editEvent ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;