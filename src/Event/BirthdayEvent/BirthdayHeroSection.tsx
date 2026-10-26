'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import StarfieldCursor from '@/src/StarFieldCursor';

export default function BirthdayHeroSection() {
  // Stagger animation variants for smooth entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <>
   
    <section className="w-full bg-transparent text-white py-12 px-4 sm:px-8 flex justify-center items-center overflow-hidden font-sans">
      
      {/* Outer Container with Pure Black Background */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl w-full bg-transparent p-6 sm:p-10 relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* --- LEFT SIDE: Typography & Call-To-Action Button --- */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start space-y-6 z-20">
            
            <motion.span 
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.3em] font-semibold text-[#c89B7B] font-sans italic"
            >
              Exclusive Birthday Celebration
            </motion.span>

            {/* Bold Hero Heading in White */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-7xl font-bold tracking-tight text-[#c89B7B] font-sans italic leading-[1.08]"
            >
              Birthday {" "}
             
              Celebration
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-[#c89B7B] text-sm sm:text-base max-w-sm leading-relaxed"
            >
              Join us for an unforgettable evening of laughter, music, and priceless memories as we celebrate a magnificent milestone.
            </motion.p>

           

          </div>

          {/* --- RIGHT SIDE: Overlapping Photo Grid matching template layout --- */}
          <div className="lg:col-span-7 relative min-h-[480px] sm:min-h-[560px] w-full flex items-center justify-center">
            
            {/* 1. Large Main Backdrop Image (Top-Right Big Card) */}
            <motion.div 
              variants={itemVariants}
              className="absolute right-0 top-0 w-[70%] h-[85%] rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl z-0"
            >
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.X1lUdgGFQjX79VipArEK5gHaE8?r=0&w=1618&h=1080&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Birthday hero portrait"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            {/* 2. Top Left Floating Overlapping Card */}
            <motion.div 
              variants={itemVariants}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[8%] top-[8%] w-[42%] h-[38%] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl z-10 border border-neutral-800"
            >
              <img
                src="https://5.imimg.com/data5/ANDROID/Default/2023/8/337550319/TF/BU/DH/29051564/product-jpeg-500x500.jpg"
                alt="Birthday party setup"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* 3. Bottom Left Floating Overlapping Card */}
            <motion.div 
              variants={itemVariants}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute left-[8%] bottom-[8%] w-[45%] h-[40%] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl z-20 border border-neutral-800"
            >
              <img
                src="https://static.wixstatic.com/media/cff691_4332c70180a5478d889a8a8ea9e206e9~mv2.jpg/v1/fill/w_2500,h_1666,al_c/cff691_4332c70180a5478d889a8a8ea9e206e9~mv2.jpg"
                alt="Birthday cake cutting"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* 4. Bottom Right Small Overlapping Card */}
            <motion.div 
              variants={itemVariants}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute right-[5%] bottom-[2%] w-[38%] h-[36%] rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl z-30 border border-neutral-800"
            >
              <img
                src="https://disneystories.lk/wp-content/uploads/2023/04/15.jpg"
                alt="Birthday toast & celebration"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

          </div>

        </div>
      </motion.div>

    </section>
    </>
  );
}