"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RitualGallery() {
  return (
    <section className="relative w-full min-h-screen bg-transparent text-[#C89B7B] py-16 px-6 lg:px-20 overflow-hidden font-serif flex flex-col justify-between items-center">
      
      {/* Top Heading */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 mb-8"
      >
        <span className="text-xs uppercase tracking-widest text-[#C89B7B] font-bold block mb-2">
          Sacred Tradition Gallery
        </span>
        <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-[#C89B7B] italic">
          Ritual Moments
        </h2>
      </motion.div>

      {/* Main Overlapping Polaroid Collage Grid */}
      <div className="max-w-5xl w-full mx-auto relative flex flex-col items-center justify-center my-6">
        
        {/* Top Row: 2 Polaroids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-32 w-full max-w-4xl z-10">
          
          {/* Polaroid Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="relative p-3 pb-8 text-neutral-800 shadow-2xl rounded-sm transform -rotate-3 hover:rotate-0 transition-all duration-700"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-neutral-300 rounded-full shadow-md border border-neutral-400"></div>
            <div className="relative w-full h-56 rounded-sm overflow-hidden">
              <img
                src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/kulasai-fire-iii-abhraneel-chakraborty.jpg"
                alt="Sacred Ritual Moments"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-sans text-center text-[#C87B9B] mt-3 font-medium tracking-wider uppercase">
              kovil thiruvila
            </p>
          </motion.div>

          {/* Polaroid Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="relative p-3 pb-8 text-neutral-800 shadow-2xl rounded-sm transform rotate-2 hover:rotate-0 transition-all duration-700 mt-6 md:mt-0"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-neutral-300 rounded-full shadow-md border border-neutral-400"></div>
            <div className="relative w-full h-56 rounded-sm overflow-hidden">
              <img
                src="https://thespace.ink/wp-content/uploads/2024/09/Kulasai-Dussehra-South-Indias-Very-Own-Take-on-Dussehra-10-1024x681.jpg"
                alt="Traditional Blessings"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-sans text-center text-[#C89B7B] mt-3 font-medium tracking-wider uppercase">
              kali Attam
            </p>
          </motion.div>

        </div>

        {/* Center Overlay Polaroid */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative p-3 pb-8 text-neutral-800 shadow-2xl rounded-sm transform -rotate-1 hover:rotate-0 transition-all duration-700 w-72 md:w-80 -my-12 z-20 "
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-neutral-300 rounded-full shadow-md border border-neutral-400"></div>
          <div className="relative w-full h-48 rounded-sm overflow-hidden">
            <img
              src="https://d2ajlz7o3p8ddv.cloudfront.net/media/misc/articles/673_x_673_10_9rW1mXy.jpg"
              alt="Family Togetherness"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs font-sans text-center text-[#C89B7B] mt-3 font-medium tracking-wider uppercase">
            masani vettai
          </p>
        </motion.div>

        {/* Bottom Row: 2 Polaroids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-32 w-full max-w-4xl z-10 mt-2">
          
          {/* Polaroid Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
            className="relative p-3 pb-8 text-neutral-800 shadow-2xl rounded-sm transform rotate-2 hover:rotate-0 transition-all duration-700 "
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-neutral-300 rounded-full shadow-md border border-neutral-400"></div>
            <div className="relative w-full h-56 rounded-sm overflow-hidden">
              <img
                src="https://static.vecteezy.com/system/resources/previews/021/633/351/large_2x/narayanganj-dhaka-bangladesh-on-november-12-2022-devotees-offering-prayers-at-the-shri-shri-lokanath-brahmachari-ashram-temple-during-the-hindu-religious-fasting-festival-of-rakher-upobash-free-photo.jpg"
                alt="Auspicious Customs"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-sans text-center text-[#C89B7B] mt-3 font-medium tracking-wider uppercase">
              kovil vallipadu
            </p>
          </motion.div>

          {/* Polaroid Card 4 */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="relative p-3 pb-8 text-neutral-800 shadow-2xl rounded-sm transform -rotate-2 hover:rotate-0 transition-all duration-700 mt-6 md:mt-0 "
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6  rounded-full "></div>
            <div className="relative w-full h-56 rounded-sm overflow-hidden">
              <img
                src="https://storage.googleapis.com/ceybook_contents/uploads/blog_posts/file-1772081187.jpeg"
                alt="Joyful Celebration"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-sans text-center text-[#C89B7B] mt-3 font-medium tracking-wider uppercase">
              Agni satti valli padu
            </p>
          </motion.div>

        </div>

      </div>

    </section>
  );
}