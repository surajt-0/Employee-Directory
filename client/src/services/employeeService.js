import axios from 'axios';

// Base URL for API - change this if your backend runs on different port
const API_BASE_URL = 'http://localhost:5000/api/employees';

/**
 * Employee Service - Handles all API calls to backend
 */
const employeeService = {
  
  /**
   * Get all employees from backend
   * @returns {Promise} Array of employee objects
   */
  getAllEmployees: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employees' };
    }
  },

  /**
   * Get single employee by ID
   * @param {string} id - Employee ID
   * @returns {Promise} Employee object
   */
  getEmployeeById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee' };
    }
  },

  /**
   * Create new employee
   * @param {object} employeeData - Employee data to create
   * @returns {Promise} Created employee object
   */
  createEmployee: async (employeeData) => {
    try {
      const response = await axios.post(API_BASE_URL, employeeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create employee' };
    }
  },

  /**
   * Update existing employee
   * @param {string} id - Employee ID
   * @param {object} employeeData - Updated employee data
   * @returns {Promise} Updated employee object
   */
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update employee' };
    }
  },

  /**
   * Delete employee
   * @param {string} id - Employee ID
   * @returns {Promise} Success message
   */
deleteEmployee: async (id) => {
  try {
    // LOG THE EXACT ID RECEIVED
    console.log('🔍 Raw ID received:', id);
    console.log('🔍 ID type:', typeof id);
    
    const cleanId = String(id).trim();
    console.log('🔍 Clean ID:', cleanId);
    
    const response = await axios.delete(`${API_BASE_URL}/${cleanId}`);
    
    return response.data;
  } catch (error) {
    console.error('❌ Delete error:', error);
    throw error.response?.data || { message: 'Failed to delete employee' };
  }
}
};

export default employeeService;