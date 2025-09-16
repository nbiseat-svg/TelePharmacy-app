import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import DeliveryService from '../services/deliveryService';
import OrderService from '../services/orderService';
import './DeliveryTracking.css';

const DeliveryTracking = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  
  const [order, setOrder] = useState(null);
  const [deliveryTracking, setDeliveryTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mock order data - in a real app, this would come from an API
  const mockOrder = {
    _id: id,
    orderItems: [
      {
        name: 'Paracetamol 500mg',
        qty: 2,
        price: 5.99,
        image: '/src/assets/med1.jpg',
      },
    ],
    totalPrice: 11.98,
    isPaid: true,
    paidAt: '2025-09-10T10:30:00Z',
    isDelivered: false,
    createdAt: '2025-09-09T14:20:00Z',
    deliveryTracking: {
      trackingNumber: 'TRK123456789',
      carrier: 'EthioPost',
      estimatedDeliveryDate: '2025-09-15T10:00:00Z',
      deliverySteps: [
        {
          status: 'pending',
          location: 'Pharmacy Warehouse',
          timestamp: '2025-09-10T11:00:00Z',
          notes: 'Order placed and being processed'
        },
        {
          status: 'picked',
          location: 'Pharmacy Warehouse',
          timestamp: '2025-09-11T09:30:00Z',
          notes: 'Order picked and packaged'
        },
        {
          status: 'in-transit',
          location: 'Distribution Center',
          timestamp: '2025-09-12T14:15:00Z',
          notes: 'Order in transit to local delivery facility'
        },
        {
          status: 'out-for-delivery',
          location: 'Local Delivery Facility',
          timestamp: '2025-09-14T08:00:00Z',
          notes: 'Order out for delivery'
        }
      ]
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // In a real app, this would fetch from API
        // const orderData = await OrderService.getOrderById(id);
        // const trackingData = await DeliveryService.getDeliveryTracking(id);
        
        // Simulate API calls
        setTimeout(() => {
          setOrder(mockOrder);
          setDeliveryTracking(mockOrder.deliveryTracking);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchOrderDetails();
    }
  }, [id, user]);

  if (loading) {
    return (
      <div className="delivery-tracking-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading delivery tracking information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="delivery-tracking-page">
        <div className="error-container">
          <p>Error: {error}</p>
          <Link to="/orders" className="btn-primary">Back to Orders</Link>
        </div>
      </div>
    );
  }

  if (!order || !deliveryTracking) {
    return (
      <div className="delivery-tracking-page">
        <div className="error-container">
          <p>Order not found</p>
          <Link to="/orders" className="btn-primary">Back to Orders</Link>
        </div>
      </div>
    );
  }

  const currentStatus = DeliveryService.getCurrentDeliveryStatus(deliveryTracking.deliverySteps);
  const progressPercentage = DeliveryService.getDeliveryProgress(deliveryTracking.deliverySteps);

  return (
    <motion.div 
      className="delivery-tracking-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="delivery-tracking-container">
        <motion.div 
          className="delivery-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Delivery Tracking</h2>
          <p>Track your order #{order._id}</p>
        </motion.div>

        <motion.div 
          className="delivery-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="tracking-info">
            <div className="tracking-details">
              <div className="detail-row">
                <span className="label">Tracking Number:</span>
                <span className="value">{deliveryTracking.trackingNumber}</span>
              </div>
              <div className="detail-row">
                <span className="label">Carrier:</span>
                <span className="value">{deliveryTracking.carrier}</span>
              </div>
              <div className="detail-row">
                <span className="label">Estimated Delivery:</span>
                <span className="value">{DeliveryService.formatDeliveryDate(deliveryTracking.estimatedDeliveryDate)}</span>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="progress-steps">
                {['pending', 'picked', 'in-transit', 'out-for-delivery', 'delivered'].map((status, index) => (
                  <div 
                    key={status} 
                    className={`step ${currentStatus === status || progressPercentage > (index * 20) ? 'completed' : ''}`}
                  >
                    <div className="step-icon">
                      {currentStatus === status ? '📍' : index < progressPercentage / 20 ? '✅' : '⏳'}
                    </div>
                    <div className="step-label">
                      {DeliveryService.getStatusDisplayText(status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="delivery-steps">
            <h3>Delivery Timeline</h3>
            <div className="steps-container">
              {deliveryTracking.deliverySteps.map((step, index) => (
                <div className="step-card" key={index}>
                  <div className="step-header">
                    <div className="step-status">
                      <span className={`status ${DeliveryService.getStatusClass(step.status)}`}>
                        {DeliveryService.getStatusDisplayText(step.status)}
                      </span>
                    </div>
                    <div className="step-time">
                      {DeliveryService.formatDeliveryDate(step.timestamp)}
                    </div>
                  </div>
                  <div className="step-location">
                    <div className="location-icon">📍</div>
                    <div className="location-text">{step.location}</div>
                  </div>
                  {step.notes && (
                    <div className="step-notes">
                      {step.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {order.orderItems.map((item, index) => (
                <div className="order-item" key={index}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.qty}</p>
                  </div>
                  <div className="item-price">
                    ${item.qty * item.price}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total: ${order.totalPrice}</span>
            </div>
          </div>

          <div className="actions">
            <Link to="/orders" className="btn-secondary">Back to Orders</Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DeliveryTracking;