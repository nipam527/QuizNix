// const express = require('express');
//   const jwt = require('jsonwebtoken');
//   const Room = require('../models/Room');
//   const router = express.Router();

//   const authenticate = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ error: 'No token provided' });
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.userId = decoded.userId;
//       next();
//     } catch (error) {
//       res.status(401).json({ error: 'Invalid token' });
//     }
//   };

//   router.post('/create', authenticate, async (req, res) => {
//     const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     try {
//       const room = new Room({ code, user: req.userId });
//       await room.save();
//       res.status(201).json({ code });
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

//   router.get('/join/:code', authenticate, async (req, res) => {
//     try {
//       const room = await Room.findOne({ code: req.params.code }).populate('questions');
//       if (!room) return res.status(404).json({ error: 'Room not found' });
//       res.json(room);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

//   module.exports = router;








const express = require('express');
const jwt = require('jsonwebtoken');
const Room = require('../models/Room');
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

router.post('/create', authenticate, restrictToAdmin, async (req, res) => {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  try {
    const room = new Room({ code, user: req.userId, allowedUsers: [] });
    await room.save();
    res.status(201).json({ code });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/join/:code', authenticate, async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code }).populate('questions');
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/all', authenticate, async (req, res) => {
  try {
    let rooms;
    if (req.userRole === 'admin') {
      rooms = await Room.find().select('code createdAt');
    } else {
      rooms = await Room.find({ $or: [{ user: req.userId }, { allowedUsers: req.userId }] }).select('code createdAt');
    }
    res.json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/update-allowed-users/:code', authenticate, restrictToAdmin, async (req, res) => {
  const { allowedUsers } = req.body;
  try {
    const room = await Room.findOne({ code: req.params.code });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    room.allowedUsers = allowedUsers || [];
    await room.save();
    res.json({ message: 'Allowed users updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete/:code', authenticate, restrictToAdmin, async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ code: req.params.code });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;