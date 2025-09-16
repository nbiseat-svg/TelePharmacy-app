import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import './NotificationDemo.css';

const NotificationDemo = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  const handleShowSuccess = () => {
    console.log('Showing success notification');
    showSuccess('This is a success message! Operation completed successfully.');
  };

  const handleShowError = () => {
    console.log('Showing error notification');
    showError('This is an error message! Something went wrong.');
  };

  const handleShowWarning = () => {
    console.log('Showing warning notification');
    showWarning('This is a warning message! Please check your input.');
  };

  const handleShowInfo = () => {
    console.log('Showing info notification');
    showInfo('This is an info message! Here is some useful information.');
  };

  return (
    <div className="notification-demo">
      <h3>Notification System Demo</h3>
      <p>Click the buttons below to see different types of notifications:</p>
      <div className="notification-buttons">
        <button className="btn-success" onClick={handleShowSuccess}>
          Show Success
        </button>
        <button className="btn-error" onClick={handleShowError}>
          Show Error
        </button>
        <button className="btn-warning" onClick={handleShowWarning}>
          Show Warning
        </button>
        <button className="btn-info" onClick={handleShowInfo}>
          Show Info
        </button>
      </div>
      <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
        If notifications don't appear, check the browser console for errors.
      </p>
    </div>
  );
};

export default NotificationDemo;