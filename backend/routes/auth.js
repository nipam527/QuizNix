// const express = require('express');
//   const jwt = require('jsonwebtoken');
//   const User = require('../models/User');
//   const router = express.Router();

//   router.post('/register', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = new User({ email, password });
//       await user.save();
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.status(201).json({ token });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

//   router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await User.findOne({ email });
//       if (!user || !(await user.comparePassword(password))) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

//   module.exports = router;


const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token received:', token ? 'Yes' : 'No');
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

const restrictToAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

router.post('/register', async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5d' });
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, refreshToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;
  console.log('Login attempt:', { email });
  try {
    const user = await User.findOne({ email });
    console.log('User found:', !!user);
    if (!user || !(await user.comparePassword(password))) {
      console.log('Invalid credentials for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    res.json({ token, refreshToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: error.message });
  }
});

router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: 'Invalid refresh token' });

    const newToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});

router.get('/users', authenticate, restrictToAdmin, async (req, res) => {
  try {
    const users = await User.find().select('email _id createdAt');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete-user/:id', authenticate, restrictToAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;