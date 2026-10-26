'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import BabyShowerPhotographyGallery from '@/src/packagess/Babyshoot/BabyGallery';

// Photo gallery items
const engagementPhotos = [
  {
    id: 1,
    src: "https://i.pinimg.com/originals/19/e6/02/19e60291fa780b500ba72db76976da76.jpg",
    alt: "Ring exchange moment",
  },
  {
    id: 2,
    src: "https://yt3.googleusercontent.com/NPClHi9pCFowaawgGJ3563S5m0YRBpF8f3rIPKxd3_58gyN6gPKmXFzlzsNjGuGBIAFMuUWLVw=s900-c-k-c0x00ffffff-no-rj",
    alt: "Engagement ring close up",
  },
  {
    id: 3,
    src: "https://www.shubhlaxmifilms.com/wp-content/uploads/2022/11/IMG_3486-01-scaled-1.webp",
    alt: "Couple laughing together",
  },
  {
    id: 4,
    src: "https://cdn.pixabay.com/photo/2021/09/03/06/10/wedding-6595092_640.jpg",
    alt: "Ring ceremony details",
  },
  {
    id: 5,
    src: "https://tse1.explicit.bing.net/th/id/OIP.nNDORWpB_IaV_Sp5RfoY8gAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Couple portrait",
  },
];

export default function EngagementEditorialSection() {
  // Smooth Fade-Up Animation Variants for Right Side Content
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1.0] 
      },
    },
  };

  const mainHeading = "ENGAGEMENT MADE FOREVER";
  const quoteText = "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.";
  const subHeading = "Curated Moments for Your Special Union";

  return (
    <section className="min-h-screen w-full bg-black text-white flex justify-center items-center p-4 sm:p-8 overflow-hidden font-sans">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* --- LEFT SIDE: Automatic Vertical Continuous Moving Image Column --- */}
        <div className="md:col-span-5 h-[600px] overflow-hidden relative rounded-2xl">
          
          {/* Subtle Top & Bottom Gradient Fades */}
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

          {/* Continuous Upward Infinite Scrolling Wrapper */}
          <motion.div
            className="flex flex-col gap-4 py-4 px-2"
            animate={{ y: ['0%', '-50%'] }}
            transition={{
              duration: 22,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {/* Duplicating photo list for seamless infinite loop */}
            {[...engagementPhotos, ...engagementPhotos].map((photo, index) => (
              <div
                key={`${photo.id}-${index}`}
                className="relative w-full h-[280px] rounded-2xl overflow-hidden bg-neutral-900 group shadow-2xl shrink-0"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </motion.div>

        </div>

        {/* --- RIGHT SIDE: Editorial Content Block with Smooth Fade-Up --- */}
        <div className="md:col-span-7 flex flex-col justify-between h-full py-8 px-4 md:px-10 space-y-10">
          
          {/* Subtitle */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg sm:text-2xl font-serif text-[#C89B7B] tracking-wide"
          >
            {subHeading}
          </motion.div>

          {/* Quote */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[#c89B7B] font-sans text-sm sm:text-base leading-relaxed max-w-md italic"
          >
            &quot;{quoteText}&quot;
          </motion.div>

          {/* Main Large Title */}
          <div className="space-y-2">
            <motion.h1
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl sm:text-6xl font-black tracking-tighter text-[#c89B7B] leading-tight uppercase font-serif"
            >
              {mainHeading}
            </motion.h1>
          </div>

          {/* Bottom Line Decoration */}
          <div className="pt-4 space-y-4">
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              width="100"
              height="80"
              viewBox="0 0 100 80"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              className="opacity-80"
            >
              <path d="M10 70 C 30 10, 70 10, 50 50 C 40 70, 80 70, 90 20" />
            </motion.svg>
          </div>

        </div>

      </div>
    </section>
  );
}