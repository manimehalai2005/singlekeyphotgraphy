'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotoAboutSection from './Aboutslide';

// Array of slides with unique images, headings, and descriptions
const slideData = [
  {
    image: 'https://cdn0.weddingwire.in/real-wedding-photo/482/3_2/1280/jpg/10274.jpeg',
    heading: 'Every Moment Has a Story..',
    description: 'We turn real moments into timeless photographs. From portraits and weddings to events and creative shoots, we capture every emotion and detail.',
  },
  {
    image: 'https://images.squarespace-cdn.com/content/v1/5727974359827e5304ee8ddf/382a6fc9-9662-4301-b3c2-dedcd52c9a37/Earpiercing%2Bchennai.jpg',
    heading: 'Timeless Earpiercing Tales.',
    description: 'Preserving the sacred traditions, family joys, and innocent smiles of your child’s earpiercing ceremony with warmth and elegance.',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKO-e-POPzp5akKxGFAZyMn1O8eWwtsYOVQPiKt5SEN_O6YoCxiVeaiSY&s=10',
    heading: 'Romantic Pre-Wedding Vibe.',
    description: 'Scenic locations, intimate chemistry, and dreamy aesthetics designed to celebrate your unique love story before the big day.',
  },
  {
    image: 'https://i.ytimg.com/vi/R7Allq3_Drg/maxresdefault.jpg',
    heading: 'Grand Events & Celebrations.',
    description: 'Capturing the vibrant energy, cultural richness, and lively spirits of grand family celebrations and special milestone events.',
  },
  {
    image: 'https://i.ytimg.com/vi/8dvLJ4bJRDA/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgTihWMA8=&rs=AOn4CLBe3o1J_-OkD9LGPil8Sxz7N9xtsQ',
    heading: 'Baby Shower Joy.',
    description: 'Cherishing the glow of motherhood and the loving blessings of family as you prepare to welcome your precious little one.',
  },
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically slide background images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slideData[currentImageIndex];

  return (
    <>
    <div className="w-full bg-black text-[#C89B7B] flex flex-col font-sans">
      
      {/* Main Hero Container - Full Width */}
      <div className="relative w-full min-h-[700px] flex flex-col justify-between p-6 md:p-12 overflow-hidden">
        
        {/* Background Images with SLOW, Graceful Water Wave Swag Animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {slideData.map((slide, index) => {
              const isActive = index === currentImageIndex;

              if (!isActive) return null;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ 
                    opacity: 1, 
                    scale: [1.02, 1.08, 1.03, 1.07, 1.02], 
                    x: [0, -12, 12, -8, 8, 0],
                    y: [0, 8, -8, 6, -6, 0]
                  }}
                  exit={{ opacity: 0, transition: { duration: 1.5 } }}
                  transition={{
                    opacity: { duration: 1.5, ease: "easeInOut" },
                    scale: { duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                    x: { duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                    y: { duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                  }}
                  className="absolute inset-0 z-0"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${slide.image}")`,
                    }}
                  />

                  {/* Dark Overlay for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 z-20" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Hero Content with Slow & Graceful Text Animation for Each Slide */}
        <div className="relative z-40 my-auto max-w-3xl py-12 px-2 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight mb-6 whitespace-pre-line text-[#C89B7B] drop-shadow-md">
                {currentSlide.heading}
              </h1>

              <p className="text-[#C89B7B] text-sm md:text-base leading-relaxed mb-8 max-w-lg font-medium drop-shadow-sm">
                {currentSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Feature Cards */}
        <div className="hidden md:grid relative z-40 grid-cols-1 md:grid-cols-3 gap-4 w-full">
          
          {/* Card 1 */}
          <div className="rounded-2xl p-4 flex items-center space-x-4 hover:bg-neutral-900 transition cursor-pointer shadow-lg">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Mmj7YCBKMV-gxcOYETq0uCqAskjY4gWeMEl288ZWQtaBRHigsn_DGBI&s=10" 
              alt="Wedding Package" 
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <span className="text-[10px] bg-[#C89B7B]/20 text-[#C89B7B] px-2 py-0.5 rounded-full font-semibold">New</span>
              <h3 className="font-medium text-sm mt-1 text-[#C89B7B]">Wedding Package</h3>
              <p className="text-xs text-[#C89B7B]/80">Capture Every Moment. Tell Your Story.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl p-4 flex items-center space-x-4 hover:bg-neutral-900 transition cursor-pointer shadow-lg">
            <img 
              src="https://static.vecteezy.com/system/resources/thumbnails/070/868/532/small/crowd-silhouette-under-stage-lights-celebrating-event-free-photo.jpg" 
              alt="Event Package" 
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <span className="text-[10px] bg-[#C89B7B]/20 text-[#C89B7B] px-2 py-0.5 rounded-full font-semibold">New</span>
              <h3 className="font-medium text-sm mt-1 text-[#C89B7B]">Event Package</h3>
              <p className="text-xs text-[#C89B7B]/80">Professional photography for birthday</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl p-4 flex items-center space-x-4 hover:bg-neutral-900 transition cursor-pointer shadow-lg">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU4DhxH30Ih_YO0F5tRF84NIH3lUPRNfWgPXpYT6gJMoAPyAe94yapK9M&s=10" 
              alt="Couple Package" 
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <span className="text-[10px] bg-[#C89B7B]/20 text-[#C89B7B] px-2 py-0.5 rounded-full font-semibold">New</span>
              <h3 className="font-medium text-sm mt-1 text-[#C89B7B]">Couple Package</h3>
              <p className="text-xs text-[#C89B7B]/80">Romantic couple & pre-wedding sessions</p>
            </div>
          </div>

        </div>

      </div>
    </div>
    <PhotoAboutSection />
    </>
  );
}