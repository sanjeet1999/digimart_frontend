import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Header from '../components/Header'
import Footer from '../components/Footer'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login submitted:', formData);
      };
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 flex items-center justify-center py-8 sm:py-12 lg:py-16">
          <div className="w-full max-w-md mx-4 sm:mx-6">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-cyan-700 mb-6 sm:mb-8">Login to DigiMart</h2>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <input
                        type="password" 
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                        placeholder="Enter your password"
                      />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-cyan-700 text-white py-2 px-4 rounded-lg hover:bg-cyan-800 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-200 text-sm sm:text-base font-medium"
                  >
                    Sign In
                  </button>
                </form>
                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-cyan-600 hover:text-cyan-500">
                      Sign up here
                    </Link>
                  </p>
                </div>
            </div>
          </div>
        </main>
        <Footer />
    </div>
  )
}

export default Login
