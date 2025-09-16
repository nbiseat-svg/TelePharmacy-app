import React, { useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const SimpleNotificationTest = () => {
  const { showInfo, showSuccess, showError, showWarning } = useNotification();

  useEffect(() => {
    // Show a test notification when the component mounts
    showInfo('Simple notification test is working!');
  }, []);

  const handleTest = () => {
    showSuccess('Success notification');
    setTimeout(() => showError('Error notification'), 1000);
    setTimeout(() => showWarning('Warning notification'), 2000);
    setTimeout(() => showInfo('Info notification'), 3000);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', margin: '20px 0' }}>
      <h3>Simple Notification Test</h3>
      <button onClick={handleTest} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Test Notifications
      </button>
      <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
        Click the button to test different notification types. If you don't see notifications, check the browser console.
      </p>
    </div>
  );
};

export default SimpleNotificationTest;