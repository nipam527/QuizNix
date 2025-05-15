import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { sendEmailNotification } from '../utils/sendEmail';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      console.error(error.response?.data?.error || 'Registration failed');
    }
  };

  const goToLogin = () => {
    navigate('/login');
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
          Register
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
          onClick={handleRegister}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mb-4 bg-yellow-400 text-black font-semibold py-3 rounded-lg transition duration-300 hover:bg-yellow-500"
        >
          Register
        </motion.button>

        <motion.button
          onClick={goToLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-transparent border border-yellow-400 text-yellow-400 font-semibold py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition duration-300"
        >
          Already have an account? Login
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Register;



// // // Register.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import emailjs from 'emailjs-com';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const res = await axios.post('http://localhost:4000/api/auth/register', { email, password });
//       localStorage.setItem('token', res.data.token);

//       // Send email using EmailJS
//       const emailParams = {
//         user_email: email,
//         to_email: 'bnp322071@gmail.com',
//         message: `User with email ${email} has registered successfully.`,
//       };

//       await emailjs.send(
//         'service_shbrpf6', // Replace with your EmailJS Service ID
//         'template_ov0av6k', // Replace with your EmailJS Template ID
//         emailParams,
//         'YOUR_USER_ID' // Replace with your EmailJS User ID (Public Key)
//       );

//       console.log('Registration email sent successfully');
//       navigate('/login');
//     } catch (error) {
//       let errorMessage = 'Registration failed';
//       if (error.response?.data?.error?.includes('E11000 duplicate key')) {
//         errorMessage = 'Email already in use. Please use a different email.';
//       } else if (error.response?.data?.error) {
//         errorMessage = error.response.data.error;
//       }
//       setError(errorMessage);
//       console.error('Registration error:', errorMessage);
//     }
//   };

//   const goToLogin = () => {
//     navigate('/login');
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
//           Register
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

//         {error && (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-red-500 text-center mb-4"
//           >
//             {error}
//           </motion.p>
//         )}

//         <motion.button
//           onClick={handleRegister}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full mb-4 bg-yellow-400 text-black font-semibold py-3 rounded-lg transition duration-300 hover:bg-yellow-500"
//         >
//           Register
//         </motion.button>

//         <motion.button
//           onClick={goToLogin}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="w-full bg-transparent border border-yellow-400 text-yellow-400 font-semibold py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition duration-300"
//         >
//           Already have an account? Login
//         </motion.button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Register;