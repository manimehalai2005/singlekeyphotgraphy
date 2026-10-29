'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Initial Polaroid Items with Baby Shower Content
const initialPolaroids = [
  {
    id: 'p1',
    src: 'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793258010/SK_08489_A.jpg',
    date: '2 February 2026',
    caption: 'Godh Bharai',
    rotate: '-rotate-2',
  },
  {
    id: 'p2',
    src: 'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793259227/SK_08588_a_1.jpg',
    date: '10 March 2026',
    caption: 'Traditional Feast',
    rotate: 'rotate-1',
  },
  {
    id: 'p3',
    src: 'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793259540/SK_08595_a_1.jpg',
    date: '15 April 2026',
    caption: 'Glass Bangles',
    rotate: '-rotate-1',
  },
  {
    id: 'p4',
    src: 'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793259647/SK_08301_A_1.jpg',
    date: '14 May 2026',
    caption: 'Flower Blessings',
    rotate: 'rotate-2',
  },
  {
    id: 'p5',
    src: 'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793259769/SK_08626_A_1.jpg',
    date: '18 June 2026',
    caption: 'Baby Shower Setup',
    rotate: '-rotate-3',
  },
  {
    id: 'p6',
    src: 'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793259892/SK_08284_A-Recovered_A_1.jpg',
    date: '10 July 2026',
    caption: 'Sweet Cravings',
    rotate: 'rotate-1',
  },
  {
    id: 'p7',
    src: 'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793260146/SK_08649_A_1.jpg',
    date: '15 August 2026',
    caption: 'Mom-To-Be Glow',
    rotate: '-rotate-2',
  },
  {
    id: 'p8',
    src: 'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793260418/SK_08306_A_1.jpg',
    date: '15 September 2026',
    caption: 'Elders Joy',
    rotate: 'rotate-3',
  },
  {
    id: 'p9',
    src: 'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793260418/SK_08306_A_1.jpg',
    date: '18 October 2026',
    caption: 'Family Warmth',
    rotate: '-rotate-1',
  },
  {
    id: 'p10',
    src: 'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793260697/SK_08630_A_1.jpg',
    date: '12 November 2026',
    caption: 'Waiting For You',
    rotate: 'rotate-2',
  },
];

export default function BabyShowerPolaroidGrid() {
  const [items, setItems] = useState(initialPolaroids);

  // Function to interchange (shuffle) photo positions
  const shufflePhotos = () => {
    setItems((prevItems) => {
      const shuffled = [...prevItems];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  // Auto interchange positions every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      shufflePhotos();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen w-full bg-black text-[#C89B7B] py-16 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Top Header */}
      <div className="text-center mb-10 z-10 space-y-3 max-w-2xl">
        <span className="text-xs uppercase tracking-[0.4em] font-semibold text-[#C89B7B]">
          Seemantham Memories
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif italic text-[#C89B7B] tracking-wide">
          Baby Shower Gallery
        </h1>
        <p className="text-xs sm:text-sm text-[#C89B7B]/80 font-light italic">
          Watch our precious moments interchange automatically, capturing the journey of new life.
        </p>

        {/* Manual Interchange Button */}
        <div className="pt-2">
          <button
            onClick={shufflePhotos}
            className="px-6 py-2.5 rounded-full border border-[#C89B7B] text-[#C89B7B] hover:bg-[#C89B7B] hover:text-black transition-all duration-300 text-xs tracking-widest uppercase font-semibold active:scale-95 shadow-lg"
          >
            🔀 Interchange Memories
          </button>
        </div>
      </div>

      {/* Main Polaroid Wall Grid */}
      <div className="w-full max-w-7xl bg-neutral-950/80 border border-neutral-900 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 items-center"
        >
          {items.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                layout: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.4 },
              }}
              className={`bg-[#F5F2EC] text-[#C89B7B] p-2.5 pb-6 sm:p-3 sm:pb-8 rounded shadow-2xl border border-[#E4E0D5] transition-transform hover:scale-105 hover:z-20 ${photo.rotate}`}
            >
              {/* Photo Frame */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-neutral-200 rounded-sm">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption & Date */}
              <div className="pt-2 text-center flex flex-col items-center">
                <span className="font-serif italic text-xs font-semibold text-[#C89B7B] tracking-wide">
                  {photo.caption}
                </span>
                <span className="font-serif italic text-[10px] text-[#C89B7B]/70 tracking-wider mt-0.5">
                  {photo.date}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}