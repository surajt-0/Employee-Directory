const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    department: {
  type: String,
  enum: [
    "Engineering",
    "Human Resources",
    "Finance",
    "Marketing",
    "Operations",
    "Design",
    "Sales",
  ],
  required: true
},
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      minlength: [2, 'Position must be at least 2 characters']
    },
    joiningDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;