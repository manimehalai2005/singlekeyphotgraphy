"use client";

import { motion, Variants } from "framer-motion";
import HouseWarmingStorySection from "./HouseWarmingStorySection";
import InfinitePhotoSlider from "../Photogallerytemplate";
import StarfieldCursor from "@/src/StarFieldCursor";
import WeddingDriftGallery from "../Prewedd";

export default function HouseWarmingCeremonySection() {
  const titleText = "House Warming Ceremony";
  const subtitleText = "New Beginnings";

  // Container variant for staggering letter animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  // Letter animation variants
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <>
      
      <section className="relative w-full bg-transparent text-[#C89B7B] flex flex-col justify-center items-center px-6 sm:px-12 py-20 overflow-hidden">
        
        {/* Main Container Layout */}
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-10">
          
          {/* Left Side: Static Overlapping Photos (No Border, No Floating Animation) */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-[420px] sm:h-[480px]">
            
            {/* Background Image (Top-Right) */}
            <div className="absolute top-0 right-4 sm:right-12 w-64 sm:w-[340px] h-72 sm:h-84 overflow-hidden  shadow-2xl z-10">
              <img
                src="https://i.pinimg.com/736x/84/69/52/846952f4b8f38fe306bb8a555e17674c.jpg"
                alt="New House Interior"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Foreground Overlapping Image (Bottom-Left) */}
            <div className="absolute bottom-0 left-4 sm:left-12 w-52 sm:w-68 h-56 sm:h-72 overflow-hidden  shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20">
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.2XrbW410mVJX6h1y3oUdngHaLG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="House Warming Decor"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          {/* Right Side: Content for House Warming Ceremony */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center">
            
            {/* Animated Subtitle */}
            <motion.span
              className="text-xs sm:text-sm uppercase tracking-[0.4em] font-bold text-[#C89B7B] block mb-2 flex flex-wrap"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {subtitleText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>

            {/* Animated Heading (Letter-by-Letter) */}
            <motion.h2
              className="italic font-bold text-2xl sm:text-3xl lg:text-4xl text-[#C89B7B] tracking-wide mb-6 leading-tight flex flex-wrap"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {titleText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>

            <p className="text-sm sm:text-base text-[#C89B7B] font-medium leading-relaxed mb-4">
              With hearts full of joy and gratitude, we warmly invite you to grace the Griha Pravesh and housewarming celebrations of our new home. Join us as we invoke divine blessings for prosperity, peace, and happiness.
            </p>

            <p className="text-xs sm:text-sm text-[#C89B7B] leading-relaxed mb-8">
              Let us celebrate this milestone together with traditional rituals, festive feasts, and your invaluable presence as we step into this beautiful new chapter.
            </p>

          </div>

        </div>

      </section>

      <HouseWarmingStorySection />
      <WeddingDriftGallery />
    </>
  );
}