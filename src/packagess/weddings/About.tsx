'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutUsPage() {
  return (
    <section className="relative w-full min-h-screen bg-transparent flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      
      {/* Container for the collage and text layout */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
        
        {/* Left Image Group (Opens smooth from center to left) */}
        <motion.div 
          initial={{ x: -100, opacity: 0, rotate: -6 }}
          whileInView={{ x: 0, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="lg:col-span-4 flex flex-col gap-6 relative z-10 origin-right"
        >
          {/* Top-left image */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            <img
              src="https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793270862/12x15_2.jpg"
              alt="Hotel exterior and pool"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Bottom-left image */}
          <div className="relative w-4/5 h-56 rounded-2xl overflow-hidden shadow-xl ml-auto transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <img
              src="https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793269556/pwo35gw4kgtvmebtv2zs.jpg"
              alt="Tropical beach and sea"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Center Text and Vertical Line */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-4 flex flex-col items-center text-center px-4 relative z-20"
        >
          {/* Vertical line above button */}
          <div className="w-[1px] h-20 bg-[#c89b7b]/40 mb-6"></div>

          {/* Pill Button */}
          <span className="inline-block text-[#c89b7b]  text-xs font-semibold uppercase tracking-widest px-6 py-2.5 rounded-full mb-8 shadow-md">
            Wedding Shoot
          </span>

          {/* Description Text */}
          <p className="text-[#c89b7b] text-sm md:text-base leading-relaxed font-normal opacity-95">
            We capture the love, emotions, and unforgettable moments of your wedding day, turning every beautiful memory into timeless photographs that tell your unique love story.
          </p>

          {/* Vertical line below text */}
          <div className="w-[1px] h-20 bg-[#c89b7b]/40 mt-8"></div>
        </motion.div>

        {/* Right Image Group (Opens smooth from center to right) */}
        <motion.div 
          initial={{ x: 100, opacity: 0, rotate: 6 }}
          whileInView={{ x: 0, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="lg:col-span-4 flex flex-col gap-6 relative z-10 origin-left"
        >
          {/* Top-right image */}
          <div className="relative w-4/5 h-48 rounded-2xl overflow-hidden shadow-xl mr-auto transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <img
              src="https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793260146/SK_08649_A_1.jpg"
             
              alt="Swimming pool sunset view"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Middle-right image */}
          <div className="relative w-full h-52 rounded-2xl overflow-hidden shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <img
              src="https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793268960/cfaoaro9w9ngn144dqcx.jpg"
              alt="Palm tree and resort"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Bottom-right image */}
          <div className="relative w-3/4 h-40 rounded-2xl overflow-hidden shadow-xl ml-auto transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <img
              src="https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793268925/cibjnp7thkltvlkxmywt.jpg"
              alt="Luxury pool relaxing"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}