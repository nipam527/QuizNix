import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {jwtDecode} from 'jwt-decode';  // Fixed import
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaPlusCircle, FaTachometerAlt, FaBars, FaTimes, FaUsers } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let isAdmin = false;
  let userEmail = '';
  const ADMIN_EMAIL = 'admin@example.com'; // Set your actual admin email here

  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded); // Debugging output

      // Adjust these keys based on your token's actual structure:
      isAdmin = decoded.role === 'admin'; 
      userEmail = decoded.email || '';

      // Optional: You can remove the email check if role is enough
      // isAdmin = decoded.role === 'admin' && userEmail === ADMIN_EMAIL;

    } catch (error) {
      console.error('Error decoding token:', error);
      if (window.location.pathname !== '/login') {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-black bg-opacity-90 text-yellow-400 p-4 z-20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight hover:text-yellow-300 transition duration-300 flex items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <FaUsers className="mr-2" /> Quiz Master
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <a
            href="#home"
            className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            <FaHome className="mr-1" /> Home
          </a>
          {token ? (
            <>
              {isAdmin && (
                <>
                  <Link
                    to="/create-room"
                    className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaPlusCircle className="mr-1" /> Create Room
                  </Link>
                  <Link
                    to="/admin-dashboard"
                    className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaTachometerAlt className="mr-1" /> Admin Dashboard
                  </Link>
                </>
              )}
              <Link
                to="/join-room"
                className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUsers className="mr-1" /> Join Room
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaSignInAlt className="mr-1" /> Login
              </Link>
              <Link
                to="/register"
                className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUserPlus className="mr-1" /> Register
              </Link>
            </>
          )}
        </div>
        <button className="md:hidden text-2xl focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black bg-opacity-95 flex flex-col items-center space-y-4 py-4"
        >
          <a
            href="#home"
            className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              toggleMenu();
            }}
          >
            <FaHome className="mr-1" /> Home
          </a>
          {token ? (
            <>
              {isAdmin && (
                <>
                  <Link
                    to="/create-room"
                    className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
                    onClick={toggleMenu}
                  >
                    <FaPlusCircle className="mr-1" /> Create Room
                  </Link>
                  <Link
                    to="/admin-dashboard"
                    className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
                    onClick={toggleMenu}
                  >
                    <FaTachometerAlt className="mr-1" /> Admin Dashboard
                  </Link>
                </>
              )}
              <Link
                to="/join-room"
                className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
                onClick={toggleMenu}
              >
                <FaUsers className="mr-1" /> Join Room
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
                onClick={toggleMenu}
              >
                <FaSignInAlt className="mr-1" /> Login
              </Link>
              <Link
                to="/register"
                className="flex items-center hover:text-yellow-300 transition duration-300 text-lg"
                onClick={toggleMenu}
              >
                <FaUserPlus className="mr-1" /> Register
              </Link>
            </>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
