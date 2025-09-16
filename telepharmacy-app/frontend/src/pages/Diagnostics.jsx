import React, { useState, useEffect } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Diagnostics = () => {
  const { showInfo } = useNotification();
  const [diagnostics, setDiagnostics] = useState({
    jsEnabled: false,
    cssLoaded: false,
    notificationContext: false,
    windowHeight: 0,
    windowWidth: 0
  });

  useEffect(() => {
    // Check if JavaScript is enabled
    setDiagnostics(prev => ({
      ...prev,
      jsEnabled: true,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    }));

    // Try to use notification context
    try {
      showInfo('Diagnostics page loaded');
      setDiagnostics(prev => ({
        ...prev,
        notificationContext: true
      }));
    } catch (error) {
      console.error('Notification context error:', error);
      setDiagnostics(prev => ({
        ...prev,
        notificationContext: false
      }));
    }

    // Check if CSS is loaded by looking for a specific style
    const checkCSS = () => {
      const bodyStyle = window.getComputedStyle(document.body);
      // If background is not pure white, CSS is likely loaded
      const bgColor = bodyStyle.backgroundColor;
      setDiagnostics(prev => ({
        ...prev,
        cssLoaded: bgColor !== 'rgb(255, 255, 255)' && bgColor !== '#ffffff'
      }));
    };

    checkCSS();
  }, [showInfo]);

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'left',
      maxWidth: '800px',
      margin: '0 auto',
      color: '#333'
    }}>
      <h1>System Diagnostics</h1>
      <p>This page helps diagnose issues with the TelePharmacy application.</p>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2>Diagnostic Results</h2>
        <ul>
          <li>JavaScript Enabled: <strong>{diagnostics.jsEnabled ? 'Yes' : 'No'}</strong></li>
          <li>CSS Loaded: <strong>{diagnostics.cssLoaded ? 'Yes' : 'No'}</strong></li>
          <li>Notification Context: <strong>{diagnostics.notificationContext ? 'Working' : 'Not Working'}</strong></li>
          <li>Window Size: <strong>{diagnostics.windowWidth} x {diagnostics.windowHeight}</strong></li>
        </ul>
      </div>
      
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2>Troubleshooting Steps</h2>
        <ol>
          <li>Check browser console for JavaScript errors (Press F12)</li>
          <li>Verify all files are properly loaded in Network tab</li>
          <li>Try refreshing the page</li>
          <li>Try clearing browser cache</li>
          <li>Try a different browser</li>
        </ol>
      </div>
      
      <div style={{ 
        backgroundColor: '#fff3e0', 
        padding: '15px', 
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2>Technical Information</h2>
        <p>If you continue to see a white screen:</p>
        <ul>
          <li>Check if there are any error messages in the browser console</li>
          <li>Verify that all required dependencies are installed</li>
          <li>Ensure the development server is running on the correct port</li>
        </ul>
      </div>
    </div>
  );
};

export default Diagnostics;