import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BuyerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample products data
  const products = [
    {
      id: 1,
      title: "React UI Component Library",
      category: "software",
      price: 49.99,
      rating: 4.8,
      downloads: 1250,
      image: "💻",
      seller: "TechCorp",
      description: "Complete React component library with 50+ customizable components"
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      category: "courses",
      price: 99.99,
      rating: 4.9,
      downloads: 3400,
      image: "🎓",
      seller: "MarketingPro",
      description: "Comprehensive course covering SEO, social media, and paid advertising"
    },
    {
      id: 3,
      title: "Premium Logo Pack",
      category: "art",
      price: 29.99,
      rating: 4.7,
      downloads: 890,
      image: "🎨",
      seller: "DesignStudio",
      description: "50 professional logos in vector format for your business"
    },
    {
      id: 4,
      title: "JavaScript Handbook 2024",
      category: "ebooks",
      price: 19.99,
      rating: 4.6,
      downloads: 2100,
      image: "📚",
      seller: "CodeBooks",
      description: "Complete guide to modern JavaScript with examples and projects"
    },
    {
      id: 5,
      title: "Photoshop Action Bundle",
      category: "software",
      price: 39.99,
      rating: 4.5,
      downloads: 670,
      image: "💻",
      seller: "PhotoMaster",
      description: "25 professional Photoshop actions for photo enhancement"
    },
    {
      id: 6,
      title: "Business Plan Template",
      category: "ebooks",
      price: 15.99,
      rating: 4.4,
      downloads: 450,
      image: "📚",
      seller: "BizHelp",
      description: "Professional business plan template with financial projections"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'software', label: 'Software & Apps' },
    { value: 'art', label: 'Digital Art' },
    { value: 'ebooks', label: 'E-Books' },
    { value: 'courses', label: 'Online Courses' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-cyan-700 mb-3 sm:mb-4">Browse Digital Products</h1>
              <p className="text-gray-600 text-sm sm:text-base">Discover premium digital products from talented creators worldwide</p>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                  />
                </div>
                <div className="sm:w-auto">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-base"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 sm:p-6">
                    <div className="text-center mb-3 sm:mb-4">
                      <span className="text-3xl sm:text-4xl">{product.image}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-3 text-xs sm:text-sm">
                      <span className="text-gray-500">by {product.seller}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-gray-600 ml-1">{product.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-xl sm:text-2xl font-bold text-cyan-700">${product.price}</span>
                      <span className="text-xs sm:text-sm text-gray-500">{product.downloads} downloads</span>
                    </div>
                    
                    <button className="w-full bg-cyan-700 text-white py-2 px-4 rounded-lg hover:bg-cyan-800 transition duration-200 text-sm sm:text-base font-medium">
                      Purchase Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔍</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyerDashboard; 