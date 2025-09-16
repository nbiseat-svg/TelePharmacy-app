const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data stores (in production, use a database)
let users = [
  { id: 1, username: 'patient1', password: 'password123', role: 'patient' },
  { id: 2, username: 'pharmacist1', password: 'password123', role: 'pharmacist' }
];

let medications = [
  { id: 1, name: 'Paracetamol', description: 'Pain reliever and fever reducer', price: 5.99, image: '/images/paracetamol.jpg' },
  { id: 2, name: 'Amoxicillin', description: 'Antibiotic used to treat bacterial infections', price: 12.50, image: '/images/amoxicillin.jpg' },
  { id: 3, name: 'Lisinopril', description: 'Used to treat high blood pressure', price: 8.75, image: '/images/lisinopril.jpg' }
];

let pharmacies = [
  { id: 1, name: 'City Pharmacy', location: 'Downtown', medications: [1, 2] },
  { id: 2, name: 'Health Plus Pharmacy', location: 'Midtown', medications: [2, 3] },
  { id: 3, name: 'MediCare Pharmacy', location: 'Uptown', medications: [1, 3] }
];

let orders = [];
let prescriptions = [];
let consultations = [];

// Helper function to find user by username
const findUserByUsername = (username) => users.find(user => user.username === username);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running!', timestamp: new Date().toISOString() });
});

// Authentication routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  
  if (user && user.password === password) {
    // In production, use JWT tokens
    res.json({ 
      message: 'Login successful', 
      user: { id: user.id, username: user.username, role: user.role },
      token: 'sample-jwt-token'
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { username, password, role } = req.body;
  const existingUser = findUserByUsername(username);
  
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    password, // In production, hash the password
    role: role || 'patient'
  };
  
  users.push(newUser);
  res.status(201).json({ 
    message: 'User registered successfully', 
    user: { id: newUser.id, username: newUser.username, role: newUser.role }
  });
});

// Medication routes
app.get('/api/medications', (req, res) => {
  res.json(medications);
});

app.get('/api/medications/:id', (req, res) => {
  const medication = medications.find(m => m.id === parseInt(req.params.id));
  if (medication) {
    res.json(medication);
  } else {
    res.status(404).json({ message: 'Medication not found' });
  }
});

// Pharmacy routes
app.get('/api/pharmacies', (req, res) => {
  res.json(pharmacies);
});

app.get('/api/pharmacies/search', (req, res) => {
  const { medication } = req.query;
  if (!medication) {
    return res.status(400).json({ message: 'Medication name is required' });
  }
  
  // Find pharmacies that have this medication
  const medicationObj = medications.find(m => 
    m.name.toLowerCase().includes(medication.toLowerCase())
  );
  
  if (!medicationObj) {
    return res.status(404).json({ message: 'Medication not found' });
  }
  
  const matchingPharmacies = pharmacies.filter(p => 
    p.medications.includes(medicationObj.id)
  );
  
  res.json({
    medication: medicationObj,
    pharmacies: matchingPharmacies
  });
});

// Order routes
app.get('/api/orders', (req, res) => {
  // In a real app, we would filter by user
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const { medicationId, quantity } = req.body;
  const medication = medications.find(m => m.id === parseInt(medicationId));
  
  if (!medication) {
    return res.status(404).json({ message: 'Medication not found' });
  }
  
  const newOrder = {
    id: orders.length + 1,
    medicationId: parseInt(medicationId),
    quantity: parseInt(quantity),
    total: medication.price * parseInt(quantity),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Prescription routes
app.get('/api/prescriptions', (req, res) => {
  // In a real app, we would filter by user
  res.json(prescriptions);
});

app.post('/api/prescriptions', (req, res) => {
  const { patientId, medicationId, dosage, instructions } = req.body;
  const medication = medications.find(m => m.id === parseInt(medicationId));
  
  if (!medication) {
    return res.status(404).json({ message: 'Medication not found' });
  }
  
  const newPrescription = {
    id: prescriptions.length + 1,
    patientId: parseInt(patientId),
    medicationId: parseInt(medicationId),
    medicationName: medication.name,
    dosage,
    instructions,
    status: 'active',
    createdAt: new Date().toISOString()
  };
  
  prescriptions.push(newPrescription);
  res.status(201).json(newPrescription);
});

// Consultation routes
app.get('/api/consultations', (req, res) => {
  res.json(consultations);
});

app.post('/api/consultations', (req, res) => {
  const { patientId, pharmacistId, type } = req.body;
  
  const newConsultation = {
    id: consultations.length + 1,
    patientId: parseInt(patientId),
    pharmacistId: parseInt(pharmacistId),
    type: type || 'chat', // chat, video, audio
    status: 'scheduled',
    createdAt: new Date().toISOString()
  };
  
  consultations.push(newConsultation);
  res.status(201).json(newConsultation);
});

// Simple cart functionality
let carts = {}; // In-memory cart storage

// Get user's cart
app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const cart = carts[userId] || [];
  res.json(cart);
});

// Add item to cart
app.post('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const { medicationId, quantity } = req.body;
  
  const medication = medications.find(m => m.id === parseInt(medicationId));
  if (!medication) {
    return res.status(404).json({ message: 'Medication not found' });
  }
  
  if (!carts[userId]) {
    carts[userId] = [];
  }
  
  // Check if item already in cart
  const existingItem = carts[userId].find(item => item.medicationId === parseInt(medicationId));
  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    carts[userId].push({
      medicationId: parseInt(medicationId),
      medicationName: medication.name,
      quantity: parseInt(quantity),
      price: medication.price
    });
  }
  
  res.json(carts[userId]);
});

// Remove item from cart
app.delete('/api/cart/:userId/:medicationId', (req, res) => {
  const userId = req.params.userId;
  const medicationId = parseInt(req.params.medicationId);
  
  if (!carts[userId]) {
    return res.status(404).json({ message: 'Cart not found' });
  }
  
  carts[userId] = carts[userId].filter(item => item.medicationId !== medicationId);
  res.json(carts[userId]);
});

// Checkout - create order from cart
app.post('/api/cart/:userId/checkout', (req, res) => {
  const userId = req.params.userId;
  const cart = carts[userId];
  
  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }
  
  // Create orders for each item in cart
  const newOrders = cart.map(item => ({
    id: orders.length + 1,
    medicationId: item.medicationId,
    quantity: item.quantity,
    total: item.price * item.quantity,
    status: 'pending',
    createdAt: new Date().toISOString()
  }));
  
  // Add all orders to the orders array
  orders.push(...newOrders);
  
  // Clear cart
  carts[userId] = [];
  
  res.status(201).json(newOrders);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});