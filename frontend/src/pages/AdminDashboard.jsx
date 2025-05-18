// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../utils/axiosInstance';
// import { motion } from 'framer-motion';
// import { jwtDecode } from 'jwt-decode';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
// import { FiSearch, FiFilter } from 'react-icons/fi';
// import Loading from '../components/Loading';

// const AdminDashboard = () => {
//   const [rooms, setRooms] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [filteredRooms, setFilteredRooms] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loadingRooms, setLoadingRooms] = useState(false);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [error, setError] = useState('');
//   const [roomSearch, setRoomSearch] = useState('');
//   const [userSearch, setUserSearch] = useState('');
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//       return;
//     }
//     try {
//       const decoded = jwtDecode(token);
//       if (decoded.role !== 'admin') {
//         navigate('/');
//       } else {
//         fetchRooms();
//         fetchUsers();
//       }
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       localStorage.removeItem('token');
//       localStorage.removeItem('refreshToken');
//       navigate('/login');
//     }
//   }, [navigate, token]);

//   const fetchRooms = async () => {
//     setLoadingRooms(true);
//     try {
//       const res = await axios.get('/room/all');
//       setRooms(res.data);
//       setFilteredRooms(res.data);
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to fetch rooms');
//     } finally {
//       setLoadingRooms(false);
//     }
//   };

//   const fetchUsers = async () => {
//     setLoadingUsers(true);
//     try {
//       const res = await axios.get('/auth/users');
//       setUsers(res.data);
//       setFilteredUsers(res.data);
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to fetch users');
//     } finally {
//       setLoadingUsers(false);
//     }
//   };

//   const deleteRoom = async (code) => {
//     if (!window.confirm('Are you sure you want to delete this room?')) return;
//     try {
//       await axios.delete(`/room/delete/${code}`);
//       setRooms(rooms.filter((room) => room.code !== code));
//       setFilteredRooms(filteredRooms.filter((room) => room.code !== code));
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to delete room');
//     }
//   };

//   const deleteUser = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this user?')) return;
//     try {
//       await axios.delete(`/auth/delete-user/${id}`);
//       setUsers(users.filter((user) => user._id !== id));
//       setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to delete user');
//     }
//   };

//   // Search and Filter
//   const handleRoomSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setRoomSearch(value);
//     setFilteredRooms(
//       rooms.filter((room) => room.code.toLowerCase().includes(value))
//     );
//   };

//   const handleUserSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setUserSearch(value);
//     setFilteredUsers(
//       users.filter((user) => user.email.toLowerCase().includes(value))
//     );
//   };

//   // Prepare data for charts
//   const roomsByDate = rooms.reduce((acc, room) => {
//     const date = new Date(room.createdAt).toLocaleDateString();
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {});
//   const roomsChartData = Object.keys(roomsByDate)
//     .map((date) => ({
//       date,
//       rooms: roomsByDate[date],
//     }))
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   const usersByDate = users.reduce((acc, user) => {
//     const date = new Date(user.createdAt).toLocaleDateString();
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {});
//   const usersChartData = Object.keys(usersByDate)
//     .map((date) => ({
//       date,
//       users: usersByDate[date],
//     }))
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-black text-yellow-400 p-8"
//     >
//       {/* Header Section */}
//       <div className="mb-10">
//         <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text mt-10">
//           Admin Dashboard
//         </h1>
//         <p className="text-center text-gray-400 mt-2">Manage your quiz app with ease</p>
//       </div>

//       {error && <p className="text-red-500 mb-6 text-center">{error}</p>}

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-yellow-400/20 hover:shadow-2xl transition-all duration-300"
//         >
//           <h3 className="text-lg font-semibold mb-2">Total Rooms</h3>
//           <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
//             {rooms.length}
//           </p>
//         </motion.div>
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-yellow-400/20 hover:shadow-2xl transition-all duration-300"
//         >
//           <h3 className="text-lg font-semibold mb-2">Total Users</h3>
//           <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
//             {users.length}
//           </p>
//         </motion.div>
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-yellow-400/20 hover:shadow-2xl transition-all duration-300"
//         >
//           <h3 className="text-lg font-semibold mb-2">Active Rooms</h3>
//           <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
//             {rooms.length}
//           </p>
//         </motion.div>
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-yellow-400/20 hover:shadow-2xl transition-all duration-300"
//         >
//           <h3 className="text-lg font-semibold mb-2">Recent Users</h3>
//           <p className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
//             {users.filter((user) => new Date(user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
//           </p>
//         </motion.div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 1.0 }}
//           className="bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-yellow-400/20"
//         >
//           <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
//             Rooms Created Over Time
//           </h3>
//           {roomsChartData.length > 0 ? (
//             <LineChart width={600} height={350} data={roomsChartData} className="mx-auto">
//               <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//               <XAxis dataKey="date" stroke="#FBBF24" tick={{ fill: '#FBBF24' }} />
//               <YAxis stroke="#FBBF24" tick={{ fill: '#FBBF24' }} />
//               <Tooltip
//                 contentStyle={{ backgroundColor: '#1F2937', borderColor: '#FBBF24', borderRadius: '8px' }}
//                 labelStyle={{ color: '#FBBF24' }}
//               />
//               <Legend wrapperStyle={{ color: '#FBBF24' }} />
//               <Line type="monotone" dataKey="rooms" stroke="#FBBF24" strokeWidth={2} activeDot={{ r: 8, fill: '#FBBF24' }} />
//             </LineChart>
//           ) : (
//             <p className="text-center text-gray-400">No data available.</p>
//           )}
//         </motion.div>
//         <motion.div
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 1.2 }}
//           className="bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-yellow-400/20"
//         >
//           <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
//             User Registrations Over Time
//           </h3>
//           {usersChartData.length > 0 ? (
//             <BarChart width={600} height={350} data={usersChartData} className="mx-auto">
//               <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//               <XAxis dataKey="date" stroke="#FBBF24" tick={{ fill: '#FBBF24' }} />
//               <YAxis stroke="#FBBF24" tick={{ fill: '#FBBF24' }} />
//               <Tooltip
//                 contentStyle={{ backgroundColor: '#1F2937', borderColor: '#FBBF24', borderRadius: '8px' }}
//                 labelStyle={{ color: '#FBBF24' }}
//               />
//               <Legend wrapperStyle={{ color: '#FBBF24' }} />
//               <Bar dataKey="users" fill="#FBBF24" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           ) : (
//             <p className="text-center text-gray-400">No data available.</p>
//           )}
//         </motion.div>
//       </div>

//       {/* Rooms Section */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1.4 }}
//         className="mb-12"
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
//             Manage Rooms
//           </h2>
//           <div className="relative flex items-center space-x-3">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
//               <input
//                 type="text"
//                 value={roomSearch}
//                 onChange={handleRoomSearch}
//                 placeholder="Search by room code..."
//                 className="pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-yellow-400/20 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
//               />
//             </div>
//             <button className="flex items-center px-4 py-2 bg-gray-800/50 border border-yellow-400/20 rounded-lg text-yellow-400 hover:bg-gray-700/50 transition-all duration-300">
//               <FiFilter className="mr-2" /> Filter
//             </button>
//           </div>
//         </div>
//         {loadingRooms ? (
//           <Loading />
//         ) : filteredRooms.length > 0 ? (
//           <div className="space-y-4">
//             {filteredRooms.map((room) => (
//               <motion.div
//                 key={room._id}
//                 whileHover={{ scale: 1.02 }}
//                 className="bg-gray-900/80 backdrop-blur-md p-5 rounded-xl flex justify-between items-center shadow-lg border border-yellow-400/20 hover:shadow-xl transition-all duration-300"
//               >
//                 <div>
//                   <span className="font-semibold">Room Code:</span> {room.code}
//                   <br />
//                   <span className="text-gray-400 text-sm">
//                     Created: {new Date(room.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => deleteRoom(room.code)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
//                 >
//                   Delete
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-400">No rooms found.</p>
//         )}
//       </motion.div>

//       {/* Users Section */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 1.6 }}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
//             Manage Users
//           </h2>
//           <div className="relative flex items-center space-x-3">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
//               <input
//                 type="text"
//                 value={userSearch}
//                 onChange={handleUserSearch}
//                 placeholder="Search by email..."
//                 className="pl-10 pr-4 py-2 rounded-lg bg-gray-800/50 border border-yellow-400/20 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
//               />
//             </div>
//             <button className="flex items-center px-4 py-2 bg-gray-800/50 border border-yellow-400/20 rounded-lg text-yellow-400 hover:bg-gray-700/50 transition-all duration-300">
//               <FiFilter className="mr-2" /> Filter
//             </button>
//           </div>
//         </div>
//         {loadingUsers ? (
//           <Loading />
//         ) : filteredUsers.length > 0 ? (
//           <div className="space-y-4">
//             {filteredUsers.map((user) => (
//               <motion.div
//                 key={user._id}
//                 whileHover={{ scale: 1.02 }}
//                 className="bg-gray-900/80 backdrop-blur-md p-5 rounded-xl flex justify-between items-center shadow-lg border border-yellow-400/20 hover:shadow-xl transition-all duration-300"
//               >
//                 <div>
//                   <span className="font-semibold">Email:</span> {user.email}
//                   <br />
//                   <span className="text-gray-400 text-sm">
//                     Joined: {new Date(user.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => deleteUser(user._id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
//                 >
//                   Delete
//                 </button>
//               </motion.div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-400">No users found.</p>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import { motion, useScroll, useTransform } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { FiSearch, FiFilter, FiDownload } from 'react-icons/fi';
import Loading from '../components/Loading';

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState('');
  const [roomSearch, setRoomSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [roomFilter, setRoomFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); 
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Scroll-based animation for particles
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [0, 1000], [0.3, 0.7]);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.2 } }
  };

  const scaleHover = {
    whileHover: { scale: 1.02, transition: { duration: 0.3 } },
    whileTap: { scale: 0.95 }
  };

  const particleVariants = {
    initial: { opacity: 0.2, scale: 0.5 },
    animate: {
      opacity: [0.2, 0.5, 0.2],
      scale: [0.5, 1, 0.5],
      transition: { duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'admin') {
        navigate('/');
      } else {
        fetchRooms();
        fetchUsers();
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    }
  }, [navigate, token]);

  const fetchRooms = async () => {
    setLoadingRooms(true);
    try {
      const res = await axios.get('/room/all');
      setRooms(res.data);
      setFilteredRooms(res.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch rooms');
    } finally {
      setLoadingRooms(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get('/auth/users');
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const toggleRoomStatus = async (code, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.put(`/room/update/${code}`, { isActive: newStatus });
      setRooms(rooms.map((room) => room.code === code ? { ...room, isActive: newStatus } : room));
      setFilteredRooms(filteredRooms.map((room) => room.code === code ? { ...room, isActive: newStatus } : room));
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update room status');
    }
  };

  const deleteRoom = async (code) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await axios.delete(`/room/delete/${code}`);
      setRooms(rooms.filter((room) => room.code !== code));
      setFilteredRooms(filteredRooms.filter((room) => room.code !== code));
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete room');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/auth/delete-user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete user');
    }
  };

  const bulkDeleteRooms = async () => {
    if (!window.confirm('Are you sure you want to delete selected rooms?')) return;
    try {
      await Promise.all(selectedRooms.map((code) => axios.delete(`/room/delete/${code}`)));
      setRooms(rooms.filter((room) => !selectedRooms.includes(room.code)));
      setFilteredRooms(filteredRooms.filter((room) => !selectedRooms.includes(room.code)));
      setSelectedRooms([]);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete selected rooms');
    }
  };

  const bulkDeleteUsers = async () => {
    if (!window.confirm('Are you sure you want to delete selected users?')) return;
    try {
      await Promise.all(selectedUsers.map((id) => axios.delete(`/auth/delete-user/${id}`)));
      setUsers(users.filter((user) => !selectedUsers.includes(user._id)));
      setFilteredUsers(filteredUsers.filter((user) => !selectedUsers.includes(user._id)));
      setSelectedUsers([]);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete selected users');
    }
  };

  const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0]).join(',');
    const csv = [headers, ...data.map((item) => Object.values(item).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportRooms = () => {
    const data = rooms.map(({ code, createdAt, isActive }) => ({
      code,
      createdAt: new Date(createdAt).toLocaleDateString(),
      isActive
    }));
    exportToCSV(data, 'rooms.csv');
  };

  const exportUsers = () => {
    const data = users.map(({ _id, email, createdAt, role }) => ({
      id: _id,
      email,
      createdAt: new Date(createdAt).toLocaleDateString(),
      role
    }));
    exportToCSV(data, 'users.csv');
  };

  // Search and Filter
  const handleRoomSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setRoomSearch(value);
    setFilteredRooms(
      rooms.filter((room) =>
        room.code.toLowerCase().includes(value) &&
        (roomFilter === 'all' || (roomFilter === 'active' && room.isActive) || (roomFilter === 'inactive' && !room.isActive))
      )
    );
  };

  const handleUserSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setUserSearch(value);
    setFilteredUsers(
      users.filter((user) =>
        user.email.toLowerCase().includes(value) &&
        (userFilter === 'all' || user.role === userFilter)
      )
    );
  };

  const handleRoomFilter = (e) => {
    const value = e.target.value;
    setRoomFilter(value);
    setFilteredRooms(
      rooms.filter((room) =>
        room.code.toLowerCase().includes(roomSearch) &&
        (value === 'all' || (value === 'active' && room.isActive) || (value === 'inactive' && !room.isActive))
      )
    );
  };

  const handleUserFilter = (e) => {
    const value = e.target.value;
    setUserFilter(value);
    setFilteredUsers(
      users.filter((user) =>
        user.email.toLowerCase().includes(userSearch) &&
        (value === 'all' || user.role === value)
      )
    );
  };

  // Prepare data for charts
  const roomsByDate = rooms.reduce((acc, room) => {
    const date = new Date(room.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const roomsChartData = Object.keys(roomsByDate)
    .map((date) => ({ date, rooms: roomsByDate[date] }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const usersByDate = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const usersChartData = Object.keys(usersByDate)
    .map((date) => ({ date, users: usersByDate[date] }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-black text-yellow-400 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden mt-10"
    >
      {/* Foreground Scroll-Triggered Particles */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y1, opacity }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle1-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            variants={particleVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </motion.div>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y2, opacity }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle2-${i}`}
            className="absolute w-3 h-3 bg-yellow-400 rounded-full"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            variants={particleVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </motion.div>

      {/* Header Section */}
      <motion.div className="mb-10 sm:mb-14 text-center" {...fadeInUp}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-yellow-400 text-black py-2 px-4 inline-block rounded-lg">
          Admin Dashboard
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-3 sm:mt-4">
          Manage your quiz app with powerful tools
        </p>
      </motion.div>

      {error && (
        <motion.p
          className="text-yellow-400 mb-6 sm:mb-8 text-center text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {[
          { title: 'Total Rooms', value: rooms.length },
          { title: 'Total Users', value: users.length },
          { title: 'Active Rooms', value: rooms.filter((r) => r.isActive).length },
          {
            title: 'Recent Users',
            value: users.filter((user) => new Date(user.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length
          }
        ].map((card, index) => (
          <motion.div
            key={card.title}
            className="bg-black border-2 border-yellow-400 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            {...fadeInUp}
            transition={{ delay: 0.2 * (index + 1) }}
            {...scaleHover}
          >
            <h3 className="text-sm sm:text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="bg-black border-2 border-yellow-400 p-4 sm:p-6 rounded-xl shadow-lg"
          {...fadeInUp}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-yellow-400">
            Rooms Created Over Time
          </h3>
          {roomsChartData.length > 0 ? (
            <LineChart
              width={Math.min(window.innerWidth - 32, 360)}
              height={300}
              data={roomsChartData}
              className="mx-auto"
            >
              <CartesianGrid stroke="#FBBF24" strokeOpacity={0.3} />
              <XAxis dataKey="date" stroke="#FBBF24" tick={{ fill: '#FBBF24', fontSize: '12px' }} />
              <YAxis stroke="#FBBF24" tick={{ fill: '#FBBF24', fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#000000', borderColor: '#FBBF24', borderRadius: '8px' }}
                labelStyle={{ color: '#FBBF24' }}
              />
              <Legend wrapperStyle={{ color: '#FBBF24', fontSize: '12px' }} />
              <Line type="monotone" dataKey="rooms" stroke="#FBBF24" strokeWidth={2} activeDot={{ r: 8, fill: '#FBBF24' }} />
            </LineChart>
          ) : (
            <p className="text-center text-yellow-400 text-sm sm:text-base">No data available.</p>
          )}
        </motion.div>
        <motion.div
          className="bg-black border-2 border-yellow-400 p-4 sm:p-6 rounded-xl shadow-lg"
          {...fadeInUp}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-yellow-400">
            User Registrations Over Time
          </h3>
          {usersChartData.length > 0 ? (
            <BarChart
              width={Math.min(window.innerWidth - 32, 370)}
              height={300}
              data={usersChartData}
              className="mx-auto"
            >
              <CartesianGrid stroke="#FBBF24" strokeOpacity={0.3} />
              <XAxis dataKey="date" stroke="#FBBF24" tick={{ fill: '#FBBF24', fontSize: '12px' }} />
              <YAxis stroke="#FBBF24" tick={{ fill: '#FBBF24', fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#000000', borderColor: '#FBBF24', borderRadius: '8px' }}
                labelStyle={{ color: '#FBBF24' }}
              />
              <Legend wrapperStyle={{ color: '#FBBF24', fontSize: '12px' }} />
              <Bar dataKey="users" fill="#FBBF24" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <p className="text-center text-yellow-400 text-sm sm:text-base">No data available.</p>
          )}
        </motion.div>
      </motion.div>

      {/* Rooms Section */}
      <motion.div className="mb-10 sm:mb-14" {...fadeInUp}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400">
            Manage Rooms
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-56">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
              <input
                type="text"
                value={roomSearch}
                onChange={handleRoomSearch}
                placeholder="Search by room code..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-black border border-yellow-400 text-yellow-400 placeholder-yellow-400/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              />
            </div>
            <select
              value={roomFilter}
              onChange={handleRoomFilter}
              className="px-4 py-2 rounded-lg bg-black border border-yellow-400 text-yellow-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
            >
              <option value="all">All Rooms</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex gap-3">
              <button
                onClick={exportRooms}
                className="flex items-center px-4 py-2 bg-black border border-yellow-400 rounded-lg text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 text-sm sm:text-base"
              >
                <FiDownload className="mr-2" /> Export
              </button>
              {selectedRooms.length > 0 && (
                <button
                  onClick={bulkDeleteRooms}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300 text-sm sm:text-base"
                >
                  Delete Selected ({selectedRooms.length})
                </button>
              )}
            </div>
          </div>
        </div>
        {loadingRooms ? (
          <Loading />
        ) : filteredRooms.length > 0 ? (
          <motion.div className="space-y-3 sm:space-y-4" variants={staggerContainer} initial="initial" animate="animate">
            {filteredRooms.map((room) => (
              <motion.div
                key={room._id}
                className="bg-black border-2 border-yellow-400 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 shadow-lg hover:shadow-xl transition-all duration-300"
                {...scaleHover}
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <input
                    type="checkbox"
                    checked={selectedRooms.includes(room.code)}
                    onChange={() => {
                      setSelectedRooms(
                        selectedRooms.includes(room.code)
                          ? selectedRooms.filter((c) => c !== room.code)
                          : [...selectedRooms, room.code]
                      );
                    }}
                    className="h-4 w-4 text-yellow-400 border-yellow-400 focus:ring-yellow-400"
                  />
                  <div>
                    <span className="font-semibold text-yellow-400 text-sm sm:text-base">Room Code:</span> {room.code}
                    <br />
                    <span className="text-yellow-400/70 text-xs sm:text-sm">
                      Created: {new Date(room.createdAt).toLocaleDateString()} | Status: {room.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                  
                  <button
                    onClick={() => deleteRoom(room.code)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300 text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-yellow-400 text-sm sm:text-base">No rooms found.</p>
        )}
      </motion.div>

      {/* Users Section */}
      <motion.div {...fadeInUp}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400">
            Manage Users
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-56">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" />
              <input
                type="text"
                value={userSearch}
                onChange={handleUserSearch}
                placeholder="Search by email..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-black border border-yellow-400 text-yellow-400 placeholder-yellow-400/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
              />
            </div>
            <select
              value={userFilter}
              onChange={handleUserFilter}
              className="px-4 py-2 rounded-lg bg-black border border-yellow-400 text-yellow-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
            >
              <option value="all">All Users</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
            </select>
            <div className="flex gap-3">
              <button
                onClick={exportUsers}
                className="flex items-center px-4 py-2 bg-black border border-yellow-400 rounded-lg text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 text-sm sm:text-base"
              >
                <FiDownload className="mr-2" /> Export
              </button>
              {selectedUsers.length > 0 && (
                <button
                  onClick={bulkDeleteUsers}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300 text-sm sm:text-base"
                >
                  Delete Selected ({selectedUsers.length})
                </button>
              )}
            </div>
          </div>
        </div>
        {loadingUsers ? (
          <Loading />
        ) : filteredUsers.length > 0 ? (
          <motion.div className="space-y-3 sm:space-y-4" variants={staggerContainer} initial="initial" animate="animate">
            {filteredUsers.map((user) => (
              <motion.div
                key={user._id}
                className="bg-black border-2 border-yellow-400 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 shadow-lg hover:shadow-xl transition-all duration-300"
                {...scaleHover}
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => {
                      setSelectedUsers(
                        selectedUsers.includes(user._id)
                          ? selectedUsers.filter((id) => id !== user._id)
                          : [...selectedUsers, user._id]
                      );
                    }}
                    className="h-4 w-4 text-yellow-400 border-yellow-400 focus:ring-yellow-400"
                  />
                  <div>
                    <span className="font-semibold text-yellow-400 text-sm sm:text-base">Email:</span> {user.email}
                    <br />
                    <span className="text-yellow-400/70 text-xs sm:text-sm">
                      Joined: {new Date(user.createdAt).toLocaleDateString()} | Role: {user.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300 text-sm sm:text-base"
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-yellow-400 text-sm sm:text-base">No users found.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;