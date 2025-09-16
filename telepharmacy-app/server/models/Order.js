const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [{
    medication: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Medication'
    },
    name: String,
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: String
  }],
  shippingAddress: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  // Delivery tracking fields
  deliveryTracking: {
    trackingNumber: {
      type: String
    },
    carrier: {
      type: String
    },
    estimatedDeliveryDate: {
      type: Date
    },
    deliverySteps: [{
      status: {
        type: String,
        enum: ['pending', 'picked', 'in-transit', 'out-for-delivery', 'delivered'],
        default: 'pending'
      },
      location: {
        type: String
      },
      timestamp: {
        type: Date,
        default: Date.now
      },
      notes: {
        type: String
      }
    }]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);