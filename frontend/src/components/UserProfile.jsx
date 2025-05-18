import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { FaSignOutAlt, FaUsers, FaTrophy } from 'react-icons/fa';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);

      // Placeholder for fetching user's rooms and results
      // Replace with actual API calls
      const fetchData = async () => {
        try {
          // Mock API call for rooms
          const roomsResponse = await fetch('/api/user/rooms', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const roomsData = await roomsResponse.json();
          setRooms(roomsData || []);

          // Mock API call for quiz results
          const resultsResponse = await fetch('/api/user/results', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const resultsData = await resultsResponse.json();
          setResults(resultsData || []);
        } catch (err) {
          setError('Failed to load profile data');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-yellow-400 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-yellow-400 flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-yellow-400 p-4 pt-20"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 flex items-center">
          <FaUsers className="mr-2" /> {user?.username}'s Profile
        </h1>

        {/* Logout Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition duration-300"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>

        {/* User's Rooms */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Quiz Rooms</h2>
          {rooms.length === 0 ? (
            <p>No rooms found. Create or join a quiz room!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-black bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition duration-300"
                >
                  <h3 className="text-lg font-semibold">{room.name}</h3>
                  <p className="text-sm">Role: {room.role}</p>
                  <p className="text-sm">Created: {new Date(room.createdAt).toLocaleDateString()}</p>
                  <button
                    onClick={() => navigate(`/room/${room.id}`)}
                    className="mt-2 text-yellow-300 hover:text-yellow-200"
                  >
                    View Room
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quiz Results */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaTrophy className="mr-2" /> Quiz Results
          </h2>
          {results.length === 0 ? (
            <p>No quiz results yet. Take a quiz to see your scores!</p>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="bg-black bg-opacity-50 p-4 rounded-lg hover:bg-opacity-70 transition duration-300"
                >
                  <h3 className="text-lg font-semibold">{result.quizTitle}</h3>
                  <p className="text-sm">Score: {result.score}/{result.total}</p>
                  <p className="text-sm">
                    Percentage: {((result.score / result.total) * 100).toFixed(2)}%
                  </p>
                  <p className="text-sm">Date: {new Date(result.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;