/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useBirthdayInfinite } from '@/src/context/BirthdayInfinteContext';

export default function BirthdayInfinitePhotoSlider() {
  const { state } = useBirthdayInfinite();

  return (
    <section className="relative w-full mx-auto bg-transparent text-white py-12 md:py-20 overflow-hidden flex flex-col justify-center gap-6 md:gap-10">
      
      {/* --- TOP ROW: Moving Left --- */}
      <div className="relative mx-auto w-full overflow-hidden flex">
        <motion.div
          className="flex gap-4 md:gap-6 shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
        >
          {/* Duplicate array for seamless infinite looping */}
          {[...state.topRow, ...state.topRow].map((src, index) => (
            <div
              key={`top-${index}`}
              className="relative w-48 h-32 sm:w-64 sm:h-44 md:w-80 md:h-52 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shrink-0"
            >
              <img
                src={src}
                alt={`Birthday slider top ${index}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- BOTTOM ROW: Moving Right --- */}
      <div className="relative w-full mx-auto overflow-hidden flex">
        <motion.div
          className="flex gap-4 md:gap-6 shrink-0"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 28,
          }}
        >
          {/* Duplicate array for seamless infinite looping */}
          {[...state.bottomRow, ...state.bottomRow].map((src, index) => (
            <div
              key={`bottom-${index}`}
              className="relative w-48 h-32 sm:w-64 sm:h-44 md:w-80 md:h-52 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shrink-0"
            >
              <img
                src={src}
                alt={`Birthday slider bottom ${index}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}