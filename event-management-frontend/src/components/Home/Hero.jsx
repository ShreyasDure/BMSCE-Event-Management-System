import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Users, TrendingUp, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const heroImageUrl = `${import.meta.env.BASE_URL}images/college-event-hero.png`;

  return (
    <section
  id="home"
  className="relative min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] flex items-center px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 overflow-hidden"
  style={{
    backgroundImage:
      `linear-gradient(to right, rgba(0, 0, 0, 0.70) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 100%), url(${heroImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Content - positioned at 40-45% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 text-white font-poppins order-2 lg:order-1"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 leading-[1.1] font-poppins">
              Manage College Events.{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-white">
                  Seamlessly.
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-1 left-0 h-2 bg-orange-400/60 -z-0"
                />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-[600px] mx-auto lg:mx-0 font-medium font-open-sans">
              Plan, organize, and run tech fests, cultural events, and workshops from registrations to on-ground execution, all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <Link
                to="/events"
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-7 py-3.5 rounded-xl hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all font-semibold text-base inline-flex items-center justify-center overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </Link>
              <a
                href="#events"
                className="bg-transparent text-white px-7 py-3.5 rounded-xl border-2 border-white/30 hover:border-white hover:text-white hover:bg-white/10 transition-all font-semibold text-base"
              >
                Explore Events
              </a>
            </div>

                      </motion.div>

                    {/* Right Content - Empty to showcase background image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative lg:col-span-7 order-1 lg:order-2"
          >
            <div className="hero-image-spacer"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;