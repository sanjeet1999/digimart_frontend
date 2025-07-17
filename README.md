# 🛒 DigiMart - Digital Marketplace Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)
[![AWS S3](https://img.shields.io/badge/AWS%20S3-Enabled-orange.svg)](https://aws.amazon.com/s3/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A comprehensive digital marketplace platform for buying and selling digital products with advanced cart management, address book functionality, and secure payment processing.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [User Stories](#user-stories)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

DigiMart is a full-stack digital marketplace platform that enables users to buy and sell digital products such as e-books, music, online courses, and digital art. The platform features a robust cart management system, comprehensive address book functionality, secure OTP verification, and seamless S3 integration for file storage.

### Key Highlights

- **🛒 Advanced Cart Management**: Add, remove, and manage products with real-time updates
- **📧 Address Book System**: Manage multiple recipient emails with verification
- **🔐 Secure Authentication**: JWT-based authentication with OTP verification
- **☁️ Cloud Storage**: AWS S3 integration for reliable file storage
- **📱 Responsive Design**: Modern UI/UX for all devices
- **⚡ Real-time Updates**: Live cart and order status updates

## ✨ Features

### 🛍️ Buyer Features

#### Account & Authentication
- Secure signup and login with email/password
- Profile management and personal information updates
- JWT-based session management

#### Product Discovery
- Browse digital products with advanced search and filtering
- Pagination support with customizable page sizes (10, 20, 50 items)
- Sort products by price, date, rating, or popularity
- Search by product name, description, or category
- Bookmark and wishlist functionality

#### Cart Management
- Add products to shopping cart for later purchase
- Remove individual items or clear entire cart
- Update product quantities for bundled products
- Real-time cart summary with subtotal, taxes, and total
- Save cart for later and continue shopping
- Selective purchase from cart items

#### Address Management
- Manage multiple email addresses for recipients
- Add, edit, and delete email addresses with custom labels
- OTP verification for recipient email addresses
- Set default recipient email
- Purchase for self or others using saved addresses

#### Purchase & Payment
- OTP verification before purchase completion
- Multiple payment methods (PayPal, UPI)
- Instant access to purchased digital products
- Email confirmation and access links
- Order history with download access

#### Reviews & Feedback
- Rate products with star ratings (1-5 scale)
- Upload review images stored in S3
- View and manage review history

### 🏪 Seller Features

#### Product Management
- Upload digital products with S3 integration
- Support for multiple file formats by category
- Set product details: title, description, price, categories
- Edit and delete existing products
- Product dashboard with pagination and sorting

#### Sales Analytics
- View sales history with order details
- Track total earnings and download reports
- Product performance analytics
- Customer feedback management

#### Business Tools
- Respond to buyer reviews and feedback
- Mark products as free, discounted, or promotional
- Sales notifications and email alerts
- Product download tracking

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: AWS S3
- **Email Service**: Nodemailer
- **Logging**: Pino
- **CORS**: Express CORS

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: CSS3 with modern design
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Routing**: React Router

### Infrastructure
- **Cloud Storage**: Amazon S3
- **CDN**: CloudFront (optional)
- **Containerization**: Docker
- **Deployment**: Vercel (Frontend), Railway/Heroku (Backend)

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   External      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   Services      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
│                        │                        │
├─ User Interface        ├─ REST API              ├─ AWS S3
├─ Cart Management       ├─ Authentication        ├─ Email Service
├─ Address Book          ├─ File Upload           ├─ Payment Gateway
├─ Product Browsing      ├─ Order Processing      └─ OTP Service
└─ Payment Interface     └─ Database Operations
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB database
- AWS S3 bucket
- Email service credentials

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/digimart.git
   cd digimart
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   cd backend
   npm install

   # Frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Backend (.env)
   PORT=5000
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:3000
   
   # AWS S3 Configuration
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=us-east-1
   S3_BUCKET_NAME=your-digimart-bucket
   
   # Email Service
   EMAIL_SERVICE=your_email_service_config
   ```

4. **Start the application**
   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend (new terminal)
   cd frontend
   npm run dev
   ```

## 📦 Installation

### Detailed Setup Instructions

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database setup**
   ```bash
   # Ensure MongoDB is running
   # Create database and collections (auto-created by Mongoose)
   ```

4. **S3 Bucket Configuration**
   ```bash
   # Create S3 bucket with proper CORS configuration
   # Set up bucket policies and encryption
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoints**
   ```bash
   # Update src/config/config.js with backend URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

### Environment Variables

#### Backend Configuration
```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/digimart

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3000

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket-name
S3_ENCRYPTION=true
S3_VERSIONING=true

# Email Service
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# File Upload Limits
MAX_FILE_SIZE=104857600  # 100MB
MAX_THUMBNAIL_SIZE=5242880  # 5MB
```

#### Frontend Configuration
```javascript
// src/config/config.js
export const API_BASE_URL = 'http://localhost:5000/api';
export const S3_BASE_URL = 'https://your-bucket.s3.amazonaws.com';
```

### S3 Bucket Setup

1. **Create S3 Bucket**
   ```bash
   # Use AWS Console or CLI
   aws s3 mb s3://your-digimart-bucket
   ```

2. **Configure CORS**
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "POST", "PUT", "DELETE"],
       "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
       "ExposeHeaders": ["ETag"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```

3. **Enable Features**
   - Server-side encryption
   - Versioning
   - Lifecycle rules for cleanup

## 📚 API Documentation

Comprehensive API documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Key Endpoints

- **Authentication**: `/auth/*` - Signup, login, OTP verification
- **Products**: `/product/*` - Product management with S3 upload
- **Cart**: `/cart/*` - Cart management and operations
- **Address**: `/address/*` - Address book management
- **Orders**: `/order/*` - Order creation and management
- **Reviews**: `/review/*` - Product reviews and ratings
- **Transactions**: `/transections/*` - Payment processing

## 👥 User Stories

Detailed user stories for buyers and sellers are available in [user_stories.md](./user_stories.md)

### Buyer User Stories
- Account management and authentication
- Product browsing and search
- Cart management and checkout
- Address book and recipient management
- Purchase history and downloads

### Seller User Stories
- Product upload and management
- Sales analytics and reporting
- Customer feedback management
- Business tools and promotions

## 🚀 Deployment

### Docker Deployment

1. **Build Docker images**
   ```bash
   docker-compose build
   ```

2. **Run containers**
   ```bash
   docker-compose up -d
   ```

### Production Deployment

#### Backend (Railway/Heroku)
```bash
# Set environment variables
# Deploy using Git integration
git push heroku main
```

#### Frontend (Vercel)
```bash
# Connect GitHub repository
# Configure build settings
# Deploy automatically
```

### Environment Variables for Production
```bash
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=https://yourdomain.com
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Development Guidelines

- Follow ESLint configuration
- Write meaningful commit messages
- Add proper documentation
- Test your changes thoroughly
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- 📧 Email: support@digimart.com
- 📖 Documentation: [API Documentation](./API_DOCUMENTATION.md)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/digimart/issues)

## 🙏 Acknowledgments

- React.js community for the amazing framework
- MongoDB for the robust database solution
- AWS for reliable cloud services
- All contributors and supporters

---

**Made with ❤️ by the DigiMart Team**
