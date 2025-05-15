const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
