// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       navigate('/');
//     } catch (error) {
//       console.error(error.response?.data?.error || 'Login failed');
//     }
//   };

//   const goToRegister = () => {
//     navigate('/register');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-black text-yellow-400 flex items-center justify-center px-4"
//     >
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="w-full max-w-md bg-black border border-yellow-400 p-8 rounded-2xl shadow-2xl"
//       >
//         <motion.h1
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold text-center mb-8"
//         >
//           Login
//         </motion.h1>

//         <motion.input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="w-full p-3 mb-5 bg-black border border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
//           whileFocus={{ scale: 1.03 }}
//         />

//         <motion.input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full p-3 mb-6 bg-black border border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
//           whileFocus={{ scale: 1.03 }}
//         />

//         <motion.button
//           onClick={handleLogin}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full mb-4 bg-yellow-400 text-black font-semibold py-3 rounded-lg transition duration-300 hover:bg-yellow-500"
//         >
//           Login
//         </motion.button>

//         <motion.button
//           onClick={goToRegister}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full bg-transparent border border-yellow-400 text-yellow-400 font-semibold py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition duration-300"
//         >
//           Don't have an account? Register
//         </motion.button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { sendEmailNotification } from '../utils/sendEmail'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const sendLoginEmail = async () => {
  if (!email) {
    console.error('Email is empty, cannot send login notification');
    return;
  }

  try {
    await emailjs.send(
      'service_shbrpf6',
      'template_l1uf5ht',
      {
        to_email: email,
        user_email: email,
        message: `Login successful for: ${email}`,
        subject: 'New Login Notification'
      },
      'nTg0KLD5lZ_i7FmM-'
    );
    console.log('Login email sent successfully');
  } catch (err) {
    console.error('Email send error:', err);
  }
};


  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      await sendLoginEmail(); // Send login email
      navigate('/');
    } catch (error) {
      console.error(error.response?.data?.error || 'Login failed');
    }
  };

  const goToRegister = () => {
    navigate('/register');
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
          Login
        </motion.h1>

        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-5 bg-black border border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          whileFocus={{ scale: 1.03 }}
        />

        <motion.input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 bg-black border border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          whileFocus={{ scale: 1.03 }}
        />

        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mb-4 bg-yellow-400 text-black font-semibold py-3 rounded-lg transition duration-300 hover:bg-yellow-500"
        >
          Login
        </motion.button>

        <motion.button
          onClick={goToRegister}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-transparent border border-yellow-400 text-yellow-400 font-semibold py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition duration-300"
        >
          Don't have an account? Register
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Login;


// Login.jsx
// Deployed on: May 15, 2025, 05:19 PM IST

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import emailjs from '@emailjs/browser';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     emailjs.init('nTg0KLD5lZ_i7FmM-');
//   }, []);

//   const validateInputs = () => {
//     // Basic email regex for validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.trim()) {
//       return 'Email is required.';
//     }
//     if (!emailRegex.test(email)) {
//       return 'Please enter a valid email address.';
//     }
//     if (!password.trim()) {
//       return 'Password is required.';
//     }
//     if (password.length < 6) {
//       return 'Password must be at least 6 characters long.';
//     }
//     return null;
//   };

//   const handleLogin = async () => {
//     // Validate inputs before making the API call
//     const validationError = validateInputs();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       setError('');
//       setLoading(true);
//       const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
//       localStorage.setItem('token', res.data.token);

//       await emailjs.send('service_shbrpf6', 'template_ov0av6k', {
//         to_email: email,
//         from_email: 'bnp322071@gmail.com',
//         message: 'Thank you for logging in to our Quiz App! Start creating or joining quizzes now.',
//       });
//       console.log('Thank You email sent successfully');

//       navigate('/');
//     } catch (error) {
//       let errorMessage = 'Login failed';
//       if (error.response) {
//         errorMessage = error.response.data?.error || `Server error: ${error.response.status}`;
//       } else if (error.request) {
//         errorMessage = 'No response from server. Please check if the backend is running.';
//       } else {
//         errorMessage = error.message;
//       }
//       setError(errorMessage);
//       console.error('Login error:', errorMessage, error); // Improved logging
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goToRegister = () => {
//     navigate('/register');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-black text-yellow-400 flex items-center justify-center px-4"
//       role="main"
//       aria-label="Login Page"
//     >
//       <motion.div
//         initial={{ scale: 0.95, opacity: 0, y: 30 }}
//         animate={{ scale: 1, opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: 'easeOut' }}
//         className="w-full max-w-md bg-black border border-yellow-400 p-8 rounded-2xl shadow-2xl"
//       >
//         <motion.h1
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold text-center mb-8"
//         >
//           Login
//         </motion.h1>

//         {error && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className="mb-4 text-yellow-300 bg-yellow-400 bg-opacity-20 p-3 rounded-md text-center"
//             role="alert"
//           >
//             {error}
//           </motion.p>
//         )}

//         {loading && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className="mb-4 text-yellow-300 text-center"
//           >
//             Logging in...
//           </motion.p>
//         )}

//         <motion.input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="w-full p-3 mb-5 bg-black border border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
//           whileFocus={{ scale: 1.03 }}
//           aria-label="Email Input"
//           disabled={loading}
//         />

//         <motion.input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full p-3 mb-6 bg-black border border-yellow-400 rounded-lg text-yellow-400 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
//           whileFocus={{ scale: 1.03 }}
//           aria-label="Password Input"
//           disabled={loading}
//         />

//         <motion.button
//           onClick={handleLogin}
//           whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
//           whileTap={{ scale: 0.95 }}
//           disabled={loading}
//           className={`w-full mb-4 bg-yellow-400 text-black font-semibold py-3 rounded-lg transition duration-300 hover:bg-yellow-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//           aria-label="Login Button"
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </motion.button>

//         <motion.button
//           onClick={goToRegister}
//           whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)' }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full bg-transparent border border-yellow-400 text-yellow-400 font-semibold py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition duration-300"
//           aria-label="Go to Register Button"
//           disabled={loading}
//         >
//           Don't have an account? Register
//         </motion.button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Login;