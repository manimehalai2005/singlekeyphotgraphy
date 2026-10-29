'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import BabyShowerScrapbookSection from './BabyShowerscropbooksection';
import WeddingDriftGallery from '../Prewedd';

export default function BabyShowerMenuCard() {
  // Simple Fade In & Slide Up Animation for Sections/Headings
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

  // Book Opening 3D Flip Animation Variants for Images
  const bookOpenVariants: Variants = {
    hidden: { 
      opacity: 0, 
      rotateY: -40, 
      perspective: 1200,
      scale: 0.92
    },
    visible: { 
      opacity: 1, 
      rotateY: 0, 
      perspective: 1200,
      scale: 1,
      transition: { 
        duration: 1.0, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <>
      
      <section className="relative w-full bg-transparent text-[#C89B7B] flex flex-col justify-center items-center overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="w-full max-w-7xl mx-auto rounded-3xl px-3 sm:px-8 lg:px-12 py-6 sm:py-12 shadow-2xl relative mt-2">
          
          {/* Header Title */}
          <div className="text-center mb-10 sm:mb-16">
            <motion.h1 
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-semibold italic text-3xl sm:text-5xl lg:text-6xl text-[#C89B7B] tracking-wide"
            >
              Baby Shower Ceremony
            </motion.h1>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* --- 1st Row: Photo 1 --- */}
            <div className="lg:col-span-6 w-full">
              <motion.div 
                variants={bookOpenVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="rounded-2xl w-full"
              >
                <div className="w-full h-64 sm:h-80 lg:h-96 mx-auto overflow-hidden bg-neutral-800 rounded-2xl shadow-xl">
                  <img
                    src="https://www.joonsquare.com/usermanage/image/business/srikar-rao-photography-warangal-urban-31267/srikar-rao-photography-warangal-urban-srikar-rao-photography-no3.jpg"
                    alt="Traditional Bangle Ceremony & Blessing"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>

            {/* --- 1st Row: Text 1 --- */}
            <div className="lg:col-span-6 text-left w-full space-y-3">
              <motion.h3 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-sans font-bold text-2xl sm:text-3xl text-[#C89B7B]"
              >
                Bangle Ceremony and Blessings
              </motion.h3>

              <motion.p 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm sm:text-base text-[#C89B7B]/90 leading-relaxed"
              >
                Welcoming family and elders as they adorn the mother to be with traditional glass bangles, fragrant flowers, and heartfelt prayers for a safe journey ahead.
              </motion.p>

              <motion.p 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-serif italic text-xs sm:text-sm text-[#C89B7B] pt-1"
              >
                Tradition | Blessings | Grace
              </motion.p>
            </div>


            {/* --- 2nd Row: Text 2 --- */}
            <div className="lg:col-span-6 text-left w-full space-y-3 order-4 lg:order-none">
              <motion.h3 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-sans font-bold text-2xl sm:text-3xl text-[#C89B7B]"
              >
                Sacred Variety Rice Feast
              </motion.h3>

              <motion.p 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm sm:text-base text-[#C89B7B]/90 leading-relaxed"
              >
                A grand traditional meal prepared with love, featuring authentic varieties of spiced rice, fresh sweets, and traditional festive delicacies for all guests.
              </motion.p>

              <motion.p 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-serif italic text-xs sm:text-sm text-[#C89B7B] pt-1"
              >
                Authentic | Delicious | Celebration
              </motion.p>
            </div>

            {/* --- 2nd Row: Photo 2 --- */}
            <div className="lg:col-span-6 order-3 lg:order-none w-full">
              <motion.div 
                variants={bookOpenVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="rounded-2xl w-full"
              >
                <div className="w-full h-64 sm:h-80 lg:h-96 mx-auto overflow-hidden bg-neutral-800 rounded-2xl shadow-xl">
                  <img
                    src="https://i.pinimg.com/736x/c0/13/07/c013072cdef60e34a80bf1abc83c285f.jpg"
                    alt="Festive Feast Celebration"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>


            {/* --- 3rd Row: Photo 3 --- */}
            <div className="lg:col-span-6 order-5 w-full">
              <motion.div 
                variants={bookOpenVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="rounded-2xl w-full"
              >
                <div className="w-full h-64 sm:h-80 lg:h-96 mx-auto overflow-hidden bg-neutral-800 rounded-2xl shadow-xl">
                  <img
                    src="https://i.pinimg.com/originals/f8/68/1f/f8681ff45012d142abb0be256bc12435.jpg"
                    alt="Moments of Joy and Gratitude"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            </div>

            {/* --- 3rd Row: Text 3 --- */}
            <div className="lg:col-span-6 text-left order-6 w-full space-y-3">
              <motion.h3 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-sans font-bold text-2xl sm:text-3xl text-[#C89B7B]"
              >
                Moments of Joy and Love
              </motion.h3>

              <motion.p 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm sm:text-base text-[#C89B7B]/90 leading-relaxed"
              >
                Creating everlasting memories filled with laughter, music, gifts, and warm wishes as everyone awaits the arrival of the little newborn.
              </motion.p>

              <motion.p 
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-serif italic text-xs sm:text-sm text-[#C89B7B] pt-1"
              >
                Love | Memories | Happiness
              </motion.p>
            </div>

          </div>
        </div>

      </section>
      
      <BabyShowerScrapbookSection />
     
     {/* Mobile-friendly Wrapper for Drift Gallery */}
     <div className="w-full h-[50vh] sm:h-screen relative overflow-hidden">
       <WeddingDriftGallery />
     </div>
    </>
  );
}