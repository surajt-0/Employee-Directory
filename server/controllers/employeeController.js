
const Employee = require('../models/Employee');

/**
 * @desc    Get all employees
 * @route   GET /api/employees
 * @access  Public
 */
const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees, sorted by creation date (newest first)
    const employees = await Employee.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * @desc    Get single employee by ID
 * @route   GET /api/employees/:id
 * @access  Public
 */
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    // Check if employee exists
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * @desc    Create new employee
 * @route   POST /api/employees
 * @access  Public
 */
const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, position, joiningDate } = req.body;

    // Check if employee with email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee with this email already exists'
      });
    }

    // Create new employee
    const employee = await Employee.create({
      name,
      email,
      phone,
      department,
      position,
      joiningDate
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * @desc    Update employee
 * @route   PUT /api/employees/:id
 * @access  Public
 */
const updateEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, position, joiningDate } = req.body;

    // Check if employee exists
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check if email is being changed and if new email already exists
    if (email && email !== employee.email) {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({
          success: false,
          message: 'Another employee with this email already exists'
        });
      }
    }

    // Update employee
    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, department, position, joiningDate },
      {
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

/**
 * @desc    Delete employee
 * @route   DELETE /api/employees/:id
 * @access  Public
 */
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    // Check if employee exists
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Delete employee
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data: {}
    });
  } catch (error) {
    // Handle invalid MongoDB ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Export all controller functions
module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};