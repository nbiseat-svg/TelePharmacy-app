const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, saveUser, findUserByEmail, findUserById } = require('./config/db');
const socketIo = require('socket.io');
const { initializeStorage } = require('./controllers/userController');
const { setStorageMode } = require('./utils/auth');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB().then((dbResult) => {
  // Initialize storage in controllers
  initializeStorage(dbResult.connected);
  
  // Set storage mode in auth middleware
  setStorageMode(!dbResult.connected);
  
  if (!dbResult.connected) {
    console.log('Warning: MongoDB not available, using in-memory storage for demonstration');
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/medications', require('./routes/medicationRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TelePharmacy API' });
});

// Health check route for deployment platforms
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'TelePharmacy API is running' });
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

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize Socket.io
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });
  
  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});