import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="text-sm font-bold text-slate-700 mb-4">CONTACT US</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                Get in touch today!
              </h1>
              <p className="text-gray-500 text-base md:text-lg mb-8 max-w-md mx-auto lg:mx-0">
                We know how large objects will act, but things on a small scale just do not act that way.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <Phone className="w-5 h-5 text-[#23A6F0]" />
                  <span className="text-slate-800 font-bold">Phone: +451 215 215</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <Mail className="w-5 h-5 text-[#23A6F0]" />
                  <span className="text-slate-800 font-bold">Fax: +451 215 215</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <a href="#" className="w-8 h-8 flex items-center justify-center text-slate-800 hover:text-[#23A6F0] transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center text-slate-800 hover:text-[#23A6F0] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center text-slate-800 hover:text-[#23A6F0] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center text-slate-800 hover:text-[#23A6F0] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-pink-200 rounded-full -z-10"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-200 rounded-full -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=600&h=500&fit=crop"
                  alt="Contact Us"
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Visits Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-slate-700 mb-4">VISIT OUR OFFICE</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 max-w-lg mx-auto">
              We help small businesses with big ideas
            </h2>
          </div>

          {/* Office Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <div className="bg-white p-8 md:p-10 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#23A6F0] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-[#23A6F0]" />
              </div>
              <p className="text-sm text-slate-600 mb-2">georgia.young@example.com</p>
              <p className="text-sm text-slate-600 mb-6">georgia.young@ple.com</p>
              <p className="text-base font-bold text-slate-800 mb-4">Get Support</p>
              <button className="border-2 border-[#23A6F0] text-[#23A6F0] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#23A6F0] hover:text-white transition-colors">
                Submit Request
              </button>
            </div>

            {/* Location Card - Highlighted */}
            <div className="bg-slate-800 p-8 md:p-10 text-center">
              <div className="w-16 h-16 bg-[#23A6F0] rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-300 mb-2">georgia.young@example.com</p>
              <p className="text-sm text-gray-300 mb-6">georgia.young@ple.com</p>
              <p className="text-base font-bold text-white mb-4">Get Support</p>
              <button className="border-2 border-[#23A6F0] text-[#23A6F0] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#23A6F0] hover:text-white transition-colors">
                Submit Request
              </button>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 md:p-10 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#23A6F0] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#23A6F0]" />
              </div>
              <p className="text-sm text-slate-600 mb-2">georgia.young@example.com</p>
              <p className="text-sm text-slate-600 mb-6">georgia.young@ple.com</p>
              <p className="text-base font-bold text-slate-800 mb-4">Get Support</p>
              <button className="border-2 border-[#23A6F0] text-[#23A6F0] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#23A6F0] hover:text-white transition-colors">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Let's Talk Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-[#23A6F0] mx-auto mb-6"></div>
            <p className="text-sm font-bold text-slate-700 mb-4">WE CAN'T WAIT TO MEET YOU</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Let's Talk
            </h2>
            <button className="bg-[#23A6F0] text-white px-8 py-4 rounded font-bold text-sm hover:bg-[#1a8cd8] transition-colors">
              Try it free now
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Send us a message
            </h2>
            <p className="text-gray-500">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0] transition-colors"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0] transition-colors"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0] transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto bg-[#23A6F0] text-white px-10 py-4 rounded font-bold text-sm hover:bg-[#1a8cd8] transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white">
        <div className="w-full h-[300px] md:h-[400px] bg-gray-200 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25986652089301!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1639581234567!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
