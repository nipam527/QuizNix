// src/pages/UpdateRooms.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchRooms = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/room/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(res.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch rooms');
    }
  };

  const deleteRoom = async (code) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/room/delete/${code}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRooms(); // Refresh the list
    } catch (error) {
      alert('Failed to delete room');
    }
  };

  const updateAllowedUsers = async (code) => {
    const allowedUsers = prompt('Enter comma-separated user IDs:');
    if (!allowedUsers) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/room/update-allowed-users/${code}`,
        { allowedUsers: allowedUsers.split(',').map((id) => id.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Allowed users updated!');
    } catch (error) {
      alert('Update failed');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-4">
      <h1 className="text-3xl font-bold mb-4">Update Rooms</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.code} className="bg-gray-800 p-4 rounded-lg shadow">
            <p><strong>Room Code:</strong> {room.code}</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => updateAllowedUsers(room.code)}
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Update Users
              </button>
              <button
                onClick={() => deleteRoom(room.code)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Room
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-6 bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500"
      >
        Back to Home
      </button>
    </div>
  );
};

export default UpdateRooms;
