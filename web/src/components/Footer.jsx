import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-accent p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-800">Myanmar Explorer</span>
            </div>
            <p className="text-sm text-gray-600">
              Discover the beauty and rich heritage of Myanmar through immersive virtual experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-sm text-gray-600 hover:text-accent transition-colors">
                  Explore Map
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>info@myanmarexplorer.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+95 1 234 5678</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-accent" />
              </a>
              <a
                href="#"
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-accent" />
              </a>
              <a
                href="#"
                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-accent" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © 2026 Myanmar Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;