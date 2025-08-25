'use client';

import { motion, useInView, easeOut } from 'framer-motion';
import { useRef } from 'react';
import { portfolioData } from '@/data/portfolioData';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
  transition: { duration: 0.8, ease: easeOut },
    },
  };



  return (
    <section id="about" className="py-20 bg-black/80" ref={ref}>
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
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300">Me</span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-300 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4">
                <motion.p 
                  className="text-lg text-white/80 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {portfolioData.personal.bio}
                </motion.p>
              </div>

              {/* Personal Details */}
              <motion.div 
                className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Personal Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white font-medium">{portfolioData.personal.email}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <p className="text-white font-medium">{portfolioData.personal.phone}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Location</p>
                    <p className="text-white font-medium">{portfolioData.personal.location}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Website</p>
                    <a 
                      href={portfolioData.personal.website}
                      className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {portfolioData.personal.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Download Resume Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                 
                >
                 <a href="/LovishSharma_FullStackEngineer_resume.pdf" download>Download Resume</a>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Stats */}
            <motion.div variants={itemVariants} className="space-y-8">
            
              {/* Education & Certifications Preview */}
              <motion.div 
                className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
                {portfolioData.education.map((edu) => (
                  <div key={edu.id} className="mb-4 last:mb-0">
                    <h4 className="text-white font-medium">{edu.degree}</h4>
                    <p className="text-cyan-400">{edu.institution}</p>
                    <p className="text-white/60 text-sm">{edu.startDate} - {edu.endDate}</p>
                    {edu.gpa && (
                      <p className="text-white/60 text-sm">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Certifications Preview */}
              {portfolioData.certifications.length > 0 && (
                <motion.div 
                  className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Recent Certifications</h3>
                  <div className="space-y-3">
                    {portfolioData.certifications.slice(0, 2).map((cert) => (
                      <div key={cert.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="text-white font-medium">{cert.name}</h4>
                          <p className="text-white/60 text-sm">{cert.issuer} • {cert.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
