'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { portfolioData } from '@/data/portfolioData';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

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
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };


  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: 'Email',
      value: portfolioData.personal.email,
      href: `mailto:${portfolioData.personal.email}`,
    },
    {
      icon: PhoneIcon,
      label: 'Phone',
      value: portfolioData.personal.phone,
      href: `tel:${portfolioData.personal.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPinIcon,
      label: 'Location',
      value: portfolioData.personal.location,
      href: '#',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-black/80" ref={ref}>
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
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300">Touch</span>
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-300 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div variants={itemVariants} className="mt-6">
              <h3 className="text-xl text-white mb-2">{portfolioData.contact.title}</h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                {portfolioData.contact.subtitle}
              </p>
              <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full mt-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{portfolioData.contact.availability}</span>
              </div>
              
              {/* Cal.com Booking Button */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a
                  href="https://cal.com/lovish-sharma/30min?user=lovish-sharma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CalendarDaysIcon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Schedule a 30min Call</span>
                  <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.a>
                <p className="text-white/50 text-sm mt-3 text-center">Book a time that works for both of us</p>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-12">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  className="flex flex-col items-center space-y-3 p-6 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-600/20 hover:bg-gray-800/40 transition-all duration-300 group text-center"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-300 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-6">Follow Me</h3>
              <div className="flex justify-center space-x-6">
                {Object.entries(portfolioData.social).map(([platform, url], index) => (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gray-900/30 backdrop-blur-sm border border-gray-600/20 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-300 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="sr-only">{platform}</span>
                    <div className="w-6 h-6 text-white/70 group-hover:text-white">
                      {platform === 'github' && (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      )}
                      {platform === 'linkedin' && (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      )}
                      {platform === 'twitter' && (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-20 pt-8 border-t border-gray-600/20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/60">
            © 2024 {portfolioData.personal.name}. Built with Next.js and Framer Motion.
          </p>
        </div>
      </motion.footer>
    </section>
  );
};

export default Contact;
