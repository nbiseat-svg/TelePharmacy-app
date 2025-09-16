import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import PaymentService from '../services/paymentService';
import { cartReset } from '../reducers/cartReducer';
import { useNotification } from '../contexts/NotificationContext'; // Added import for notification context
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useNotification(); // Added notification hooks

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.08 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phoneNumber: '',
    accountNumber: '',
    bankName: '',
    walletAddress: '',
    cryptoCurrency: 'BTC'
  });

  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/checkout');
    }
  }, [navigate, shippingAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePaymentData = () => {
    if (paymentMethod === 'Credit Card') {
      if (!paymentData.cardNumber || !paymentData.cardName || 
          !paymentData.expiryDate || !paymentData.cvv) {
        setError('Please fill in all credit card details');
        showError('Please fill in all credit card details'); // Added error notification
        return false;
      }
      
      if (!PaymentService.validateCreditCardNumber(paymentData.cardNumber)) {
        setError('Invalid credit card number');
        showError('Invalid credit card number'); // Added error notification
        return false;
      }
    } else if (paymentMethod === 'PayPal') {
      if (!paymentData.email) {
        setError('Please enter your PayPal email');
        showError('Please enter your PayPal email'); // Added error notification
        return false;
      }
    } else if (paymentMethod === 'Mobile Money') {
      if (!paymentData.phoneNumber) {
        setError('Please enter your phone number');
        showError('Please enter your phone number'); // Added error notification
        return false;
      }
    } else if (paymentMethod === 'Bank Transfer') {
      if (!paymentData.accountNumber || !paymentData.bankName) {
        setError('Please enter your bank account details');
        showError('Please enter your bank account details'); // Added error notification
        return false;
      }
    } else if (paymentMethod === 'Cryptocurrency') {
      if (!paymentData.walletAddress || !paymentData.cryptoCurrency) {
        setError('Please enter your cryptocurrency wallet address');
        showError('Please enter your cryptocurrency wallet address'); // Added error notification
        return false;
      }
    }
    
    return true;
  };

  const processPayment = async () => {
    if (!validatePaymentData()) {
      return;
    }

    setProcessing(true);
    setError('');
    setPaymentStatus('Processing payment...');

    try {
      let result;
      
      if (paymentMethod === 'Credit Card') {
        result = await PaymentService.processCreditCardPayment({
          cardNumber: paymentData.cardNumber,
          cardName: paymentData.cardName,
          expiryDate: paymentData.expiryDate,
          cvv: paymentData.cvv
        }, totalPrice);
      } else if (paymentMethod === 'PayPal') {
        result = await PaymentService.processPayPalPayment({
          email: paymentData.email
        }, totalPrice);
      } else if (paymentMethod === 'Mobile Money') {
        result = await PaymentService.processMobileMoneyPayment({
          phoneNumber: paymentData.phoneNumber
        }, totalPrice);
      } else if (paymentMethod === 'Bank Transfer') {
        result = await PaymentService.processBankTransferPayment({
          accountNumber: paymentData.accountNumber,
          bankName: paymentData.bankName
        }, totalPrice);
      } else if (paymentMethod === 'Cryptocurrency') {
        result = await PaymentService.processCryptoPayment({
          walletAddress: paymentData.walletAddress,
          currency: paymentData.cryptoCurrency
        }, totalPrice);
      }

      if (result.success) {
        setPaymentStatus(result.message);
        showSuccess('Payment processed successfully! Your order is being prepared.'); // Added success notification
        // Reset cart after successful payment
        dispatch(cartReset());
        // Navigate to order confirmation after a delay
        setTimeout(() => {
          navigate('/orders');
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
      showError(`Payment failed: ${err.message}`); // Added error notification
      setPaymentStatus('');
      setProcessing(false);
    }
  };

  return (
    <motion.div 
      className="payment-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="payment-container">
        <motion.div 
          className="payment-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Secure Payment</h2>
          <p>Complete your payment using {paymentMethod}</p>
        </motion.div>

        <div className="payment-content">
          <div className="payment-form-section">
            <motion.div 
              className="payment-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Payment Information</h3>
              
              {paymentMethod === 'Credit Card' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={handleInputChange}
                      disabled={processing}
                    />
                    {paymentData.cardNumber && (
                      <small className="card-type">
                        {PaymentService.getCardType(paymentData.cardNumber)}
                      </small>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cardName">Cardholder Name</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      value={paymentData.cardName}
                      onChange={handleInputChange}
                      disabled={processing}
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={handleInputChange}
                        disabled={processing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="password"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        disabled={processing}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'PayPal' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label htmlFor="email">PayPal Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      value={paymentData.email}
                      onChange={handleInputChange}
                      disabled={processing}
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'Mobile Money' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="+1234567890"
                      value={paymentData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={processing}
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'Bank Transfer' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label htmlFor="bankName">Bank Name</label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      placeholder="Enter your bank name"
                      value={paymentData.bankName}
                      onChange={handleInputChange}
                      disabled={processing}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="accountNumber">Account Number</label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      placeholder="Enter your account number"
                      value={paymentData.accountNumber}
                      onChange={handleInputChange}
                      disabled={processing}
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'Cryptocurrency' && (
                <div className="payment-form">
                  <div className="form-group">
                    <label htmlFor="cryptoCurrency">Cryptocurrency</label>
                    <select
                      id="cryptoCurrency"
                      name="cryptoCurrency"
                      value={paymentData.cryptoCurrency}
                      onChange={handleInputChange}
                      disabled={processing}
                    >
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH)</option>
                      <option value="USDT">Tether (USDT)</option>
                      <option value="USDC">USD Coin (USDC)</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="walletAddress">Wallet Address</label>
                    <input
                      type="text"
                      id="walletAddress"
                      name="walletAddress"
                      placeholder="Enter your wallet address"
                      value={paymentData.walletAddress}
                      onChange={handleInputChange}
                      disabled={processing}
                    />
                  </div>
                  
                  <div className="crypto-info">
                    <p>Send exactly {totalPrice} USD worth of {paymentData.cryptoCurrency} to the wallet address above.</p>
                    <p>Transaction will be confirmed after 1 network confirmation.</p>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
              {paymentStatus && (
                <div className={`payment-status ${paymentStatus.includes('successful') ? 'success' : ''}`}>
                  {paymentStatus}
                </div>
              )}
              
              <div className="payment-actions">
                <button 
                  className="btn-primary"
                  onClick={processPayment}
                  disabled={processing}
                >
                  {processing ? 'Processing...' : `Pay ${PaymentService.formatCurrency(totalPrice)}`}
                </button>
                
                <Link to="/placeorder" className="btn-secondary">
                  Back
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="payment-summary">
            <motion.div 
              className="summary-box"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Order Summary</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Items</span>
                  <span>{PaymentService.formatCurrency(itemsPrice)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{PaymentService.formatCurrency(shippingPrice)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>{PaymentService.formatCurrency(taxPrice)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{PaymentService.formatCurrency(totalPrice)}</span>
                </div>
              </div>
              
              <div className="payment-method-info">
                <h4>Payment Method</h4>
                <p>{paymentMethod}</p>
              </div>
              
              <div className="secure-payment">
                <div className="secure-icon">🔒</div>
                <p>Secure SSL Encryption</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Payment;