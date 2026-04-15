import React from 'react';
import './SearchBar.css';

/**
 * SearchBar component for filtering employees
 * @param {string} searchTerm - Current search input value
 * @param {function} onSearchChange - Handler for search input changes
 * @param {string} departmentFilter - Selected department filter
 * @param {function} onDepartmentChange - Handler for department filter changes
 */
const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  departmentFilter, 
  onDepartmentChange 
}) => {
  // List of departments for filter dropdown
  const departments = [
    "All Departments",
    "Engineering",
    "Marketing",
    "Human Resources",
    "Sales",
    "Finance"
  ];

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="filter-wrapper">
        <select
          className="department-filter"
          value={departmentFilter}
          onChange={(e) => onDepartmentChange(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;