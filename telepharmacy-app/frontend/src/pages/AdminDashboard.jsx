import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import ConsultationService from '../services/consultationService';
import PrescriptionService from '../services/prescriptionService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [pendingConsultations, setPendingConsultations] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock data - in a real app, this would come from an API
  const mockStats = {
    totalPatients: 1240,
    totalPrescriptions: 3850,
    pendingConsultations: 12,
    totalRevenue: 42500,
    medicationsInStock: 850,
    lowStockItems: 24
  };

  const mockPrescriptions = [
    {
      id: '1',
      patient: 'John Doe',
      medication: 'Lisinopril 10mg',
      date: '2025-09-15',
      status: 'pending'
    },
    {
      id: '2',
      patient: 'Jane Smith',
      medication: 'Metformin 500mg',
      date: '2025-09-15',
      status: 'approved'
    },
    {
      id: '3',
      patient: 'Robert Johnson',
      medication: 'Atorvastatin 20mg',
      date: '2025-09-14',
      status: 'filled'
    },
    {
      id: '4',
      patient: 'Emily Wilson',
      medication: 'Levothyroxine 50mcg',
      date: '2025-09-13',
      status: 'pending'
    },
    {
      id: '5',
      patient: 'Michael Brown',
      medication: 'Amlodipine 5mg',
      date: '2025-09-12',
      status: 'approved'
    }
  ];

  const mockConsultations = [
    {
      id: '1',
      patient: 'Alice Brown',
      type: 'Video',
      scheduledAt: '2025-09-20 10:00 AM',
      status: 'Scheduled'
    },
    {
      id: '2',
      patient: 'Michael Davis',
      type: 'Chat',
      scheduledAt: '2025-09-18 2:30 PM',
      status: 'Pending'
    },
    {
      id: '3',
      patient: 'Sarah Johnson',
      type: 'Audio',
      scheduledAt: '2025-09-17 11:00 AM',
      status: 'Completed'
    },
    {
      id: '4',
      patient: 'David Wilson',
      type: 'Video',
      scheduledAt: '2025-09-16 3:00 PM',
      status: 'Cancelled'
    }
  ];

  const mockInventory = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      stock: 150,
      minStock: 50,
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      stock: 30,
      minStock: 50,
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'Ibuprofen 200mg',
      category: 'Pain Relief',
      stock: 200,
      minStock: 50,
      status: 'in-stock'
    },
    {
      id: '4',
      name: 'Omeprazole 20mg',
      category: 'Gastrointestinal',
      stock: 75,
      minStock: 30,
      status: 'in-stock'
    },
    {
      id: '5',
      name: 'Loratadine 10mg',
      category: 'Allergy',
      stock: 15,
      minStock: 25,
      status: 'low-stock'
    }
  ];

  useEffect(() => {
    // Simulate fetching data
    setStats(mockStats);
    setRecentPrescriptions(mockPrescriptions);
    setPendingConsultations(mockConsultations);
    setInventory(mockInventory);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'approved':
        return 'status-approved';
      case 'filled':
        return 'status-filled';
      case 'low-stock':
        return 'status-low';
      case 'in-stock':
        return 'status-in-stock';
      default:
        return 'status-default';
    }
  };

  const updatePrescriptionStatus = (id, newStatus) => {
    setRecentPrescriptions(prev => 
      prev.map(prescription => 
        prescription.id === id 
          ? { ...prescription, status: newStatus } 
          : prescription
      )
    );
    
    // In a real app, you would make an API call here
    // updatePrescriptionStatusAPI(id, newStatus);
  };

  const updateConsultationStatus = (id, newStatus) => {
    setPendingConsultations(prev => 
      prev.map(consultation => 
        consultation.id === id 
          ? { ...consultation, status: newStatus } 
          : consultation
      )
    );
    
    // In a real app, you would make an API call here
    // updateConsultationStatusAPI(id, newStatus);
  };

  const updateInventoryStock = (id, newStock) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, stock: newStock, status: newStock < item.minStock ? 'low-stock' : 'in-stock' } 
          : item
      )
    );
    
    // In a real app, you would make an API call here
    // updateInventoryAPI(id, newStock);
  };

  const handleApprovePrescription = (id) => {
    updatePrescriptionStatus(id, 'approved');
  };

  const handleFillPrescription = (id) => {
    updatePrescriptionStatus(id, 'filled');
  };

  const handleStartConsultation = (id) => {
    updateConsultationStatus(id, 'In Progress');
  };

  const handleCompleteConsultation = (id) => {
    updateConsultationStatus(id, 'Completed');
  };

  return (
    <motion.div 
      className="admin-dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="admin-dashboard-container">
        <motion.div 
          className="admin-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Pharmacist Dashboard</h2>
          <p>Welcome back, {user?.name || 'Dr. Pharmacist'}</p>
        </motion.div>

        <motion.div 
          className="admin-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="tabs">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={activeTab === 'prescriptions' ? 'active' : ''}
              onClick={() => setActiveTab('prescriptions')}
            >
              Prescriptions
            </button>
            <button 
              className={activeTab === 'consultations' ? 'active' : ''}
              onClick={() => setActiveTab('consultations')}
            >
              Consultations
            </button>
            <button 
              className={activeTab === 'inventory' ? 'active' : ''}
              onClick={() => setActiveTab('inventory')}
            >
              Inventory
            </button>
            <button 
              className={activeTab === 'reports' ? 'active' : ''}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="tab-pane">
                <h3>Dashboard Overview</h3>
                
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                      <h4>Total Patients</h4>
                      <p>{stats.totalPatients}</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">💊</div>
                    <div className="stat-info">
                      <h4>Prescriptions</h4>
                      <p>{stats.totalPrescriptions}</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">💬</div>
                    <div className="stat-info">
                      <h4>Pending Consultations</h4>
                      <p>{stats.pendingConsultations}</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                      <h4>Total Revenue</h4>
                      <p>${stats.totalRevenue?.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                      <h4>Medications in Stock</h4>
                      <p>{stats.medicationsInStock}</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-info">
                      <h4>Low Stock Items</h4>
                      <p>{stats.lowStockItems}</p>
                    </div>
                  </div>
                </div>
                
                <div className="recent-activity">
                  <h4>Recent Activity</h4>
                  <div className="activity-list">
                    <div className="activity-item">
                      <div className="activity-icon">📋</div>
                      <div className="activity-details">
                        <p>New prescription request from John Doe</p>
                        <span className="activity-time">2 hours ago</span>
                      </div>
                    </div>
                    
                    <div className="activity-item">
                      <div className="activity-icon">💬</div>
                      <div className="activity-details">
                        <p>Consultation scheduled with Alice Brown</p>
                        <span className="activity-time">4 hours ago</span>
                      </div>
                    </div>
                    
                    <div className="activity-item">
                      <div className="activity-icon">📦</div>
                      <div className="activity-details">
                        <p>Inventory updated for Paracetamol</p>
                        <span className="activity-time">1 day ago</span>
                      </div>
                    </div>
                    
                    <div className="activity-item">
                      <div className="activity-icon">💊</div>
                      <div className="activity-details">
                        <p>Prescription filled for Jane Smith</p>
                        <span className="activity-time">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'prescriptions' && (
              <div className="tab-pane">
                <h3>Prescription Management</h3>
                
                <div className="prescriptions-list">
                  <div className="table-header">
                    <h4>Recent Prescriptions</h4>
                    <button className="btn-primary">New Prescription</button>
                  </div>
                  
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Patient</th>
                          <th>Medication</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPrescriptions.map((prescription) => (
                          <tr key={prescription.id}>
                            <td>{prescription.patient}</td>
                            <td>{prescription.medication}</td>
                            <td>{prescription.date}</td>
                            <td>
                              <span className={`status ${getStatusClass(prescription.status)}`}>
                                {PrescriptionService.getStatusDisplayText(prescription.status)}
                              </span>
                            </td>
                            <td>
                              {prescription.status === 'pending' && (
                <button 
                  className="btn-secondary"
                  onClick={() => handleApprovePrescription(prescription.id)}
                >
                  Approve
                </button>
              )}
              {prescription.status === 'approved' && (
                <button 
                  className="btn-primary"
                  onClick={() => handleFillPrescription(prescription.id)}
                >
                  Fill
                </button>
              )}
              {prescription.status === 'filled' && (
                <span>Filled</span>
              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'consultations' && (
              <div className="tab-pane">
                <h3>Consultation Management</h3>
                
                <div className="consultations-list">
                  <div className="table-header">
                    <h4>Pending Consultations</h4>
                  </div>
                  
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Patient</th>
                          <th>Type</th>
                          <th>Scheduled</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingConsultations.map((consultation) => (
                          <tr key={consultation.id}>
                            <td>{consultation.patient}</td>
                            <td>{consultation.type}</td>
                            <td>{consultation.scheduledAt}</td>
                            <td>
                              <span className={`status ${getStatusClass(consultation.status.toLowerCase())}`}>
                                {ConsultationService.getStatusDisplayText(consultation.status)}
                              </span>
                            </td>
                            <td>
                              {consultation.status === 'Scheduled' && (
                <button 
                  className="btn-secondary"
                  onClick={() => handleStartConsultation(consultation.id)}
                >
                  Start
                </button>
              )}
              {consultation.status === 'In Progress' && (
                <button 
                  className="btn-primary"
                  onClick={() => handleCompleteConsultation(consultation.id)}
                >
                  Complete
                </button>
              )}
              {consultation.status === 'Pending' && (
                <button 
                  className="btn-secondary"
                  onClick={() => handleStartConsultation(consultation.id)}
                >
                  Accept
                </button>
              )}
              {(consultation.status === 'Completed' || consultation.status === 'Cancelled') && (
                <span>{consultation.status}</span>
              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'inventory' && (
              <div className="tab-pane">
                <h3>Inventory Management</h3>
                
                <div className="inventory-list">
                  <div className="table-header">
                    <h4>Current Inventory</h4>
                    <button className="btn-primary">Add Medication</button>
                  </div>
                  
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Medication</th>
                          <th>Category</th>
                          <th>Stock</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventory.map((item) => (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>
                              {item.stock} 
                              {item.stock < item.minStock && (
                                <span className="low-stock-warning"> (Low Stock!)</span>
                              )}
                            </td>
                            <td>
                              <span className={`status ${getStatusClass(item.status)}`}>
                                {item.status.replace('-', ' ')}
                              </span>
                            </td>
                            <td>
                              <button 
                className="btn-secondary"
                onClick={() => {
                  const newStock = prompt(`Enter new stock quantity for ${item.name}:`, item.stock);
                  if (newStock !== null && !isNaN(newStock)) {
                    updateInventoryStock(item.id, parseInt(newStock));
                  }
                }}
              >
                Update
              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reports' && (
              <div className="tab-pane">
                <h3>Reports & Analytics</h3>
                
                <div className="reports-grid">
                  <div className="report-card">
                    <h4>Prescription Trends</h4>
                    <div className="chart-placeholder">
                      <p>Prescription volume chart</p>
                    </div>
                  </div>
                  
                  <div className="report-card">
                    <h4>Revenue Report</h4>
                    <div className="chart-placeholder">
                      <p>Revenue trends chart</p>
                    </div>
                  </div>
                  
                  <div className="report-card">
                    <h4>Inventory Turnover</h4>
                    <div className="chart-placeholder">
                      <p>Inventory turnover chart</p>
                    </div>
                  </div>
                  
                  <div className="report-card">
                    <h4>Patient Demographics</h4>
                    <div className="chart-placeholder">
                      <p>Patient demographics chart</p>
                    </div>
                  </div>
                  
                  <div className="report-card">
                    <h4>Consultation Statistics</h4>
                    <div className="chart-placeholder">
                      <p>Consultation types and duration chart</p>
                    </div>
                  </div>
                  
                  <div className="report-card">
                    <h4>Top Medications</h4>
                    <div className="chart-placeholder">
                      <p>Most prescribed medications chart</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;