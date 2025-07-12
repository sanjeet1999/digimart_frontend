import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-700 mb-4 sm:mb-6">About DigiMart</h1>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Welcome to <span className="font-semibold">DigiMart</span>, your premier destination for buying and selling digital products.
              We're revolutionizing how creators monetize their digital work and how customers discover premium digital content.
            </p>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8 sm:mb-12">
              <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-700 mb-3 sm:mb-4">Our Mission</h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  To create the world's most trusted digital marketplace where creators can showcase their work 
                  and customers can discover high-quality digital products including software, digital art, 
                  e-books, and online courses.
                </p>
              </div>

              <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-700 mb-3 sm:mb-4">Our Vision</h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  To empower digital creators worldwide by providing them with a platform to reach global audiences 
                  and build sustainable businesses from their creative work and expertise.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-700 mb-4 sm:mb-6">What We Offer</h2>
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">For Creators & Sellers</h3>
                  <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                    <li className="flex items-start"><span className="mr-2">•</span>Easy product listing and management</li>
                    <li className="flex items-start"><span className="mr-2">•</span>Secure payment processing</li>
                    <li className="flex items-start"><span className="mr-2">•</span>Global marketplace reach</li>
                    <li className="flex items-start"><span className="mr-2">•</span>Marketing and promotional tools</li>
                    <li className="flex items-start"><span className="mr-2">•</span>Analytics and insights</li>
                  </ul>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">For Buyers</h3>
                  <ul className="text-gray-600 space-y-2 text-sm sm:text-base">
                    <li className="flex items-start"><span className="mr-2">•</span>Curated high-quality digital products</li>
                    <li className="flex items-start"><span className="mr-2">•</span>Instant downloads and access</li>
                    <li className="flex items-start"><span className="mr-2">•</span>Secure transactions</li>
                    <li className="flex items-start"><span className="mr-2">•</span>Customer support</li>
                    <li className="flex items-start"><span className="mr-2">•</span>User reviews and ratings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-700 mb-4 sm:mb-6">Product Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl sm:text-3xl mb-2 block">💻</span>
                  <h3 className="font-semibold text-cyan-700 text-sm sm:text-base">Software & Apps</h3>
                </div>
                <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl sm:text-3xl mb-2 block">🎨</span>
                  <h3 className="font-semibold text-cyan-700 text-sm sm:text-base">Digital Art</h3>
                </div>
                <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl sm:text-3xl mb-2 block">📚</span>
                  <h3 className="font-semibold text-cyan-700 text-sm sm:text-base">E-Books</h3>
                </div>
                <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl sm:text-3xl mb-2 block">🎓</span>
                  <h3 className="font-semibold text-cyan-700 text-sm sm:text-base">Online Courses</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default About
