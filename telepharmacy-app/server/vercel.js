// Vercel serverless function entry point
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
let dbConnected = false;
connectDB().then((dbResult) => {
  dbConnected = dbResult.connected;
  if (!dbResult.connected) {
    console.log('Warning: MongoDB not available, using in-memory storage for demonstration');
  }
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/medications', require('./routes/medicationRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to TelePharmacy API',
    database: dbConnected ? 'Connected to MongoDB' : 'Using in-memory storage'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'TelePharmacy API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// For Vercel serverless functions
module.exports = app;