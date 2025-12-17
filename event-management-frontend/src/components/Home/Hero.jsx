import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>BMSCE College Event Management</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Connect.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Engage.
              </span>{' '}
              Celebrate.
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Your ultimate platform for discovering, organizing, and managing campus events. 
              Join the movement of making college life more vibrant and connected.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all font-semibold text-lg inline-flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="bg-white text-gray-700 px-8 py-4 rounded-full border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all font-semibold text-lg"
              >
                Learn More
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-3xl font-bold text-blue-600">50+</p>
                <p className="text-sm text-gray-600">Events Hosted</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-indigo-600">200+</p>
                <p className="text-sm text-gray-600">Active Students</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">10+</p>
                <p className="text-sm text-gray-600">Organizers</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[500px]">
              {/* Floating Cards Animation */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-0 bg-white rounded-2xl shadow-2xl p-6 w-72"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Tech Fest 2025</p>
                    <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">Join us for an amazing tech event...</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Register Now
                </button>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-0 left-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-6 w-64 text-white"
              >
                <div className="text-4xl font-bold mb-2">150+</div>
                <p className="text-indigo-100">Students Registered</p>
                <div className="flex -space-x-2 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-white/30 rounded-full border-2 border-white"
                    ></div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/3 left-1/4 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl shadow-xl p-4 w-48"
              >
                <p className="text-white font-semibold text-sm">🎉 New Event!</p>
                <p className="text-white/80 text-xs mt-1">Cultural Night - Friday</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;