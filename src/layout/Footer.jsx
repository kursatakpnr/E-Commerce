import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      {/* Top Section - CTA */}
      <div className="bg-slate-100 py-10 md:py-12 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h2 className="text-slate-800 font-bold text-xl md:text-2xl mb-2">Consulting Agency For Your Business</h2>
            <p className="text-slate-500 text-sm">the quick fox jumps over the lazy dog</p>
          </div>
          <Link to="/contact" className="bg-blue-500 text-white font-bold py-3 px-8 rounded hover:bg-blue-600 transition-colors whitespace-nowrap">
            Contact Us
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-slate-800 text-white py-12 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h4 className="font-bold text-base mb-4">Company Info</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-base mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-base mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Business Marketing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">User Analytic</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Live Chat</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Unlimited Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-base mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">IOS & Android</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Watch a Demo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="font-bold text-base mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(480) 555-0103</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>4517 Washington Ave.</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>debra.holt@example.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm font-bold">Made With Love By Bandage All Rights Reserved</p>
          <div className="flex gap-4">
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
