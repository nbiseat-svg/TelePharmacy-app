import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  show = false
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    console.log('Notification effect, show:', show, 'duration:', duration);
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        console.log('Auto closing notification');
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  const handleClose = () => {
    if (isClosing) return; // Prevent multiple calls
    setIsClosing(true);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  console.log('Rendering Notification, show:', show, 'message:', message);

  if (!show && !isClosing) {
    console.log('Not showing notification (show is false)');
    return null;
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`notification notification-${type} animate-slideInRight ${isClosing ? 'closing' : ''}`}>
      <div className="notification-icon">
        {getIcon()}
      </div>
      <div className="notification-content">
        <p className="notification-message">{message}</p>
      </div>
      <button 
        className="notification-close"
        onClick={handleClose}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;