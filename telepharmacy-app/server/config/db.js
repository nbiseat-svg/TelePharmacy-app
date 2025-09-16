// Database configuration
const mongoose = require('mongoose');
require('dotenv').config;

// In-memory storage for demonstration purposes when MongoDB is not available
const users = new Map();

// Simple ID generator
let idCounter = 1;
const generateId = () => {
  return idCounter++;
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/telepharmacy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return { connected: true, users: null };
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Using in-memory storage for demonstration purposes');
    return { connected: false, users };
  }
};

// Helper functions for in-memory storage
const saveUser = (user) => {
  // Ensure user has an ID
  if (!user._id) {
    user._id = generateId().toString();
  }
  users.set(user._id, user);
  return user;
};

const findUserByEmail = (email) => {
  for (let user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
};

const findUserById = (id) => {
  return users.get(id);
};

module.exports = { connectDB, saveUser, findUserByEmail, findUserById, generateId };