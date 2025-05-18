import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Result = () => {
  const { code } = useParams();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateScore = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/question/room/${code}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const answers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
        let correct = 0;
        res.data.forEach((q) => {
          if (answers[q._id] === q.correctAnswer) correct++;
        });
        setScore(correct);
        setTotal(res.data.length);
      } catch (error) {
        console.error(error);
      }
    };
    calculateScore();
  }, [code]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center p-6"
    >
      <div className="bg-yellow-400 text-black rounded-2xl shadow-lg px-8 py-6 w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">Quiz Results</h1>
        <p className="text-2xl font-semibold mb-2">
          Score: <span className="font-bold">{score}</span> / {total}
        </p>
        <p className="text-xl font-medium mt-2">
          Percentage: <span className="font-bold">{((score / total) * 100).toFixed(2)}%</span>
        </p>
      </div>
    </motion.div>
  );
};

export default Result;





// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import emailjs from 'emailjs-com';

// const Result = () => {
//   const { code } = useParams();
//   const [score, setScore] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const calculateScore = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('You must be logged in to view results.');
//           return;
//         }
//         const res = await axios.get(`/api/question/room/${code}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const answers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
//         let correct = 0;
//         res.data.forEach((q) => {
//           if (answers[q._id] === q.correctAnswer) correct++;
//         });
//         setScore(correct);
//         setTotal(res.data.length);

//         // Send email with quiz results using EmailJS
//         const emailParams = {
//           user_email: localStorage.getItem('userEmail') || 'unknown', // Store email during login/register
//           to_email: 'bnp322071@gmail.com',
//           score: correct,
//           total: res.data.length,
//           percentage: ((correct / res.data.length) * 100).toFixed(2),
//           room_code: code,
//         };

//         await emailjs.send(
//           'service_shbrpf6', // Replace with your EmailJS Service ID
//           'template_l1uf5ht', // Replace with your EmailJS Template ID
//           emailParams,
//           'nTg0KLD5lZ_i7FmM-' // Replace with your EmailJS User ID
//         );

//         console.log('Quiz results email sent successfully');
//       } catch (error) {
//         const errorMessage = error.response?.data?.error || 'Failed to load quiz results';
//         setError(errorMessage);
//         console.error('Error calculating score:', errorMessage);
//       }
//     };
//     calculateScore();
//   }, [code]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center p-4"
//     >
//       <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
//       {error ? (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-red-500 text-center mb-4"
//         >
//           {error}
//         </motion.p>
//       ) : (
//         <>
//           <p className="text-xl">Your Score: {score} / {total}</p>
//           <p className="text-lg mt-4">
//             Percentage: {total > 0 ? ((score / total) * 100).toFixed(2) : 0}%
//           </p>
//         </>
//       )}
//     </motion.div>
//   );
// };

// export default Result;