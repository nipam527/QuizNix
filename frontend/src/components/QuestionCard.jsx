import React from 'react';
import { motion } from 'framer-motion';

const QuestionCard = ({ question, index, onAnswer }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 text-yellow-400 p-4 rounded-lg mb-4"
    >
      <h2 className="text-xl font-bold mb-2">
        Question {index + 1}: {question.text}
      </h2>
      <div className="space-y-2">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onAnswer(question._id, option)}
            className="block w-full bg-yellow-400 text-black p-2 rounded-lg hover:bg-yellow-500 transition duration-300"
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;