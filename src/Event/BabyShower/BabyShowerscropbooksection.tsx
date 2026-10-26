'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function BabyShowerScrapbookSection() {
  // Static fade-in entrance for the container/cards only (no letter or jump animations)
  const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const mainTitle = "Baby Shower";
  const quoteText = "Welcoming our little miracle with endless love, traditional blessings, and heartfelt joy.";

  return (
    <section className="w-full bg-black text-[#C89B7B] py-16 px-4 sm:px-8 flex justify-center items-center overflow-hidden font-sans">
      
      {/* Main Container Card */}
      <motion.div
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-8xl w-full p-6 sm:p-12 shadow-2xl relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* --- LEFT SIDE: Static Typography --- */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 z-20">
            
            {/* Subtitle */}
            <p className="text-xs sm:text-sm uppercase tracking-[0.4em] font-semibold text-[#C89B7B]">
              Traditional Seemantham
            </p>

            {/* Main Cursive/Serif Style Title */}
            <h1 className="text-5xl sm:text-7xl font-serif italic font-bold tracking-wide text-[#C89B7B] leading-tight">
              {mainTitle}
            </h1>

            {/* Quote / Subtext */}
            <p className="text-[#c89B7B] text-sm sm:text-base italic max-w-sm leading-relaxed">
              &quot;{quoteText}&quot;
            </p>

          </div>

          {/* --- RIGHT SIDE: Static Photo Collage Template --- */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative">
            
            {/* 1. Center/Left Large Feature Photo */}
            <div className="sm:col-span-7 relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl group">
              <div className="w-full h-full">
                <img
                  src="https://i.pinimg.com/736x/c0/13/07/c013072cdef60e34a80bf1abc83c285f.jpg"
                  alt="Mom to be blessing ceremony"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Stack (Photo 2 & Photo 3) */}
            <div className="sm:col-span-5 flex flex-col gap-4">
              
              {/* 2. Top Right Photo */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl group">
                <div className="w-full h-full">
                  <img
                    src="https://i0.wp.com/cenduparam.com/wp-content/uploads/2019/03/IMG_0157.jpg?resize=768%2C1024&ssl=1"
                    alt="Traditional baby shower feast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* 3. Bottom Right Photo */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl group">
                <div className="w-full h-full">
                  <img
                    src="https://www.chocovira.in/wp-content/uploads/2020/08/Baby-Shower-Ceremony-Outfit-In-India.jpg"
                    alt="Baby shower decorations"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </motion.div>

    </section>
  );
}