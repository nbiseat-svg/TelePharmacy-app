import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const NotificationDebug = () => {
  const notificationContext = useNotification();
  
  console.log('Notification Context:', notificationContext);
  
  return (
    <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', margin: '10px 0' }}>
      <h4>Notification Debug Info</h4>
      <p>Context exists: {notificationContext ? 'Yes' : 'No'}</p>
      {notificationContext && (
        <div>
          <p>Functions available:</p>
          <ul>
            <li>showSuccess: {typeof notificationContext.showSuccess}</li>
            <li>showError: {typeof notificationContext.showError}</li>
            <li>showWarning: {typeof notificationContext.showWarning}</li>
            <li>showInfo: {typeof notificationContext.showInfo}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDebug;