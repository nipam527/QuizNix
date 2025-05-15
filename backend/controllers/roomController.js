const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  try {
    const userId = req.user.id;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newRoom = new Room({ code, createdBy: userId });
    await newRoom.save();
    res.json({ code });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create room' });
  }
};

exports.updateAllowedUsers = async (req, res) => {
  try {
    const { code } = req.params;
    const { allowedUsers } = req.body;
    const room = await Room.findOne({ code });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    room.allowedUsers = allowedUsers;
    await room.save();

    res.json({ message: 'Allowed users updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update allowed users' });
  }
};
