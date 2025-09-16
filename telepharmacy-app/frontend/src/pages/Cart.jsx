import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../actions/cartActions';
import { motion } from 'framer-motion';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCartAction(id));
  };

  const addToCartHandler = (id, qty) => {
    dispatch(addToCartAction(id, qty));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <motion.div 
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cart-container">
        <motion.div 
          className="cart-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Shopping Cart</h2>
          <p>You have {cartItems.length} items in your cart</p>
        </motion.div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h3>Your cart is empty</h3>
            <Link to="/medications" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <motion.div 
                  className="cart-item"
                  key={item.medication}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <Link to={`/medication/${item.medication}`}>
                      <h3>{item.name}</h3>
                    </Link>
                    <p className="item-price">${item.price}</p>
                  </div>
                  
                  <div className="item-quantity">
                    <label htmlFor={`qty-${item.medication}`}>Quantity:</label>
                    <select
                      id={`qty-${item.medication}`}
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item.medication, Number(e.target.value))
                      }
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="item-total">
                    <p>${(item.qty * item.price).toFixed(2)}</p>
                  </div>
                  
                  <button
                    className="remove-button"
                    onClick={() => removeFromCartHandler(item.medication)}
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-box">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</span>
                  <span>
                    ${cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>
                    ${(cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0) * 0.08)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>
                    ${(cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0) * 1.08)
                      .toFixed(2)}
                  </span>
                </div>
                <button
                  className="btn-primary"
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
              
              <Link to="/medications" className="btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;