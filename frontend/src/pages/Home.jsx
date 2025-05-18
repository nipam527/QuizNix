import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  const [isLoggedIn] = useState(true); // Simulated authentication state (true for logged-in user)
  const navigate = useNavigate();

  // Handle button clicks based on login status
  const handleButtonClick = (path) => {
    if (isLoggedIn) {
      navigate(path); // Navigate to intended path if logged in
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleHover = {
    whileHover: { scale: 1.05, transition: { duration: 0.3 } },
    whileTap: { scale: 0.95 }
  };

  // Scroll-based animation for particles
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 100]);
  const opacity = useTransform(scrollY, [0, 1000], [0.3, 0.7]);

  // Particle animation variant
  const particleVariants = {
    initial: { opacity: 0.2, scale: 0.5 },
    animate: {
      opacity: [0.2, 0.5, 0.2],
      scale: [0.5, 1, 0.5],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-yellow-400 flex flex-col overflow-hidden">
      {/* Foreground Scroll-Triggered Particles */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y1, opacity }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle1-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
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
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            variants={particleVariants}
            initial="initial"
            animate="animate"
          />
        ))}
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="relative flex flex-col items-center justify-center text-center py-24 sm:py-32 px-4 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6"
          {...fadeInUp}
        >
          QuizMaster
        </motion.h1>
        <motion.div
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TypeAnimation
            sequence={[
              'Challenge Your Mind!',
              2000,
              'Compete with Friends!',
              2000,
              'Master Every Quiz!',
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="inline-block"
          />
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div {...fadeInUp} {...scaleHover}>
            <button
              onClick={() => handleButtonClick('/create-room')}
              className="bg-yellow-400 text-black px-8 py-3 sm:px-10 sm:py-4 rounded-lg font-semibold text-base sm:text-lg md:text-xl hover:bg-yellow-500 transition duration-300"
            >
              Create Room
            </button>
          </motion.div>
          <motion.div {...fadeInUp} {...scaleHover}>
            <button
              onClick={() => handleButtonClick('/join-room')}
              className="bg-yellow-400 text-black px-8 py-3 sm:px-10 sm:py-4 rounded-lg font-semibold text-base sm:text-lg md:text-xl hover:bg-yellow-500 transition duration-300"
            >
              Join Room
            </button>
          </motion.div>
        </motion.div>
      </motion.section>
      

      {/* Features Section */}
      <motion.section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 sm:mb-16"
            {...fadeInUp}
          >
            Why QuizMaster?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="p-6 sm:p-8 bg-black border-2 border-yellow-400 rounded-xl"
              {...fadeInUp}
              {...scaleHover}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Create Custom Quizzes</h3>
              <p className="text-base sm:text-lg">
                Craft personalized quiz rooms with your favorite topics and share them with friends for endless fun.
              </p>
            </motion.div>
            <motion.div
              className="p-6 sm:p-8 bg-black border-2 border-yellow-400 rounded-xl"
              {...fadeInUp}
              {...scaleHover}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Real-Time Competition</h3>
              <p className="text-base sm:text-lg">
                Join quiz rooms with a code and compete with players from around the globe in real-time.
              </p>
            </motion.div>
            <motion.div
              className="p-6 sm:p-8 bg-black border-2 border-yellow-400 rounded-xl"
              {...fadeInUp}
              {...scaleHover}
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">Track Your Mastery</h3>
              <p className="text-base sm:text-lg">
                Monitor your scores, analyze your progress, and climb the leaderboard with every quiz.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 sm:mb-16"
            {...fadeInUp}
          >
            What Players Say
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="p-6 sm:p-8 bg-black border-2 border-yellow-400 rounded-xl"
              {...fadeInUp}
              {...scaleHover}
            >
              <p className="text-base sm:text-lg italic mb-4">
                "QuizMaster is addictive! I love creating my own quizzes and challenging my friends."
              </p>
              <p className="text-yellow-400 font-semibold">- Alex, Trivia Enthusiast</p>
            </motion.div>
            <motion.div
              className="p-6 sm:p-8 bg-black border-2 border-yellow-400 rounded-xl"
              {...fadeInUp}
              {...scaleHover}
            >
              <p className="text-base sm:text-lg italic mb-4">
                "The real-time competition is thrilling! It’s my go-to app for fun and learning."
              </p>
              <p className="text-yellow-400 font-semibold">- Sarah, Quiz Champion</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-black text-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
          {...fadeInUp}
        >
          Ready to Test Your Knowledge?
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
          {...fadeInUp}
        >
          Join thousands of players and start your quiz journey today!
        </motion.p>
        <motion.div {...fadeInUp} {...scaleHover}>
          <button
            onClick={() => handleButtonClick('/join-room')}
            className="bg-yellow-400 text-black px-10 py-4 sm:px-12 sm:py-5 rounded-lg font-semibold text-lg sm:text-xl md:text-2xl hover:bg-yellow-500 transition duration-300"
          >
            Start Quizzing Now
          </button>
        </motion.div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        className="py-12 px-4 bg-black text-yellow-400 text-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-base sm:text-lg md:text-xl">© 2025 QuizMaster. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default Home;



