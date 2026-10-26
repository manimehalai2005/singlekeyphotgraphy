"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


export default function PolaroidsFamilyCollage() {
  const [photos, setPhotos] = useState([
    { id: '1', src: "https://i.pinimg.com/736x/39/17/fe/3917fee0ee53fd68cd267320b7b10250.jpg", style: "transform -rotate-2" },
    { id: '2', src: "https://tse1.mm.bing.net/th/id/OIP.iYfjRf2PzGBPWumuWXYlNgHaFY?r=0&w=730&h=530&rs=1&pid=ImgDetMain&o=7&rm=3", style: "transform rotate-1 z-10" },
    { id: '3', src: "https://tse3.mm.bing.net/th/id/OIP.g_lji6woMWZnSASNgBLHPgHaE8?r=0&w=1440&h=960&rs=1&pid=ImgDetMain&o=7&rm=3", style: "transform rotate-2" },
    { id: '4', src: "https://i.pinimg.com/originals/d2/49/d8/d249d8250999b987b2d37dac80381fed.jpg", style: "transform rotate-1 sm:translate-x-12" },
    { id: '5', src: "https://tse1.mm.bing.net/th/id/OIP.Uxe4JPntwDYpIlAxw22uIQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", style: "transform -rotate-2 sm:-translate-x-12" }
  ]);
  
  const shufflePhotos = (array: typeof photos) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotos((prev) => shufflePhotos(prev));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    
    <div className="bg-transparent text-stone-800  p-4 mx-auto flex flex-col items-center justify-center font-sans overflow-hidden">
      <div className="w-full  relative overflow-hidden">

       <motion.p 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='text-amber-200 text-center text-4xl font-sans italic'
          >
            Album
          </motion.p>

        {/* Background Atmosphere Overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        {/* Top Header Row */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-8 gap-4 px-4">
          <div className="hidden md:flex text-stone-300 animate-pulse">
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 2C13.5 5 16 6 19 6C16 9 15 11.5 15 14.5C12 12.5 9.5 13 8 16C9 13 7.5 10.5 5 9C8 8.5 10.5 6 12 2Z" />
              <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          
        

          <div className="hidden md:flex text-stone-300 animate-pulse">
            <svg className="w-10 h-10 transform rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 2C13.5 5 16 6 19 6C16 9 15 11.5 15 14.5C12 12.5 9.5 13 8 16C9 13 7.5 10.5 5 9C8 8.5 10.5 6 12 2Z" />
              <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
            </svg>
          </div>
        </div>

        {/* Polaroid Grid with Falling and Layout Interchange Animation */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {photos.map((photo, index) => (
            <motion.div 
              key={photo.id}
              initial={{ y: -700, opacity: 0, rotate: -20 }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              layout 
              transition={{ 
                duration: 1.2, 
                delay: index * 0.15, 
                type: "spring", 
                stiffness: 90, 
                damping: 14 
              }}
              className={`bg-white p-2 rounded-sm shadow-xl ${photo.style} hover:rotate-0 hover:scale-105 transition duration-300 cursor-pointer group`}
            >
              <div className="h-56 bg-stone-200 overflow-hidden relative">
                <img src={photo.src} alt="Collage" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          ))}

          {/* Decorative Center Flower Sketch Element */}
          <div className="hidden lg:flex flex-col items-center justify-center text-stone-400">
            <svg className="w-16 h-16 opacity-70 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2C13.5 5 16 6 19 6C16 9 15 11.5 15 14.5C12 12.5 9.5 13 8 16C9 13 7.5 10.5 5 9C8 8.5 10.5 6 12 2Z" />
              <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
            </svg>
            <span className="text-[10px] tracking-widest text-stone-500 uppercase mt-2 font-mono">Memories</span>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}