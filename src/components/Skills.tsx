'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '@/data/portfolioData';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black/70 to-gray-900/50" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ scale: 0.5 }}
              animate={isInView ? { scale: 1 } : { scale: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300">Skills</span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-300 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.p
              className="text-white/70 mt-4 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Technologies and tools I love working with to bring ideas to life
            </motion.p>
          </motion.div>

          {/* Tech Stack Showcase */}
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-8 border border-gray-600/20">
              <div className="flex flex-wrap justify-center gap-4">
                {Object.values(portfolioData.skills).flat().map((skill, index) => (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    className="bg-gray-800/40 backdrop-blur-sm rounded-lg px-6 py-3 border border-gray-600/30 flex items-center space-x-3 group"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                      y: -2
                    }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{skill.icon}</span>
                    <span className="text-white font-medium">{skill.name}</span>
                    <motion.div 
                      className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-300 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.1
                      }}
                    ></motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Summary Cards */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { key: 'frontend', label: 'Frontend', icon: '🎨' },
              { key: 'backend', label: 'Backend', icon: '⚙️' },
              { key: 'tools', label: 'Tools & Other', icon: '🛠️' },
            ].map((category, index) => {
              const skills = portfolioData.skills[category.key as keyof typeof portfolioData.skills];
              
              return (
                <motion.div
                  key={category.key}
                  className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/20 text-center"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1)"
                  }}
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.label}</h3>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300">
                    {skills.length}+ Technologies
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
