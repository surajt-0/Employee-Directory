# 🔧 Employee Directory - Backend API

RESTful API for Employee Directory built with Node.js, Express, and MongoDB.

## 📋 API Documentation

### Base URL
```
http://localhost:5000/api/employees
```

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/employee-directory
```

### Run Development Server
```bash
npm run dev
```

### Run Production Server
```bash
npm start
```

## 📡 API Endpoints

### 1. Get All Employees
```http
GET /api/employees
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "65abc123...",
      "name": "John Doe",
      "email": "john@company.com",
      "phone": "+1 (555) 123-4567",
      "department": "Engineering",
      "position": "Software Engineer",
      "joiningDate": "2024-01-15T00:00:00.000Z",
      "createdAt": "2024-01-20T10:30:00.000Z",
      "updatedAt": "2024-01-20T10:30:00.000Z"
    }
  ]
}
```

### 2. Get Single Employee
```http
GET /api/employees/:id
```

**Parameters:**
- `id` (string): MongoDB ObjectId

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "name": "John Doe",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Employee not found"
}
```

### 3. Create Employee
```http
POST /api/employees
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "phone": "+1 (555) 123-4567",
  "department": "Engineering",
  "position": "Software Engineer",
  "joiningDate": "2024-01-15"
}
```

**Required Fields:**
- `name` (min 2 chars, max 100 chars)
- `email` (valid email format, unique)
- `department` (one of: Engineering, Marketing, Human Resources, Sales, Finance)
- `position` (min 2 chars)

**Optional Fields:**
- `phone`
- `joiningDate` (defaults to current date)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "_id": "65abc123...",
    ...
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    "Name is required",
    "Please provide a valid email"
  ]
}
```

### 4. Update Employee
```http
PUT /api/employees/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "position": "Senior Engineer"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "_id": "65abc123...",
    ...
  }
}
```

### 5. Delete Employee
```http
DELETE /api/employees/:id
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Employee deleted successfully",
  "data": {}
}
```

## 🗄️ Database Schema

### Employee Model
```javascript
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    default: ''
  },
  department: {
    type: String,
    required: true,
    enum: ['Engineering', 'Marketing', 'Human Resources', 'Sales', 'Finance']
  },
  position: {
    type: String,
    required: true,
    minlength: 2
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation Error)
- `404` - Not Found
- `500` - Server Error

## 🧪 Testing with Postman/Thunder Client

### Import Collection
Create a new collection with these requests:

1. **Get All** - GET `{{baseUrl}}/api/employees`
2. **Get One** - GET `{{baseUrl}}/api/employees/:id`
3. **Create** - POST `{{baseUrl}}/api/employees`
4. **Update** - PUT `{{baseUrl}}/api/employees/:id`
5. **Delete** - DELETE `{{baseUrl}}/api/employees/:id`

### Environment Variables
```
baseUrl: http://localhost:5000
```

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.3",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5"
}
```

## 🔒 Security Considerations

- Email validation with regex
- Department enum restriction
- MongoDB injection protection via Mongoose
- CORS enabled for frontend integration
- Input sanitization

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000
```

### MongoDB Not Connected
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB service
net start MongoDB  # Windows
brew services start mongodb-community  # Mac
```

### Validation Errors
- Check all required fields are provided
- Verify email format is valid
- Ensure department is one of the allowed values

## 📝 Project Structure

```
employee-directory-backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   └── employeeController.js # Request handlers
├── models/
│   └── Employee.js           # Mongoose schema
├── routes/
│   └── employeeRoutes.js     # API routes
├── middleware/
│   └── errorHandler.js       # Global error handler
├── .env                       # Environment variables
├── .gitignore                 # Git ignore file
├── server.js                  # Entry point
└── package.json
```

## 🚀 Deployment

### Environment Variables for Production
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee-directory
NODE_ENV=production
```

### Build & Deploy
```bash
# Install production dependencies only
npm install --production

# Start server
npm start
```

## 📚 Additional Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Made with ❤️ using Node.js, Express, and MongoDB**
