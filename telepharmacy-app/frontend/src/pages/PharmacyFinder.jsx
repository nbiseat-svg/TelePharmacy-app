import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import DirectionsModal from '../components/DirectionsModal';
import { generateDirections, findNearestCity } from '../utils/directionsUtils';
import './PharmacyFinder.css';

const PharmacyFinder = () => {
  const [medicationName, setMedicationName] = useState('');
  const [location, setLocation] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDirections, setShowDirections] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [directions, setDirections] = useState(null);
  const [userLocationCoord, setUserLocationCoord] = useState({ lat: 9.0300, lng: 38.7400 }); // Default to Addis Ababa
  const [routePoints, setRoutePoints] = useState([]); // For visual route display

  // Mock pharmacy data with Ethiopian cities and locations
  const mockPharmacies = [
    {
      id: 1,
      name: 'Addis Ababa Central Pharmacy',
      address: '123 Unity Park, Addis Ababa',
      distance: '0.5 km',
      availability: 'In Stock',
      price: '$12.99',
      phone: '+251 11 123 4567',
      hours: 'Open 24/7',
      city: 'Addis Ababa',
      coordinates: { lat: 9.0300, lng: 38.7400 }
    },
    {
      id: 2,
      name: 'Hawassa Medical Center',
      address: '456 Lake Road, Hawassa',
      distance: '1.2 km',
      availability: 'Low Stock',
      price: '$13.50',
      phone: '+251 11 234 5678',
      hours: '8:00 AM - 10:00 PM',
      city: 'Hawassa',
      coordinates: { lat: 7.0500, lng: 38.4833 }
    },
    {
      id: 3,
      name: 'Mekelle HealthPlus',
      address: '789 University Ave, Mekelle',
      distance: '2.3 km',
      availability: 'In Stock',
      price: '$11.75',
      phone: '+251 11 345 6789',
      hours: '7:00 AM - 11:00 PM',
      city: 'Mekelle',
      coordinates: { lat: 13.4933, lng: 39.4500 }
    },
    {
      id: 4,
      name: 'Dire Dawa Medical Store',
      address: '321 Commercial St, Dire Dawa',
      distance: '1.8 km',
      availability: 'In Stock',
      price: '$10.25',
      phone: '+251 11 456 7890',
      hours: '24/7',
      city: 'Dire Dawa',
      coordinates: { lat: 9.6000, lng: 41.8667 }
    },
    {
      id: 5,
      name: 'Bahir Dar Pharmacy',
      address: '654 Lake Tana Rd, Bahir Dar',
      distance: '0.9 km',
      availability: 'In Stock',
      price: '$14.50',
      phone: '+251 11 567 8901',
      hours: '8:00 AM - 9:00 PM',
      city: 'Bahir Dar',
      coordinates: { lat: 11.5900, lng: 37.3900 }
    }
  ];

  // Ethiopian cities with coordinates for map
  const ethiopianCities = [
    { name: 'Addis Ababa', lat: 9.0300, lng: 38.7400 },
    { name: 'Hawassa', lat: 7.0500, lng: 38.4833 },
    { name: 'Mekelle', lat: 13.4933, lng: 39.4500 },
    { name: 'Dire Dawa', lat: 9.6000, lng: 41.8667 },
    { name: 'Bahir Dar', lat: 11.5900, lng: 37.3900 },
    { name: 'Adama', lat: 8.5400, lng: 39.2700 },
    { name: 'Gondar', lat: 12.6000, lng: 37.4667 },
    { name: 'Jimma', lat: 7.6733, lng: 36.8333 }
  ];

  const searchPharmacies = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real app, we would call an API endpoint
      // const response = await axios.get(`/api/pharmacies/search?medication=${medicationName}&location=${location}`);
      // setPharmacies(response.data);

      // For demo purposes, we'll use mock data
      setTimeout(() => {
        setPharmacies(mockPharmacies);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to search pharmacies. Please try again.');
      setLoading(false);
    }
  };

  // Function to get marker position based on coordinates
  const getMarkerPosition = (lat, lng) => {
    // Normalize Ethiopian coordinates to map container
    const minLat = 7.0;
    const maxLat = 14.0;
    const minLng = 36.0;
    const maxLng = 42.0;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;
    
    return { x, y };
  };

  // Function to generate route points for visualization
  const generateRoutePoints = (start, end) => {
    const points = [];
    const numPoints = 10;
    
    for (let i = 0; i <= numPoints; i++) {
      const ratio = i / numPoints;
      const lat = start.lat + (end.lat - start.lat) * ratio;
      const lng = start.lng + (end.lng - start.lng) * ratio;
      points.push({ lat, lng });
    }
    
    return points;
  };

  // Function to get directions
  const getDirections = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowDirections(true);
    
    // Generate directions from user location to pharmacy
    const startLocation = {
      lat: userLocationCoord.lat,
      lng: userLocationCoord.lng,
      name: location || 'Your Location'
    };
    
    const endLocation = {
      lat: pharmacy.coordinates.lat,
      lng: pharmacy.coordinates.lng,
      name: pharmacy.name
    };
    
    // Generate directions
    const directionsData = generateDirections(startLocation, endLocation);
    setDirections(directionsData);
    
    // Generate route points for visualization
    const points = generateRoutePoints(startLocation, endLocation);
    setRoutePoints(points);
  };

  return (
    <motion.div 
      className="pharmacy-finder-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pharmacy-finder-container">
        <motion.div 
          className="pharmacy-finder-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Find a Pharmacy in Ethiopia</h2>
          <p>Locate pharmacies with the medications you need across Ethiopian cities</p>
        </motion.div>

        <motion.div 
          className="search-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={searchPharmacies} className="search-form">
            <div className="form-group">
              <label htmlFor="medication">Medication Name</label>
              <input
                type="text"
                id="medication"
                placeholder="Enter medication name"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Your Location</label>
              <input
                type="text"
                id="location"
                placeholder="Enter your location or use current location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <button type="button" className="current-location-btn">
                Use Current Location
              </button>
            </div>
            
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Search Pharmacies'}
            </button>
          </form>
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

        <motion.div 
          className="results-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {pharmacies.length > 0 && (
            <div className="results-header">
              <h3>Available Pharmacies</h3>
              <p>Found {pharmacies.length} pharmacies with "{medicationName}"</p>
            </div>
          )}

          <div className="pharmacies-grid">
            {pharmacies.map((pharmacy) => (
              <div className="pharmacy-card" key={pharmacy.id}>
                <div className="pharmacy-header">
                  <h4>{pharmacy.name}</h4>
                  <span className={`availability ${pharmacy.availability === 'In Stock' ? 'in-stock' : 'low-stock'}`}>
                    {pharmacy.availability}
                  </span>
                </div>
                
                <div className="pharmacy-details">
                  <div className="detail-row">
                    <span className="detail-label">City:</span>
                    <span className="detail-value">{pharmacy.city}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{pharmacy.address}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Distance:</span>
                    <span className="detail-value">{pharmacy.distance}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value price">{pharmacy.price}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{pharmacy.phone}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-label">Hours:</span>
                    <span className="detail-value">{pharmacy.hours}</span>
                  </div>
                </div>
                
                <div className="pharmacy-actions">
                  <button className="btn-secondary" onClick={() => getDirections(pharmacy)}>
                    Get Directions
                  </button>
                  <button className="btn-primary">
                    Call Pharmacy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="map-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Ethiopian Pharmacy Locations</h3>
          <div className="map-container">
            <div className="ethiopia-map">
              {/* Simplified representation of Ethiopia's map */}
              <div className="ethiopia-outline">
                {/* Major cities markers */}
                {ethiopianCities.map((city, index) => {
                  const position = getMarkerPosition(city.lat, city.lng);
                  const hasPharmacy = pharmacies.some(p => p.city === city.name);
                  
                  return (
                    <div 
                      key={index}
                      className={`map-marker ${hasPharmacy ? 'with-pharmacy' : ''}`}
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`
                      }}
                      title={`${city.name}${hasPharmacy ? ' - Pharmacy Available' : ''}`}
                    >
                      <div className="marker-dot"></div>
                      <div className="marker-label">{city.name}</div>
                    </div>
                  );
                })}
                
                {/* Pharmacy markers */}
                {pharmacies.map((pharmacy) => {
                  const position = getMarkerPosition(pharmacy.coordinates.lat, pharmacy.coordinates.lng);
                  return (
                    <div 
                      key={`pharmacy-${pharmacy.id}`}
                      className="pharmacy-marker"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`
                      }}
                      title={`${pharmacy.name} - ${pharmacy.city}`}
                    >
                      <div className="pharmacy-icon">℞</div>
                    </div>
                  );
                })}
                
                {/* Route visualization */}
                {routePoints.length > 0 && (
                  <div className="route-path">
                    {routePoints.map((point, index) => {
                      const position = getMarkerPosition(point.lat, point.lng);
                      return (
                        <div
                          key={index}
                          className="route-point"
                          style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`
                          }}
                        />
                      );
                    })}
                  </div>
                )}
                
                {/* Start and end markers when route is shown */}
                {routePoints.length > 0 && (
                  <>
                    <div 
                      className="start-marker"
                      style={{
                        left: `${getMarkerPosition(userLocationCoord.lat, userLocationCoord.lng).x}%`,
                        top: `${getMarkerPosition(userLocationCoord.lat, userLocationCoord.lng).y}%`
                      }}
                    >
                      <div className="marker-icon">A</div>
                    </div>
                    <div 
                      className="end-marker"
                      style={{
                        left: `${getMarkerPosition(selectedPharmacy.coordinates.lat, selectedPharmacy.coordinates.lng).x}%`,
                        top: `${getMarkerPosition(selectedPharmacy.coordinates.lat, selectedPharmacy.coordinates.lng).y}%`
                      }}
                    >
                      <div className="marker-icon">B</div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="map-legend">
                <div className="legend-item">
                  <div className="legend-color city-marker"></div>
                  <span>Major Cities</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color pharmacy-marker-legend"></div>
                  <span>Pharmacies</span>
                </div>
                {routePoints.length > 0 && (
                  <div className="legend-item">
                    <div className="legend-color route-legend"></div>
                    <span>Route</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Directions Modal */}
      <DirectionsModal
        isOpen={showDirections}
        onClose={() => {
          setShowDirections(false);
          setRoutePoints([]); // Clear route when closing
        }}
        directions={directions}
        pharmacy={selectedPharmacy}
        userLocation={location || 'Your Location'}
      />
    </motion.div>
  );
};

export default PharmacyFinder;