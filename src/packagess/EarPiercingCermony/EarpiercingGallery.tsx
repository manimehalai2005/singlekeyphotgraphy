/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useEarPiercing } from "@/src/context/EarpiercingContenxt";

const titleText = "Ear Piercing";

export default function EarPiercingGallery() {
  const { earPiercingImages } = useEarPiercing();
  const [imageOrder, setImageOrder] = useState<number[]>([0, 1, 2, 3]);
  const [isRotating, setIsRotating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Trigger Section & Rotation Animation when user views it
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Trigger Letter-by-Letter Staggered Animation when title comes into view
  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    return () => titleObserver.disconnect();
  }, []);

  // Automatic Rotation Loop
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setIsRotating(true);
      setTimeout(() => {
        setImageOrder((prev) => [prev[3], prev[0], prev[1], prev[2]]);
        setIsRotating(false);
      }, 800);
    }, 4500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-transparent text-[#C89B7B] py-16 px-6 lg:px-20 overflow-hidden font-serif">
      
      {/* Top Header Title */}
      <div ref={titleRef} className="max-w-7xl mx-auto flex items-center justify-center mb-12">
        <h1 className="text-3xl lg:text-6xl font-light tracking-widest text-center uppercase text-[#C89B7B] flex overflow-hidden flex-wrap justify-center">
          {titleText.split("").map((char, index) => (
            <span
              key={index}
              className={`inline-block ${isTitleVisible ? "animate-letterFade" : "opacity-0"}`}
              style={{
                animationDelay: `${index * 0.05}s`,
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      </div>

      {/* Main Collage Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <div className="p-4 rounded-2xl">
            <p className="text-xs font-sans text-[#C89B7B] leading-relaxed tracking-wide">
              Soft blush tones, traditional gold ornaments, and tender family moments create a warm yet elegant visual direction for the ear piercing ceremony.
            </p>
          </div>

          {/* Slot 1 Image */}
          <div className={`relative w-full ${earPiercingImages[imageOrder[0]]?.height || 'h-[280px]'} rounded-2xl overflow-hidden transition-all duration-800 ease-in-out ${isRotating ? "translate-x-16 scale-90 opacity-10 rotate-6" : "translate-x-0 scale-100 opacity-100 rotate-0"}`}>
            <img
              src={earPiercingImages[imageOrder[0]]?.src}
              alt={earPiercingImages[imageOrder[0]]?.alt}
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        {/* Center Column */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-4 flex flex-col gap-6 items-center"
        >
          {/* Slot 2 Image */}
          <div className={`relative w-full ${earPiercingImages[imageOrder[1]]?.height || 'h-[300px]'} rounded-2xl overflow-hidden transition-all duration-800 ease-in-out ${isRotating ? "scale-95 opacity-20 -rotate-3" : "scale-100 opacity-100 rotate-0"}`}>
            <img
              src={earPiercingImages[imageOrder[1]]?.src}
              alt={earPiercingImages[imageOrder[1]]?.alt}
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="text-center my-2">
            <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-[#C89B7B] italic">
              Ear Piercing Mood Board
            </h2>
          </div>

          {/* Slot 3 Image */}
          <div className={`relative w-full ${earPiercingImages[imageOrder[2]]?.height || 'h-[200px]'} rounded-2xl overflow-hidden transition-all duration-800 ease-in-out ${isRotating ? "scale-95 opacity-20 rotate-3" : "scale-100 opacity-100 rotate-0"}`}>
            <img
              src={earPiercingImages[imageOrder[2]]?.src}
              alt={earPiercingImages[imageOrder[2]]?.alt}
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          {/* Slot 4 Image */}
          <div className={`relative w-full ${earPiercingImages[imageOrder[3]]?.height || 'h-[240px]'} rounded-2xl overflow-hidden transition-all duration-800 ease-in-out ${isRotating ? "-translate-x-16 scale-90 opacity-10 -rotate-6" : "translate-x-0 scale-100 opacity-100 rotate-0"}`}>
            <img
              src={earPiercingImages[imageOrder[3]]?.src}
              alt={earPiercingImages[imageOrder[3]]?.alt}
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="p-4 rounded-2xl">
            <p className="text-xs font-sans text-[#C89B7B] leading-relaxed tracking-wide">
              Heritage tradition meets modern elegance through delicate floral decorations, festive attire, and cherished family blessings.
            </p>
          </div>
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes letterFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-letterFade {
          animation: letterFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

    </section>
  );
}