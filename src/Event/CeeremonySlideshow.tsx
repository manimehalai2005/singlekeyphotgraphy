"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideShowProps {
  slides: React.ReactNode[];
}

export default function CeremonySlideShow({ slides }: SlideShowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-center items-center overflow-hidden">
      
      {/* Slide Content Area with Smooth Animation */}
      <div className="w-full flex-1 flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full flex items-center justify-center absolute inset-0"
          >
            {slides[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls (Bottom Bar) */}
      <div className="absolute bottom-8 z-50 flex items-center gap-6 bg-neutral-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-neutral-800 shadow-2xl">
        <button
          onClick={prevSlide}
          className="text-xs uppercase tracking-widest text-[#C89B7B] hover:text-white transition-colors cursor-pointer"
        >
          &larr; Prev
        </button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-[#C89B7B] w-6" : "bg-neutral-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="text-xs uppercase tracking-widest text-[#C89B7B] hover:text-white transition-colors cursor-pointer"
        >
          Next &rarr;
        </button>
      </div>

    </div>
  );
}