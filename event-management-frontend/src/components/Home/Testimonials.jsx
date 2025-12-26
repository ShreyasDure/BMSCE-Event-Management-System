import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya S.',
      role: '4th Year CSE',
      usn: '1BM21CS045',
      content: 'Finally, a platform that actually works! I used to miss so many events because I\'d hear about them too late. Now I get notified and can register in seconds.',
      rating: 5,
      event: 'Attended 12 events',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Rahul K.',
      role: 'Event Coordinator',
      usn: 'Organizer',
      content: 'Managing Tech Fest registrations used to be chaos. This platform saved us hours of work. The approval system is exactly what we needed.',
      rating: 5,
      event: 'Organized 8 events',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Ananya R.',
      role: '3rd Year ECE',
      usn: '1BM22EC012',
      content: 'Love how simple it is. No complicated forms or confusing navigation. Just find an event, click register, done. More platforms should be like this.',
      rating: 5,
      event: 'Attended 9 events',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What BMSCE Students{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real feedback from students and organizers using the platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-100" />
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{display: 'none'}}>
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{testimonial.usn}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                "{testimonial.content}"
              </p>
              <p className="text-xs text-gray-500">{testimonial.event}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;