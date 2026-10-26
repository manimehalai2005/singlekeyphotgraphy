/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useNaming } from '@/src/context/NamingContext';

export default function NamingCeremonyHeroSection() {
  const { cards } = useNaming();
  const [items, setItems] = useState(cards);
  const [flipped, setFlipped] = useState(false);

  // Keep items synced when context cards update
  useEffect(() => {
    setItems(cards);
  }, [cards]);

  // Automatic Shuffle & Front/Back Flip interval
  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);

      setItems((prevItems) => {
        const shuffled = [...prevItems];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const heroCard = items.find((item) => item.isHero) || items[0];
  const gridCards = items.filter((item) => item.id !== heroCard?.id);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  const titlePart1 = "A Special";
  const titlePart2 = "Naming Day";

  return (
    <section className="w-full bg-transparent text-white py-12 px-4 sm:px-8 flex justify-center items-center overflow-hidden font-sans">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl w-full bg-transparent p-4 sm:p-10 relative flex flex-col gap-8"
      >
        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <motion.div 
            layout
            variants={itemVariants}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl group perspective-1000"
          >
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-full h-full relative"
            >
              {/* FRONT SIDE */}
              <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0 w-full h-full">
                <img src={heroCard?.front} alt={heroCard?.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
                  <p className="text-xs uppercase tracking-widest text-[#c89B7B] font-semibold">{heroCard?.category}</p>
                  <h4 className="text-sm font-medium text-[#c89B7B]">{heroCard?.title}</h4>
                </div>
              </div>

              {/* BACK SIDE */}
              <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} className="absolute inset-0 w-full h-full">
                <img src={heroCard?.back} alt={heroCard?.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
                  <p className="text-xs uppercase tracking-widest text-[#c89B7B] font-semibold">{heroCard?.category} (Back)</p>
                  <h4 className="text-sm font-medium text-[#c89B7B]">{heroCard?.title} Moment</h4>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Top-Right: Editorial Title */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end text-left lg:text-right relative p-2 sm:p-4">
            <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-1 w-full">
              <h1 className="font-serif italic font-normal text-4xl sm:text-5xl text-[#c89B7B] tracking-wide leading-tight">{titlePart1}</h1>
              <h2 className="font-serif italic font-normal text-4xl sm:text-5xl text-[#c89B7B] tracking-wide leading-tight">{titlePart2}</h2>
            </motion.div>
            <motion.p variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#c89B7B] text-xs sm:text-sm mt-4 max-w-sm font-light tracking-wide leading-relaxed">
              Welcoming our little prince into the family with divine chants, traditional cradles, and endless love.
            </motion.p>
          </div>

        </div>

        {/* ================= BOTTOM GRID SECTION ================= */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {gridCards.map((card) => (
            <motion.div 
              key={card.id}
              layout
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl group perspective-1000"
            >
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-full relative"
              >
                {/* FRONT SIDE */}
                <div style={{ backfaceVisibility: 'hidden' }} className="absolute inset-0 w-full h-full">
                  <img src={card.front} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
                    <p className="text-xs uppercase tracking-widest text-[#c89B7B] font-semibold">{card.category}</p>
                    <h4 className="text-sm font-medium text-[#c89B7B]">{card.title}</h4>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} className="absolute inset-0 w-full h-full">
                  <img src={card.back} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
                    <p className="text-xs uppercase tracking-widest text-[#c89B7B] font-semibold">{card.category} (Back)</p>
                    <h4 className="text-sm font-medium text-[#c89B7B]">{card.title} Moment</h4>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}