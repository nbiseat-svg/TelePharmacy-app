// Service to handle delivery tracking API calls
import axios from 'axios';

const API_URL = '/api/orders';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class DeliveryService {
  // Get delivery tracking information for an order
  static async getDeliveryTracking(orderId) {
    try {
      const response = await api.get(`/${orderId}`);
      return response.data.deliveryTracking;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching delivery tracking');
    }
  }

  // Update delivery tracking information (admin only)
  static async updateDeliveryTracking(orderId, trackingData) {
    try {
      const response = await api.put(`/${orderId}/tracking`, trackingData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating delivery tracking');
    }
  }

  // Add a delivery step (admin only)
  static async addDeliveryStep(orderId, stepData) {
    try {
      const response = await api.put(`/${orderId}/tracking`, {
        deliveryStep: stepData
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error adding delivery step');
    }
  }

  // Get available delivery options
  static getDeliveryOptions() {
    return [
      {
        id: 'standard',
        name: 'Standard Delivery',
        description: 'Delivery within 3-5 business days',
        price: 5.99,
        estimatedDays: '3-5 business days',
        available: true
      },
      {
        id: 'express',
        name: 'Express Delivery',
        description: 'Delivery within 1-2 business days',
        price: 12.99,
        estimatedDays: '1-2 business days',
        available: true
      },
      {
        id: 'same-day',
        name: 'Same Day Delivery',
        description: 'Delivery within the same day (before 6 PM)',
        price: 19.99,
        estimatedDays: 'Same day',
        available: true
      },
      {
        id: 'pickup',
        name: 'In-Store Pickup',
        description: 'Pick up from our pharmacy location',
        price: 0,
        estimatedDays: 'Available immediately',
        available: true
      }
    ];
  }

  // Get status display text
  static getStatusDisplayText(status) {
    const statusMap = {
      'pending': 'Order Placed',
      'picked': 'Order Picked',
      'in-transit': 'In Transit',
      'out-for-delivery': 'Out for Delivery',
      'delivered': 'Delivered'
    };
    return statusMap[status] || status;
  }

  // Get status class for styling
  static getStatusClass(status) {
    const classMap = {
      'pending': 'status-pending',
      'picked': 'status-picked',
      'in-transit': 'status-in-transit',
      'out-for-delivery': 'status-out-for-delivery',
      'delivered': 'status-delivered'
    };
    return classMap[status] || 'status-default';
  }

  // Format delivery date
  static formatDeliveryDate(dateString) {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get current delivery status
  static getCurrentDeliveryStatus(deliverySteps) {
    if (!deliverySteps || deliverySteps.length === 0) return 'pending';
    return deliverySteps[deliverySteps.length - 1].status;
  }

  // Get delivery progress percentage
  static getDeliveryProgress(deliverySteps) {
    if (!deliverySteps || deliverySteps.length === 0) return 0;
    
    const statusOrder = ['pending', 'picked', 'in-transit', 'out-for-delivery', 'delivered'];
    const currentStatus = deliverySteps[deliverySteps.length - 1].status;
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    return ((currentIndex + 1) / statusOrder.length) * 100;
  }

  // Calculate estimated delivery date based on delivery option
  static calculateEstimatedDelivery(deliveryOption, orderDate) {
    const date = new Date(orderDate);
    
    switch (deliveryOption.id) {
      case 'same-day':
        // Same day delivery
        return new Date(date.setHours(18, 0, 0, 0)); // 6 PM same day
      case 'express':
        // 1-2 business days
        date.setDate(date.getDate() + 2);
        return date;
      case 'standard':
        // 3-5 business days
        date.setDate(date.getDate() + 5);
        return date;
      default:
        // Default to 3 business days
        date.setDate(date.getDate() + 3);
        return date;
    }
  }
}

export default DeliveryService;