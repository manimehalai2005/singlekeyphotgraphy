"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import OverallWeddingPage from "@/src/Event/wedding/overallweddingpage";
import EngagementCollageCard from "@/src/Event/Engagement/EngamentCermony";
import BirthdayEventCard from "@/src/Event/BirthdayEvent/BrithdayEvent";
import BabyShowerMenuCard from "@/src/Event/BabyShower/BabyShower";
import NamingCeremonyAbout from "@/src/Event/NamingCeremony/NamingCermony";
import EarPiercingCeremonySection from "@/src/Event/Earpiercing/EarPirecing";
import HouseWarmingCeremonySection from "@/src/Event/HouseWarming/HouseWarming";
import RitualCeremonyCard from "@/src/Event/Ritual/ritualceremony";
import PubertyCeremonyVisionBoard from "@/src/Event/puberty/overallimage";
import StarfieldCursor from "@/src/StarFieldCursor";

export default function NamingClient() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    <NamingCeremonyAbout key="naming" />,
    <HouseWarmingCeremonySection key="house-warming" />,
    <EngagementCollageCard key="engagement" />,
    <BirthdayEventCard key="birthday" />,
    <BabyShowerMenuCard key="baby-shower" />,
    <EarPiercingCeremonySection key="ear-piercing" />,
    <PubertyCeremonyVisionBoard key="puberty" />,
    <RitualCeremonyCard key="ritual" />,
    <OverallWeddingPage key="wedding" />,
  ];

  const handleSlideChange = (newIndex: number) => {
    setCurrentIndex(newIndex);
    // Scroll to the absolute top of the page instantly when changing slides
    window.scrollTo({
      top: 0,
      behavior: "instant", // or "smooth" if you want smooth scrolling
    });
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    handleSlideChange(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    handleSlideChange(newIndex);
  };

  return (
    <>
      <main className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between pb-24 overflow-x-hidden">
        
        {/* Active Slide Display Area */}
        <div className="w-full relative flex-1 flex flex-col items-center justify-start">
          
          {/* LEFT SIDE - GLOWING ARROW BUTTON */}
          <motion.button
            onClick={prevSlide}
            animate={{ x: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-4 sm:p-5 rounded-full bg-neutral-900/80 border border-neutral-700 text-white shadow-2xl backdrop-blur-md cursor-pointer hover:bg-[#C89B7B] hover:text-black hover:border-[#C89B7B] transition-all duration-300 group"
            aria-label="Previous Slide"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.button>

          {/* RIGHT SIDE - GLOWING ARROW BUTTON */}
          <motion.button
            onClick={nextSlide}
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 p-4 sm:p-5 rounded-full bg-neutral-900/80 border border-neutral-700 text-white shadow-2xl backdrop-blur-md cursor-pointer hover:bg-[#C89B7B] hover:text-black hover:border-[#C89B7B] transition-all duration-300 group"
            aria-label="Next Slide"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-6 h-6 sm:w-8 sm:h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </motion.button>

          {/* Slide Animation Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full flex flex-col items-center justify-center"
            >
              {slides[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Navigation Bar at the Bottom */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-6 bg-neutral-900/90 backdrop-blur-md px-6 py-3 rounded-full border border-neutral-800 shadow-2xl">
          
          <button
            onClick={prevSlide}
            className="text-xs uppercase tracking-widest text-[#C89B7B] hover:text-white transition-colors cursor-pointer font-bold"
          >
            &larr; Prev
          </button>

          <div className="flex gap-2 items-center max-w-[200px] overflow-x-auto py-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-[#C89B7B] w-6" : "bg-neutral-600 w-2"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="text-xs uppercase tracking-widest text-[#C89B7B] hover:text-white transition-colors cursor-pointer font-bold"
          >
            Next &rarr;
          </button>

        </div>

      </main>
    </>
  );
}