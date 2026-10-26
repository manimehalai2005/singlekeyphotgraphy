'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeaturedStoriesSection from "./FeaturesSection";

export default function FeaturedStoriesTabs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Gallery Data with only Images (No text needed for right thumbnails)
  const stories = [
    {
      id: 1,
      category: "Weddings",
      title: "Rahul & Priya",
      subtitle: "The Golden Hour Vows",
      description: "A gorgeous sunset wedding ceremony captured at the heart of the royal palace with vibrant traditional rituals and warm golden light.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC-y6yL6q5BKZg9VydGx3BkcQlZWB5v5-61bF0JfsHtA&s=10",
    },
    {
      id: 2,
      category: "Receptions",
      title: "Royal Palace Reception",
      subtitle: "Grand Evening Celebrations",
      description: "Grand celebrations filled with majestic lighting, royal decor, and joyful moments shared with close family and friends.",
      image: "https://i.pinimg.com/736x/23/72/68/2372680876979fd7b634051233958ec2.jpg",
    },
    {
      id: 3,
      category: "Portraits",
      title: "Traditional Heritage",
      subtitle: "Bridal Elegance & Details",
      description: "Detailed close-ups highlighting intricate bridal henna artwork, heirloom jewelry, and timeless cultural elegance.",
      image: "https://images.pexels.com/photos/38633696/pexels-photo-38633696/free-photo-of-traditional-indian-bridal-jewelry-and-henna.jpeg?cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 4,
      category: "Candid",
      title: "Whispers of Love",
      subtitle: "Candid Moments",
      description: "Spontaneous laughter, stolen glances, and pure raw emotions captured naturally without posing.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3rLK3mlMyuNnW5DHjP1borIa6S6RD9LsONwFMtBMrCwdbjHbRapb1uI&s=10",
    },
  ];

  // Filter stories based on top category tabs
  const filteredStories = activeCategory === "All" 
    ? stories 
    : stories.filter(s => s.category === activeCategory);

  const currentStory = filteredStories[selectedIndex] || filteredStories[0];

  // We duplicate the array to create a seamless infinite slide effect
  const duplicatedStories = [...filteredStories, ...filteredStories];

  return (
    <section className="w-full bg-black text-zinc-900 font-sans w-full py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-[1300px] mx-auto rounded-3xl p-6 sm:p-10 ">
        
        {/* Section Header */}
       
        {/* Category Filter Tabs */}
       
        <div className="flex  flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
          {["All", "Weddings", "Receptions", "Portraits", "Candid"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white shadow-md shadow-zinc-900/20"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Big Active Viewer with Slide-Up Animation */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-zinc-900 shadow-lg h-[420px] sm:h-[500px] flex flex-col justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={currentStory.image}
                  alt={currentStory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <span className="text-xs font-bold tracking-wider text-red-400 uppercase mb-1 block">
                    {currentStory.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mb-2">
                    {currentStory.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 max-w-xl">
                    {currentStory.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Slowly Auto-Scrolling Images Column (No text, only image cards) */}
          <div className="lg:col-span-4 relative h-[420px] sm:h-[500px] overflow-hidden rounded-2xl">
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

            {/* Framer motion infinite vertical scroll */}
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                duration: 15,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex flex-col gap-4 py-2"
            >
              {duplicatedStories.map((story, idx) => {
                const originalIndex = idx % filteredStories.length;
                const isSelected = selectedIndex === originalIndex;

                return (
                  <div
                    key={`${story.id}-${idx}`}
                    onClick={() => setSelectedIndex(originalIndex)}
                    className={`relative w-full h-[140px] sm:h-[160px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                      isSelected
                        ? "border-red-600 shadow-xl scale-[1.02]"
                        : "border-transparent hover:opacity-90 shadow-md"
                    }`}
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Dark tint overlay for non-selected items */}
                    {!isSelected && (
                      <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition" />
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}