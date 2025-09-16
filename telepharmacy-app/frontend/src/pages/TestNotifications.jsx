import React, { useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const TestNotifications = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  useEffect(() => {
    // Show a test notification when the component mounts
    showInfo('Test notification system is working!');
  }, []);

  const handleTestNotifications = () => {
    showSuccess('Success notification test');
    setTimeout(() => showError('Error notification test'), 1000);
    setTimeout(() => showWarning('Warning notification test'), 2000);
    setTimeout(() => showInfo('Info notification test'), 3000);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Notification System Test</h2>
      <p>Click the button below to test all notification types:</p>
      <button 
        onClick={handleTestNotifications}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4a6fc5',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Test Notifications
      </button>
      <p style={{ marginTop: '20px' }}>
        If you don't see notifications, please check the browser console for errors.
      </p>
    </div>
  );
};

export default TestNotifications;