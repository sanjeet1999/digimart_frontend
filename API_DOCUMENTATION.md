# DigiMart API Documentation

This document provides comprehensive documentation for the DigiMart platform API, a digital marketplace for buying and selling digital products.

## Base Configuration

- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT Bearer Token
- **Content-Type**: `application/json` (except for file uploads)
- **CORS**: Enabled for multiple origins

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

## API Endpoints

### 🔐 Authentication Endpoints

#### 1. User Signup
**POST** `/auth/signup`

Register a new user (buyer or seller) on the platform using email and password.

**Request Body:**
```json
{
  "UserName": "John Doe",
  "UserEmail": "john@example.com",
  "UserPassword": "password123",
  "UserRole": "Buyer" // or "Seller"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created successfully"
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

#### 2. User Login
**POST** `/auth/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "loginEMail": "john@example.com",
  "Password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "UserName": "John Doe",
      "UserEmail": "john@example.com",
      "UserRole": "Buyer",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### 3. User Logout
**GET** `/auth/logout`

Log out the current user (token invalidation handled client-side).

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

#### 4. Update User Profile
**PUT** `/auth/user/update`

Update user profile information.

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**Request Body:**
```json
{
  "UserName": "Updated Name",
  "UserEmail": "updated@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "UserName": "Updated Name",
      "UserEmail": "updated@example.com",
      "UserRole": "Buyer",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

### 📧 OTP Verification Endpoints (Purchase Process)

#### 1. Send OTP for Purchase
**POST** `/auth/send-purchase-otp`

Send OTP to user's email before allowing purchase.

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**Request Body:**
```json
{
  "userEmail": "john@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP sent successfully to your email"
}
```

#### 2. Verify OTP for Purchase
**POST** `/auth/verify-purchase-otp`

Verify OTP before allowing purchase process.

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**Request Body:**
```json
{
  "userEmail": "john@example.com",
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "purchaseToken": "purchase_verification_token"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

### 📦 Product Management Endpoints

#### 1. Get All Products
**GET** `/product/getAllProducts`

Retrieve all products from the platform with pagination support.

**Query Parameters:**
- `page`: Page number (default: 1, min: 1)
- `limit`: Number of items per page (default: 10, min: 1, max: 50)
- `sort`: Sort field (default: 'createdAt')
  - Available fields: 'createdAt', 'updatedAt', 'price', 'prodName'
- `order`: Sort order ('asc' or 'desc', default: 'desc')
- `category`: Filter by product category (optional)
  - Available categories: 'software', 'ebook', 'music', 'online courses', 'digital art'
- `search`: Search in product name and description (optional, case-insensitive)

**Example Requests:**
```
GET /product/getAllProducts
GET /product/getAllProducts?page=2&limit=20
GET /product/getAllProducts?page=1&limit=10&sort=price&order=asc
GET /product/getAllProducts?category=ebook&search=programming
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": {
    "products": [
      {
        "_id": "product_id",
        "prodName": "Digital Art Pack",
        "ProdDiscription": "High-quality digital art collection",
        "ProdImage": ["image_url"],
        "price": 29.99,
        "sellerId": {
          "_id": "seller_id",
          "UserName": "Art Seller",
          "UserEmail": "seller@example.com"
        },
        "Prodcategory": "digital art",
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-15T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false,
      "nextPage": 2,
      "prevPage": null
    }
  }
}
```

#### 2. Get Products by Seller
**GET** `/product/seller/:sellerId`

Retrieve all products from a specific seller with pagination support.

**Parameters:**
- `sellerId`: MongoDB ObjectId of the seller

**Query Parameters:**
- `page`: Page number (default: 1, min: 1)
- `limit`: Number of items per page (default: 10, min: 1, max: 50)
- `sort`: Sort field (default: 'createdAt')
  - Available fields: 'createdAt', 'updatedAt', 'price', 'prodName'
- `order`: Sort order ('asc' or 'desc', default: 'desc')
- `search`: Search in product name and description (optional, case-insensitive)

**Example Requests:**
```
GET /product/seller/507f1f77bcf86cd799439011
GET /product/seller/507f1f77bcf86cd799439011?page=2&limit=20
GET /product/seller/507f1f77bcf86cd799439011?sort=price&order=asc
GET /product/seller/507f1f77bcf86cd799439011?search=digital&page=1&limit=10
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Seller products fetched successfully",
  "data": {
    "products": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false,
      "nextPage": 2,
      "prevPage": null
    }
  }
}
```

#### 3. Add Product (Sellers Only)
**POST** `/product/addProduct`

Add a new product to the platform.

**Headers:** 
- `Content-Type: multipart/form-data`
- File upload required

**Request Body (form-data):**
```
prodName: "My Digital Product"
ProdDiscription: "Detailed product description"
price: 29.99
sellerId: "seller_mongodb_id"
Prodcategory: "software" // Options: "software", "ebook", "music", "online courses", "digital art"
file: [uploaded image file]
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "product": {
      "_id": "product_id",
      "prodName": "My Digital Product",
      "ProdDiscription": "Detailed product description",
      "ProdImage": ["image_url"],
      "price": 29.99,
      "sellerId": "seller_id",
      "Prodcategory": "software",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    },
    "imageInfo": {
      "fileName": "uploaded_file_name",
      "directLink": "s3_url",
      "storage": "s3_bucket"
    }
  }
}
```

#### 4. Update Product
**PUT** `/product/updateProduct/:id`

Update an existing product.

**Parameters:**
- `id`: MongoDB ObjectId of the product

**Request Body:**
```json
{
  "prodName": "Updated Product Name",
  "ProdDiscription": "Updated description",
  "price": 39.99,
  "Prodcategory": "ebook"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    // Updated product object
  }
}
```

#### 5. Delete Product
**DELETE** `/product/deleteProduct/:id`

Delete a product from the platform.

**Parameters:**
- `id`: MongoDB ObjectId of the product

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### 🛒 Order Management Endpoints

#### 1. Create Order
**POST** `/order/create`

Create a new order for products. Requires OTP verification for buyers.

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**Request Body:**
```json
{
  "buyerId": "buyer_mongodb_id",
  "orderItems": [
    {
      "productId": "product_id",
      "productPrice": 29.99
    }
  ],
  "totalPrice": 29.99,
  "status": "Pending", // Options: "Pending", "Rejected", "Success"
  "purchaseToken": "purchase_verification_token" // Required for buyers
}
```

**Response (200 OK):**
```json
{
  "Status": 200,
  "Resp": "Order Created Successfully"
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Purchase verification required. Please verify OTP first."
}
```

#### 2. Get Order
**GET** `/order/get/:orderId`

Retrieve order details by order ID.

**Parameters:**
- `orderId`: MongoDB ObjectId of the order

**Response (200 OK):**
```json
{
  "success": true,
  "order": {
    "_id": "order_id",
    "buyerId": "buyer_id",
      "orderItems": [
    {
      "productId": "product_id",
      "productPrice": 29.99
    }
  ],
    "totalPrice": 29.99,
    "status": "Pending",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

#### 3. Update Order
**PUT** `/order/update/:orderId`

Update order status or details.

**Parameters:**
- `orderId`: MongoDB ObjectId of the order

**Request Body:**
```json
{
  "status": "Success",
  "totalPrice": 29.99
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "order": {
    // Updated order object
  }
}
```

#### 4. Delete Order
**DELETE** `/order/delete/:orderId`

Delete an order from the system.

**Parameters:**
- `orderId`: MongoDB ObjectId of the order

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

### ⭐ Review Management Endpoints

#### 1. Add Review
**POST** `/review/reviewAdd`

Add a review for a product.

**Request Body:**
```json
{
  "productId": "product_mongodb_id",
  "BuyerId": "buyer_mongodb_id",
  "Rating": 5, // 1-5 scale
  "comments": "Great product! Highly recommended."
}
```

**Response (200 OK):**
```json
{
  "data": "Review is added",
  "resp": {
    "_id": "review_id",
    "productId": "product_id",
    "BuyerId": "buyer_id",
    "Rating": 5,
    "comments": "Great product! Highly recommended.",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### 💳 Transaction Management Endpoints

#### 1. Process Payment
**POST** `/transections/payment`

Process a payment transaction. Requires prior OTP verification for buyers.

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**Request Body:**
```json
{
  "orderId": "order_mongodb_id",
  "payMethod": "Paypal", // Options: "Paypal", "UPI"
  "status": "Success", // Options: "Pending", "Failed", "Success"
  "purchaseToken": "purchase_verification_token" // Required for buyers
}
```

**Response (200 OK):**
```json
{
  "data": "transaction_id"
}
```

## Data Models

### User Model
```javascript
{
  UserName: String (required),
  UserRole: String (enum: ["Buyer", "Seller"], default: "Seller"),
  UserEmail: String (required, unique, lowercase),
  UserPassword: String (required, min: 6 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  prodName: String,
  ProdDiscription: String,
  ProdImage: [String],
  price: Number (required, min: 0),
  sellerId: ObjectId (ref: "User", required),
  Prodcategory: String (enum: ["software", "ebook", "music", "online courses", "digital art"]),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  buyerId: ObjectId (ref: "User", required),
  orderItems: [{
    productId: ObjectId (ref: "Product"),
    productPrice: Number
  }],
  totalPrice: Number,
  status: String (enum: ["Pending", "Rejected", "Success"], default: "Pending"),
  createdAt: Date,
  updatedAt: Date
}
```

### Review Model
```javascript
{
  productId: ObjectId (ref: "Product"),
  BuyerId: ObjectId (ref: "User"),
  Rating: Number (enum: [1, 2, 3, 4, 5], default: 1),
  comments: String (max: 100 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Model
```javascript
{
  orderId: ObjectId (ref: "Order"),
  payMethod: String (enum: ["Paypal", "UPI"], default: "Paypal"),
  status: String (enum: ["Pending", "Failed", "Success"], default: "Pending"),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API uses standard HTTP status codes and returns error responses in the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes:
- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Access denied
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## File Upload

The API supports file uploads for product images through the `/product/addProduct` endpoint. Files are stored in Amazon S3 bucket for reliable and scalable cloud storage.

### Upload Requirements:
- **Content-Type**: `multipart/form-data`
- **File Field**: `file`
- **Supported Formats**: Images (jpg, png, gif, etc.)
- **Storage**: Amazon S3 bucket
- **File Access**: Direct S3 URLs for image access

## Authentication Flow

1. **Register**: Use `/auth/signup` to create a new account with email and password
2. **Login**: Use `/auth/login` to get a JWT token
3. **Browse Products**: Access product endpoints with JWT token
4. **Purchase Process**: 
   - Send OTP using `/auth/send-purchase-otp`
   - Verify OTP using `/auth/verify-purchase-otp` to receive purchase token
   - Create order with purchase token
   - Process payment with purchase token
5. **Logout**: Use `/auth/logout` to end the session

## Role-Based Access

- **Buyers**: Can view products, create orders (with OTP verification), add reviews
- **Sellers**: Can manage products, view orders for their products (no OTP required)
- **Both**: Can update their profile, view their own data

## Purchase Verification Process

For buyers making purchases:
1. User must be logged in with valid JWT token
2. Before creating an order, user must:
   - Request OTP via `/auth/send-purchase-otp`
   - Verify OTP via `/auth/verify-purchase-otp` to receive purchase token
3. Use purchase token in order creation and payment processing
4. Purchase token has limited validity (recommended: 10 minutes)

## Pagination Guidelines

### Best Practices:
- **Default Limits**: Use reasonable defaults (page=1, limit=10)
- **Maximum Limits**: Enforce maximum limit of 50 items per page
- **Performance**: Use indexed fields for sorting ('createdAt', 'price')
- **Consistency**: Always include pagination info in responses
- **URL State**: Include pagination parameters in URLs for bookmarking

### Error Handling:
- **Invalid Page**: If page exceeds totalPages, return empty results
- **Invalid Limit**: If limit exceeds max (50), use maximum allowed
- **Invalid Sort**: If sort field doesn't exist, use default 'createdAt'
- **Negative Values**: Convert negative page/limit values to 1

### Example Error Response:
```json
{
  "success": false,
  "message": "Invalid pagination parameters",
  "errors": {
    "page": "Page number must be greater than 0",
    "limit": "Limit must be between 1 and 50"
  }
}
```

## Rate Limiting & Security

- CORS enabled for specified origins
- JWT tokens for authentication
- Password hashing with bcrypt
- OTP verification for purchase security
- Request logging with Pino
- Static file serving for uploads

## Environment Configuration

Required environment variables:
- `PORT`: Server port (default: 5000)
- `JWT_SECRET`: Secret key for JWT tokens
- `MONGODB_URI`: MongoDB connection string
- `FRONTEND_URL`: Frontend application URL
- `EMAIL_SERVICE`: Email service configuration for OTP
- AWS S3 configuration:
  - `AWS_ACCESS_KEY_ID`: AWS access key
  - `AWS_SECRET_ACCESS_KEY`: AWS secret key
  - `AWS_REGION`: AWS region (e.g., us-east-1)
  - `S3_BUCKET_NAME`: S3 bucket name for file storage 