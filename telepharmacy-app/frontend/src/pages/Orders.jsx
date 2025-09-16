import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import OrderService from '../services/orderService';
import { useNotification } from '../contexts/NotificationContext'; // Added import for notification context
import './Orders.css';

const Orders = () => {
  const dispatch = useDispatch();
  const { showInfo } = useNotification(); // Added notification hooks

  const userLogin = useSelector((state) => state.auth);
  const { userInfo } = userLogin;

  // Mock orders data - in a real app, this would come from an API
  const orders = [
    {
      _id: '1',
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
    },
    {
      _id: '2',
      orderItems: [
        {
          name: 'Amoxicillin 250mg',
          qty: 1,
          price: 12.50,
          image: '/src/assets/med2.jpg',
        },
        {
          name: 'Ibuprofen 200mg',
          qty: 3,
          price: 8.75,
          image: '/src/assets/med3.jpg',
        },
      ],
      totalPrice: 38.75,
      isPaid: true,
      paidAt: '2025-09-05T09:15:00Z',
      isDelivered: true,
      deliveredAt: '2025-09-07T16:45:00Z',
      createdAt: '2025-09-04T11:30:00Z',
    },
  ];

  useEffect(() => {
    // Show info notification when orders page loads
    if (orders.length > 0) {
      showInfo('You have ' + orders.length + ' orders in your history');
    }
  }, []);

  return (
    <motion.div 
      className="orders-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="orders-container">
        <motion.div 
          className="orders-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>My Orders</h2>
          <p>View your order history and track deliveries</p>
        </motion.div>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <h3>You haven't placed any orders yet</h3>
            <Link to="/medications" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <motion.div 
            className="orders-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-header">
                  <div>
                    <h3>Order #{order._id}</h3>
                    <p className="order-date">
                      Placed on {OrderService.formatOrderDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="order-status">
                    <span className={`status ${OrderService.getStatusClass(order)}`}>
                      {OrderService.getStatusDisplayText(order)}
                    </span>
                  </div>
                </div>
                
                <div className="order-items">
                  {order.orderItems.map((item, index) => (
                    <div className="order-item" key={index}>
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.qty}</p>
                      </div>
                      <div className="item-price">
                        {OrderService.formatCurrency(item.qty * item.price)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="order-footer">
                  <div className="order-total">
                    <span>Total: {OrderService.formatCurrency(order.totalPrice)}</span>
                  </div>
                  <div className="order-actions">
                    <Link to={`/order/${order._id}`} className="btn-secondary">
                      View Details
                    </Link>
                    {!order.isDelivered && (
                      <Link to={`/delivery/${order._id}`} className="btn-primary">
                        Track Delivery
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Orders;