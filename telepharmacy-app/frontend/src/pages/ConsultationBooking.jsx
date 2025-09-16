import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import ConsultationService from '../services/consultationService';
import './ConsultationBooking.css';

const ConsultationBooking = () => {
  const user = useSelector((state) => state.auth.user);
  
  const [consultationType, setConsultationType] = useState('video');
  const [preferredPharmacist, setPreferredPharmacist] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [pharmacists, setPharmacists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Mock pharmacist data - in a real app, this would come from an API
  const mockPharmacists = [
    {
      id: '1',
      name: 'Dr. Sarah Williams',
      specialization: 'Clinical Pharmacy',
      rating: 4.8,
      experience: '10 years',
      availableSlots: [
        { date: '2025-09-20', time: '10:00 AM' },
        { date: '2025-09-20', time: '2:00 PM' },
        { date: '2025-09-21', time: '9:00 AM' }
      ]
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Geriatric Pharmacy',
      rating: 4.6,
      experience: '8 years',
      availableSlots: [
        { date: '2025-09-20', time: '11:00 AM' },
        { date: '2025-09-20', time: '3:00 PM' },
        { date: '2025-09-21', time: '10:00 AM' }
      ]
    },
    {
      id: '3',
      name: 'Dr. Amina Hassan',
      specialization: 'Pediatric Pharmacy',
      rating: 4.9,
      experience: '12 years',
      availableSlots: [
        { date: '2025-09-20', time: '1:00 PM' },
        { date: '2025-09-20', time: '4:00 PM' },
        { date: '2025-09-21', time: '11:00 AM' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate fetching pharmacists
    setPharmacists(mockPharmacists);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Combine date and time
      const scheduledAt = new Date(`${preferredDate}T${preferredTime}`);
      
      // Prepare consultation data
      const consultationData = {
        pharmacistId: preferredPharmacist,
        type: consultationType,
        scheduledAt: scheduledAt.toISOString(),
        duration: 30, // Default 30 minutes
        notes: {
          symptoms,
          medicalHistory
        }
      };
      
      // In a real app, this would make an API call
      // const result = await ConsultationService.createConsultation(consultationData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      // Reset form
      setPreferredPharmacist('');
      setPreferredDate('');
      setPreferredTime('');
      setSymptoms('');
      setMedicalHistory('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="consultation-booking-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="consultation-booking-container">
        <motion.div 
          className="consultation-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Book a Consultation</h2>
          <p>Schedule a consultation with a licensed pharmacist</p>
        </motion.div>

        <motion.div 
          className="consultation-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="consultation-types">
            <h3>Consultation Type</h3>
            <div className="type-options">
              <div 
                className={`type-option ${consultationType === 'video' ? 'active' : ''}`}
                onClick={() => setConsultationType('video')}
              >
                <div className="type-icon">📹</div>
                <h4>Video Consultation</h4>
                <p>Face-to-face consultation via video call</p>
              </div>
              
              <div 
                className={`type-option ${consultationType === 'chat' ? 'active' : ''}`}
                onClick={() => setConsultationType('chat')}
              >
                <div className="type-icon">💬</div>
                <h4>Chat Consultation</h4>
                <p>Text-based consultation in real-time</p>
              </div>
              
              <div 
                className={`type-option ${consultationType === 'audio' ? 'active' : ''}`}
                onClick={() => setConsultationType('audio')}
              >
                <div className="type-icon">📞</div>
                <h4>Audio Consultation</h4>
                <p>Voice call consultation</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">Consultation booked successfully!</div>}
            
            <div className="form-group">
              <label htmlFor="pharmacist">Preferred Pharmacist</label>
              <select
                id="pharmacist"
                value={preferredPharmacist}
                onChange={(e) => setPreferredPharmacist(e.target.value)}
                required
              >
                <option value="">Select a pharmacist</option>
                {pharmacists.map((pharmacist) => (
                  <option key={pharmacist.id} value={pharmacist.id}>
                    {pharmacist.name} - {pharmacist.specialization} ({pharmacist.rating}★)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Preferred Time</label>
                <input
                  type="time"
                  id="time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="symptoms">Describe Your Symptoms</label>
              <textarea
                id="symptoms"
                rows="4"
                placeholder="Please describe your symptoms in detail..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="history">Medical History & Current Medications</label>
              <textarea
                id="history"
                rows="3"
                placeholder="List any relevant medical conditions, allergies, or medications you're currently taking..."
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Booking...' : 'Book Consultation'}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ConsultationBooking;