import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-cyan-700 mb-6">Contact Us</h1>
              <p className="text-xl text-gray-700">
                Get in touch with us. We'd love to hear from you!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Your message..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-cyan-700 text-white py-2 px-4 rounded-lg hover:bg-cyan-800 transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-cyan-700 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-cyan-500 mr-3">📧</span>
                      <span>support@digimart.com</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-cyan-500 mr-3">📞</span>
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-cyan-500 mr-3">📍</span>
                      <span>123 Digital Street, Tech City, TC 12345</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-cyan-700 mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact; 