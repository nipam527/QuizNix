const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Room = require('../models/Room');

router.get('/:code', auth, async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code }).populate('questions');
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/submit/:code', auth, async (req, res) => {
  const { answers } = req.body;
  try {
    const room = await Room.findOne({ code: req.params.code }).populate('questions');
    if (!room) return res.status(404).json({ error: 'Room not found' });

    let score = 0;
    const total = room.questions.length;
    const results = room.questions.map((q, idx) => {
      const userAnswer = answers[idx];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) score++;
      return { question: q.text, userAnswer, correctAnswer: q.correctAnswer, isCorrect };
    });

    res.json({ score, total, results });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;