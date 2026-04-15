import React, { useEffect } from 'react';
import './Toast.css';

/**
 * Toast notification component
 * @param {string} message - Toast message to display
 * @param {string} type - Toast type: 'success', 'error', 'info', 'warning'
 * @param {function} onClose - Handler to close toast
 */
const Toast = ({ message, type = 'success', onClose }) => {
  // Auto-close toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'info' && 'ℹ'}
          {type === 'warning' && '⚠'}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Toast;