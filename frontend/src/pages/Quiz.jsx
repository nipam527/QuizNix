import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
import { motion } from 'framer-motion';

const Quiz = () => {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/question/room/${code}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, [code]);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const submitQuiz = () => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    window.location.href = `/result/${code}`;
  };

  return (
    <motion.div
      initial={{ x: '100vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="min-h-screen bg-black text-yellow-400 p-4"
    >
      <h1 className="text-3xl font-bold mb-4">Quiz: {code}</h1>
      {questions.map((q, index) => (
        <QuestionCard
          key={q._id}
          question={q}
          index={index}
          onAnswer={handleAnswer}
        />
      ))}
      <button
        onClick={submitQuiz}
        className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300 mt-4"
      >
        Submit Quiz
      </button>
    </motion.div>
  );
};

export default Quiz;