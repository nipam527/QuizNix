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
  windowMs: 15 * 60 * 1000, // 15 minutes
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
app.use("/api/room", roomRoutes);
app.use("/api/question", questionRoutes);

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
