const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/auth');
const { saveUser, findUserByEmail, findUserById, generateId } = require('../config/db');
const mongoose = require('mongoose');

// In-memory storage flag
let useInMemory = false;

// Initialize in-memory storage
const initializeStorage = (isConnected) => {
  useInMemory = !isConnected;
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  if (useInMemory) {
    // Check if user exists in memory
    const userExists = findUserByEmail(email);

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Create user in memory
    const user = {
      _id: generateId().toString(),
      name,
      email,
      password, // In a real app, this should be hashed
      role: role || 'patient',
      phone,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    saveUser(user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    // MongoDB implementation
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phone
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        preferredLanguage: user.preferredLanguage,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (useInMemory) {
    // Find user in memory
    const user = findUserByEmail(email);

    if (user && user.password === password) { // In a real app, this should compare hashed passwords
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } else {
    // MongoDB implementation
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        preferredLanguage: user.preferredLanguage,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (useInMemory) {
    // Find user in memory
    const user = findUserById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } else {
    // MongoDB implementation
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        preferredLanguage: user.preferredLanguage,
        profileImage: user.profileImage,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  if (useInMemory) {
    // Find and update user in memory
    const user = findUserById(req.user._id);

    if (user) {
      // Update user properties
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      if (req.body.address) {
        user.address = {
          street: req.body.address.street || '',
          city: req.body.address.city || '',
          state: req.body.address.state || '',
          zipCode: req.body.address.zipCode || '',
          country: req.body.address.country || ''
        };
      }

      if (req.body.dateOfBirth) {
        user.dateOfBirth = req.body.dateOfBirth;
      }

      if (req.body.gender) {
        user.gender = req.body.gender;
      }

      if (req.body.preferredLanguage) {
        user.preferredLanguage = req.body.preferredLanguage;
      }

      if (req.body.password) {
        user.password = req.body.password; // In a real app, this should be hashed
      }

      user.updatedAt = new Date();

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } else {
    // MongoDB implementation
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
      user.gender = req.body.gender || user.gender;
      user.preferredLanguage = req.body.preferredLanguage || user.preferredLanguage;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        address: updatedUser.address,
        dateOfBirth: updatedUser.dateOfBirth,
        gender: updatedUser.gender,
        preferredLanguage: updatedUser.preferredLanguage,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
});

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  initializeStorage
};