import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/medications');
        setMedications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Loading...</h1>
        <p>Fetching data from the backend API</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Test - Medications</h1>
      <p>Successfully connected to the backend API!</p>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Medications ({medications.length} items)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {medications.map((med) => (
            <div key={med._id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3>{med.name}</h3>
              <p><strong>Price:</strong> ${med.price}</p>
              <p><strong>Category:</strong> {med.category}</p>
              <p><strong>Description:</strong> {med.description}</p>
              <p><strong>Dosage:</strong> {med.dosage}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiTest;