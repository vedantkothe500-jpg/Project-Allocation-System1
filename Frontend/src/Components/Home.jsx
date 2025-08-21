import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import axios from "axios";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 via-stone-100 to-white font-poppins">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-3">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#1e3a8a" />
            <path 
              d="M5 10v4c0 5 7 7 7 7s7-2 7-7v-4" 
              stroke="#1e3a8a" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none"
            />
          </svg>
          <span className="text-xl font-bold text-blue-900 cursor-pointer">Project Allocation System</span>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-3">
          
          <Link to="/register">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-900 transition duration-200 cursor-pointer">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-900 transition duration-200 cursor-pointer">
              Login
            </button>

          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-blue-900 focus:outline-none cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-2 mt-20 px-6 py-3 bg-white shadow-md z-40">
          <Link to="/register" onClick={() => setMenuOpen(false)}>
            <button className="w-full bg-gray-300 text-blue-900 px-4 py-2 rounded shadow hover:bg-blue-400 transition cursor-pointer">
              Register
            </button>
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <button className="w-full bg-gray-300 text-blue-900 px-4 py-2 rounded shadow hover:bg-blue-400 transition cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="mt-20"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center px-4 py-12"
      >
        <motion.svg 
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
          width="120" height="120" viewBox="0 0 24 24" fill="#2563eb"
          className="mb-6"
        >
          <path d="M12 2L2 7L12 12L22 7L12 2Z" />
          <path 
            d="M5 10v4c0 5 7 7 7 7s7-2 7-7v-4" 
            stroke="white" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none"
          />
        </motion.svg>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Empowering Your Project Journey 🚀
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          Seamlessly manage, assign, and track projects with ease. Whether you're a student or faculty, we make your project experience smarter.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link to="/register">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-white text-blue-700 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition cursor-pointer">
              Already have an account?
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        <p className="text-sm">&copy; {new Date().getFullYear()} Project Allocation System. All rights reserved.</p>
        <p className="text-xs mt-1">Created by Vishwajeet Kanchanwar 🚀</p>
      </footer>
    </div>
  );
};

export default HomePage;
