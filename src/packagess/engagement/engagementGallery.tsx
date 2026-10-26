"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

export default function EngagementGallery() {
  const initialPortraits = [
    {
      id: '1',
      src: "https://c8.alamy.com/comp/2PH0GE3/bride-and-groom-at-their-engagement-ceremony-in-trichy-tamil-naduindia-2PH0GE3.jpg",
      alt: "Portrait of the groom",
      wrapperClass: "w-36 sm:w-44 md:w-52 h-56 sm:h-68 md:h-80 shadow-2xl overflow-hidden transform -translate-y-4 z-10"
    },
    {
      id: '2',
      src: "https://i.pinimg.com/736x/d4/7c/eb/d47ceb2b53b79eb6e6fcf6540e645ec5--flower-garlands-wedding-couples.jpg",
      alt: "Close-up portrait of the groom",
      wrapperClass: "w-32 sm:w-40 md:w-48 h-52 sm:h-64 md:h-72 shadow-2xl overflow-hidden transform translate-y-6 z-20"
    },
    {
      id: '3',
      src: "https://tse1.mm.bing.net/th/id/OIP.m5TcmRo47H3Wme78rHnZZgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      alt: "Portrait of the bride",
      wrapperClass: "w-28 sm:w-36 md:w-44 h-44 sm:h-52 md:h-60 shadow-2xl overflow-hidden transform -translate-y-2 z-30"
    },
    {
      id: '4',
      src: "https://tse3.mm.bing.net/th/id/OIP.5c_iXk9MpclNk6uFHVVr3QHaE8?r=0&pid=ImgDet&w=184&h=122&c=7&dpr=1.3&o=7&rm=3",
      alt: "Engagement couple portrait",
      wrapperClass: "w-44 sm:w-52 md:w-60 h-64 sm:h-76 md:h-88 shadow-2xl overflow-hidden transform translate-y-2 z-40 border-4 border-white/20"
    },
    {
      id: '5',
      src: "https://c8.alamy.com/comp/2G8MA8B/close-up-of-a-traditional-colorful-decoration-outfit-during-a-rings-ceremony-in-india-2G8MA8B.jpg",
      alt: "Groom with ceremonial flowers",
      wrapperClass: "w-36 sm:w-44 md:w-52 h-56 sm:h-68 md:h-80 shadow-2xl overflow-hidden transform -translate-y-6 z-30"
    },
    {
      id: '6',
      src: "https://www.focuzstudios.in/wp-content/uploads/2022/11/hindu-wedding-photography-tamilnadu.jpg",
      alt: "Bride celebrating engagement",
      wrapperClass: "w-32 sm:w-40 md:w-48 h-52 sm:h-64 md:h-72 shadow-2xl overflow-hidden transform translate-y-4 z-10"
    }
  ];

  const [portraits, setPortraits] = useState(initialPortraits);

  // படங்களை ரேண்டமாக ஷஃபிள் செய்யும் ஃபங்ஷன்
  const shufflePortraits = (array: typeof initialPortraits) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // ஒவ்வொரு 4 விநாடிகளுக்கும் படங்கள் தங்களுக்குள் இடங்களை மாற்றிக்கொள்ளும்
  useEffect(() => {
    const interval = setInterval(() => {
      setPortraits((prev) => shufflePortraits(prev));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-transparent flex items-center justify-center py-20 px-6 lg:px-16 overflow-hidden">
      {/* Main Container - Split Layout */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Overlapping Portrait Gallery */}
        <div className="lg:col-span-7 flex flex-wrap items-center justify-center gap-3 relative">
          {portraits.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1, 
                delay: index * 0.15,
                type: "spring", 
                stiffness: 90, 
                damping: 15 
              }}
              className={`${item.wrapperClass} cursor-pointer group rounded-lg`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>

        {/* Right Column: Content Section */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-widest text-[#c89B7B] font-bold mb-3">
            Ring Ceremony
          </span>
          <h2 className="text-4xl lg:text-3xl font-serif font-bold text-[#c89B7B] tracking-tight mb-6 leading-tight flex flex-wrap gap-x-2">
            <span>Celebrating</span>
            <span className="italic font-normal text-[#c89B7B]">Love & Promises</span>
          </h2>
          <p className="text-[#c89B7B] font-medium text-base mb-8 leading-relaxed">
            Join us in celebrating the magical engagement ceremony. Each frame captures the joy, the exchange of rings, and the beginning of a lifelong journey together.
          </p>
          <div>
            <a href='/gallery' className="inline-block bg-amber-900 hover:bg-[#b58867] text-[#c89B7B] font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer">
              View Engagement Gallery
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}