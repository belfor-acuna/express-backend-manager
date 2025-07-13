# T2R2 Backend - Document Management System

A robust, scalable backend API for document management and template-based content creation, built with modern Node.js technologies and enterprise-grade architecture.

## 🚀 Overview

T2R2 is a comprehensive document management system that enables users to create, manage, and collaborate on structured documents using customizable templates. The system features role-based access control, real-time content editing, cloud storage integration, and automated email notifications.

## ✨ Key Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Role-based access control** (Admin/User roles)
- **Password recovery system** with email verification
- **Secure password hashing** using bcrypt with salt

### 📄 Document Management
- **Template-based document creation** with predefined structures
- **Real-time section editing** with status tracking
- **Document metadata management** for tender/procurement data
- **Document sharing and collaboration** features
- **Color-coded organization** system

### 🎨 Template System
- **Dynamic template creation** and management
- **Section-based content structure** with customizable fields
- **Template versioning** and reusability
- **Admin-controlled template lifecycle**

### 🖼️ Media Management
- **Cloudflare R2 integration** for scalable image storage
- **Secure file upload** with validation and size limits
- **Automatic file organization** by user and timestamp
- **Image deletion and cleanup** capabilities

### 📧 Communication
- **Gmail OAuth2 integration** for secure email delivery
- **HTML email templates** for password recovery
- **Automated notification system**

## 🛠️ Technology Stack

### Backend Framework
- **Node.js** with ES6+ modules
- **Express.js** for RESTful API development
- **CORS** configuration for cross-origin requests

### Database & ODM
- **MongoDB** for document storage
- **Mongoose** for elegant object modeling
- **Schema validation** and relationship management

### Authentication & Security
- **JSON Web Tokens (JWT)** for stateless authentication
- **bcrypt/bcryptjs** for password hashing
- **Role-based middleware** for authorization
- **Input validation** and sanitization

### Cloud Services
- **Cloudflare R2** (S3-compatible) for file storage
- **AWS SDK** for cloud service integration
- **Gmail API** with OAuth2 for email services

### File Processing
- **Multer** for multipart/form-data handling
- **Memory storage** for efficient file processing
- **MIME type validation** for security

### Development & Deployment
- **Nodemon** for development hot-reloading
- **Docker** containerization
- **GitLab CI/CD** pipeline
- **Environment-based configuration**

## 🏗️ Architecture

### Modular Structure
```
src/
├── auth/           # Authentication & authorization
├── config/         # Environment & service configurations
├── doc/            # Document management
├── images/         # File upload & storage
├── mailer/         # Email services
├── section/        # Document section management
├── template/       # Template system
└── user/           # User management
```

### API Design
- **RESTful endpoints** with consistent naming
- **Versioned API** (`/api/v1/`) for future compatibility
- **Middleware-based architecture** for cross-cutting concerns
- **Error handling** with appropriate HTTP status codes

## 📡 API Endpoints

### Authentication
```
POST   /api/v1/auth/register      # User registration
POST   /api/v1/auth/login         # User login
POST   /api/v1/auth/recovery      # Password recovery request
POST   /api/v1/auth/recovery/update # Password reset
GET    /api/v1/auth/me           # Get current user info
```

### Document Management
```
POST   /api/v1/doc/new           # Create new document
GET    /api/v1/doc/all           # Get user's documents
GET    /api/v1/doc/one           # Get specific document
PATCH  /api/v1/doc/color         # Update document color
PATCH  /api/v1/doc/title         # Update document title
DELETE /api/v1/doc/delete        # Delete document
```

### Template System
```
POST   /api/v1/template/new      # Create template (Admin)
GET    /api/v1/template/all      # Get all templates
GET    /api/v1/template/:id      # Get specific template
PUT    /api/v1/template/update/:id # Update template (Admin)
DELETE /api/v1/template/delete/:id # Delete template (Admin)
```

### Section Management
```
PATCH  /api/v1/section/save      # Update section content
PATCH  /api/v1/section/status    # Update section status
```

### Image Management
```
POST   /api/v1/images/upload     # Upload image to R2
DELETE /api/v1/images/delete     # Delete image from R2
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 16+
- MongoDB instance
- Cloudflare R2 bucket
- Gmail account with OAuth2 setup

### Environment Variables
```env
PORT=3555
MONGO_URI=mongodb://localhost:27017/t2r2
JWT_SECRET=your_jwt_secret

# Cloudflare R2
R2_ENDPOINT=https://your-account.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=your_bucket_name

# Gmail OAuth2
CLIENT_ID=your_gmail_client_id
CLIENT_SECRET=your_gmail_client_secret
REDIRECT_URI=your_redirect_uri
REFRESH_TOKEN=your_refresh_token
MY_EMAIL=your_email@gmail.com
```

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Docker Deployment
```bash
# Build Docker image
docker build -t t2r2-backend .

# Run container
docker run -p 3555:3555 --env-file .env t2r2-backend
```

## 🚀 Deployment

### GitLab CI/CD Pipeline
The project includes automated deployment with:
- **Docker image building** and registry push
- **Infrastructure triggering** for seamless deployments
- **Environment-specific configurations**

### Production Considerations
- **Environment variable management**
- **Database connection pooling**
- **Error logging and monitoring**
- **Rate limiting** implementation
- **API documentation** with Swagger/OpenAPI

## 🧪 Testing

### Recommended Testing Strategy
```bash
# Unit tests for services
npm test

# Integration tests for API endpoints
npm run test:integration

# Load testing for performance
npm run test:load
```

## 📊 Performance Features

- **Connection pooling** for database efficiency
- **Memory-based file processing** for speed
- **Optimized MongoDB queries** with proper indexing
- **Stateless JWT authentication** for scalability
- **Cloud storage integration** for media handling

## 🔒 Security Features

- **Password hashing** with bcrypt and salt
- **JWT token expiration** and validation
- **Role-based access control** middleware
- **File type validation** for uploads
- **CORS configuration** for cross-origin security
- **Input sanitization** and validation

## 🤝 Contributing

This project demonstrates enterprise-level backend development practices including:
- Clean architecture with separation of concerns
- Comprehensive error handling
- Security best practices
- Scalable cloud integrations
- Modern JavaScript/Node.js patterns

## 📄 License

This project is part of a portfolio demonstration showcasing full-stack development capabilities.

---

**Built with ❤️ using Node.js, Express, MongoDB, and modern cloud technologies**
