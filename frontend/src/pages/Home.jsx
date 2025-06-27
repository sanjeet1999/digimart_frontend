import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-cyan-700 text-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Welcome to DigiMart</h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate digital marketplace for buying and selling premium digital goods. 
              From software and digital artwork to e-books and YouTube courses - everything digital, all in one place.
            </p>
            <button className="bg-white text-cyan-700 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm sm:text-base">
              Start Your Digital Journey
            </button>
          </div>
        </section>

        {/* Main Platform Boxes */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Choose Your Path</h2>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-4xl mx-auto">
              <div className="flex-1 bg-white p-6 sm:p-8 rounded-lg shadow-lg border-t-4 border-cyan-700 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">🛒</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-cyan-700">For Buyers</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  Discover and purchase premium digital products from talented creators worldwide. 
                  Find software, digital art, e-books, online courses, and more.
                </p>
                <ul className="text-left text-gray-600 mb-4 sm:mb-6 space-y-2 text-sm sm:text-base">
                  <li className="flex items-start"><span className="mr-2">•</span>Browse thousands of digital products</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Secure instant downloads</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Verified seller ratings</li>
                  <li className="flex items-start"><span className="mr-2">•</span>24/7 customer support</li>
                </ul>
                <Link to="/login" className="bg-cyan-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-cyan-800 transition inline-block text-sm sm:text-base">
                  Start Shopping
                </Link>
              </div>
              
              <div className="flex-1 bg-white p-6 sm:p-8 rounded-lg shadow-lg border-t-4 border-cyan-700 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">💼</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-cyan-700">For Sellers</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  Turn your digital creations into income. Sell your software, artwork, courses, 
                  e-books and reach customers globally on our trusted platform.
                </p>
                <ul className="text-left text-gray-600 mb-4 sm:mb-6 space-y-2 text-sm sm:text-base">
                  <li className="flex items-start"><span className="mr-2">•</span>Easy product listing & management</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Secure payment processing</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Global customer reach</li>
                  <li className="flex items-start"><span className="mr-2">•</span>Competitive seller fees</li>
                </ul>
                <Link to="/login" className="bg-cyan-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-cyan-800 transition inline-block text-sm sm:text-base">
                  Start Selling
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Products Categories */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Popular Digital Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">💻</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-cyan-700">Software & Apps</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Desktop applications, mobile apps, plugins, and tools</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">🎨</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-cyan-700">Digital Artwork</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Graphics, illustrations, templates, and design assets</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">📚</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-cyan-700">E-Books</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Digital books, guides, manuals, and educational content</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">🎓</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-cyan-700">Online Courses</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">YouTube courses, tutorials, and educational videos</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

export default Home
