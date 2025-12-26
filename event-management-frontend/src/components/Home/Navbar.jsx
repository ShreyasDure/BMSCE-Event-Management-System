import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const shouldShowBackground = !isHomePage || isScrolled;

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Features', to: '/', section: '#features' },
    { name: 'Events', to: '/', section: '#events' },
    { name: 'About', to: '/', section: '#about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowBackground
          ? 'bg-white/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center min-h-[4rem]">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center space-x-2.5 group whitespace-nowrap transition-colors ${
              shouldShowBackground ? 'text-xl' : 'text-lg sm:text-xl'
            }`}
          >
            <img
              src="/images/bmsce-logo.png"
              alt="BMSCE logo"
              className="h-[1em] w-auto"
            />
            <span
              className={`font-bold transition-colors ${
                shouldShowBackground
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                  : 'text-white'
              }`}
            >
              BMSCE Event Management
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => {
                  if (link.section && isHomePage) {
                    // If on home page, scroll to section
                    const element = document.querySelector(link.section);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else if (link.section) {
                    // If not on home page, navigate to home then scroll
                    setTimeout(() => {
                      const element = document.querySelector(link.section);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }
                }}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all font-semibold text-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (link.section && isHomePage) {
                      // If on home page, scroll to section
                      const element = document.querySelector(link.section);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else if (link.section) {
                      // If not on home page, navigate to home then scroll
                      setTimeout(() => {
                        const element = document.querySelector(link.section);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                  className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link
                  to="/login"
                  className="text-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;