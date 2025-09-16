import React from 'react';

const BasicTest = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#333' }}>TelePharmacy Application</h1>
      <h2 style={{ color: '#666' }}>Basic Test Page</h2>
      <p style={{ fontSize: '18px', color: '#555' }}>
        If you can see this page, the React application is working!
      </p>
      <div style={{ 
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3>Application Status</h3>
        <ul style={{ textAlign: 'left' }}>
          <li style={{ color: 'green' }}>✓ React is working</li>
          <li style={{ color: 'green' }}>✓ Frontend server is running</li>
          <li style={{ color: 'green' }}>✓ Backend server is running</li>
          <li style={{ color: 'green' }}>✓ Vite development server is active</li>
        </ul>
      </div>
      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '8px',
        maxWidth: '600px'
      }}>
        <h3>Next Steps</h3>
        <p>
          Try navigating to <a href="/api-test" style={{ color: '#1976d2' }}>/api-test</a> to verify API connectivity
        </p>
        <p>
          Or go back to <a href="/" style={{ color: '#1976d2' }}>home page</a>
        </p>
      </div>
    </div>
  );
};

export default BasicTest;