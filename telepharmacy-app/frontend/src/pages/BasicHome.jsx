import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // We'll create a separate CSS file for better organization

const BasicHome = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">
          TelePharmacy Application
        </h1>
        <p className="hero-subtitle">
          Your trusted partner for remote pharmaceutical services
        </p>
      </div>
      
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">💊</div>
          <h3 className="feature-title">Medications</h3>
          <p className="feature-description">
            Browse our extensive catalog of prescription and over-the-counter medications
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🏥</div>
          <h3 className="feature-title">Pharmacy Finder</h3>
          <p className="feature-description">
            Locate nearby pharmacies and compare prices and availability
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">👨‍⚕️</div>
          <h3 className="feature-title">Consultations</h3>
          <p className="feature-description">
            Connect with licensed pharmacists for medication consultations
          </p>
        </div>
      </div>
      
      <div className="cta-section">
        <h3 className="cta-title">Get Started Today</h3>
        <p className="cta-description">
          Sign up to access our full range of telepharmacy services and manage your medications from anywhere.
        </p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">
            Create Account
          </Link>
          <Link to="/medications" className="btn btn-secondary">
            Browse Medications
          </Link>
        </div>
      </div>
      
      <div className="benefits-section">
        <h3 className="section-title">Why Choose TelePharmacy?</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h4>Convenience</h4>
            <p>Order medications from the comfort of your home with fast delivery options.</p>
          </div>
          <div className="benefit-item">
            <h4>Expert Advice</h4>
            <p>Get professional pharmaceutical advice from licensed pharmacists.</p>
          </div>
          <div className="benefit-item">
            <h4>Secure & Private</h4>
            <p>Your health information is protected with industry-standard security.</p>
          </div>
          <div className="benefit-item">
            <h4>Cost Effective</h4>
            <p>Competitive pricing and easy comparison of medication costs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicHome;
