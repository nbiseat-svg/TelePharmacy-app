import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './MedicationDetail.css';

const MedicationDetail = () => {
  const { id } = useParams();
  const [medication, setMedication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Mock medication data - in a real app, this would come from an API
  const mockMedication = {
    _id: id,
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    description: 'Paracetamol is a common pain reliever and fever reducer. It is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.',
    category: 'Pain Relief',
    price: 5.99,
    images: [
      '/src/assets/med1.jpg',
      '/src/assets/med-detail1.jpg',
      '/src/assets/med-detail2.jpg'
    ],
    dosage: 'Take 1-2 tablets every 4-6 hours as needed',
    strength: '500mg',
    manufacturer: 'MediCorp Pharmaceuticals',
    sideEffects: [
      'Nausea',
      'Stomach pain',
      'Loss of appetite',
      'Skin rash',
      'Dark urine'
    ],
    contraindications: [
      'Severe liver disease',
      'Severe kidney disease',
      'Alcoholism',
      'Glucose-6-phosphate dehydrogenase deficiency'
    ],
    warnings: [
      'Do not exceed recommended dose',
      'Avoid alcohol while taking this medication',
      'Consult doctor if symptoms persist for more than 10 days'
    ],
    stock: 100,
    rating: 4.5,
    reviews: 120
  };

  useEffect(() => {
    const fetchMedication = async () => {
      setLoading(true);
      setError('');

      try {
        // In a real app, we would call an API endpoint
        // const response = await axios.get(`/api/medications/${id}`);
        // setMedication(response.data);

        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setMedication(mockMedication);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load medication details. Please try again.');
        setLoading(false);
      }
    };

    fetchMedication();
  }, [id]);

  const handleAddToCart = () => {
    // Add to cart functionality
    alert(`Added ${quantity} ${medication.name} to cart`);
  };

  if (loading) {
    return (
      <div className="medication-detail-page">
        <div className="loading">
          <p>Loading medication details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="medication-detail-page">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  if (!medication) {
    return (
      <div className="medication-detail-page">
        <div className="alert alert-danger">
          Medication not found
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="medication-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="medication-detail-container">
        <motion.div 
          className="breadcrumb"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/medications">Medications</Link> &gt; {medication.name}
        </motion.div>

        <div className="medication-content">
          <motion.div 
            className="medication-gallery"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="main-image">
              <img src={medication.images[0]} alt={medication.name} />
            </div>
            <div className="thumbnail-images">
              {medication.images.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`${medication.name} ${index + 1}`} 
                  className={index === 0 ? 'active' : ''}
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="medication-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1>{medication.name}</h1>
            <p className="generic-name">Generic: {medication.genericName}</p>
            
            <div className="medication-rating">
              <span className="stars">
                {'★'.repeat(Math.floor(medication.rating))}
                {'☆'.repeat(5 - Math.floor(medication.rating))}
              </span>
              <span className="rating-value">{medication.rating} ({medication.reviews} reviews)</span>
            </div>
            
            <p className="medication-price">${medication.price.toFixed(2)}</p>
            
            <div className="medication-stock">
              {medication.stock > 0 ? (
                <span className="in-stock">In Stock ({medication.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
            
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(Math.min(10, medication.stock)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              className="btn-primary" 
              onClick={handleAddToCart}
              disabled={medication.stock === 0}
            >
              {medication.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            
            <div className="medication-meta">
              <p><strong>Category:</strong> {medication.category}</p>
              <p><strong>Strength:</strong> {medication.strength}</p>
              <p><strong>Manufacturer:</strong> {medication.manufacturer}</p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="medication-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="tabs">
            <button 
              className={activeTab === 'description' ? 'active' : ''}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={activeTab === 'dosage' ? 'active' : ''}
              onClick={() => setActiveTab('dosage')}
            >
              Dosage & Usage
            </button>
            <button 
              className={activeTab === 'side-effects' ? 'active' : ''}
              onClick={() => setActiveTab('side-effects')}
            >
              Side Effects
            </button>
            <button 
              className={activeTab === 'warnings' ? 'active' : ''}
              onClick={() => setActiveTab('warnings')}
            >
              Warnings
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <h3>Description</h3>
                <p>{medication.description}</p>
              </div>
            )}
            
            {activeTab === 'dosage' && (
              <div className="tab-pane">
                <h3>Dosage & Usage</h3>
                <p>{medication.dosage}</p>
                <h4>How to Take</h4>
                <ul>
                  <li>Take with or without food</li>
                  <li>Swallow whole with water</li>
                  <li>Do not crush or chew</li>
                  <li>Take at regular intervals</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'side-effects' && (
              <div className="tab-pane">
                <h3>Side Effects</h3>
                <p>Common side effects may include:</p>
                <ul>
                  {medication.sideEffects.map((effect, index) => (
                    <li key={index}>{effect}</li>
                  ))}
                </ul>
                <p className="important">Seek medical attention immediately if you experience severe side effects.</p>
              </div>
            )}
            
            {activeTab === 'warnings' && (
              <div className="tab-pane">
                <h3>Warnings & Precautions</h3>
                <p>Do not use this medication if you have:</p>
                <ul>
                  {medication.contraindications.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
                <h4>Important Warnings</h4>
                <ul>
                  {medication.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MedicationDetail;