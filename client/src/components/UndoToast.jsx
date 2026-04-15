
import React, { useEffect, useState } from 'react';
import './UndoToast.css';

/**
 * UndoToast component with countdown timer
 * @param {string} message - Message to display
 * @param {function} onUndo - Handler for undo action
 * @param {function} onClose - Handler when toast closes
 */
const UndoToast = ({ message, onUndo, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds to undo

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  const handleUndo = () => {
    onUndo();
    onClose();
  };

  return (
    <div className="undo-toast">
      <div className="undo-toast-content">
        <span className="undo-toast-icon">🗑️</span>
        <div className="undo-toast-text">
          <span className="undo-toast-message">{message}</span>
          <span className="undo-toast-timer">({timeLeft}s)</span>
        </div>
      </div>
      <button className="undo-button" onClick={handleUndo}>
        Undo
      </button>
    </div>
  );
};

export default UndoToast;