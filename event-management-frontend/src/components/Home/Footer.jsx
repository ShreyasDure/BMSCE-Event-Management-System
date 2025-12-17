import { Calendar, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BMSCE Event Management</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate platform for discovering and managing college events at BMSCE.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-blue-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="hover:text-blue-500 transition-colors">Features</a>
              </li>
              <li>
                <a href="#events" className="hover:text-blue-500 transition-colors">Events</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
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
                <a href="#events" className="hover:text-blue-500 transition-colors">Browse Events</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Help & Support</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500 transition-colors">Guidelines</a>
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
                <span className="text-sm">support@bmsceeventmanagement.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-sm">+91 80 2662 1006</span>
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
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;