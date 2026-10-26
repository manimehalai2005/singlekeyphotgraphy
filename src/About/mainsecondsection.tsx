"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import DepthCarousel from "./secondsection";

export default function PhotographyPortfolioTemplate() {
  const [activeTab, setActiveTab] = useState("Home");

  const portfolioCards = [
    {
      title: "wedding",
      tag: "wedding",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.fvhlhXqYTOcbBsal66cp4gHaE8?r=0&w=735&h=490&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "puberty",
      tag: "puberty",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.hGye6fD5CEAZ27Xr4Q_tIgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      title: "postwedding",
      tag: "postwedding",
      image:
        "https://tse2.mm.bing.net/th/id/OIP.M0b-VJxDe3XUgJEejTUPhgHaFj?r=0&w=1200&h=900&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ];

  return (
    <div className="bg-transparent text-[#C89b7b] font-sans antialiased selection:bg-[#C89b7b]/20 overflow-x-hidden">
      {/* Main Container Layout */}
      <main className="px-6 pt-6 pb-20">
        
        {/* Hero Section */}
        <div className="grid max-w-6xl mx-auto grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 px-2">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-5xl sm:text-7xl lg:text-[88px] font-serif italic text-[#C89b7b]">
              collection{" "}{"  "} 
              <span className="font-serif italic text-[#C89b7b]">
                sets
              </span>
            </h1>

            <p className="text-[#C89b7b] text-sm sm:text-base font-light max-w-md leading-relaxed opacity-90">
              I am a passionate photographer who loves capturing stunning moments and turning them into timeless visual stories.
            </p>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 flex justify-center mt-6">
            <DepthCarousel />
          </div>
        </div>

        {/* Portfolio Gallery Grid */}
        <div>
          <style jsx>{`
            @keyframes slowMove {
              0% { transform: scale(1) translate(0px, 0px); }
              50% { transform: scale(1.08) translate(-10px, -5px); }
              100% { transform: scale(1) translate(0px, 0px); }
            }
            .animate-slow-move {
              animation: slowMove 12s ease-in-out infinite;
            }
          `}</style>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group h-[320px] rounded-3xl overflow-hidden shadow-md  cursor-pointer"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover animate-slow-move group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </motion.div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}