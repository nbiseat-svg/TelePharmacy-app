// Service to handle order API calls
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

class OrderService {
  // Create a new order
  static async createOrder(orderData) {
    try {
      const response = await api.post('/', orderData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating order');
    }
  }

  // Get order by ID
  static async getOrderById(id) {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching order');
    }
  }

  // Update order to paid
  static async updateOrderToPaid(id, paymentResult) {
    try {
      const response = await api.put(`/${id}/pay`, paymentResult);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating order payment status');
    }
  }

  // Update order to delivered
  static async updateOrderToDelivered(id) {
    try {
      const response = await api.put(`/${id}/deliver`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error updating order delivery status');
    }
  }

  // Get logged in user orders
  static async getMyOrders() {
    try {
      const response = await api.get('/myorders');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching orders');
    }
  }

  // Get all orders (admin only)
  static async getAllOrders() {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching orders');
    }
  }

  // Format order date
  static formatOrderDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get status display text
  static getStatusDisplayText(order) {
    if (order.isDelivered) {
      return 'Delivered';
    } else if (order.isPaid) {
      return 'Paid';
    } else {
      return 'Pending';
    }
  }

  // Get status class for styling
  static getStatusClass(order) {
    if (order.isDelivered) {
      return 'status-delivered';
    } else if (order.isPaid) {
      return 'status-paid';
    } else {
      return 'status-pending';
    }
  }

  // Calculate order totals
  static calculateOrderTotals(orderItems) {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.08 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);
    
    return {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice: taxPrice.toFixed(2),
      totalPrice
    };
  }
}

export default OrderService;