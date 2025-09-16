import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const SimpleHome = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-text">
            <h1>Your Health, Our Priority</h1>
            <p>
              Access quality pharmaceutical services from the comfort of your home. 
              Fast delivery, expert advice, and secure transactions.
            </p>
            <div className="hero-buttons">
              <Link to="/medications" className="btn-primary">
                Shop Medications
              </Link>
              <Link to="/consultation/book" className="btn-secondary">
                Book Consultation
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <span>💊</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🛒</div>
              <h3>Medication Delivery</h3>
              <p>Order prescriptions and over-the-counter medications for fast home delivery.</p>
              <Link to="/medications" className="service-link">Learn More</Link>
            </div>
            
            <div className="service-card">
              <div className="service-icon">👨‍⚕️</div>
              <h3>Virtual Consultations</h3>
              <p>Connect with licensed pharmacists for medication advice and prescription reviews.</p>
              <Link to="/consultation/book" className="service-link">Learn More</Link>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3>Prescription Management</h3>
              <p>Store and manage your prescriptions digitally with refill reminders.</p>
              <Link to="/prescriptions" className="service-link">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Experience TelePharmacy?</h2>
          <p>
            Join thousands of satisfied customers who trust us for their pharmaceutical needs.
          </p>
          <div>
            <Link to="/register" className="btn-primary">Get Started Today</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimpleHome;