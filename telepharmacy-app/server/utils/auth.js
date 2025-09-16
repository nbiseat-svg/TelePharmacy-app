const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { findUserById } = require('../config/db');

// Flag to indicate if we're using in-memory storage
let useInMemory = false;

// Function to set the storage mode
const setStorageMode = (isInMemory) => {
  useInMemory = isInMemory;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'telepharmacysecret', {
    expiresIn: '30d',
  });
};

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'telepharmacysecret');

      if (useInMemory) {
        // For in-memory storage, we need to find the user by ID
        const user = findUserById(decoded.id);
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(401).json({ message: 'Not authorized, user not found' });
        }
      } else {
        // MongoDB implementation
        req.user = await User.findById(decoded.id).select('-password');
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const pharmacist = (req, res, next) => {
  if (req.user && req.user.role === 'pharmacist') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a pharmacist' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = {
  generateToken,
  protect,
  pharmacist,
  admin,
  setStorageMode
};