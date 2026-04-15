import React, { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeForm from '../components/EmployeeForm';
import Toast from '../components/Toast';
import UndoToast from '../components/UndoToast';
import employeeService from '../services/employeeService';
import './EmployeeList.css';

/**
 * EmployeeList page component - Main container for employee directory
 */
const EmployeeList = () => {
  // State management
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Toast notification state
  const [toast, setToast] = useState(null);
  
  // Undo delete state
  const [undoToast, setUndoToast] = useState(null);
  const [deletedEmployee, setDeletedEmployee] = useState(null);
  
  // Use ref to track if undo was clicked
  const undoClicked = useRef(false);

  /**
   * Fetch all employees on component mount
   */
  useEffect(() => {
    fetchEmployees();
  }, []);

  /**
   * Fetch employees from backend
   */
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await employeeService.getAllEmployees();
      
      // Extract employee data from response
      setEmployees(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load employees');
      showToast('Failed to load employees', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Show toast notification
   */
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  /**
   * Close toast notification
   */
  const closeToast = () => {
    setToast(null);
  };

  /**
   * Filter employees based on search term and department
   */
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = 
      departmentFilter === 'All Departments' || 
      employee.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  /**
   * Handle opening form for new employee
   */
  const handleAddNew = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  /**
   * Handle opening form for editing employee
   */
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  /**
   * Handle deleting employee with undo option
   */
const handleDelete = async (employee) => {
  console.log('🗑️ Delete clicked for:', employee);
  
  // Reset undo clicked flag
  undoClicked.current = false;
  
  // Store deleted employee for undo
  setDeletedEmployee(employee);
  
  // Optimistically remove from UI
  setEmployees(prevEmployees => prevEmployees.filter(emp => emp._id !== employee._id));
  
  // Show undo toast
  setUndoToast({
    message: `${employee.name} deleted`
  });
};

  /**
   * Handle undo delete
   */
 const handleUndoDelete = () => {
  if (deletedEmployee) {
    console.log('↩️ Undoing delete for:', deletedEmployee.name);
    
    // Mark that undo was clicked
    undoClicked.current = true;
    
    // Restore employee in UI
    setEmployees(prevEmployees => [...prevEmployees, deletedEmployee]);
    
    // Show success toast
    showToast('Delete undone successfully', 'info');
    
    // Clear deleted employee
    setDeletedEmployee(null);
  }
};

  /**
   * Handle closing undo toast (delete is permanent after this)
   */
const handleUndoToastClose = async () => {
  setUndoToast(null);
  
  if (deletedEmployee && !undoClicked.current) {
    try {
      console.log('🔥 Deleting employee ID:', deletedEmployee._id);
      
      await employeeService.deleteEmployee(deletedEmployee._id);
      
      console.log('✅ Successfully deleted from backend');
      showToast(`${deletedEmployee.name} permanently deleted`, 'success');
      
    } catch (err) {
      console.error('❌ Delete error:', err);
      
      // Check if employee simply wasn't in database
      if (err.message === 'Employee not found' || 
          err.message?.includes('not found')) {
        
        // Employee wasn't in DB - that's okay, it's gone from UI anyway
        console.log('ℹ️ Employee was not in database');
        showToast(`${deletedEmployee.name} removed`, 'success');
        
      } else {
        // Real error - restore the employee
        setEmployees(prevEmployees => {
          const exists = prevEmployees.some(emp => emp._id === deletedEmployee._id);
          if (!exists) {
            return [...prevEmployees, deletedEmployee];
          }
          return prevEmployees;
        });
        
        showToast('Failed to delete: ' + (err.message || 'Unknown error'), 'error');
      }
    } finally {
      setDeletedEmployee(null);
    }
  }
  
  undoClicked.current = false;
};

  /**
   * Handle saving employee (add or update)
   */
  const handleSave = async (employeeData) => {
    try {
      if (editingEmployee) {
        // Update existing employee
        const response = await employeeService.updateEmployee(
          editingEmployee._id,
          employeeData
        );
        
        // Update in local state
        setEmployees(employees.map(emp => 
          emp._id === editingEmployee._id ? response.data : emp
        ));
        
        showToast('Employee updated successfully!', 'success');
      } else {
        // Create new employee
        const response = await employeeService.createEmployee(employeeData);
        
        // Add to local state
        setEmployees([response.data, ...employees]);
        
        showToast('Employee added successfully!', 'success');
      }
      
      // Close form
      setShowForm(false);
      setEditingEmployee(null);
    } catch (err) {
      // Show error message
      const errorMsg = err.errors 
        ? err.errors.join(', ') 
        : err.message || 'Failed to save employee';
      
      showToast(errorMsg, 'error');
    }
  };

  /**
   * Handle canceling form
   */
  const handleCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="employee-list-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading employees...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && employees.length === 0) {
    return (
      <div className="employee-list-page">
        <div className="error-container">
          <p className="error-text">❌ {error}</p>
          <button className="retry-button" onClick={fetchEmployees}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-list-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Employee Directory</h1>
          <p className="page-subtitle">
            Manage and view all employees • Total: {employees.length}
          </p>
        </div>
        <button className="add-employee-button" onClick={handleAddNew}>
          + Add Employee
        </button>
      </div>

      <div className="page-content">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          departmentFilter={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
        />

        {filteredEmployees.length === 0 ? (
          <div className="no-results">
            <p className="no-results-text">No employees found</p>
            <p className="no-results-subtext">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="employee-grid">
            {filteredEmployees.map(employee => (
              <EmployeeCard
                key={employee._id}
                employee={employee}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}

      {/* Undo Toast */}
      {undoToast && (
        <UndoToast
          message={undoToast.message}
          onUndo={handleUndoDelete}
          onClose={handleUndoToastClose}
        />
      )}
    </div>
  );
};

export default EmployeeList;