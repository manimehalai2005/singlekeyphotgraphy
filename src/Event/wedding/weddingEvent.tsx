/* eslint-disable @next/next/no-img-element */
'use client';

import React from "react";
import { motion } from "framer-motion";
import { useWedding } from "@/src/context/WeddingContenxt";

export default function ThankYouWeddingCard() {
  const { weddingImages } = useWedding();

  return (
    <section className="relative w-full bg-transparent text-[#C89B7B] flex flex-col justify-center items-center px-6 py-16 lg:px-20 overflow-hidden">
      
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* Dynamic Collage */}
        <div className="lg:col-span-7 relative w-full h-[450px] sm:h-[520px] flex items-center justify-center">
          
          {/* Photo 1 */}
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-0 top-0 w-[55%] h-[75%] p-2.5 transform -rotate-2 z-10  overflow-hidden shadow-2xl "
          >
            <img
              src={weddingImages[0]?.src}
              alt={weddingImages[0]?.alt || "Wedding Portrait 1"}
              className="w-full h-full object-cover  hover:scale-105 transition-all duration-700"
            />
          </motion.div>

          {/* Photo 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute right-4 top-4 w-[50%] h-[60%] p-2.5 transform rotate-3 z-20  overflow-hidden shadow-2xl "
          >
            <img
              src={weddingImages[1]?.src}
              alt={weddingImages[1]?.alt || "Wedding Portrait 2"}
              className="w-full h-full object-cover  hover:scale-105 transition-all duration-700"
            />
          </motion.div>

          {/* Photo 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute bottom-2 left-1/4 w-[60%] h-[55%] p-2.5 transform rotate-1 z-30  overflow-hidden shadow-2xl"
          >
            <img
              src={weddingImages[2]?.src}
              alt={weddingImages[2]?.alt || "Wedding Portrait 3"}
              className="w-full h-full object-cover  hover:scale-105 transition-all duration-700"
            />
          </motion.div>

        </div>

        {/* Text Details */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left relative"
        >
          <div className="hidden lg:block absolute -top-16 left-0 w-[1px] h-12 bg-neutral-700"></div>

          <h2 className="font-serif tracking-[0.2em] text-2xl sm:text-xl lg:text-3xl font-normal text-[#C89B7B] mb-4">
            WEDDING EVENTS
          </h2>

          <p className="font-serif italic text-base text-[#C89B7B] mb-6">
            Timeless celebrations & sacred moments
          </p>

          <p className="text-xs sm:text-sm uppercase tracking-wider text-[#C89B7B] leading-relaxed font-medium font-sans italic mb-8">
            Capturing the elegance, emotions, and joyous traditions of your special day. From intimate pre-wedding rituals to grand evening receptions, we preserve every unforgettable chapter of your love story.
          </p>

          <p className="font-serif italic text-base text-[#C89B7B]">
            Forever in frames
          </p>

          <div className="hidden lg:block absolute -bottom-16 left-0 w-[1px] h-12 bg-neutral-700"></div>
        </motion.div>

      </div>
    </section>
  );
}