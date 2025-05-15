const Question = require('../models/Question');

exports.addQuestion = async (req, res) => {
  try {
    const { text, options, correctAnswer, roomCode } = req.body;
    const question = new Question({ text, options, correctAnswer, roomCode });
    await question.save();
    res.json({ message: 'Question added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add question' });
  }
};
