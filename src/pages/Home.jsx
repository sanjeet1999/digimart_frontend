import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-cyan-700 text-white py-20">
          <div className="container mx-auto px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to DigiMart</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              The ultimate digital marketplace for buying and selling premium digital goods. 
              From software and digital artwork to e-books and YouTube courses - everything digital, all in one place.
            </p>
            <button className="bg-white text-cyan-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Start Your Digital Journey
            </button>
          </div>
        </section>

        {/* Main Platform Boxes */}
        <section className="py-16">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Choose Your Path</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-cyan-700 text-center">
                <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🛒</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-700">For Buyers</h3>
                <p className="text-gray-600 mb-6">
                  Discover and purchase premium digital products from talented creators worldwide. 
                  Find software, digital art, e-books, online courses, and more.
                </p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                  <li>• Browse thousands of digital products</li>
                  <li>• Secure instant downloads</li>
                  <li>• Verified seller ratings</li>
                  <li>• 24/7 customer support</li>
                </ul>
                <button className="bg-cyan-700 text-white px-6 py-2 rounded-lg hover:bg-cyan-800 transition">
                  Start Shopping
                </button>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-cyan-700 text-center">
                <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">💼</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-cyan-700">For Sellers</h3>
                <p className="text-gray-600 mb-6">
                  Turn your digital creations into income. Sell your software, artwork, courses, 
                  e-books and reach customers globally on our trusted platform.
                </p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                  <li>• Easy product listing & management</li>
                  <li>• Secure payment processing</li>
                  <li>• Global customer reach</li>
                  <li>• Competitive seller fees</li>
                </ul>
                <button className="bg-cyan-700 text-white px-6 py-2 rounded-lg hover:bg-cyan-800 transition">
                  Start Selling
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Products Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Popular Digital Categories</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cyan-700">Software & Apps</h3>
                <p className="text-gray-600 text-sm">Desktop applications, mobile apps, plugins, and tools</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cyan-700">Digital Artwork</h3>
                <p className="text-gray-600 text-sm">Graphics, illustrations, templates, and design assets</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cyan-700">E-Books</h3>
                <p className="text-gray-600 text-sm">Digital books, guides, manuals, and educational content</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-cyan-700">Online Courses</h3>
                <p className="text-gray-600 text-sm">YouTube courses, tutorials, and educational videos</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home; 