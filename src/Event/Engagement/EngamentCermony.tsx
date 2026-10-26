/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import EngagementEditorialSection from './EngagementEditorialsection';
import WeddingDriftGallery from '../Prewedd';
import { useEngagement } from '@/src/context/EngagementContext';

export default function EngagementCollageCard() {
  const { engagementImages } = useEngagement();

  // Letter Animation Variants
  const sentenceVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      },
    },
  };

  const titleText = "Engagement";
  const subtitleText = "& RING CEREMONY";
  const taglineText = "THE BEGINNING OF FOREVER";

  return (
    <>
      <section className="relative w-full bg-transparent text-[#C89B7B] flex flex-col justify-center items-center overflow-hidden py-12 px-4 sm:px-8">
        <div className="max-w-6xl w-full mx-auto rounded-3xl p-4 sm:p-8 relative">
          
          {/* Top Grid: 4 Images with Continuous Infinite Floating Animation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            
            {/* Photo 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -8, 0], rotate: [0, -1, 0] }}
              transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl"
            >
              <img
                src={engagementImages[0]?.src}
                alt={engagementImages[0]?.alt || "Ring exchange ceremony"}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
            </motion.div>

            {/* Photo 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, 8, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl"
            >
              <img
                src={engagementImages[1]?.src}
                alt={engagementImages[1]?.alt || "Engagement ring close up"}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
            </motion.div>

            {/* Photo 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl"
            >
              <img
                src={engagementImages[2]?.src}
                alt={engagementImages[2]?.alt || "Couple laughing together"}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
            </motion.div>

            {/* Photo 4 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl"
            >
              <img
                src={engagementImages[3]?.src}
                alt={engagementImages[3]?.alt || "Engagement celebration details"}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
            </motion.div>

          </div>

          {/* Lower Section: 3 Vertical Cards + Animated Typography */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Grid: 3 Tall Aspect Ratio Cards */}
            <div className="lg:col-span-8 grid grid-cols-3 gap-3 sm:gap-4">
              
              {/* Photo 5 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl"
              >
                <img
                  src={engagementImages[4]?.src}
                  alt={engagementImages[4]?.alt || "Romantic couple moment"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </motion.div>

              {/* Photo 6 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl"
              >
                <img
                  src={engagementImages[5]?.src}
                  alt={engagementImages[5]?.alt || "Couple portrait"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </motion.div>

              {/* Photo 7 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl"
              >
                <img
                  src={engagementImages[6]?.src}
                  alt={engagementImages[6]?.alt || "Celebration toast"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </motion.div>

            </div>

            {/* Right Side: Animated Typography */}
            <div className="lg:col-span-4 flex flex-col justify-center text-center lg:text-left py-4 px-2 sm:px-4">
              
              <motion.span 
                variants={sentenceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#C89B7B] mb-2 flex flex-wrap justify-center lg:justify-start"
              >
                {taglineText.split("").map((char, idx) => (
                  <motion.span key={idx} variants={letterVariants}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>

              <motion.h1 
                variants={sentenceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-serif italic font-normal text-4xl sm:text-2xl lg:text-4xl text-[#C89B7B] leading-[1.1] mb-2 flex flex-wrap justify-center lg:justify-start tracking-wide"
              >
                {titleText.split("").map((char, idx) => (
                  <motion.span key={idx} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p 
                variants={sentenceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-serif tracking-[0.2em] text-xs sm:text-sm text-[#C89B7B] uppercase mb-6 flex flex-wrap justify-center lg:justify-start"
              >
                {subtitleText.split("").map((char, idx) => (
                  <motion.span key={idx} variants={letterVariants}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>

              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="w-20 h-[1px] bg-[#C89B7B] mx-auto lg:mx-0 mb-4 origin-left"
              />

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-[11px] sm:text-xs text-[#C89B7B] tracking-[0.25em] uppercase font-sans"
              >
                CELEBRATING SARAH & MICHAEL
              </motion.p>
            </div>

          </div>

        </div>
      </section>
      <EngagementEditorialSection/>
      <WeddingDriftGallery/>
    </>
  );
}