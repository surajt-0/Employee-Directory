// routes/employeeRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

/**
 * Employee Routes
 * Base URL: /api/employees
 */

// GET all employees & POST new employee
router.route('/')
  .get(getAllEmployees)      // GET /api/employees
  .post(createEmployee);     // POST /api/employees

// GET, PUT, DELETE specific employee by ID
router.route('/:id')
  .get(getEmployeeById)      // GET /api/employees/:id
  .put(updateEmployee)       // PUT /api/employees/:id
  .delete(deleteEmployee);   // DELETE /api/employees/:id

module.exports = router;