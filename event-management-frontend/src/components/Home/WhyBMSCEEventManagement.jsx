import { motion } from 'framer-motion';
import { Target, Users, Zap, Shield } from 'lucide-react';

const WhyBMSCEEventManagement = () => {
  const reasons = [
    {
      icon: Target,
      title: 'Centralized Platform',
      description: 'All campus events in one place. No more missing out on exciting opportunities.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Student-First Design',
      description: 'Built by students, for students. Intuitive interface that just works.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Updates',
      description: 'Get instant notifications about new events, registrations, and updates.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'BMSCE email verification ensures only verified students can participate.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BMSCE Event Management?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing how college events are managed and experienced
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <reason.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBMSCEEventManagement;





