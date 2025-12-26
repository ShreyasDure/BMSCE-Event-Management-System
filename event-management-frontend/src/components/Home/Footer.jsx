import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (to) => {
    navigate(to);
    window.scrollTo(0, 0);
  };
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/images/bmsce-logo.png"
                alt="BMSCE logo"
                className="h-[2em] w-auto flex-shrink-0"
              />
              <span className="text-xl font-bold text-white leading-tight">BMSCE Event Management</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate platform for discovering and managing college events at BMSCE.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>Home</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors" onClick={() => {
                  window.scrollTo(0, 0);
                  setTimeout(() => {
                    const element = document.querySelector('#features');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}>Features</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors" onClick={() => {
                  window.scrollTo(0, 0);
                  setTimeout(() => {
                    const element = document.querySelector('#events');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}>Events</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors" onClick={() => {
                  window.scrollTo(0, 0);
                  setTimeout(() => {
                    const element = document.querySelector('#about');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}>About</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-500 transition-colors">Login</Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">For Students</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/signup" className="hover:text-blue-500 transition-colors">Create Account</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-500 transition-colors" onClick={() => {
                  window.scrollTo(0, 0);
                  setTimeout(() => {
                    const element = document.querySelector('#events');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}>Browse Events</Link>
              </li>
              <li>
                <Link to="/help-support" className="hover:text-blue-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>Help & Support</Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-blue-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>FAQs</Link>
              </li>
              <li>
                <Link to="/guidelines" className="hover:text-blue-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>Guidelines</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">BMS College of Engineering, Basavanagudi, Bangalore - 560019</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-sm">eventmanagement@bmsce.me</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-sm">+91 8026621006</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 BMSCE Event Management. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="hover:text-blue-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-blue-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>Terms of Service</Link>
              <Link to="/cookie-policy" className="hover:text-blue-500 transition-colors" onClick={() => window.scrollTo(0, 0)}>Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;