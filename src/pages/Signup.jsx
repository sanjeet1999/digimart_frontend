import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Account created successfully! Signup functionality would be implemented here.');
    console.log('Signup attempt:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-cyan-700 mb-2">Create Account</h1>
            <p className="text-gray-600">Join DigiMart today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your full name"
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
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Confirm your password"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">I am a</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Select your role</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="both">Both Buyer & Seller</option>
              </select>
            </div>

            <div className="flex items-center">
              <input type="checkbox" required className="mr-2" />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-cyan-700 hover:text-cyan-800">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-cyan-700 hover:text-cyan-800">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-700 text-white py-2 px-4 rounded-lg hover:bg-cyan-800 transition font-medium"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-700 hover:text-cyan-800 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup; 