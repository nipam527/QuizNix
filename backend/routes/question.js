const express = require('express');
    const jwt = require('jsonwebtoken');
    const Question = require('../models/Question');
    const Room = require('../models/Room');
    const router = express.Router();

    const authenticate = (req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1];
      console.log('Token received:', token ? 'Yes' : 'No'); // Debug
      if (!token) return res.status(401).json({ error: 'No token provided' });
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded); // Debug
        req.userId = decoded.userId;
        next();
      } catch (error) {
        console.error('Token verification error:', error); // Debug
        res.status(401).json({ error: 'Invalid token' });
      }
    };

    router.post('/create', authenticate, async (req, res) => {
      const { text, options, correctAnswer, roomCode } = req.body;
      console.log('Adding question for room:', roomCode); // Debug
      try {
        const room = await Room.findOne({ code: roomCode, user: req.userId });
        console.log('Room found:', !!room); // Debug
        if (!room) return res.status(404).json({ error: 'Room not found or unauthorized' });
        const question = new Question({ text, options, correctAnswer, room: room._id });
        await question.save();
        room.questions.push(question._id);
        await room.save();
        res.status(201).json(question);
      } catch (error) {
        console.error('Add question error:', error); // Debug
        res.status(400).json({ error: error.message });
      }
    });

    router.get('/room/:code', authenticate, async (req, res) => {
      try {
        const room = await Room.findOne({ code: req.params.code });
        if (!room) return res.status(404).json({ error: 'Room not found' });
        const questions = await Question.find({ room: room._id });
        res.json(questions);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    module.exports = router;