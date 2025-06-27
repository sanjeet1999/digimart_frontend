import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer'
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
    // Handle signup logic here
    console.log('Signup submitted:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 flex items-center justify-center py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-md mx-4 sm:mx-6">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-cyan-700 mb-6 sm:mb-8">Sign Up for DigiMart</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                    placeholder="First name"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-cyan-700 text-white py-2 px-4 rounded-lg hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-200 text-sm sm:text-base font-medium"
              >
                Create Account
              </button>
            </form>

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-cyan-600 hover:text-cyan-500">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
