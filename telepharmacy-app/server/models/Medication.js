const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  genericName: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String
  }],
  dosage: {
    type: String,
    required: true
  },
  strength: {
    type: String
  },
  manufacturer: {
    type: String,
    trim: true
  },
  sideEffects: [{
    type: String
  }],
  contraindications: [{
    type: String
  }],
  warnings: [{
    type: String
  }],
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  pharmacyLocations: [{
    pharmacyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pharmacy'
    },
    quantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Medication', medicationSchema);