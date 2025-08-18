'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { portfolioData } from '@/data/portfolioData';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const timelineVariants = {
    hidden: { height: 0 },
    visible: {
      height: '100%',
      transition: { duration: 2, ease: "easeOut" },
    },
  };

  const ExperienceCard = ({ experience, index, isLast }: { experience: any; index: number; isLast: boolean }) => {
    return (
      <motion.div
        className="relative flex items-start space-x-6 pb-12"
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: index * 0.2 }}
      >
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <motion.div
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 200 }}
          >
            <BriefcaseIcon className="w-6 h-6 text-white" />
          </motion.div>
          {!isLast && (
            <div className="w-0.5 h-full bg-gray-600/30 mt-4 overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-blue-500 to-cyan-500"
                variants={timelineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 + 0.8 }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <motion.div
          className="flex-1 bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/20"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(147, 51, 234, 0.15)"
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {experience.position}
              </h3>
              <h4 className="text-cyan-400 font-medium">
                {experience.company}
              </h4>
            </div>
            <div className="flex flex-col md:items-end text-white/60 text-sm mt-2 md:mt-0">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{experience.startDate} - {experience.endDate}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <MapPinIcon className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <ul className="space-y-2">
              {experience.description.map((item: string, i: number) => (
                <motion.li
                  key={i}
                  className="text-white/80 text-sm flex items-start space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.2 + 0.8 + i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech: string, i: number) => (
              <motion.span
                key={tech}
                className="text-xs bg-gray-800/50 text-white/80 px-3 py-1 rounded-full border border-gray-600/30"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.2 + 1 + i * 0.05 }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(147, 51, 234, 0.2)"
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-gray-900/50 to-black/70" ref={ref}>
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
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300">Experience</span>
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
              My professional journey and the experiences that have shaped my skills and expertise.
            </motion.p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="max-w-4xl mx-auto">
            {portfolioData.experience.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isLast={index === portfolioData.experience.length - 1}
              />
            ))}
          </div>

          {/* Summary Stats */}
          {/* <motion.div 
            variants={itemVariants}
            className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: "Years of Experience", value: "5+", icon: "📅" },
              { label: "Companies Worked With", value: portfolioData.experience.length, icon: "🏢" },
              { label: "Technologies Mastered", value: "20+", icon: "💻" },
            ].map((stat, index) => (
              <motion.div
                key={index}
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
                  boxShadow: "0 20px 25px -5px rgba(147, 51, 234, 0.1)"
                }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300 mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div> */}

          {/* Career Highlight */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 max-w-4xl mx-auto"
          >
            <motion.div
              className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl p-8 border border-gray-600/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Career Highlight
                </h3>
                <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
                Enhanced enterprise search functionality improving relevancy by 12%, built scalable tools supporting 5,000+ product categories, and automated workflows reducing manual effort by 40%.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-12"
          >
            <motion.div
              className="inline-flex items-center space-x-2 text-white/60 hover:text-cyan-400 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                // You can add resume download logic here
                console.log('Download full resume');
              }}
            >
              <span className="text-sm">Want to know more?</span>
              <div className="text-lg">→</div>
              <span className="text-sm font-medium">Download My Resume</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
