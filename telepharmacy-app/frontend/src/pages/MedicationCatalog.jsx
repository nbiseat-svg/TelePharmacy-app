import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { formatPriceETB, convertToETB } from '../utils/currencyUtils';
import './MedicationCatalog.css';

const MedicationCatalog = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Mock medication data - in a real app, this would come from an API
  const mockMedications = [
    {
      _id: '1',
      name: 'Paracetamol 500mg',
      description: 'Pain reliever and fever reducer',
      category: 'Pain Relief',
      price: convertToETB(5.99), // Convert to ETB
      images: ['/src/assets/med1.jpg'],
      stock: 100,
      rating: 4.5,
      reviews: 120
    },
    {
      _id: '2',
      name: 'Amoxicillin 250mg',
      description: 'Antibiotic used to treat bacterial infections',
      category: 'Antibiotics',
      price: convertToETB(12.50), // Convert to ETB
      images: ['/src/assets/med2.jpg'],
      stock: 50,
      rating: 4.2,
      reviews: 85
    },
    {
      _id: '3',
      name: 'Ibuprofen 200mg',
      description: 'Nonsteroidal anti-inflammatory drug',
      category: 'Pain Relief',
      price: convertToETB(8.75), // Convert to ETB
      images: ['/src/assets/med3.jpg'],
      stock: 75,
      rating: 4.7,
      reviews: 210
    },
    {
      _id: '4',
      name: 'Lisinopril 10mg',
      description: 'ACE inhibitor used to treat high blood pressure',
      category: 'Cardiovascular',
      price: convertToETB(15.25), // Convert to ETB
      images: ['/src/assets/med4.jpg'],
      stock: 30,
      rating: 4.0,
      reviews: 65
    },
    {
      _id: '5',
      name: 'Metformin 500mg',
      description: 'Oral diabetes medicine',
      category: 'Diabetes',
      price: convertToETB(9.99), // Convert to ETB
      images: ['/src/assets/med5.jpg'],
      stock: 80,
      rating: 4.3,
      reviews: 95
    },
    {
      _id: '6',
      name: 'Atorvastatin 20mg',
      description: 'Statin used to treat elevated cholesterol',
      category: 'Cardiovascular',
      price: convertToETB(22.50), // Convert to ETB
      images: ['/src/assets/med6.jpg'],
      stock: 40,
      rating: 4.1,
      reviews: 78
    }
  ];

  const categories = [
    'All Categories',
    'Pain Relief',
    'Antibiotics',
    'Cardiovascular',
    'Diabetes',
    'Vitamins & Supplements',
    'Digestive Health',
    'Respiratory'
  ];

  useEffect(() => {
    const fetchMedications = async () => {
      setLoading(true);
      setError('');

      try {
        // In a real app, we would call an API endpoint
        // const response = await axios.get('/api/medications');
        // setMedications(response.data);

        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setMedications(mockMedications);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load medications. Please try again.');
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const filteredMedications = medications.filter(medication => {
    const matchesSearch = medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medication.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === '' || category === 'All Categories' || medication.category === category;
    return matchesSearch && matchesCategory;
  });

  const sortedMedications = [...filteredMedications].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Handle image error - fallback to a default image
  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI1MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+TWVkaWNpbmU8L3RleHQ+PC9zdmc+';
  };

  return (
    <motion.div 
      className="catalog-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="catalog-container">
        <motion.div 
          className="catalog-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Medication Catalog</h2>
          <p>Browse our extensive selection of medications</p>
        </motion.div>

        <motion.div 
          className="catalog-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">🔍</button>
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat, index) => (
                  <option key={index} value={index === 0 ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div 
            className="alert alert-danger"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {error}
          </motion.div>
        )}

        {loading ? (
          <motion.div 
            className="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p>Loading medications...</p>
          </motion.div>
        ) : (
          <motion.div 
            className="medications-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {sortedMedications.length > 0 ? (
              sortedMedications.map((medication) => (
                <div className="medication-card" key={medication._id}>
                  <Link to={`/medication/${medication._id}`} className="medication-link">
                    <div className="medication-image">
                      <img 
                        src={medication.images[0]} 
                        alt={medication.name} 
                        onError={handleImageError}
                      />
                    </div>
                    <div className="medication-info">
                      <h3>{medication.name}</h3>
                      <p className="medication-category">{medication.category}</p>
                      <p className="medication-description">{medication.description}</p>
                      <div className="medication-meta">
                        <div className="medication-rating">
                          <span className="stars">
                            {'★'.repeat(Math.floor(medication.rating))}
                            {'☆'.repeat(5 - Math.floor(medication.rating))}
                          </span>
                          <span className="rating-value">({medication.rating})</span>
                        </div>
                        <div className="medication-price">{formatPriceETB(medication.price)}</div>
                      </div>
                      <div className="medication-stock">
                        {medication.stock > 0 ? (
                          <span className="in-stock">In Stock ({medication.stock} available)</span>
                        ) : (
                          <span className="out-of-stock">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <div className="medication-actions">
                    <button className="btn-primary">Add to Cart</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No medications found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MedicationCatalog;