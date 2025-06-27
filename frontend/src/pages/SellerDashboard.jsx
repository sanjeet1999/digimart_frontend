import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'software',
    price: '',
    description: '',
    file: null
  });

  // Sample seller's products
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "React UI Component Library",
      category: "software",
      price: 49.99,
      status: "active",
      downloads: 1250,
      revenue: 61250,
      dateAdded: "2024-01-15"
    },
    {
      id: 2,
      title: "Photoshop Action Bundle",
      category: "software",
      price: 39.99,
      status: "active",
      downloads: 670,
      revenue: 26793,
      dateAdded: "2024-02-20"
    },
    {
      id: 3,
      title: "Business Plan Template",
      category: "ebooks",
      price: 15.99,
      status: "pending",
      downloads: 0,
      revenue: 0,
      dateAdded: "2024-03-10"
    }
  ]);

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
    { value: 'art', label: 'Digital Art' },
    { value: 'ebooks', label: 'E-Books' },
    { value: 'courses', label: 'Online Courses' }
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = {
      id: products.length + 1,
      title: newProduct.title,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      status: "pending",
      downloads: 0,
      revenue: 0,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setProducts([...products, productToAdd]);
    setNewProduct({ title: '', category: 'software', price: '', description: '', file: null });
    setShowAddForm(false);
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

                    <div className="space-y-4">
                      {products.map(product => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                <span>Category: {categories.find(c => c.value === product.category)?.label}</span>
                                <span>Price: ${product.price}</span>
                                <span>Added: {product.dateAdded}</span>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span className="text-green-600">{product.downloads} downloads</span>
                                <span className="text-green-600">${product.revenue.toLocaleString()} revenue</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-cyan-600 hover:text-cyan-800 text-sm">Edit</button>
                              <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
                                  <div className="text-sm font-medium text-green-600">${buyer.amount}</div>
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

                      <div className="grid md:grid-cols-2 gap-6">
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
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
                                accept=".jpg,.jpeg,.png"
                                className="hidden"
                              />
                            </div>
                            <p className="text-sm text-gray-500">
                              Upload your product image (JPG, JPEG, PNG only)
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
                          className="bg-cyan-700 text-white px-6 py-2 rounded-lg hover:bg-cyan-800 transition"
                        >
                          Add Product
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('products')}
                          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
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