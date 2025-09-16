import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const SimpleHeader = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <span>TelePharmacy</span>
          </Link>
        </div>
        <div className="header-right">
          <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Home</Link>
          <Link to="/api-test" style={{ color: 'white', textDecoration: 'none' }}>API Test</Link>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;