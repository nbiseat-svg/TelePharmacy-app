import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { cartReset } from '../reducers/cartReducer';
import DeliveryService from '../services/deliveryService';
import PaymentService from '../services/paymentService';
import { useNotification } from '../contexts/NotificationContext'; // Added import for notification context
import './PlaceOrder.css';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useNotification(); // Added notification hooks

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // Get delivery option from localStorage or default to standard
  const [deliveryOption, setDeliveryOption] = useState(() => {
    const savedDeliveryOption = localStorage.getItem('deliveryOption');
    return savedDeliveryOption || 'standard';
  });

  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const deliveryOptions = DeliveryService.getDeliveryOptions();
  const selectedDeliveryOption = deliveryOptions.find(option => option.id === deliveryOption) || deliveryOptions[0];
  const shippingPrice = selectedDeliveryOption.price;
  const taxPrice = Number((0.08 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/checkout');
    }
  }, [navigate, shippingAddress]);

  const placeOrderHandler = async () => {
    setProcessing(true);
    setPaymentStatus('Processing payment...');

    // Simulate payment processing
    setTimeout(() => {
      // In a real application, this would connect to a payment gateway
      setPaymentStatus('Payment successful!');
      
      // Show success notification
      showSuccess('Order placed successfully! Thank you for your purchase.');
      
      // Create order in backend
      setTimeout(() => {
        // Reset cart after successful order
        dispatch(cartReset());
        setProcessing(false);
        // Navigate to order confirmation page
        navigate('/orders');
      }, 1000);
    }, 2000);
  };

  // Get payment method details
  const paymentMethods = PaymentService.getPaymentMethods();
  const selectedPaymentMethod = paymentMethods.find(method => method.name === paymentMethod) || paymentMethods[0];

  return (
    <motion.div 
      className="placeorder-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="placeorder-container">
        <motion.div 
          className="placeorder-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Place Order</h2>
          <p>Review your order and complete payment</p>
        </motion.div>

        <div className="placeorder-content">
          <div className="placeorder-details">
            <motion.div 
              className="placeorder-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Shipping Address</h3>
              <div className="placeorder-info">
                <p>{shippingAddress.address}</p>
                <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
                <p>{shippingAddress.country}</p>
              </div>
            </motion.div>

            <motion.div 
              className="placeorder-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Delivery Option</h3>
              <div className="placeorder-info">
                <p><strong>{selectedDeliveryOption.name}</strong></p>
                <p>{selectedDeliveryOption.description}</p>
                <p>Estimated: {selectedDeliveryOption.estimatedDays}</p>
              </div>
            </motion.div>

            <motion.div 
              className="placeorder-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3>Payment Method</h3>
              <div className="placeorder-info">
                <p><strong>{selectedPaymentMethod.name}</strong></p>
                <p>{selectedPaymentMethod.description}</p>
              </div>
            </motion.div>

            <motion.div 
              className="placeorder-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3>Order Items</h3>
              <div className="placeorder-items">
                {cartItems.map((item, index) => (
                  <div className="placeorder-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <p>Quantity: {item.qty}</p>
                    </div>
                    <div className="item-price">
                      ${item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="placeorder-summary">
            <motion.div 
              className="summary-box"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3>Order Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Items</span>
                  <span>${itemsPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery ({selectedDeliveryOption.name})</span>
                  <span>${shippingPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>${taxPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              {paymentStatus && (
                <div className={`payment-status ${paymentStatus.includes('successful') ? 'success' : ''}`}>
                  {paymentStatus}
                </div>
              )}

              <button 
                className="btn-primary place-order-btn"
                onClick={() => navigate('/payment')}
                disabled={processing}
              >
                Proceed to Payment
              </button>

              <Link to="/checkout" className="btn-secondary">
                Back to Checkout
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceOrder;