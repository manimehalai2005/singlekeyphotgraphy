"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InfiniteSpiral from "./InfiniteScroll";

const Mainchooseus = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Left side InfiniteSpiral images
  const images = [
    { src: 'https://tse3.mm.bing.net/th/id/OIP.pd8_nKd7opBpQRUzb31uAAHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'ritual' },
    { src: 'https://tse1.mm.bing.net/th/id/OIP.6w5iCkvz1J4zY1zyyFh3zQHaLG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'puberty' },
    { src: 'https://i.pinimg.com/736x/a5/b8/40/a5b8406d4d0847866f600461e1751251.jpg', alt: 'earceremony' },
    { src: 'https://tse1.mm.bing.net/th/id/OIP.zsr3QbyND6NkevSGIBJPAAHaLH?r=0&w=666&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'Ocean shore' },
    { src: 'https://i.pinimg.com/originals/d7/b5/e5/d7b5e54014b5c5aa09242f32eab417e2.jpg', alt: 'Green meadow' },
    { src: 'https://i.pinimg.com/originals/fd/4a/9d/fd4a9d8c3f53cf229edca2b80e86eaa0.jpg', alt: 'Desert light' }
  ];

  // Right side gallery items
  const galleryItems = [
    {
      id: 1,
      title: "wedding celebration",
      subtitle: "The Golden Hour Vows",
      image: "https://www.focuzstudios.in/wp-content/uploads/2018/11/Jilakarra-Bellam-and-Maadhuparkam-telugu-wedding-rituals-6.jpg",
    },
    {
      id: 2,
      title: "Royal Palace Reception",
      subtitle: "Grand Evening Celebrations",
      image: "https://i.pinimg.com/originals/73/54/66/735466a7affa8148492245bbdbb12057.jpg",
    },
    {
      id: 3,
      title: "Traditional Heritage",
      subtitle: "Bridal Elegance & Details",
      image: "https://i.pinimg.com/736x/0f/16/fb/0f16fb43eba07aca282784abd59b8a82.jpg",
    },
    {
      id: 4,
      title: "Whispers of Love",
      subtitle: "Candid Moments",
      image: "https://vizagpellipoolajada.com/wp-content/uploads/2023/07/Rose-petals-with-gold-tissue.-1.jpg",
    },
    {
      id: 5,
      title: "Timeless Romance",
      subtitle: "Couple Session",
      image: "https://tse4.mm.bing.net/th/id/OIP.Xw8fQGEMg8c5xOXJkU2aHQHaE8?r=0&w=2560&h=1707&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  // Automatic slide timer (Every 3 seconds)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, galleryItems.length]);

  const getVisibleItems = () => {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    return {
      left: galleryItems[prevIndex],
      center: galleryItems[currentIndex],
      right: galleryItems[nextIndex],
    };
  };

  const visible = getVisibleItems();

  return (
    <section className="w-full bg-transparent text-orange-300 py-12 sm:py-20 px-4 sm:px-12 lg:px-20 overflow-hidden">
      <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Responsive Infinite Spiral Component */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 w-full flex justify-center lg:justify-end"
        >
          {/* Mobile Screen Version (Compact & Small) */}
          <div className="block sm:hidden w-full h-[300px] relative overflow-hidden flex items-center justify-center">
            <InfiniteSpiral
              items={images}
              animationMode="auto"
              speed={0.55}
              radius={110}
              cardWidth={100}
              cardHeight={100}
              verticalSpacing={40}
              perspective={800}
              cardRadius={8}
              centerScale={1.15}
              edgeBlur={0}
              cardsPerTurn={6}
              pauseOnHover
              direction="up"
              rotation={0}
              cardTilt={0}
              edgeFade={0}
              imageFit="cover"
              grayscale={0}
            />
          </div>

          {/* Desktop / Large Screen Version (Big & Full Height) */}
          <div className="hidden sm:flex w-full h-[600px] lg:h-[650px] relative overflow-hidden items-center justify-center lg:justify-end">
            <InfiniteSpiral
              items={images}
              animationMode="auto"
              speed={0.55}
              radius={180}
              cardWidth={110}
              cardHeight={110}
              verticalSpacing={65}
              perspective={1100}
              cardRadius={12}
              centerScale={1.25}
              edgeBlur={0}
              cardsPerTurn={7}
              pauseOnHover
              direction="up"
              rotation={0}
              cardTilt={0}
              edgeFade={0}
              imageFit="cover"
              
            />
          </div>
        </motion.div>
        
        {/* Right Side: Auto Sliding Gallery Section */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-center justify-center w-full px-2 sm:px-0"
        >
          
          {/* Header Title Section */}
          <div className="text-center space-y-2 mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-orange-300">
              Explore Our Gallery
            </h2>
            <p className="text-xs sm:text-xs text-orange-300/80 font-medium px-4">
              Slides automatically. Hover to pause, or click side cards to navigate.
            </p>
          </div>

          {/* Gallery Showcase Container with Hover Pause */}
          <div 
            className="relative flex items-center justify-center gap-4 sm:gap-6 w-full cursor-pointer max-w-xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            
            {/* Left Preview Image */}
            <motion.div
              key={`left-${visible.left.id}`}
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 0.6, x: 0, scale: 0.82 }}
              transition={{ duration: 0.4 }}
              onClick={handlePrev}
              className="hidden sm:block relative w-[200px] lg:w-[240px] h-[280px] lg:h-[320px] rounded-3xl overflow-hidden shadow-lg hover:opacity-90 transition-opacity brightness-125 contrast-105"
            >
              <img
                src={visible.left.image}
                alt={visible.left.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Center Main Focus Image */}
            <motion.div
              key={`center-${visible.center.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-[340px] sm:max-w-none sm:w-[420px] lg:w-[520px] h-[320px] sm:h-[420px] lg:h-[460px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl z-10 brightness-125 contrast-105 border border-orange-300/20 mx-auto"
            >
              <img
                src={visible.center.image}
                alt={visible.center.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 text-white">
                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-orange-300 uppercase block mb-1">
                  {visible.center.subtitle}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-amber-200">
                  {visible.center.title}
                </h3>
              </div>

              {/* Dots Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 backdrop-blur-md px-3 py-1.5 rounded-full bg-black/40">
                {galleryItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx ? "w-6 bg-orange-300" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Preview Image */}
            <motion.div
              key={`right-${visible.right.id}`}
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              animate={{ opacity: 0.6, x: 0, scale: 0.62 }}
              transition={{ duration: 0.05, ease: "easeOut" }} 
              onClick={handleNext}
              className="hidden sm:block relative w-[200px] lg:w-[240px] h-[280px] lg:h-[320px] rounded-3xl overflow-hidden shadow-lg hover:opacity-90 transition-opacity cursor-pointer brightness-125 contrast-105"
            >
              <img
                src={visible.right.image}
                alt={visible.right.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Mainchooseus;