"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import LoveYourFamilyCollage from './BirthdayspaceCard';
import BirthdayHeroSection from './BirthdayHeroSection';
import WeddingDriftGallery from '../Prewedd';



export default function BirthdayEventCard() {
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

  return (
    <>
    <section className="relative w-full bg-transparent text-white flex flex-col justify-center items-center px-6 py-20 overflow-hidden">
      
      {/* Full-width container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Top Bunting / Party Flags Illustration */}
        <div className="absolute w-full mb-10 top-0 inset-x-0 flex justify-center opacity-70 pointer-events-none">
          <svg className="w-full max-w-7xl h-16 " viewBox="0 0 500 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5 Q 250 45 500 5" stroke="#C89B7B" strokeWidth="1.5" fill="none" />
            <path d="M40 13 L60 13 L50 30 Z" fill="#26211E" stroke="#C89B7B" strokeWidth="1" />
            <path d="M90 18 L110 18 L100 35 Z" fill="#C89B7B" stroke="#D4AF37" strokeWidth="1" />
            <path d="M140 21 L160 21 L150 38 Z" fill="#26211E" stroke="#C89B7B" strokeWidth="1" />
            <path d="M190 22 L210 22 L200 40 Z" fill="#C89B7B" stroke="#D4AF37" strokeWidth="1" />
            <path d="M240 22 L260 22 L250 40 Z" fill="#26211E" stroke="#C89B7B" strokeWidth="1" />
            <path d="M290 22 L310 22 L300 38 Z" fill="#C89B7B" stroke="#D4AF37" strokeWidth="1" />
            <path d="M340 21 L360 21 L350 35 Z" fill="#26211E" stroke="#C89B7B" strokeWidth="1" />
            <path d="M390 18 L410 18 L400 30 Z" fill="#C89B7B" stroke="#D4AF37" strokeWidth="1" />
            <path d="M440 13 L460 13 L450 23 Z" fill="#26211E" stroke="#C89B7B" strokeWidth="1" />
             <path d="M340 21 L360 21 L350 35 Z" fill="#26211E" stroke="#C89B7B" strokeWidth="1" />
            <path d="M390 18 L410 18 L400 30 Z" fill="#C89B7B" stroke="#D4AF37" strokeWidth="1" />
            <path d="M440 13 L460 13 L450 23 Z" fill="#26211E" stroke="#C89B7B" strokeWidth="1" />
          </svg>
        </div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 mb-6 z-10"
        >
          <span className="text-xs sm:text-sm uppercase tracking-[0.4em] font-bold text-[#C89B7B] block mb-2 drop-shadow-md">
            HAPPY
          </span>
          <h1 className="font-serif italic font-bold text-6xl sm:text-7xl text-[#c89B7B] tracking-wide drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
            Birthday
          </h1>
        </motion.div>

        {/* 5-Photo Fanned & Tightly Packed Cluster with Staggered Interchange Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full my-8 flex justify-center items-center -space-x-10 sm:-space-x-14 z-10"
        >
          
          {/* Far Left Polaroid */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -120, y: 80, rotate: -30, scale: 0.7 },
              visible: { opacity: 1, x: 0, y: 0, rotate: -12, scale: 1, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="w-32 sm:w-44  text-neutral-900 p-2.5 pb-6 sm:p-3 sm:pb-7 shadow-xl z-10  transition-transform hover:scale-105 duration-300"
          >
            <div className="w-full h-28 sm:h-40 overflow-hidden bg-neutral-200">
              <img
                src="https://i.pinimg.com/736x/f7/27/ec/f727ecc6a799c3c1ba2e389a65727ed2.jpg"
                alt="Birthday memory 1"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Inner Left Polaroid */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -60, y: 100, rotate: -20, scale: 0.75 },
              visible: { opacity: 1, x: 0, y: 0, rotate: -6, scale: 1, transition: { duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="w-36 sm:w-48  text-neutral-900 p-2.5 pb-7 sm:p-3 sm:pb-8 shadow-2xl z-20 transition-transform hover:scale-105 duration-300"
          >
            <div className="w-full h-32 sm:h-44 overflow-hidden bg-neutral-200">
              <img
                src="https://i.pinimg.com/736x/5b/29/ec/5b29ec9320b82389233953875607c3cb.jpg"
                alt="Birthday gift"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Center Main Hero Polaroid */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 150, scale: 0.7, rotate: 0 },
              visible: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, transition: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="w-60 sm:w-80  text-neutral-900 p-3.5 pb-12 sm:p-4 sm:pb-14 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50  transition-transform hover:scale-105 duration-300 -mt-4 sm:-mt-6"
          >
            <div className="w-full h-56 sm:h-72 overflow-hidden bg-neutral-200">
              <img
                src="https://static.wixstatic.com/media/649494_55c95b270d294bee9387400013f4e9d2~mv2.png/v1/fill/w_1000,h_604,al_c,q_90,usm_0.66_1.00_0.01/649494_55c95b270d294bee9387400013f4e9d2~mv2.png"
                alt="Birthday person"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Inner Right Polaroid */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 60, y: 100, rotate: 20, scale: 0.75 },
              visible: { opacity: 1, x: 0, y: 0, rotate: 6, scale: 1, transition: { duration: 1.0, delay: 0.45, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="w-36 sm:w-48  text-neutral-900 p-2.5 pb-7 sm:p-3 sm:pb-8 shadow-2xl z-20 transition-transform hover:scale-105 duration-300"
          >
            <div className="w-full h-32 sm:h-44 overflow-hidden bg-neutral-200">
              <img
                src="https://i.ytimg.com/vi/34lf_1qLPjQ/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLDubvcVpibUjLpW0_j9XO-ViAD_bA&usqp=CCk"
                alt="Birthday cake"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Far Right Polaroid */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 120, y: 80, rotate: 30, scale: 0.7 },
              visible: { opacity: 1, x: 0, y: 0, rotate: 12, scale: 1, transition: { duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="w-32 sm:w-44  text-neutral-900 p-2.5 pb-6 sm:p-3 sm:pb-7 shadow-xl z-10  transition-transform hover:scale-105 duration-300"
          >
            <div className="w-full h-28 sm:h-40 overflow-hidden bg-neutral-200">
              <img
                src="https://i.pinimg.com/originals/88/e8/19/88e819f0c1696c12dc8aa2183523876b.jpg"
                alt="Birthday memory 2"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

        </motion.div>

        {/* Tape Effect Gold Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative z-40 my-4 w-80 sm:w-96 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] py-3.5 px-8 shadow-xl transform -rotate-1 border-y border-[#B8860B]"
        >
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-6 bg-[#C59B27] opacity-80"></div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-6 bg-[#C59B27] opacity-80"></div>
          
          <h2 className="font-sans font-bold text-xl sm:text-2xl text-neutral-950 tracking-wide drop-shadow-sm">
            Birthday ceremony
          </h2>
        </motion.div>

        {/* Wishes & Footer text */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm sm:text-base text-[#c89B7B] font-medium tracking-wide max-w-lg mt-4 mb-4 z-10 leading-relaxed"
        >
          Wishing you a day filled with joy, laughter, and all the things you love most
        </motion.p>

      </div>

    </section>
    <LoveYourFamilyCollage/>
   <BirthdayHeroSection/>
   <WeddingDriftGallery/>
    </>
  );
}