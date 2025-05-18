const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./utils/logger');
require("dotenv").config();

const app = express();
const PORT = 4000;
const limiter = rateLimit({
  windowMs: 45 * 60 * 1000, // 15 minutes
  max: 400, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());

// Import quiz app routes
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/room");
const questionRoutes = require("./routes/question");
// Use quiz app routes
app.use("/api/auth", authRoutes);
app.use("/api/question", questionRoutes);
app.use('/api/room', roomRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.listen(PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${PORT}`);
});





// backend/server.js


// import express from 'express';
// import cors from 'cors';
// import helloRoutes from './routes/helloRoutes.js'; // correct relative path

// const app = express();
// const PORT = 4000;

// app.use(cors());
// app.use(express.json());

// // ✅ Mount the hello route
// app.use('/api', helloRoutes);

// app.listen(PORT, () => {
//   console.log(`✅ Server is running at http://localhost:${PORT}`);
// });







// const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Replace with your MongoDB connection string
// mongoose.connect('mongodb://localhost:27017/Simple', { useNewUrlParser: true, useUnifiedTopology: true });

// // Models
// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: { type: String, unique: true }, // Add email field
//   password: String, // Hashed password
//   role: { type: String, default: 'user' },
// });
// const User = mongoose.model('User', UserSchema);

// const RoomSchema = new mongoose.Schema({
//   name: String,
//   code: { type: String, unique: true },
//   creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   createdAt: { type: Date, default: Date.now },
// });
// const Room = mongoose.model('Room', RoomSchema);

// const ResultSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   quizTitle: String,
//   score: Number,
//   total: Number,
//   date: { type: Date, default: Date.now },
// });
// const Result = mongoose.model('Result', ResultSchema);

// // Middleware to verify JWT
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, '4fdde13c31e6e0722563b6329d0a19f7875faaa30048256efe04506a7944cf11');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: 'Invalid token' });
//   }
// };

// // Login route
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Compare password with hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, username: user.username, email: user.email, role: user.role },
//       '4fdde13c31e6e0722563b6329d0a19f7875faaa30048256efe04506a7944cf11',
//       { expiresIn: '1h' }
//     );

//     res.json({ token });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Existing routes (from previous setup)
// app.get('/api/user/rooms', authenticateToken, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const rooms = await Room.find({
//       $or: [{ creator: userId }, { participants: userId }],
//     });
//     const formattedRooms = rooms.map(room => ({
//       id: room._id,
//       name: room.name,
//       role: room.creator.toString() === userId ? 'creator' : 'participant',
//       createdAt: room.createdAt,
//     }));
//     res.json(formattedRooms);
//   } catch (error) {
//     console.error('Error fetching rooms:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.get('/api/user/results', authenticateToken, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const results = await Result.find({ user: userId });
//     const formattedResults = results.map(result => ({
//       id: result._id,
//       quizTitle: result.quizTitle,
//       score: result.score,
//       total: result.total,
//       date: result.date,
//     }));
//     res.json(formattedResults);
//   } catch (error) {
//     console.error('Error fetching results:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.get('/api/room/join/:code', authenticateToken, async (req, res) => {
//   try {
//     const { code } = req.params;
//     const userId = req.user.id;
//     const room = await Room.findOne({ code });
//     if (!room) {
//       return res.status(404).json({ message: 'Room not found' });
//     }
//     if (!room.participants.includes(userId)) {
//       room.participants.push(userId);
//       await room.save();
//     }
//     res.status(200).json({ message: 'Successfully joined room' });
//   } catch (error) {
//     console.error('Error joining room:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Start the server
// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });