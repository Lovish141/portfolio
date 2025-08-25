'use client';

import { useState, useEffect } from 'react';
import { motion, easeOut } from 'framer-motion';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { portfolioData } from '@/data/portfolioData';
import SocialIcon from './SocialIcon';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = portfolioData.personal.title;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
  transition: { duration: 0.8, ease: easeOut },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: easeOut,
      },
    },
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-2">

      {/* Hero Content */}
      <motion.div
        className="container mx-auto px-6 text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            className="text-6xl md:text-8xl font-bold text-white mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {portfolioData.personal.name.split(' ').map((word, index) => (
              <motion.span
                key={index}
                className={index === 1 ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300' : ''}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {word}
                {index === 0 && ' '}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-2xl md:text-4xl text-cyan-300 font-light min-h-[1.2em]">
            {displayedText}
            <motion.span
              className="inline-block w-1 h-8 bg-cyan-400 ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {portfolioData.personal.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View My Work
          </motion.a>
          
          <motion.a
            href="#contact"
            className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-6 mt-12"
        >
          {Object.entries(portfolioData.social).map(([platform, data]) => (
            <motion.a
              key={platform}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-cyan-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">{data.label}</span>
              <SocialIcon icon={data.icon} className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        variants={floatingVariants}
        animate="animate"
      >
        <motion.button
          onClick={scrollToAbout}
          className="text-white/60 hover:text-cyan-400 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <ArrowDownIcon className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
