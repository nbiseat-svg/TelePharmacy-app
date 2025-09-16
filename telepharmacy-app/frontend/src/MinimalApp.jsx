import React from 'react';

function MinimalApp() {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#000000'
    }}>
      <h1 style={{ color: '#000000' }}>Minimal TelePharmacy App</h1>
      <h2 style={{ color: '#333333' }}>Testing Basic Functionality</h2>
      <p style={{ fontSize: '18px', color: '#555555' }}>
        If you can see this page, the minimal React app is working!
      </p>
      <div style={{ 
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#000000' }}>Status Check</h3>
        <ul style={{ textAlign: 'left', color: '#000000' }}>
          <li style={{ color: 'green' }}>✓ React Rendering</li>
          <li style={{ color: 'green' }}>✓ Basic Styles</li>
          <li style={{ color: 'green' }}>✓ Static Content</li>
        </ul>
      </div>
    </div>
  );
}

export default MinimalApp;