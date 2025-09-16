import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import PrescriptionService from '../services/prescriptionService';
import './PrescriptionManagement.css';

const PrescriptionManagement = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  
  const [activeTab, setActiveTab] = useState('my-prescriptions');
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock prescription data - in a real app, this would come from an API
  const mockPrescriptions = [
    {
      _id: '1',
      patient: {
        name: 'John Doe'
      },
      pharmacist: {
        name: 'Dr. Sarah Williams'
      },
      medications: [
        {
          name: 'Lisinopril',
          dosage: '10mg',
          quantity: 30,
          instructions: 'Take one tablet daily',
          refills: 2
        },
        {
          name: 'Atorvastatin',
          dosage: '20mg',
          quantity: 30,
          instructions: 'Take one tablet at bedtime',
          refills: 1
        }
      ],
      diagnosis: 'Hypertension and high cholesterol',
      status: 'active',
      issuedDate: '2025-09-01T10:00:00Z',
      expiryDate: '2025-12-01T10:00:00Z'
    },
    {
      _id: '2',
      patient: {
        name: 'John Doe'
      },
      pharmacist: {
        name: 'Dr. Michael Chen'
      },
      medications: [
        {
          name: 'Metformin',
          dosage: '500mg',
          quantity: 60,
          instructions: 'Take one tablet twice daily with meals',
          refills: 3
        }
      ],
      diagnosis: 'Type 2 Diabetes',
      status: 'filled',
      issuedDate: '2025-08-15T14:30:00Z',
      expiryDate: '2025-11-15T14:30:00Z'
    }
  ];

  useEffect(() => {
    const fetchPrescriptions = async () => {
      setLoading(true);
      setError('');
      
      try {
        // In a real app, this would fetch from API
        // const data = await PrescriptionService.getPatientPrescriptions(user._id);
        // setPrescriptions(data);
        
        // Simulate API call
        setTimeout(() => {
          setPrescriptions(mockPrescriptions);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchPrescriptions();
    }
  }, [user]);

  const requestRefill = async (prescriptionId) => {
    try {
      // In a real app, this would make an API call
      // const updatedPrescription = await PrescriptionService.requestPrescriptionRefill(prescriptionId);
      
      // Simulate API call
      setSuccess('Refill request submitted successfully!');
      
      // Update the prescription in the list
      setPrescriptions(prev => prev.map(p => 
        p._id === prescriptionId 
          ? { ...p, refillRequests: [{ status: 'pending' }] } 
          : p
      ));
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    // In a real app, this would submit a new prescription request
    alert('Prescription request submitted successfully!');
    setActiveTab('my-prescriptions');
  };

  return (
    <motion.div 
      className="prescription-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="prescription-container">
        <motion.div 
          className="prescription-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Prescription Management</h2>
          <p>View and manage your prescriptions</p>
        </motion.div>

        <motion.div 
          className="prescription-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="tabs">
            <button 
              className={activeTab === 'my-prescriptions' ? 'active' : ''}
              onClick={() => setActiveTab('my-prescriptions')}
            >
              My Prescriptions
            </button>
            <button 
              className={activeTab === 'request-prescription' ? 'active' : ''}
              onClick={() => setActiveTab('request-prescription')}
            >
              Request New Prescription
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'my-prescriptions' && (
              <div className="tab-pane">
                <h3>My Prescriptions</h3>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                {loading ? (
                  <div className="loading">
                    <p>Loading prescriptions...</p>
                  </div>
                ) : prescriptions.length > 0 ? (
                  <div className="prescriptions-list">
                    {prescriptions.map((prescription) => (
                      <div className="prescription-card" key={prescription._id}>
                        <div className="prescription-header">
                          <div>
                            <h4>Prescription #{prescription._id}</h4>
                            <p>Issued by: {prescription.pharmacist.name}</p>
                          </div>
                          <div className="prescription-status">
                            <span className={`status ${PrescriptionService.getStatusClass(prescription.status)}`}>
                              {PrescriptionService.getStatusDisplayText(prescription.status)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="prescription-details">
                          <div className="detail-row">
                            <span className="label">Diagnosis:</span>
                            <span className="value">{prescription.diagnosis}</span>
                          </div>
                          
                          <div className="detail-row">
                            <span className="label">Issued Date:</span>
                            <span className="value">
                              {PrescriptionService.formatPrescriptionDate(prescription.issuedDate)}
                            </span>
                          </div>
                          
                          <div className="detail-row">
                            <span className="label">Expiry Date:</span>
                            <span className="value">
                              {PrescriptionService.formatPrescriptionDate(prescription.expiryDate)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="medications-list">
                          <h5>Medications</h5>
                          {prescription.medications.map((med, index) => (
                            <div className="medication-item" key={index}>
                              <div className="medication-info">
                                <h6>{med.name} ({med.dosage})</h6>
                                <p>Quantity: {med.quantity}</p>
                                <p>Instructions: {med.instructions}</p>
                                <p>Refills remaining: {med.refills}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="prescription-actions">
                          <button 
                            className="btn-secondary"
                            onClick={() => requestRefill(prescription._id)}
                            disabled={prescription.status !== 'filled' || prescription.medications.some(med => med.refills <= 0) || prescription.refillRequests.length > 0}
                          >
                            {prescription.refillRequests.length > 0 ? 'Refill Requested' : 'Request Refill'}
                          </button>
                          <Link to={`/prescription/${prescription._id}`} className="btn-primary">
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-prescriptions">
                    <h4>You don't have any prescriptions yet</h4>
                    <p>Consult with a pharmacist to get your first prescription</p>
                    <button 
                      className="btn-primary"
                      onClick={() => setActiveTab('request-prescription')}
                    >
                      Request New Prescription
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'request-prescription' && (
              <div className="tab-pane">
                <h3>Request New Prescription</h3>
                <div className="request-form">
                  <form onSubmit={handleSubmitRequest}>
                    <div className="form-group">
                      <label htmlFor="symptoms">Describe your symptoms</label>
                      <textarea
                        id="symptoms"
                        rows="4"
                        placeholder="Please describe your symptoms in detail..."
                        required
                      ></textarea>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="medical-history">Medical History</label>
                      <textarea
                        id="medical-history"
                        rows="3"
                        placeholder="List any relevant medical conditions, allergies, or medications you're currently taking..."
                      ></textarea>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="preferred-pharmacist">Preferred Pharmacist (Optional)</label>
                      <select id="preferred-pharmacist">
                        <option value="">Select a pharmacist</option>
                        <option value="1">Dr. Sarah Williams</option>
                        <option value="2">Dr. Michael Chen</option>
                      </select>
                    </div>
                    
                    <button type="submit" className="btn-primary">Submit Request</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrescriptionManagement;