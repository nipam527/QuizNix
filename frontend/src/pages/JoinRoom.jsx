import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const JoinRoom = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const joinRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.get(`/api/room/join/${code}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/quiz/${code}`);
    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black text-yellow-400 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md bg-black border border-yellow-400 p-8 rounded-2xl shadow-2xl"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Join Room
        </motion.h1>

        <motion.input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Room Code"
          className="w-full p-3 mb-6 bg-black border border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          whileFocus={{ scale: 1.03 }}
        />

        <motion.button
          onClick={joinRoom}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg transition duration-300 hover:bg-yellow-500"
        >
          Join Room
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default JoinRoom;
