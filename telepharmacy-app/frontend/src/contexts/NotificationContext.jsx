import React, { createContext, useContext, useState } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      ...notification,
      show: true
    };
    
    console.log('Adding notification:', newNotification);
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    console.log('Removing notification with id:', id);
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, show: false } 
          : notification
      )
    );
    
    // Remove from DOM after animation
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 300);
  };

  const showError = (message, duration = 5000) => {
    showNotification({
      message,
      type: 'error',
      duration
    });
  };

  const showSuccess = (message, duration = 5000) => {
    showNotification({
      message,
      type: 'success',
      duration
    });
  };

  const showWarning = (message, duration = 5000) => {
    showNotification({
      message,
      type: 'warning',
      duration
    });
  };

  const showInfo = (message, duration = 5000) => {
    showNotification({
      message,
      type: 'info',
      duration
    });
  };

  console.log('Rendering notifications:', notifications);

  return (
    <NotificationContext.Provider value={{
      showNotification,
      removeNotification,
      showError,
      showSuccess,
      showWarning,
      showInfo
    }}>
      {children}
      <div className="notifications-container">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              duration={notification.duration}
              show={notification.show}
              onClose={() => removeNotification(notification.id)}
            />
          ))
        ) : null}
      </div>
    </NotificationContext.Provider>
  );
};