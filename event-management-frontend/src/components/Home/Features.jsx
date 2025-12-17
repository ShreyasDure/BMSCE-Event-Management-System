import { motion } from 'framer-motion';
import { Calendar, Bell, Users, BarChart3, CheckCircle, MessageSquare } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Event Discovery',
      description: 'Browse through all upcoming campus events with advanced filtering options.',
      color: 'bg-blue-500'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Never miss an event with personalized reminders and real-time updates.',
      color: 'bg-indigo-500'
    },
    {
      icon: Users,
      title: 'Easy Registration',
      description: 'One-click registration with instant confirmation and QR code tickets.',
      color: 'bg-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track attendance, engagement, and event performance with detailed insights.',
      color: 'bg-pink-500'
    },
    {
      icon: CheckCircle,
      title: 'Approval System',
      description: 'Organizers can review and approve registrations to manage capacity.',
      color: 'bg-rose-500'
    },
    {
      icon: MessageSquare,
      title: 'Feedback System',
      description: 'Collect valuable feedback from attendees to improve future events.',
      color: 'bg-orange-500'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to organize and participate in campus events
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;