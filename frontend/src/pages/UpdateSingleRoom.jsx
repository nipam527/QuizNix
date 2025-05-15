// src/pages/UpdateSingleRoom.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateSingleRoom = () => {
  const { code } = useParams();
  const [allowedUsers, setAllowedUsers] = useState('');
  const navigate = useNavigate();

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/room/update-allowed-users/${code}`,
        { allowedUsers: allowedUsers.split(',').map((id) => id.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Allowed users updated!');
      navigate('/');
    } catch (error) {
      alert('Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-6">
      <h1 className="text-2xl font-bold mb-4">Update Room: {code}</h1>
      <textarea
        placeholder="Enter comma-separated user IDs"
        className="w-full p-2 rounded bg-gray-900 text-white"
        rows="5"
        value={allowedUsers}
        onChange={(e) => setAllowedUsers(e.target.value)}
      />
      <button
        onClick={handleUpdate}
        className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500"
      >
        Update
      </button>
      <button
        onClick={() => navigate('/')}
        className="mt-4 ml-4 bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600"
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateSingleRoom;
