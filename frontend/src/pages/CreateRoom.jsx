// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const CreateRoom = () => {
//   const [code, setCode] = useState('');
//   const [question, setQuestion] = useState({ text: '', options: ['', '', '', ''], correctAnswer: '' });
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//     }
//     if (code) {
//       fetchUsers();
//     }
//   }, [navigate, code]);

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('/api/auth/users', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to fetch users');
//       console.error('Fetch users error:', error);
//     }
//   };

//   const createRoom = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No token found. Please log in.');
//       const res = await axios.post(
//         '/api/room/create',
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCode(res.data.code);
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || 'Failed to create room');
//       console.error('Create room error:', error);
//     }
//   };

//   const updateAllowedUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `/api/room/update-allowed-users/${code}`,
//         { allowedUsers: selectedUsers },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setError('');
//       alert('Allowed users updated successfully');
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to update allowed users');
//       console.error('Update allowed users error:', error);
//     }
//   };

//   const addQuestion = async () => {
//     setError('');
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No token found. Please log in.');
//       await axios.post(
//         '/api/question/create',
//         { ...question, roomCode: code },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setQuestion({ text: '', options: ['', '', '', ''], correctAnswer: '' });
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || 'Failed to add question');
//       console.error('Add question error:', error);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ x: '-100vw' }}
//       animate={{ x: 0 }}
//       transition={{ type: 'spring', stiffness: 120 }}
//       className="min-h-screen bg-black text-yellow-400 p-4"
//     >
//       <h1 className="text-3xl font-bold mb-4">Create Room</h1>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {!code ? (
//         <button
//           onClick={createRoom}
//           className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300"
//         >
//           Generate Room Code
//         </button>
//       ) : (
//         <div>
//           <p className="text-xl mb-4">Room Code: {code}</p>
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold mb-2">Assign Users to Room</h2>
//             {users.length > 0 ? (
//               <div className="space-y-2">
//                 {users.map((user) => (
//                   <div key={user._id} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedUsers.includes(user._id)}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setSelectedUsers([...selectedUsers, user._id]);
//                         } else {
//                           setSelectedUsers(selectedUsers.filter((id) => id !== user._id));
//                         }
//                       }}
//                       className="mr-2"
//                     />
//                     <label>{user.email}</label>
//                   </div>
//                 ))}
//                 <button
//                   onClick={updateAllowedUsers}
//                   className="mt-2 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300"
//                 >
//                   Update Allowed Users
//                 </button>
//               </div>
//             ) : (
//               <p>No users found.</p>
//             )}
//           </div>
//           <div className="space-y-4">
//             <input
//               type="text"
//               value={question.text}
//               onChange={(e) => setQuestion({ ...question, text: e.target.value })}
//               placeholder="Question"
//               className="bg-gray-800 text-yellow-400 p-2 rounded-lg w-full"
//             />
//             {question.options.map((opt, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 value={opt}
//                 onChange={(e) => {
//                   const newOptions = [...question.options];
//                   newOptions[i] = e.target.value;
//                   setQuestion({ ...question, options: newOptions });
//                 }}
//                 placeholder={`Option ${i + 1}`}
//                 className="bg-gray-800 text-yellow-400 p-2 rounded-lg w-full"
//               />
//             ))}
//             <input
//               type="text"
//               value={question.correctAnswer}
//               onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
//               placeholder="Correct Answer"
//               className="bg-gray-800 text-yellow-400 p-2 rounded-lg w-full"
//             />
//             <button
//               onClick={addQuestion}
//               className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300"
//             >
//               Add Question
//             </button>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default CreateRoom;

// // V6FPF1



// CreateRoom.jsx
// Deployed on: May 15, 2025, 04:42 PM IST















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { FaCopy, FaInfoCircle } from 'react-icons/fa'; // Correct icon imports

// const CreateRoom = () => {
//   const [code, setCode] = useState(localStorage.getItem('roomCode') || '');
//   const [question, setQuestion] = useState({ text: '', options: ['', '', '', ''], correctAnswer: '' });
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const navigate = useNavigate();

//   // Validate token and load users if code exists
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     // Check if saved room code is older than 24 hours
//     const codeTimestamp = localStorage.getItem('roomCodeTimestamp');
//     const currentTime = Date.now();
//     const oneDayInMs = 24 * 60 * 60 * 1000;
//     if (codeTimestamp && currentTime - parseInt(codeTimestamp) > oneDayInMs) {
//       localStorage.removeItem('roomCode');
//       localStorage.removeItem('roomCodeTimestamp');
//       setCode('');
//       return;
//     }

//     if (code) {
//       fetchUsers();
//     }
//   }, [navigate, code]);

//   // Fetch available users (original backend logic)
//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('/api/auth/users', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(res.data);
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to fetch users');
//       console.error('Fetch users error:', error);
//     }
//   };

//   // Create a new room (original backend logic)
//   const createRoom = async () => {
//     try {
//       // Clear previous code from localStorage to ensure a new code is generated
//       localStorage.removeItem('roomCode');
//       localStorage.removeItem('roomCodeTimestamp');
//       setCode(''); // Reset state to trigger UI update

//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No token found. Please log in.');
//       const res = await axios.post(
//         '/api/room/create',
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log('Room creation response:', res.data); // Debug log
//       setCode(res.data.code);
//       localStorage.setItem('roomCode', res.data.code);
//       localStorage.setItem('roomCodeTimestamp', Date.now().toString());
//       setError('');
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || 'Failed to create room');
//       console.error('Create room error:', error);
//     }
//   };

//   // Update allowed users (original backend logic)
//   const updateAllowedUsers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `/api/room/update-allowed-users/${code}`,
//         { allowedUsers: selectedUsers },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setError('');
//       alert('Allowed users updated successfully');
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to update allowed users');
//       console.error('Update allowed users error:', error);
//     }
//   };

//   // Add a new question (original backend logic)
//   const addQuestion = async () => {
//     setError('');
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No token found. Please log in.');
//       setLoading(true);
//       await axios.post(
//         '/api/question/create',
//         { ...question, roomCode: code },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setQuestion({ text: '', options: ['', '', '', ''], correctAnswer: '' });
//       setError('Question added successfully');
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || 'Failed to add question');
//       console.error('Add question error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Copy room code to clipboard
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-black text-yellow-400 p-6 flex flex-col items-center justify-center"
//       role="main"
//       aria-label="Create Quiz Room"
//     >
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="max-w-2xl w-full bg-black bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-yellow-400 hover:shadow-2xl transition-shadow duration-300"
//       >
//         <h1 className="text-3xl font-extrabold mb-6 text-center">Create Quiz Room</h1>

//         {/* Informative Text */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mb-8 bg-yellow-400 bg-opacity-10 p-4 rounded-lg"
//         >
//           <div className="flex items-center mb-2">
//             <FaInfoCircle className="text-xl text-yellow-300 mr-2" aria-hidden="true" />
//             <h2 className="text-lg font-semibold">About Quiz Room Creation</h2>
//           </div>
//           <p className="text-yellow-300 text-sm mb-2">
//             Effortlessly set up an interactive quiz environment for your audience.
//           </p>
//           <ul className="list-disc pl-5 text-yellow-300 text-sm space-y-1">
//             <li>Generate a unique code (e.g., V6FPF1) to share.</li>
//             <li>Control access by assigning specific users.</li>
//             <li>Create engaging multiple-choice questions.</li>
//             <li>Manage everything via your admin dashboard.</li>
//           </ul>
//         </motion.div>

//         {/* Error/Success Message */}
//         {error && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className="mb-6 text-yellow-300 bg-yellow-400 bg-opacity-20 p-3 rounded-md text-center"
//             role="alert"
//           >
//             {error}
//           </motion.p>
//         )}

//         {/* Room Code Generation */}
//         {!code ? (
//           <motion.button
//             whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
//             whileTap={{ scale: 0.95 }}
//             onClick={createRoom}
//             className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition w-full"
//             aria-label="Generate Room Code"
//           >
//             Generate Room Code
//           </motion.button>
//         ) : (
//           <div className="space-y-6">
//             {/* Room Code Display */}
//             <div>
//               <p className="text-xl font-semibold mb-3">
//                 Room Code: <span className="underline">{code}</span>
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={copyToClipboard}
//                 className="flex items-center justify-center gap-2 bg-black border border-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition w-full"
//                 aria-label={copied ? 'Code Copied' : 'Copy Room Code'}
//               >
//                 <FaCopy aria-hidden="true" /> {copied ? 'Copied!' : 'Copy Code'}
//               </motion.button>
//             </div>

//             {/* Assign Users */}
//             <div>
//               <h2 className="text-xl font-semibold mb-3">Assign Users</h2>
//               {users.length > 0 ? (
//                 <div className="space-y-3 max-h-48 overflow-y-auto px-2">
//                   {users.map((user) => (
//                     <div key={user._id} className="flex items-center gap-3">
//                       <input
//                         type="checkbox"
//                         id={`user-${user._id}`}
//                         checked={selectedUsers.includes(user._id)}
//                         onChange={(e) => {
//                           if (e.target.checked) {
//                             setSelectedUsers([...selectedUsers, user._id]);
//                           } else {
//                             setSelectedUsers(selectedUsers.filter((id) => id !== user._id));
//                           }
//                         }}
//                         className="accent-yellow-400 h-4 w-4"
//                         aria-label={`Select ${user.email}`}
//                       />
//                       <label htmlFor={`user-${user._id}`} className="text-yellow-300 text-sm font-medium">{user.email}</label>
//                     </div>
//                   ))}
//                   <motion.button
//                     whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={updateAllowedUsers}
//                     className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition w-full text-sm font-semibold"
//                     aria-label="Update Allowed Users"
//                   >
//                     Update Allowed Users
//                   </motion.button>
//                   {selectedUsers.length > 0 && (
//                     <p className="text-yellow-300 mt-2 text-xs font-medium">
//                       Selected: {selectedUsers.map((id) => users.find((u) => u._id === id)?.email).join(', ')}
//                     </p>
//                   )}
//                 </div>
//               ) : (
//                 <p className="text-yellow-300 text-sm font-medium">No users found.</p>
//               )}
//             </div>

//             {/* Add Question */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold mb-3">Add Question</h2>
//               <input
//                 type="text"
//                 value={question.text}
//                 onChange={(e) => setQuestion({ ...question, text: e.target.value })}
//                 placeholder="Enter question..."
//                 className="bg-black border border-yellow-400 p-3 rounded-md w-full placeholder-yellow-300 text-yellow-400 text-sm font-medium"
//                 aria-label="Question Text"
//               />
//               {question.options.map((opt, i) => (
//                 <input
//                   key={i}
//                   type="text"
//                   value={opt}
//                   onChange={(e) => {
//                     const newOptions = [...question.options];
//                     newOptions[i] = e.target.value;
//                     setQuestion({ ...question, options: newOptions });
//                   }}
//                   placeholder={`Option ${i + 1}`}
//                   className="bg-black border border-yellow-400 p-3 rounded-md w-full placeholder-yellow-300 text-yellow-400 text-sm font-medium"
//                   aria-label={`Option ${i + 1}`}
//                 />
//               ))}
//               <input
//                 type="text"
//                 value={question.correctAnswer}
//                 onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
//                 placeholder="Correct answer"
//                 className="bg-black border border-yellow-400 p-3 rounded-md w-full placeholder-yellow-300 text-yellow-400 text-sm font-medium"
//                 aria-label="Correct Answer"
//               />
//               {question.text && (
//                 <div className="border border-yellow-400 p-4 rounded-md">
//                   <h3 className="text-lg font-semibold mb-2">Question Preview</h3>
//                   <p className="text-yellow-300 text-sm font-medium">{question.text}</p>
//                   <ul className="list-disc pl-5 text-yellow-300 text-sm font-medium mt-2">
//                     {question.options.map((opt, i) => (
//                       <li key={i}>{opt}</li>
//                     ))}
//                   </ul>
//                   <p className="text-yellow-300 text-sm font-medium mt-2">
//                     Correct Answer: <span className="font-semibold">{question.correctAnswer}</span>
//                   </p>
//                 </div>
//               )}
//               <div className="flex gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={addQuestion}
//                   disabled={loading}
//                   className={`bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition flex-1 text-sm font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   aria-label={loading ? 'Adding Question' : 'Add Question'}
//                 >
//                   {loading ? 'Adding...' : 'Add Question'}
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setQuestion({ text: '', options: ['', '', '', ''], correctAnswer: '' })}
//                   className="bg-black border border-yellow-400 text-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition flex-1 text-sm font-semibold"
//                   aria-label="Clear All Fields"
//                 >
//                   Clear All Fields
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default CreateRoom;




// CreateRoom.jsx
// Deployed on: May 15, 2025, 05:09 PM IST

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCopy, FaInfoCircle } from 'react-icons/fa';

const CreateRoom = () => {
  const [code, setCode] = useState(localStorage.getItem('roomCode') || '');
  const [question, setQuestion] = useState({ text: '', options: ['', '', '', ''], correctAnswer: '' });
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const codeTimestamp = localStorage.getItem('roomCodeTimestamp');
    const currentTime = Date.now();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    if (codeTimestamp && currentTime - parseInt(codeTimestamp) > oneDayInMs) {
      localStorage.removeItem('roomCode');
      localStorage.removeItem('roomCodeTimestamp');
      setCode('');
      return;
    }

    if (code) {
      fetchUsers();
    }
  }, [navigate, code]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch users');
      console.error('Fetch users error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('roomCode');
      localStorage.removeItem('roomCodeTimestamp');
      setCode('');

      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in.');
      const res = await axios.post(
        '/api/room/create',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Room creation response:', res.data);
      setCode(res.data.code);
      localStorage.setItem('roomCode', res.data.code);
      localStorage.setItem('roomCodeTimestamp', Date.now().toString());
      setError('');
    } catch (error) {
      setError(error.response?.data?.error || error.message || 'Failed to create room');
      console.error('Create room error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAllowedUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/room/update-allowed-users/${code}`,
        { allowedUsers: selectedUsers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setError('Allowed users updated successfully');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update allowed users');
      console.error('Update allowed users error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async () => {
    setError('');
    const { text, options, correctAnswer } = question;
    if (!text.trim() || options.some((opt) => !opt.trim()) || !correctAnswer.trim()) {
      setError('Please fill all fields.');
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in.');
      await axios.post(
        '/api/question/create',
        { ...question, roomCode: code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestion({ text: '', options: ['', '', '', ''], correctAnswer: '' });
      setError('Question added successfully');
    } catch (error) {
      setError(error.response?.data?.error || error.message || 'Failed to add question');
      console.error('Add question error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-yellow-400 p-6 flex flex-col items-center justify-center"
      role="main"
      aria-label="Create Quiz Room"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl w-full bg-black bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-yellow-400 hover:shadow-2xl transition-shadow duration-300"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center">Create Quiz Room</h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 bg-yellow-400 bg-opacity-10 p-4 rounded-lg"
        >
          <div className="flex items-center mb-2">
            <FaInfoCircle className="text-xl text-yellow-300 mr-2" aria-hidden="true" />
            <h2 className="text-lg font-semibold">About Quiz Room Creation</h2>
          </div>
          <p className="text-yellow-300 text-sm mb-2">
            Effortlessly set up an interactive quiz environment for your audience.
          </p>
          <ul className="list-disc pl-5 text-yellow-300 text-sm space-y-1">
            <li>Generate a unique code (e.g., V6FPF1) to share.</li>
            <li>Control access by assigning specific users.</li>
            <li>Create engaging multiple-choice questions.</li>
            <li>Manage everything via your admin dashboard.</li>
          </ul>
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6 text-yellow-300 bg-yellow-400 bg-opacity-20 p-3 rounded-md text-center"
            role="alert"
          >
            {error}
          </motion.p>
        )}

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6 text-yellow-300 text-center"
          >
            Loading...
          </motion.p>
        )}

        {!code ? (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={createRoom}
            disabled={loading}
            className={`bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Generate Room Code"
          >
            {loading ? 'Generating...' : 'Generate Room Code'}
          </motion.button>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-xl font-semibold mb-3">
                Room Code: <span className="underline">{code}</span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 bg-black border border-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition w-full"
                aria-label={copied ? 'Code Copied' : 'Copy Room Code'}
              >
                <FaCopy aria-hidden="true" /> {copied ? 'Copied!' : 'Copy Code'}
              </motion.button>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Assign Users</h2>
              {users.length > 0 ? (
                <div className="space-y-3 max-h-48 overflow-y-auto px-2">
                  {users.map((user) => (
                    <div key={user._id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`user-${user._id}`}
                        checked={selectedUsers.includes(user._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user._id]);
                          } else {
                            setSelectedUsers(selectedUsers.filter((id) => id !== user._id));
                          }
                        }}
                        className="accent-yellow-400 h-4 w-4"
                        aria-label={`Select ${user.email}`}
                      />
                      <label htmlFor={`user-${user._id}`} className="text-yellow-300 text-sm font-medium">{user.email}</label>
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={updateAllowedUsers}
                    disabled={loading}
                    className={`mt-4 bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition w-full text-sm font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label="Update Allowed Users"
                  >
                    {loading ? 'Updating...' : 'Update Allowed Users'}
                  </motion.button>
                  {selectedUsers.length > 0 && (
                    <p className="text-yellow-300 mt-2 text-xs font-medium">
                      Selected: {selectedUsers.map((id) => users.find((u) => u._id === id)?.email).join(', ')}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-yellow-300 text-sm font-medium">No users found.</p>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-3">Add Question</h2>
              <input
                type="text"
                value={question.text}
                onChange={(e) => setQuestion({ ...question, text: e.target.value })}
                placeholder="Enter question..."
                className="bg-black border border-yellow-400 p-3 rounded-md w-full placeholder-yellow-300 text-yellow-400 text-sm font-medium"
                aria-label="Question Text"
              />
              {question.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...question.options];
                    newOptions[i] = e.target.value;
                    setQuestion({ ...question, options: newOptions });
                  }}
                  placeholder={`Option ${i + 1}`}
                  className="bg-black border border-yellow-400 p-3 rounded-md w-full placeholder-yellow-300 text-yellow-400 text-sm font-medium"
                  aria-label={`Option ${i + 1}`}
                />
              ))}
              <input
                type="text"
                value={question.correctAnswer}
                onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
                placeholder="Correct answer"
                className="bg-black border border-yellow-400 p-3 rounded-md w-full placeholder-yellow-300 text-yellow-400 text-sm font-medium"
                aria-label="Correct Answer"
              />
              {question.text && (
                <div className="border border-yellow-400 p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Question Preview</h3>
                  <p className="text-yellow-300 text-sm font-medium">{question.text}</p>
                  <ul className="list-disc pl-5 text-yellow-300 text-sm font-medium mt-2">
                    {question.options.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                  <p className="text-yellow-300 text-sm font-medium mt-2">
                    Correct Answer: <span className="font-semibold">{question.correctAnswer}</span>
                  </p>
                </div>
              )}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addQuestion}
                  disabled={loading}
                  className={`bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition flex-1 text-sm font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label={loading ? 'Adding Question' : 'Add Question'}
                >
                  {loading ? 'Adding...' : 'Add Question'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuestion({ text: '', options: ['', '', '', ''], correctAnswer: '' })}
                  className="bg-black border border-yellow-400 text-yellow-400 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition flex-1 text-sm font-semibold"
                  aria-label="Clear All Fields"
                >
                  Clear All Fields
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CreateRoom;