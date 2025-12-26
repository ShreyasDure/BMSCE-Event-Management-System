import { motion } from 'framer-motion';
import { Calendar, Mail, Users, Shield, Clock, CheckCircle } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Event Discovery',
      description: 'Browse and filter through all upcoming campus events by category, date, and venue.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email Notifications',
      description: 'Receive automated email updates for event registrations and approval status.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Dedicated interfaces for Students and Organizers with tailored permissions.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'BMSCE Authentication',
      description: 'Secure login with BMSCE email verification for campus community only.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: CheckCircle,
      title: 'Registration Management',
      description: 'Organizers can approve, reject, and manage event registrations with capacity control.',
      color: 'from-rose-500 to-orange-500'
    },
    {
      icon: Clock,
      title: 'Registration Deadlines',
      description: 'Set and manage registration deadlines to control event capacity and planning.',
      color: 'from-orange-500 to-yellow-500'
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08, hover: { duration: 0.3 } }}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white drop-shadow-md" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
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