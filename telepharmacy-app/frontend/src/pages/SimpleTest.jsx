import React from 'react';

const SimpleTest = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#333' }}>Simple Test Page</h1>
      <p style={{ color: '#666', fontSize: '1.2rem' }}>
        If you can see this page, the basic React rendering is working.
      </p>
      <div style={{ 
        backgroundColor: '#e8f4fd', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '20px',
        maxWidth: '500px'
      }}>
        <h2 style={{ color: '#2c5282' }}>Troubleshooting Steps</h2>
        <ol style={{ textAlign: 'left', color: '#2d3748' }}>
          <li>Check the browser console for errors (Press F12)</li>
          <li>Verify all files are properly loaded in the Network tab</li>
          <li>Try refreshing the page</li>
          <li>Try clearing browser cache</li>
          <li>Try a different browser</li>
        </ol>
      </div>
    </div>
  );
};

export default SimpleTest;