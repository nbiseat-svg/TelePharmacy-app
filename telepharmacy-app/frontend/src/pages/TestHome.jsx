import React from 'react';

const TestHome = () => {
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
      <h1 style={{ color: '#333' }}>TelePharmacy Home Page</h1>
      <h2 style={{ color: '#666' }}>New Layout Test</h2>
      <p style={{ fontSize: '18px', color: '#555' }}>
        If you can see this page, the new home layout is working!
      </p>
      <div style={{ 
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3>Page Sections</h3>
        <ul style={{ textAlign: 'left' }}>
          <li style={{ color: 'green' }}>✓ Hero Section</li>
          <li style={{ color: 'green' }}>✓ Services Section</li>
          <li style={{ color: 'green' }}>✓ Stats Section</li>
          <li style={{ color: 'green' }}>✓ Testimonials Section</li>
          <li style={{ color: 'green' }}>✓ CTA Section</li>
        </ul>
      </div>
    </div>
  );
};

export default TestHome;