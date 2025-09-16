import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section with new layout */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-container">
          <div className="hero-text">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Your Health, Our Priority
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Access quality pharmaceutical services from the comfort of your home. 
              Fast delivery, expert advice, and secure transactions.
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/medications" className="btn-primary">
                Shop Medications
              </Link>
              <Link to="/consultation/book" className="btn-secondary">
                Book Consultation
              </Link>
            </motion.div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <span>💊</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section - New layout */}
      <section className="services-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>
          <div className="services-grid">
            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="service-icon">🛒</div>
              <h3>Medication Delivery</h3>
              <p>Order prescriptions and over-the-counter medications for fast home delivery.</p>
              <Link to="/medications" className="service-link">Learn More</Link>
            </motion.div>
            
            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="service-icon">👨‍⚕️</div>
              <h3>Virtual Consultations</h3>
              <p>Connect with licensed pharmacists for medication advice and prescription reviews.</p>
              <Link to="/consultation/book" className="service-link">Learn More</Link>
            </motion.div>
            
            <motion.div 
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="service-icon">📋</div>
              <h3>Prescription Management</h3>
              <p>Store and manage your prescriptions digitally with refill reminders.</p>
              <Link to="/prescriptions" className="service-link">Learn More</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - New layout */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="stat-number">10K+</div>
              <div className="stat-label">Happy Customers</div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="stat-number">500+</div>
              <div className="stat-label">Medications</div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="stat-number">48h</div>
              <div className="stat-label">Delivery</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New layout */}
      <section className="testimonials-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="testimonials-container">
            <motion.div 
              className="testimonial-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-content">
                <p>"TelePharmacy made it so easy to get my prescriptions without leaving home. The delivery was fast and the service was excellent!"</p>
                <div className="testimonial-author">
                  <div className="author-name">Sarah Johnson</div>
                  <div className="author-title">Regular Customer</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Experience TelePharmacy?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of satisfied customers who trust us for their pharmaceutical needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/register" className="btn-primary">Get Started Today</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;