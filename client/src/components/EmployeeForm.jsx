
import React, { useState, useEffect } from 'react';
import './EmployeeForm.css';

/**
 * EmployeeForm component for adding/editing employee
 * @param {object} employee - Employee to edit (null for new employee)
 * @param {function} onSave - Handler for saving employee
 * @param {function} onCancel - Handler for canceling form
 */
const EmployeeForm = ({ employee, onSave, onCancel }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Engineering',
    position: '',
    joiningDate: ''
  });

  // Populate form if editing existing employee
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        position: employee.position,
        joiningDate: employee.joiningDate
      });
    }
  }, [employee]);

  /**
   * Handle input field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   */
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Basic validation
  if (!formData.name || !formData.email || !formData.position) {
    alert('Please fill in all required fields');
    return;
  }

  // Call parent save handler
  // Remove the ID generation - backend will handle it
  onSave(formData);
};

  const departments = [
    "Engineering",
    "Marketing",
    "Human Resources",
    "Sales",
    "Finance"
  ];

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="form-header">
          <h2 className="form-title">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select
                name="department"
                className="form-select"
                value={formData.department}
                onChange={handleChange}
                required
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Position *</label>
              <input
                type="text"
                name="position"
                className="form-input"
                value={formData.position}
                onChange={handleChange}
                placeholder="Job title"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              className="form-input"
              value={formData.joiningDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {employee ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;