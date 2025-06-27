import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login functionality would be implemented here!');
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-cyan-700 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-cyan-700 hover:text-cyan-800">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-700 text-white py-2 px-4 rounded-lg hover:bg-cyan-800 transition font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cyan-700 hover:text-cyan-800 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login; 