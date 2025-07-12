import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Career = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-700 mb-3 sm:mb-4">Join the DigiMart Team</h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Help us build the future of digital commerce. We're looking for passionate individuals 
                who want to make a difference in how creators and customers connect in the digital world.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-cyan-700 mb-4 sm:mb-6">Why Work at DigiMart?</h2>
              <div className="flex flex-col sm:flex-row lg:flex-row gap-4 sm:gap-6">
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl">🌍</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Remote-First</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Work from anywhere in the world with flexible hours</p>
                </div>
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Growth Opportunities</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Advance your career in a fast-growing company</p>
                </div>
                <div className="flex-1 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl">💡</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Innovation</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Work on cutting-edge digital marketplace technology</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <h2 className="text-2xl sm:text-3xl font-bold text-cyan-700 mb-6 sm:mb-8">Open Positions</h2>
              <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl text-gray-400">💼</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">No Current Openings</h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                  We don't have any open positions at the moment, but we're always growing! 
                  Check back regularly for new opportunities or send us your resume to be considered for future openings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Career; 