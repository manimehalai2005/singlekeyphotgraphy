/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useHouseWarming } from "@/src/context/HousewarmingContext";

export default function HouseWarmingStorySection() {
  const { houseWarmingImages } = useHouseWarming();

  const headingText = "House Warming Ceremony";
  const subHeadingText = "New Beginnings";

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

  const createFallingVariants = (delayTime: number): Variants => ({
    hidden: { opacity: 0, y: -200, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.5,
        delay: delayTime,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  });

  return (
    <section className="relative w-full bg-transparent text-white flex flex-col justify-center items-center overflow-hidden py-16 px-4">
      <div className="absolute inset-0" />

      <div className="relative z-10 w-full max-w-6xl mx-auto overflow-hidden flex flex-col">
        
        {/* Top Banner Image */}
        <motion.div 
          className="w-full h-84 overflow-hidden relative"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={houseWarmingImages.banner}
            alt="New House Interior"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Falling Images Grid */}
        <div className="px-4 sm:px-6 -mt-6 sm:-mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 relative z-20">
          
          {/* Image 1: Slow Rain Fall */}
          <motion.div
            variants={createFallingVariants(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="h-64 sm:h-72 md:h-60 p-1.5 shadow-2xl rounded md:-rotate-3 overflow-hidden"
          >
            <img
              src={houseWarmingImages.image1}
              alt="House Warming Rituals"
              className="w-full h-full object-cover rounded"
            />
          </motion.div>

          {/* Image 2: Delayed Rain Fall */}
          <motion.div
            variants={createFallingVariants(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="h-64 sm:h-72 md:h-60 p-1.5 shadow-2xl rounded md:rotate-2 overflow-hidden md:-mt-2"
          >
            <img
              src={houseWarmingImages.image2}
              alt="Family Gathering"
              className="w-full h-full object-cover rounded"
            />
          </motion.div>

          {/* Image 3: Last Rain Fall */}
          <motion.div
            variants={createFallingVariants(0.7)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="h-64 sm:h-72 md:h-60 p-1.5 shadow-2xl rounded md:rotate-6 overflow-hidden"
          >
            <img
              src={houseWarmingImages.image3}
              alt="Joyful Moments"
              className="w-full h-full object-cover rounded"
            />
          </motion.div>

        </div>

        {/* Content Section */}
        <div className="p-6 text-center flex flex-col items-center space-y-2">
          <motion.span 
            className="text-[10px] sm:text-sm uppercase tracking-[0.3em] font-semibold text-[#C89B7B] block"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {subHeadingText}
          </motion.span>

          <motion.h2
            className="italic font-bold text-2xl sm:text-3xl text-[#c89B7B] tracking-wide leading-tight font-serif"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {headingText}
          </motion.h2>
        </div>

      </div>
    </section>
  );
}