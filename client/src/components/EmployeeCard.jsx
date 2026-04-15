import React from 'react';
import './EmployeeCard.css';

/**
 * EmployeeCard component to display individual employee details
 * @param {object} employee - Employee data object
 * @param {function} onEdit - Handler for edit action
 * @param {function} onDelete - Handler for delete action
 */
const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="employee-card">
      <div className="employee-card-header">
        <div className="employee-avatar">
          {employee.name.charAt(0).toUpperCase()}
        </div>
        <div className="employee-basic-info">
          <h3 className="employee-name">{employee.name}</h3>
          <p className="employee-position">{employee.position}</p>
        </div>
      </div>

      <div className="employee-card-body">
        <div className="employee-info-row">
          <span className="info-label">Email:</span>
          <span className="info-value">{employee.email}</span>
        </div>
        
        <div className="employee-info-row">
          <span className="info-label">Phone:</span>
          <span className="info-value">{employee.phone}</span>
        </div>
        
        <div className="employee-info-row">
          <span className="info-label">Department:</span>
          <span className="info-value department-badge">{employee.department}</span>
        </div>
        
        <div className="employee-info-row">
          <span className="info-label">Joined:</span>
          <span className="info-value">{new Date(employee.joiningDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="employee-card-footer">
        <button 
          className="edit-button"
          onClick={() => onEdit(employee)}
        >
          Edit
        </button>
        <button 
          className="delete-button"
          onClick={() => onDelete(employee)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;