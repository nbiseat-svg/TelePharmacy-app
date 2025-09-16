const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios'); // Add axios for Google image search

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5181', // Allow requests from Vite dev server
  credentials: true
}));
app.use(express.json());

// Mock data with Ethiopian currency
const medications = [
  {
    _id: '1',
    name: 'Paracetamol',
    description: 'Pain reliever and fever reducer',
    price: 150, // ETB
    currency: 'ETB',
    category: 'pain-relief',
    dosage: '500mg',
    sideEffects: 'Nausea, stomach pain',
    contraindications: 'Liver disease',
    stock: 100,
    image: '/src/assets/med1.jpg'
  },
  {
    _id: '2',
    name: 'Amoxicillin',
    description: 'Antibiotic used to treat bacterial infections',
    price: 300, // ETB
    currency: 'ETB',
    category: 'antibiotics',
    dosage: '250mg',
    sideEffects: 'Diarrhea, nausea',
    contraindications: 'Allergy to penicillin',
    stock: 50,
    image: '/src/assets/med2.jpg'
  },
  {
    _id: '3',
    name: 'Loratadine',
    description: 'Antihistamine used to treat allergy symptoms',
    price: 200, // ETB
    currency: 'ETB',
    category: 'allergy',
    dosage: '10mg',
    sideEffects: 'Headache, drowsiness',
    contraindications: 'Severe kidney disease',
    stock: 75,
    image: '/src/assets/med3.jpg'
  }
];

const users = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'patient'
  },
  {
    _id: '2',
    name: 'Dr. Smith',
    email: 'drsmith@example.com',
    role: 'pharmacist'
  }
];

const prescriptions = [
  {
    _id: '1',
    patientId: '1',
    pharmacistId: '2',
    medications: ['1', '2'],
    dosageInstructions: 'Take one tablet twice daily with food',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const orders = [
  {
    _id: '1',
    userId: '1',
    items: [
      {
        medicationId: '1',
        quantity: 2,
        price: 150 // ETB
      }
    ],
    totalAmount: 300, // ETB
    currency: 'ETB',
    status: 'pending',
    createdAt: new Date()
  }
];

// Consultations data
const consultations = [
  {
    _id: '1',
    patientId: '1',
    pharmacistId: '2',
    type: 'video',
    scheduledAt: new Date(Date.now() + 86400000), // Tomorrow
    duration: 30, // minutes
    notes: 'Regular consultation',
    status: 'scheduled',
    createdAt: new Date()
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to TelePharmacy API' });
});

// Medication routes
app.get('/api/medications', (req, res) => {
  res.json(medications);
});

app.get('/api/medications/:id', (req, res) => {
  const medication = medications.find(m => m._id === req.params.id);
  if (medication) {
    res.json(medication);
  } else {
    res.status(404).json({ message: 'Medication not found' });
  }
});

// User routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u._id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Prescription routes
app.get('/api/prescriptions', (req, res) => {
  res.json(prescriptions);
});

app.get('/api/prescriptions/:id', (req, res) => {
  const prescription = prescriptions.find(p => p._id === req.params.id);
  if (prescription) {
    res.json(prescription);
  } else {
    res.status(404).json({ message: 'Prescription not found' });
  }
});

// Order routes
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o._id === req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Consultation routes
app.get('/api/consultations', (req, res) => {
  res.json(consultations);
});

app.get('/api/consultations/:id', (req, res) => {
  const consultation = consultations.find(c => c._id === req.params.id);
  if (consultation) {
    res.json(consultation);
  } else {
    res.status(404).json({ message: 'Consultation not found' });
  }
});

// Create consultation route
app.post('/api/consultations', (req, res) => {
  const { patientId, pharmacistId, type, scheduledAt, duration, notes } = req.body;
  
  // Create new consultation
  const newConsultation = {
    _id: (consultations.length + 1).toString(),
    patientId,
    pharmacistId,
    type,
    scheduledAt: new Date(scheduledAt),
    duration,
    notes,
    status: 'scheduled',
    createdAt: new Date()
  };
  
  consultations.push(newConsultation);
  res.status(201).json(newConsultation);
});

// Google image search route (mock implementation)
app.get('/api/medications/:id/image-search', async (req, res) => {
  const medication = medications.find(m => m._id === req.params.id);
  if (!medication) {
    return res.status(404).json({ message: 'Medication not found' });
  }
  
  // In a real implementation, we would use Google Images API
  // For now, we'll return a placeholder URL
  const imageUrl = `https://source.unsplash.com/300x300/?medicine,${encodeURIComponent(medication.name)}`;
  
  res.json({
    medicationId: medication._id,
    medicationName: medication.name,
    imageUrl: imageUrl
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});