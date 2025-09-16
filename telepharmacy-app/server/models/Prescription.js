const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  pharmacist: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  medications: [{
    medication: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Medication'
    },
    name: String,
    dosage: String,
    quantity: Number,
    instructions: String,
    refills: {
      type: Number,
      default: 0
    }
  }],
  diagnosis: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'filled', 'expired'],
    default: 'pending'
  },
  issuedDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date
  },
  refillRequests: [{
    requestedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    pharmacistNotes: String,
    approvedAt: Date,
    rejectedAt: Date
  }],
  // Additional tracking fields
  tracking: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    filledAt: Date,
    pickedUpAt: Date,
    deliveredAt: Date
  },
  // Prescription details
  prescriptionType: {
    type: String,
    enum: ['new', 'refill', 'repeat'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['routine', 'urgent', 'asap'],
    default: 'routine'
  },
  // Communication
  patientNotes: String,
  pharmacistNotes: String
}, {
  timestamps: true
});

// Update the updatedAt field before saving
prescriptionSchema.pre('save', function(next) {
  this.tracking.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Prescription', prescriptionSchema);