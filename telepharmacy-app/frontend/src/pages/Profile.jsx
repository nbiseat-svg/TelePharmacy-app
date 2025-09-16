import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { motion } from 'framer-motion';
import './Profile.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('en');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.auth); // Use auth instead of userUpdate

  useEffect(() => {
    if (!userInfo) {
      // Redirect to login if not authenticated
    } else {
      // Fetch user details when component mounts
      dispatch(getUserDetails('profile'));
      
      // Populate form fields with existing userInfo
      setName(userInfo.name || '');
      setEmail(userInfo.email || '');
      setPhone(userInfo.phone || '');
      
      if (userInfo.address) {
        setStreet(userInfo.address.street || '');
        setCity(userInfo.address.city || '');
        setState(userInfo.address.state || '');
        setZipCode(userInfo.address.zipCode || '');
        setCountry(userInfo.address.country || '');
      }
      
      setDateOfBirth(userInfo.dateOfBirth || '');
      setGender(userInfo.gender || '');
      setPreferredLanguage(userInfo.preferredLanguage || 'en');
    }
  }, [userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({
      id: userInfo._id,
      name,
      email,
      phone,
      address: {
        street,
        city,
        state,
        zipCode,
        country
      },
      dateOfBirth,
      gender,
      preferredLanguage
    }));
  };

  // Show loading state
  if (loading && !userInfo) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && !userInfo) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="alert alert-danger">
            Error loading profile: {error}
          </div>
        </div>
      </div>
    );
  }

  // Show login required message if no userInfo
  if (!userInfo) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="alert alert-warning">
            Please log in to view your profile.
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-container">
        <motion.div 
          className="profile-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>User Profile</h2>
          <p>Manage your account information</p>
        </motion.div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Profile updated successfully!</div>}

        <motion.div 
          className="profile-form-container"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <form onSubmit={submitHandler}>
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Address Information</h3>
              
              <div className="form-group">
                <label htmlFor="street">Street Address</label>
                <input
                  type="text"
                  id="street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">ZIP/Postal Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Preferences</h3>
              
              <div className="form-group">
                <label htmlFor="preferredLanguage">Preferred Language</label>
                <select
                  id="preferredLanguage"
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="am">Amharic</option>
                  <option value="om">Oromo</option>
                  <option value="ti">Tigrigna</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;