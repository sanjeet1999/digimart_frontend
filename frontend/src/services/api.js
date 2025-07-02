// API Service for DigiMart
import config from '../config/config.js';
const API_BASE_URL = config.API_BASE_URL;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method for making API calls
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      credentials: 'include', // Include cookies for authentication
      ...options,
    };

    // Only set Content-Type for non-FormData requests
    if (!config.headers && !(config.body instanceof FormData)) {
      config.headers = {
        'Content-Type': 'application/json',
      };
    } else if (config.headers && !(config.body instanceof FormData)) {
      config.headers = {
        'Content-Type': 'application/json',
        ...config.headers,
      };
    } else if (config.headers) {
      // Preserve existing headers but don't add Content-Type for FormData
      config.headers = { ...config.headers };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return { 
        success: false, 
        error: error.message || 'An unexpected error occurred' 
      };
    }
  }

  // Authentication APIs
  async signup(userData) {
    return this.makeRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.makeRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.makeRequest('/api/auth/logout', {
      method: 'GET',
    });
  }

  async updateUser(userData) {
    return this.makeRequest('/api/auth/user/update', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Product APIs
  async getAllProducts() {
    return this.makeRequest('/api/product/getAllProducts', {
      method: 'GET',
    });
  }

  async getProductsBySeller(sellerId) {
    return this.makeRequest(`/api/product/seller/${sellerId}`, {
      method: 'GET',
    });
  }

  async addProduct(productData) {
    // Check if productData contains a file (FormData) or regular data
    const isFormData = productData instanceof FormData;
    
    const config = {
      method: 'POST',
      credentials: 'include', // Include cookies for authentication
    };

    // If it's FormData (file upload), don't set Content-Type header
    // Let the browser set it automatically with boundary for multipart/form-data
    if (!isFormData) {
      config.headers = {
        'Content-Type': 'application/json',
      };
      config.body = JSON.stringify(productData);
    } else {
      // For FormData, don't set Content-Type, let browser handle it
      config.body = productData;
    }

    return this.makeRequest('/api/product/addProduct', config);
  }

  async updateProduct(productId, productData) {
    return this.makeRequest(`/api/product/updateProduct/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(productId) {
    return this.makeRequest(`/api/product/deleteProduct/${productId}`, {
      method: 'DELETE',
    });
  }

  // Order APIs
  async createOrder(orderData) {
    return this.makeRequest('/api/order/create', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(orderId) {
    return this.makeRequest(`/api/order/get/${orderId}`, {
      method: 'GET',
    });
  }

  async updateOrder(orderId, orderData) {
    return this.makeRequest(`/api/order/update/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(orderData),
    });
  }

  async deleteOrder(orderId) {
    return this.makeRequest(`/api/order/delete/${orderId}`, {
      method: 'DELETE',
    });
  }

  // Review APIs
  async addReview(reviewData) {
    return this.makeRequest('/api/review/reviewAdd', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // Transaction APIs
  async processPayment(paymentData) {
    return this.makeRequest('/api/transections/payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  signup,
  login,
  logout,
  updateUser,
  getAllProducts,
  getProductsBySeller,
  addProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  addReview,
  processPayment,
} = apiService; 