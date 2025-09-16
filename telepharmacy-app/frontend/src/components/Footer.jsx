import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>TelePharmacy</h3>
          <p>Your trusted partner for remote pharmaceutical services.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/medications">Medications</Link></li>
            <li><Link to="/pharmacy-finder">Pharmacy Finder</Link></li>
            <li><Link to="/consultation/book">Consultation</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <address>
            <p>Email: info@telepharmacy.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Pharmacy St, Health City</p>
          </address>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 TelePharmacy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;