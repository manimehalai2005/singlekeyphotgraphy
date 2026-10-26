"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BirthdayGallery() {
  const images = [
    "https://bangalorephotographers.in/images/gallery/Photographers-for-Birthday-party.jpg",
    "https://images.squarespace-cdn.com/content/v1/55f47117e4b067360e9ca0b2/1559025206844-Y3MYLGXTOTJ0N4GXJ8J2/Firstbirthday_delhiphotographer_birthdayphotography_photoshoot_photography_delhi_Gurgaon_candid_014.jpg",
    "https://tse3.mm.bing.net/th/id/OIP.rUDUpVVz-ijBrnHsBr92xwHaE7?r=0&w=1000&h=666&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://tse3.mm.bing.net/th/id/OIP.C3V89CWavzDykHm3i_IjFQHaHa?r=0&w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3",
  ];

  return (
    <section className="relative w-full bg-transparent text-white flex flex-col justify-center items-center px-6 sm:px-12 py-10 overflow-hidden">
      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8">
        {/* Top Header Row */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 gap-6"
        >
          <div>
            <span className="text-sm uppercase tracking-[0.2em] font-bold text-[#C89B7B] block mb-1">
              Birthday celebration
            </span>
            <h2 className="font-serif italic font-bold text-3xl sm:text-3xl text-orange-300 tracking-wide">
              cute memory rembere for our childhood memories
            </h2>
          </div>
        </motion.div>

        {/* 4-Image Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Top Left Large Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-7 h-72 sm:h-80 rounded-3xl overflow-hidden relative group bg-neutral-900 shadow-2xl flex"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scaleY: 0.2 }}
                whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.77, 0, 0.18, 1],
                }}
                className="h-full relative overflow-hidden flex-1 origin-center"
              >
                <div
                  className="absolute inset-0 h-full w-[500%] bg-cover bg-center group-hover:scale-110 transition-transform duration-700 rounded-2xl"
                  style={{
                    backgroundImage: `url(${images[0]})`,
                    left: `-${i * 100}%`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Top Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-5 h-72 sm:h-80 rounded-3xl overflow-hidden relative group bg-neutral-900 shadow-2xl flex"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scaleY: 0.2 }}
                whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.1,
                  ease: [0.77, 0, 0.18, 1],
                }}
                className="h-full relative overflow-hidden flex-1 origin-center"
              >
                <div
                  className="absolute inset-0 h-full w-[500%] bg-cover bg-center group-hover:scale-110 transition-transform duration-700 rounded-2xl"
                  style={{
                    backgroundImage: `url(${images[1]})`,
                    left: `-${i * 100}%`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Left Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-6 h-72 sm:h-80 rounded-3xl overflow-hidden relative group bg-neutral-900 shadow-2xl flex"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scaleY: 0.2 }}
                whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.1,
                  ease: [0.77, 0, 0.18, 1],
                }}
                className="h-full relative overflow-hidden flex-1 origin-center"
              >
                <div
                  className="absolute inset-0 h-full w-[500%] bg-cover bg-center group-hover:scale-110 transition-transform duration-700 rounded-2xl"
                  style={{
                    backgroundImage: `url(${images[2]})`,
                    left: `-${i * 100}%`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:col-span-6 h-72 sm:h-80 rounded-3xl overflow-hidden relative group bg-neutral-900 shadow-2xl flex"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scaleY: 0.2 }}
                whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.1,
                  ease: [0.77, 0, 0.18, 1],
                }}
                className="h-full relative overflow-hidden flex-1 origin-center"
              >
                <div
                  className="absolute inset-0 h-full w-[500%] bg-cover bg-center group-hover:scale-110 transition-transform duration-700 rounded-2xl"
                  style={{
                    backgroundImage: `url(${images[3]})`,
                    left: `-${i * 100}%`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-4"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
            Welcoming prosperity, warmth, and new beginnings into our birthday party.
          </p>
        </motion.div>
      </div>
    </section>
  );
}