import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { saveShippingAddressAction, savePaymentMethodAction, saveDeliveryOptionAction } from '../actions/cartActions';
import DeliveryService from '../services/deliveryService';
import PaymentService from '../services/paymentService';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [deliveryOption, setDeliveryOption] = useState('standard');

  const { address, city, postalCode, country } = shippingAddress;

  const deliveryOptions = DeliveryService.getDeliveryOptions();
  const paymentMethods = PaymentService.getPaymentMethods();

  const submitHandler = (e) => {
    e.preventDefault();
    // Save shipping address, payment method, and delivery option to state
    dispatch(saveShippingAddressAction(shippingAddress));
    dispatch(savePaymentMethodAction(paymentMethod));
    dispatch(saveDeliveryOptionAction(deliveryOption));
    // Navigate to place order page
    navigate('/placeorder');
  };

  // Calculate order totals
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingPrice = deliveryOptions.find(option => option.id === deliveryOption)?.price || 0;
  const taxPrice = Number((0.08 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  return (
    <motion.div 
      className="checkout-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="checkout-container">
        <motion.div 
          className="checkout-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Checkout</h2>
          <p>Complete your order information</p>
        </motion.div>

        <div className="checkout-content">
          <div className="checkout-form">
            <motion.div 
              className="checkout-step"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Shipping Address</h3>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter address"
                    value={address}
                    required
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, address: e.target.value })
                    }
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      placeholder="Enter city"
                      value={city}
                      required
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      placeholder="Enter postal code"
                      value={postalCode}
                      required
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    placeholder="Enter country"
                    value={country}
                    required
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, country: e.target.value })
                    }
                  />
                </div>
              </form>
            </motion.div>

            <motion.div 
              className="checkout-step"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Delivery Options</h3>
              <div className="delivery-options">
                {deliveryOptions.map((option) => (
                  <div 
                    key={option.id} 
                    className={`delivery-option ${deliveryOption === option.id ? 'selected' : ''}`}
                    onClick={() => setDeliveryOption(option.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setDeliveryOption(option.id);
                      }
                    }}
                  >
                    <input
                      type="radio"
                      id={`delivery-${option.id}`}
                      name="deliveryOption"
                      value={option.id}
                      checked={deliveryOption === option.id}
                      onChange={() => setDeliveryOption(option.id)}
                    />
                    <label htmlFor={`delivery-${option.id}`}>
                      <div className="option-header">
                        <span className="option-name">{option.name}</span>
                        <span className="option-price">${option.price.toFixed(2)}</span>
                      </div>
                      <div className="option-description">{option.description}</div>
                      <div className="option-estimated">Estimated: {option.estimatedDays}</div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="checkout-step"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3>Payment Method</h3>
              <div className="payment-methods">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className={`payment-option ${paymentMethod === method.name ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod(method.name)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setPaymentMethod(method.name);
                      }
                    }}
                  >
                    <input
                      type="radio"
                      id={`payment-${method.id}`}
                      name="paymentMethod"
                      value={method.name}
                      checked={paymentMethod === method.name}
                      onChange={() => setPaymentMethod(method.name)}
                    />
                    <label htmlFor={`payment-${method.id}`}>
                      <div className="option-header">
                        <span className="option-name">{method.icon} {method.name}</span>
                      </div>
                      <div className="option-description">{method.description}</div>
                    </label>
                  </div>
                ))}
              </div>

              <button type="submit" className="btn-primary">
                Continue
              </button>
            </motion.div>
          </div>

          <div className="checkout-summary">
            <motion.div 
              className="summary-box"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3>Order Summary</h3>
              <div className="summary-items">
                {cartItems.map((item) => (
                  <div className="summary-item" key={item.medication}>
                    <div className="item-info">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h4>{item.name}</h4>
                        <p>Qty: {item.qty}</p>
                      </div>
                    </div>
                    <div className="item-price">
                      ${item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${itemsPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
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
              
              <Link to="/cart" className="btn-secondary">
                Back to Cart
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;