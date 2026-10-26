/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useFamily } from '@/src/context/BirthdayFamilyContext';

export default function LoveYourFamilyCollage() {
  const { familyImages } = useFamily();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="w-full bg-transparent text-neutral-900 py-12 px-4 sm:px-8 flex flex-col justify-center items-center overflow-hidden font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col gap-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT SIDE: 6 Smaller Photos */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            
            {/* Photo 1 */}
            <motion.div variants={itemVariants} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-neutral-100 group">
              <img
                src={familyImages[0]?.src}
                alt={familyImages[0]?.alt || "Family 1"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Photo 2 */}
            <motion.div variants={itemVariants} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-neutral-100 group">
              <img
                src={familyImages[1]?.src}
                alt={familyImages[1]?.alt || "Family 2"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Photo 3 */}
            <motion.div variants={itemVariants} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-neutral-100 group">
              <img
                src={familyImages[2]?.src}
                alt={familyImages[2]?.alt || "Family 3"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Photo 4 */}
            <motion.div variants={itemVariants} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-neutral-100 group">
              <img
                src={familyImages[3]?.src}
                alt={familyImages[3]?.alt || "Family 4"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Photo 5 */}
            <motion.div variants={itemVariants} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-neutral-100 group">
              <img
                src={familyImages[4]?.src}
                alt={familyImages[4]?.alt || "Family 5"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Photo 6 */}
            <motion.div variants={itemVariants} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-neutral-100 group">
              <img
                src={familyImages[5]?.src}
                alt={familyImages[5]?.alt || "Family 6"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

          </div>

          {/* RIGHT SIDE: 2 Large Featured Photos */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
            
            {/* Photo 7 */}
            <motion.div variants={itemVariants} className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg bg-neutral-100 group">
              <img
                src={familyImages[6]?.src}
                alt={familyImages[6]?.alt || "Happy multi-generation family"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Photo 8 */}
            <motion.div variants={itemVariants} className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg bg-neutral-100 group">
              <img
                src={familyImages[7]?.src}
                alt={familyImages[7]?.alt || "Family having fun together"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}