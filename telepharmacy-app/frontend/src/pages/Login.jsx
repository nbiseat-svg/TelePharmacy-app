import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../actions/userActions';
import ErrorHandler from '../utils/errorHandler';
import { motion } from 'framer-motion';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setFieldErrors({});
    
    try {
      await dispatch(userLogin({ email, password })).unwrap();
    } catch (err) {
      const handledError = ErrorHandler.handleApiError(err);
      
      // Handle validation errors
      if (handledError.type === 'validation' && handledError.details) {
        const fieldErrors = ErrorHandler.handleFormErrors(handledError.details);
        setFieldErrors(fieldErrors);
      }
      
      // Log the error for debugging
      ErrorHandler.logError(err, 'Login');
    }
  };

  return (
    <motion.div 
      className="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="auth-container">
        <motion.div 
          className="auth-form-container"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Login to Your Account</h2>
          
          {/* Display general error message */}
          {error && <div className="alert alert-danger">{ErrorHandler.createUserMessage(error)}</div>}
          
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={fieldErrors.email ? "true" : "false"}
              />
              {fieldErrors.email && <div className="error-message">{fieldErrors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={fieldErrors.password ? "true" : "false"}
              />
              {fieldErrors.password && <div className="error-message">{fieldErrors.password}</div>}
            </div>
            
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-links">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <p>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;