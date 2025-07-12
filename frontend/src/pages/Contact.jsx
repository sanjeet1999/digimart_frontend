import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    // For demo purposes, we'll just show success message
    // In real implementation, you would send to your backend
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-700 mb-6 sm:mb-8">Contact Us</h1>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Contact Form */}
              <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base resize-none"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-cyan-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-cyan-800 transition duration-200 text-sm sm:text-base font-medium"
                  >
                    Send Message
                  </button>
                </form>
                {status && <p className="mt-4 text-sm text-green-600 font-medium">{status}</p>}
              </div>

              {/* Contact Info */}
              <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">Contact Info</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start">
                    <span className="text-lg sm:text-xl mr-3">📍</span>
                    <div>
                      <p className="text-gray-700 text-sm sm:text-base font-medium">Address</p>
                      <p className="text-gray-600 text-xs sm:text-sm">NIT-Faridabad, Haryana, India</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-lg sm:text-xl mr-3">📞</span>
                    <div>
                      <p className="text-gray-700 text-sm sm:text-base font-medium">Phone</p>
                      <p className="text-gray-600 text-xs sm:text-sm">+91 9999999999</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-lg sm:text-xl mr-3">✉️</span>
                    <div>
                      <p className="text-gray-700 text-sm sm:text-base font-medium">Email</p>
                      <p className="text-gray-600 text-xs sm:text-sm">support@digimart.com</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-cyan-50 rounded-lg">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    We usually respond within 24 hours. Feel free to ask any questions regarding digital products,
                    marketplace services, or technical support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
