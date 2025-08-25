'use client';

import { motion, useInView, easeOut } from 'framer-motion';
import { useRef, useState } from 'react';
import {  CodeBracketIcon } from '@heroicons/react/24/outline';
import { portfolioData } from '@/data/portfolioData';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(portfolioData.projects.map(project => project.category)))];
  
  const filteredProjects = filter === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.category === filter);

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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
  transition: { duration: 0.6, ease: easeOut },
    },
  };

  type ProjectType = {
    id: string | number;
    category: string;
    technologies: string[];
    title: string;
    description: string;
    liveUrl: string;
    githubUrl: string;
    featured?: boolean;
  };
  const ProjectCard = ({ project, index }: { project: ProjectType; index: number }) => {
    return (
      <motion.div
        className="bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-600/20 group"
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: index * 0.1 }}
        whileHover={{ 
          y: -10,
          boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)"
        }}
      >
        {/* Project Image Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20">
              {project.category === 'Frontend' ? '🎨' : project.category === 'Backend' ? '⚙️' : '🚀'}
            </div>
          </div>
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* <ExternalLinkIcon className="w-5 h-5" /> */}
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <CodeBracketIcon className="w-5 h-5" />
            </motion.a>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-cyan-400 text-sm font-medium">{project.category}</span>
            <div className="flex space-x-1">
              {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-white/70 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="text-xs bg-gray-800/50 text-white/80 px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-600/20">
            <div className="flex space-x-4">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center space-x-1 transition-colors"
                whileHover={{ x: 2 }}
              >
                {/* <ExternalLinkIcon className="w-4 h-4" /> */}
                <span>Live Demo</span>
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white text-sm font-medium flex items-center space-x-1 transition-colors"
                whileHover={{ x: 2 }}
              >
                <CodeBracketIcon className="w-4 h-4" />
                <span>Code</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-20 bg-black/70" ref={ref}>
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
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300">Projects</span>
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
              Here are some of the projects I&apos;ve worked on. Each one represents a unique challenge and solution.
            </motion.p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-full p-2 border border-gray-600/20 flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${
                    filter === category
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-gray-700/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.div
              className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl p-8 border border-gray-600/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                Interested in working together?
              </h3>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                I&apos;m always open to discussing new opportunities and exciting projects.
              </p>
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          {/* GitHub Activity Indicator */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <motion.a
              href={portfolioData.social.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-white/60 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Active on GitHub</span>
              <div className="text-lg">→</div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
