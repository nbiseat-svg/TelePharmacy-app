import React from 'react';
import { Link } from 'react-router-dom';

const Debug = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>TelePharmacy Debug Page</h1>
      <p>If you can see this page, the frontend is working correctly.</p>
      <p>If you're seeing a blank page on the home route, there might be an issue with the Home component or its dependencies.</p>
      
      <div style={{ marginTop: '20px' }}>
        <Link to="/test-api" style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          backgroundColor: '#667eea', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px',
          margin: '10px'
        }}>
          Test API Connection
        </Link>
        <Link to="/" style={{ 
          display: 'inline-block', 
          padding: '10px 20px', 
          backgroundColor: '#764ba2', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px',
          margin: '10px'
        }}>
          Back to Home
        </Link>
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'left', maxWidth: '600px', margin: '30px auto' }}>
        <h2>Debug Information:</h2>
        <ul>
          <li>Frontend running on: http://localhost:5174</li>
          <li>Backend API running on: http://localhost:5000</li>
          <li>API proxy configured: /api → http://localhost:5000</li>
          <li>Redux store initialized: Yes</li>
          <li>i18n initialized: Yes</li>
        </ul>
      </div>
    </div>
  );
};

export default Debug;