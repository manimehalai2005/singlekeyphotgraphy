/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useRitual } from "@/src/context/RitualContext";

export default function RitualCeremonyCollageSection() {
  const { ritualImages } = useRitual();
  const [images, setImages] = useState(ritualImages);

  const headingText = "Ritual Ceremony";
  const subHeadingText = "Sacred Traditions & Family Moments";
  const paragraphText = "Traditional morning rituals, sacred offerings, and cherished moments shared with family have been the true highlights of this divine celebration.";

  // Context updates load aagum podhu local shuffle state-a sync pannikolgirom
  useEffect(() => {
    setImages(ritualImages);
  }, [ritualImages]);

  const handleShuffleOnView = () => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      if (newImages.length >= 3) {
        const temp = newImages[0];
        newImages[0] = newImages[1];
        newImages[1] = newImages[2];
        newImages[2] = temp;
      }
      return newImages;
    });
  };

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

  return (
    <section className="relative w-full min-h-screen bg-transparent text-white flex flex-col justify-center items-center py-20 px-6 sm:px-12 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header Section */}
        <div className="text-left max-w-2xl space-y-3">
          <motion.span 
            className="text-xs uppercase tracking-[0.4em] font-bold text-[#C89B7B] block"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {subHeadingText}
          </motion.span>

          <motion.h2
            className="italic font-bold text-4xl sm:text-5xl lg:text-6xl text-[#c89B7B] tracking-wide leading-tight font-serif"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {headingText}
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base text-[#c89B7B] font-light leading-relaxed"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {paragraphText}
          </motion.p>
        </div>

        {/* Multi-Photo Grid with Spring Animation */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-auto"
          onViewportEnter={handleShuffleOnView}
          viewport={{ once: true, amount: 0.3 }}
        >
          {images.map((img) => (
            <motion.div
              key={img.id}
              layout
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 15,
                duration: 1.2,
              }}
              className={`${img.span} rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl relative`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}