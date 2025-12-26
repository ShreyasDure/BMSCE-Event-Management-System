import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventsHighlight = () => {
  const upcomingEvents = [
    {
      title: 'BMSCE Tech Fest 2025',
      date: 'Jan 15-17, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'Main Auditorium',
      attendees: 342,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      category: 'Technical',
      categoryColor: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Cultural Night',
      date: 'Jan 20, 2025',
      time: '6:00 PM',
      location: 'Open Ground',
      attendees: 180,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      category: 'Cultural',
      categoryColor: 'bg-purple-100 text-purple-700'
    },
    {
      title: 'CodeHack 2025',
      date: 'Jan 25, 2025',
      time: '10:00 AM',
      location: 'Computer Lab Block',
      attendees: 156,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
      category: 'Hackathon',
      categoryColor: 'bg-indigo-100 text-indigo-700'
    }
  ];

  const formatDate = (dateStr) => {
    const [dates, year] = dateStr.split(', ');
    if (dates.includes('-')) {
      return dates;
    }
    return dateStr;
  };

  return (
    <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What's Happening{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              This Month
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out these exciting events coming up at BMSCE
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className={`absolute top-3 right-3 ${event.categoryColor} px-2.5 py-1 rounded-md text-xs font-bold shadow-sm`}>
                  {event.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">
                    {event.title}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span className="font-medium">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-indigo-600 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-purple-600 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 pt-1 border-t border-gray-100">
                    <Users className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-gray-900">{event.attendees}</span>
                    <span className="ml-1">registered</span>
                  </div>
                </div>
                <Link
                  to="/signup"
                  className="block text-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all font-semibold text-sm"
                >
                  Register Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/signup#top"
            className="inline-flex items-center bg-white text-gray-700 px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all font-semibold"
          >
            See All Events
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsHighlight;