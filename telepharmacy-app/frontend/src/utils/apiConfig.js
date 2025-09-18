// API Configuration
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-render-url.onrender.com' // Update this with your actual Render URL
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users',
  MEDICATIONS: '/api/medications',
  ORDERS: '/api/orders',
  PRESCRIPTIONS: '/api/prescriptions',
  CONSULTATIONS: '/api/consultations'
};