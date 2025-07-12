import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import apiService from '../services/api';

const BuyerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [realProducts, setRealProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample demo products data
  const demoProducts = [
    {
      id: 'demo-1',
      title: "React UI Component Library",
      category: "software",
      price: 49.99,
      rating: 4.8,
      downloads: 1250,
      image: "💻",
      seller: "TechCorp",
      description: "Complete React component library with 50+ customizable components",
      isDemo: true
    },
    {
      id: 'demo-2',
      title: "Digital Marketing Masterclass",
      category: "online courses",
      price: 99.99,
      rating: 4.9,
      downloads: 3400,
      image: "🎓",
      seller: "MarketingPro",
      description: "Comprehensive course covering SEO, social media, and paid advertising",
      isDemo: true
    },
    {
      id: 'demo-3',
      title: "Premium Logo Pack",
      category: "digital art",
      price: 29.99,
      rating: 4.7,
      downloads: 890,
      image: "🎨",
      seller: "DesignStudio",
      description: "50 professional logos in vector format for your business",
      isDemo: true
    }
  ];

  // Fetch real products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await apiService.getAllProducts();
        if (result.success) {
          const formattedProducts = result.data.data.products.map(product => ({
            id: product._id,
            title: product.prodName || 'Untitled Product',
            category: product.Prodcategory || 'other',
            price: typeof product.price === 'number' ? product.price : 0,
            rating: 4.5, // Default rating since not in model
            downloads: Math.floor(Math.random() * 1000) + 100, // Random downloads for demo
            image: getImageForCategory(product.Prodcategory),
            seller: product.sellerId?.UserName || 'Unknown Seller',
            description: product.ProdDiscription || 'No description available',
            quantity: product.ProdQuantity || 0,
            ProdImage: product.ProdImage || [], // Include the Google Drive images
            isDemo: false
          }));
          setRealProducts(formattedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to get emoji based on category
  const getImageForCategory = (category) => {
    const categoryImages = {
      'software': '💻',
      'ebook': '📚',
      'music': '🎵',
      'online courses': '🎓',
      'digital art': '🎨'
    };
    return categoryImages[category] || '📦';
  };

  // Combine real and demo products
  const allProducts = [...realProducts, ...demoProducts];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'software', label: 'Software & Apps' },
    { value: 'digital art', label: 'Digital Art' },
    { value: 'ebook', label: 'E-Books' },
    { value: 'online courses', label: 'Online Courses' },
    { value: 'music', label: 'Music' }
  ];

  const filteredProducts = allProducts.filter(product => {
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
              <p className="text-gray-600 text-sm sm:text-base">
                Discover premium digital products from talented creators worldwide
                {realProducts.length > 0 && (
                  <span className="block mt-1 text-cyan-600 font-medium">
                    {realProducts.length} live product{realProducts.length !== 1 ? 's' : ''} available!
                  </span>
                )}
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-700 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading products...</p>
                </div>
              </div>
            )}

            {/* Search and Filter Section */}
            {!loading && (
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
            )}

            {/* Products Grid */}
            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-4 sm:p-6">
                      {/* Demo/Live Badge */}
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          product.isDemo 
                            ? 'bg-gray-100 text-gray-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {product.isDemo ? 'Demo' : 'Live'}
                        </span>
                        {!product.isDemo && product.quantity !== undefined && (
                          <span className="text-xs text-gray-500">
                            Qty: {product.quantity}
                          </span>
                        )}
                      </div>

                                             <div className="text-center mb-3 sm:mb-4">
                         {product.ProdImage && product.ProdImage.length > 0 && !product.isDemo ? (
                           <img 
                             src={product.ProdImage[0]} 
                             alt={product.title}
                             className="w-20 h-20 mx-auto object-cover rounded-lg border"
                             onError={(e) => {
                               e.target.style.display = 'none';
                               e.target.nextSibling.style.display = 'block';
                             }}
                           />
                         ) : null}
                         <span 
                           className="text-3xl sm:text-4xl" 
                           style={{display: product.ProdImage && product.ProdImage.length > 0 && !product.isDemo ? 'none' : 'block'}}
                         >
                           {product.image}
                         </span>
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
                        <span className="text-xl sm:text-2xl font-bold text-cyan-700">
                          ₹{product.price?.toFixed(2) || '0.00'}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">{product.downloads} downloads</span>
                      </div>
                      
                      <button 
                        className={`w-full py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base font-medium ${
                          product.isDemo
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-cyan-700 text-white hover:bg-cyan-800'
                        }`}
                        disabled={product.isDemo}
                      >
                        {product.isDemo ? 'Demo Product' : 'Purchase Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
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