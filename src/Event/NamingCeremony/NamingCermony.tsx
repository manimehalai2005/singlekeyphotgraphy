"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import NamingCeremonyHeroSection from './NamingCeremonyHerosection';
import InfinitePhotoSlider from '../Photogallerytemplate';
import StarfieldCursor from '@/src/StarFieldCursor';
import WeddingDriftGallery from '../Prewedd';

export default function NamingCeremonyAbout() {
  // Smooth Fade-Up Animation for text sections
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const subTitle = "A Blessed Celebration";
  const mainTitle = "Naming Ceremony";
  const paragraph1 = "We joyfully invite you to celebrate the sacred naming ceremony of our beloved little one. Join us as we bestow our blessing, love, and a cherished name for a lifetime of happiness.";
  const paragraph2 = "The special day will be filled with traditional rituals, joyous family gatherings, sweet delicacies, and warm blessings. Your presence will make this milestone even more memorable and unforgettable for our family.";

  return (
    <>
      
      <section className="relative w-full bg-transparent text-white flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 py-12 sm:py-20 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mt-4 sm:mt-10">
          
          {/* Left Side: Overlapping Photo Collage */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-[360px] sm:h-[480px]">
            
            {/* Background Larger Photo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute left-2 sm:left-0 top-0 w-64 sm:w-[380px] h-64 sm:h-88 bg-neutral-900 transform -rotate-3 z-10 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl"
            >
              <div className="w-full h-full overflow-hidden bg-neutral-950">
                <img
                  src="https://tse1.explicit.bing.net/th/id/OIP.lqxdK3YhMajMoUteDQZ5ngHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Baby Celebration"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            {/* Foreground Smaller Overlapping Photo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4 w-52 sm:w-72 p-2.5 transform rotate-3 z-30"
            >
              <div className="w-full h-36 sm:h-52 overflow-hidden rounded-xl relative shadow-xl">
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.geYP-c6F3U2ZPoWSg5OMKgHaHW?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Naming Ceremony Details"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20" />
              </div>
            </motion.div>

          </div>

          {/* Right Side: Clean Typography with Standard Fade-In */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center space-y-3 sm:space-y-4">
            
            {/* Subtitle */}
            <motion.span 
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-[#C89B7B] block mb-1"
            >
              {subTitle}
            </motion.span>

            {/* Main Title */}
            <motion.h2 
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-serif italic font-bold text-3xl sm:text-5xl lg:text-6xl text-orange-300 tracking-wide mb-3 sm:mb-4"
            >
              {mainTitle}
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p 
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm sm:text-base text-orange-200/90 font-medium leading-relaxed"
            >
              {paragraph1}
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p 
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xs sm:text-sm text-orange-200/80 leading-relaxed"
            >
              {paragraph2}
            </motion.p>

          </div>

        </div>
      </section>

      <NamingCeremonyHeroSection />
      <WeddingDriftGallery />
    </>
  );
}