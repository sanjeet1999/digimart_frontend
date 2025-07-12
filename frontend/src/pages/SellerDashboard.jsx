import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/api';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 m-4">
          <h3 className="text-red-800 font-semibold mb-2">Something went wrong</h3>
          <p className="text-red-600 text-sm">{this.state.error?.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const SellerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'software',
    price: '',
    description: '',
    quantity: 1,
    file: null
  });

  // Products loaded from backend
  const [products, setProducts] = useState([]);

  // Sample buyer data
  const buyers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      purchaseDate: "2024-03-15",
      product: "React UI Component Library",
      amount: 49.99,
      location: "New York, USA"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      purchaseDate: "2024-03-12",
      product: "Photoshop Action Bundle",
      amount: 39.99,
      location: "London, UK"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      purchaseDate: "2024-03-10",
      product: "React UI Component Library",
      amount: 49.99,
      location: "Toronto, Canada"
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      purchaseDate: "2024-03-08",
      product: "Photoshop Action Bundle",
      amount: 39.99,
      location: "Sydney, Australia"
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      email: "alex.r@email.com",
      purchaseDate: "2024-03-05",
      product: "React UI Component Library",
      amount: 49.99,
      location: "Madrid, Spain"
    }
  ];

  const categories = [
    { value: 'software', label: 'Software & Apps' },
    { value: 'digital art', label: 'Digital Art' },
    { value: 'ebook', label: 'E-Books' },
    { value: 'online courses', label: 'Online Courses' },
    { value: 'music', label: 'Music' }
  ];

  // Load products when user is available
  useEffect(() => {
    if (user?._id) {
      loadProducts();
    }
  }, [user]);

  const loadProducts = async () => {
    if (!user?._id) {
      console.error('No user ID available');
      return;
    }

    setLoading(true);
    try {
      console.log('Loading products for seller:', user._id);
      const result = await apiService.getProductsBySeller(user._id);
      
      if (result.success) {
        const products = result.data.data.products || [];
        console.log('Products loaded successfully:', products);
        console.log('First product structure:', products[0]);
        
        // Validate each product before setting state
        const validatedProducts = products.map(product => ({
          ...product,
          prodName: product.prodName || 'Untitled Product',
          price: typeof product.price === 'number' ? product.price : 0,
          ProdQuantity: product.ProdQuantity || 0,
          ProdDiscription: product.ProdDiscription || 'No description available',
          Prodcategory: product.Prodcategory || 'software'
        }));
        
        setProducts(validatedProducts);
      } else {
        console.error('Failed to load products:', result.error);
        toast.error(result.error || 'Failed to load products');
      }
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewProduct(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!newProduct.title.trim()) {
      toast.error('Product title is required');
      return;
    }
    
    if (!newProduct.description.trim()) {
      toast.error('Product description is required');
      return;
    }
    
    if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
      toast.error('Valid price is required');
      return;
    }
    
    if (!newProduct.file) {
      toast.error('Product image is required');
      return;
    }
    
    if (!user?._id) {
      toast.error('User not authenticated');
      return;
    }

    setLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all product data
      formData.append('prodName', newProduct.title.trim());
      formData.append('ProdDiscription', newProduct.description.trim());
      formData.append('ProdQuantity', parseInt(newProduct.quantity) || 1);
      formData.append('price', parseFloat(newProduct.price));
      formData.append('sellerId', user._id);
      formData.append('Prodcategory', newProduct.category);
      
      // Append the file with the correct field name expected by backend
      formData.append('productImage', newProduct.file);

      console.log('Sending product data to backend...');
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const result = await apiService.addProduct(formData);

      if (result.success) {
        toast.success('Product added successfully with image uploaded to Google Drive!');
        console.log('Product created:', result.data);
        
        // Reset form
        setNewProduct({ 
          title: '', 
          category: 'software', 
          price: '', 
          description: '', 
          quantity: 1,
          file: null 
        });
        
        // Clear file input
        const fileInput = document.getElementById('file-upload');
        if (fileInput) {
          fileInput.value = '';
        }
        
        setActiveTab('products');
        // Reload products list
        loadProducts();
      } else {
        console.error('Product creation failed:', result.error);
        toast.error(result.error || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('An error occurred while adding the product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const result = await apiService.deleteProduct(productId);
      
      if (result.success) {
        toast.success('Product deleted successfully!');
        // Remove product from local state
        setProducts(products.filter(p => p._id !== productId));
      } else {
        toast.error(result.error || 'Failed to delete product');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the product');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-cyan-700 mb-3 sm:mb-4">Seller Dashboard</h1>
              <p className="text-gray-600 text-sm sm:text-base">Control your digital marketplace and monitor your earnings</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 sm:mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">📦</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
                    <p className="text-2xl font-bold text-cyan-700">{Array.isArray(products) ? products.length : 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">💰</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
                    <p className="text-2xl font-bold text-green-600">₹{(buyers.length * 1250).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="text-3xl mr-4">👥</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Total Customers</h3>
                    <p className="text-2xl font-bold text-blue-600">{buyers.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6 sm:mb-8">
              <div className="border-b overflow-x-auto">
                <nav className="flex min-w-max sm:min-w-0">
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base whitespace-nowrap ${
                      activeTab === 'products'
                        ? 'text-cyan-700 border-b-2 border-cyan-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    My Products
                  </button>
                  <button
                    onClick={() => setActiveTab('buyers')}
                    className={`px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base whitespace-nowrap ${
                      activeTab === 'buyers'
                        ? 'text-cyan-700 border-b-2 border-cyan-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Buyer Details
                  </button>
                  <button
                    onClick={() => setActiveTab('add')}
                    className={`px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base whitespace-nowrap ${
                      activeTab === 'add'
                        ? 'text-cyan-700 border-b-2 border-cyan-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Add New Product
                  </button>
                </nav>
              </div>

              <div className="p-4 sm:p-6">
                {activeTab === 'products' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Your Products</h2>
                      <button
                        onClick={() => setActiveTab('add')}
                        className="bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 transition"
                      >
                        Add New Product
                      </button>
                    </div>

                    <ErrorBoundary>
                      <div className="space-y-4">
                        {loading ? (
                          <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-700 mx-auto"></div>
                            <p className="text-gray-600 mt-4">Loading products...</p>
                          </div>
                        ) : products.length === 0 ? (
                          <div className="text-center py-12">
                            <div className="text-4xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products yet</h3>
                            <p className="text-gray-600 mb-4">Start by adding your first product to the marketplace</p>
                            <button
                              onClick={() => setActiveTab('add')}
                              className="bg-cyan-700 text-white px-6 py-2 rounded-lg hover:bg-cyan-800 transition"
                            >
                              Add Your First Product
                            </button>
                          </div>
                        ) : (
                          products.map(product => {
                            // Add safety checks to ensure all values are properly formatted
                            const productName = product.prodName || 'Untitled Product';
                            const categoryLabel = categories.find(c => c.value === product.Prodcategory)?.label || product.Prodcategory || 'Uncategorized';
                            const price = typeof product.price === 'number' ? product.price.toFixed(2) : '0.00';
                            const quantity = product.ProdQuantity || 0;
                            const description = product.ProdDiscription || 'No description available';
                            const createdDate = product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Unknown';
                            
                            return (
                              <div key={product._id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex gap-4">
                                  {/* Product Image */}
                                  <div className="flex-shrink-0">
                                    {product.ProdImage && product.ProdImage.length > 0 ? (
                                      <img 
                                        src={product.ProdImage[0]} 
                                        alt={productName}
                                        className="w-20 h-20 object-cover rounded-lg border"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                          e.target.nextSibling.style.display = 'flex';
                                        }}
                                      />
                                    ) : null}
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg border flex items-center justify-center text-2xl" style={{display: product.ProdImage && product.ProdImage.length > 0 ? 'none' : 'flex'}}>
                                      📦
                                    </div>
                                  </div>
                                  
                                  {/* Product Details */}
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                          <span>Category: {categoryLabel}</span>
                                          <span>Price: ₹{price}</span>
                                          <span>Quantity: {quantity}</span>
                                          <span>Added: {createdDate}</span>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-700">
                                          <span>{description}</span>
                                        </div>
                                        {product.ProdImage && product.ProdImage.length > 0 && (
                                          <div className="mt-2">
                                            <a 
                                              href={product.ProdImage[0]} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="text-xs text-cyan-600 hover:text-cyan-800"
                                            >
                                              View Full Image
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-2 ml-4">
                                        <button className="text-cyan-600 hover:text-cyan-800 text-sm">Edit</button>
                                        <button 
                                          onClick={() => handleDeleteProduct(product._id)}
                                          className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </ErrorBoundary>
                  </div>
                )}

                {activeTab === 'buyers' && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Customer Purchase History</h2>
                      <p className="text-gray-600">View details of customers who purchased your products</p>
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Customer
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Purchase Date
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {buyers.map((buyer) => (
                              <tr key={buyer.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{buyer.name}</div>
                                    <div className="text-sm text-gray-500">{buyer.email}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{buyer.product}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-green-600">₹{buyer.amount}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{buyer.purchaseDate}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{buyer.location}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {buyers.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No customers yet</h3>
                        <p className="text-gray-600">Customer details will appear here once you make your first sale</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'add' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Add New Product</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                        <input
                          type="text"
                          name="title"
                          value={newProduct.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          placeholder="Enter product title"
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                          <select
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          >
                            {categories.map(category => (
                              <option key={category.value} value={category.value}>
                                {category.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                          <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="0.00"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                          <input
                            type="number"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                            required
                            min="1"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          name="description"
                          value={newProduct.description}
                          onChange={handleInputChange}
                          required
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          placeholder="Describe your product..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product File</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
                          <div className="space-y-2">
                            <div className="text-gray-400">
                              <span className="text-3xl">📁</span>
                            </div>
                            <div>
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer bg-cyan-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 transition inline-block"
                              >
                                Choose File
                              </label>
                              <input
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                                required
                                accept=".jpg,.jpeg,.png,.gif,.webp,image/*"
                                className="hidden"
                              />
                            </div>
                            <p className="text-sm text-gray-500">
                              Upload your product image (JPG, JPEG, PNG, GIF, WebP)
                            </p>
                            {newProduct.file && (
                              <p className="text-sm text-green-600 mt-2">
                                Selected: {newProduct.file.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-cyan-700 text-white px-6 py-2 rounded-lg hover:bg-cyan-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Adding Product...' : 'Add Product'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('products')}
                          disabled={loading}
                          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard; 