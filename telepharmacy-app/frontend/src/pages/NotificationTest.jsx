import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const NotificationTest = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [testMessage, setTestMessage] = useState('');

  const handleShowNotification = (type) => {
    const message = `Test ${type} notification`;
    setTestMessage(message);
    
    switch(type) {
      case 'success':
        showSuccess(message);
        break;
      case 'error':
        showError(message);
        break;
      case 'warning':
        showWarning(message);
        break;
      case 'info':
        showInfo(message);
        break;
      default:
        showInfo(message);
    }
  };

  // Show an info notification when the component mounts
  useEffect(() => {
    showInfo('Notification system is working!');
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Notification System Test</h1>
      <p>Current test message: {testMessage}</p>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
        <button 
          onClick={() => handleShowNotification('success')}
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Show Success
        </button>
        <button 
          onClick={() => handleShowNotification('error')}
          style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Show Error
        </button>
        <button 
          onClick={() => handleShowNotification('warning')}
          style={{ padding: '10px 20px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Show Warning
        </button>
        <button 
          onClick={() => handleShowNotification('info')}
          style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Show Info
        </button>
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h2>Debug Information</h2>
        <p><strong>Context functions:</strong></p>
        <ul>
          <li>showSuccess: {typeof showSuccess}</li>
          <li>showError: {typeof showError}</li>
          <li>showWarning: {typeof showWarning}</li>
          <li>showInfo: {typeof showInfo}</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationTest;