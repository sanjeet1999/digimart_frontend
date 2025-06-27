import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-cyan-700 mb-6">About DigiMart</h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                DigiMart is the premier digital marketplace connecting creators and customers worldwide. 
                We specialize in digital goods including software, digital artwork, e-books, YouTube courses, 
                and other premium digital products.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  To empower digital creators by providing them with a trusted platform to monetize their 
                  talents while giving buyers access to high-quality digital products from around the world.
                </p>
                <p className="text-gray-600">
                  We believe in democratizing the digital economy, making it easy for anyone to buy or sell 
                  digital goods - from indie software developers to digital artists, from course creators to e-book authors.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-cyan-700 mb-4">What We Offer</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    Software & Applications marketplace
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    Digital artwork & design assets
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    E-books & digital publications
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    YouTube courses & tutorials
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    Secure payment processing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    Global creator community
                  </li>
                </ul>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="grid md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-700 mb-2">10K+</div>
                <p className="text-gray-600">Digital Products</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-700 mb-2">5K+</div>
                <p className="text-gray-600">Active Sellers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-700 mb-2">50K+</div>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-700 mb-2">100+</div>
                <p className="text-gray-600">Countries Served</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About; 