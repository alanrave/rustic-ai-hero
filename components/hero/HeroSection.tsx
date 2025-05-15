'use client';

import { motion } from 'framer-motion';
import FloatingShapes from './FloatingShapes';

const HeroSection = () => {
  return (
    <section className="hero-container">
      <FloatingShapes />
      
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The AI Design Studio{' '}
          <br className="hidden sm:block" />
          for <span className="hero-title-gradient">Graphic Designers</span>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Crafted to make you <strong>faster</strong> and more <strong>creative</strong>.
          <br />
          AI studio for graphic designers, entrepreneurs, and influencers.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.button 
            className="cta-button mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Start For Free
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </motion.button>
          <p className="credit-text">No Credit Card Required</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;