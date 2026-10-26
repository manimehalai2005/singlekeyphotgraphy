"use client";

import React, { useState, useEffect, useRef } from "react";

const housewarmingPoints = [
  {
    id: "img-1",
    title: "Griha Pravesh Threshold",
    text: "Capturing the sacred first step into the new home, right foot forward with auspicious turmeric and kumkum imprints.",
    src: "https://tse4.mm.bing.net/th/id/OIP.MbZp1-MxXMvDdD3y5xPsvwHaNJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    height: "h-[280px]",
  },
  {
    id: "img-2",
    title: "Traditional Florals & Decor",
    text: "Vibrant mango leaf thoranams and fresh marigold flower strings adorning doorways to welcome divine prosperity.",
    src: "https://i.pinimg.com/736x/48/e7/32/48e7325e699a6c39adf2946791e3b106.jpg",
    height: "h-[220px]",
  },
  {
    id: "img-3",
    title: "Sacred Vastu Homa",
    text: "The traditional milk-boiling ritual symbolizing overflowing abundance, warmth, and lifelong happiness in the kitchen.",
    src: "https://i.pinimg.com/736x/08/56/b2/0856b2405b53efe10f70768afa91d10e.jpg",
    height: "h-[200px]",
  },
  {
    id: "img-4",
    title: "Family Puja Rituals",
    text: "Heartfelt prayers and rituals performed alongside close family elders to invoke divine blessings and peace.",
    src: "https://img.freepik.com/premium-photo/happy-indian-family-dressed-traditional-clothing-stands-front-their-decorated-home_885831-182215.jpg?w=1060",
    height: "h-[300px]",
  },
  {
    id: "img-5",
    title: "Joyful Family Portrait",
    text: "Candid multi-generational smiles and warm embraces captured in front of the newly blessed sanctuary.",
    src: "https://photographerprasanna.in/wp-content/uploads/2023/10/satish-shetty-house-warming-40.jpg",
    height: "h-[270px]",
  },
  {
    id: "img-6",
    title: "Auspicious Brass Elements",
    text: "Close-up details of shining brass diyas, coconuts, and traditional ceremonial vessels set for the housewarming.",
    src: "https://static.wixstatic.com/media/db098b_95993e61078f4c17819712510b9feeed~mv2.jpg/v1/fill/w_2500,h_1666,al_c/db098b_95993e61078f4c17819712510b9feeed~mv2.jpg",
    height: "h-[160px]",
  },
];

const homeText = "emoclew";

export default function HousewarmingGallery() {
  const [imageOrder, setImageOrder] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [isRotating, setIsRotating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    return () => titleObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setIsRotating(true);
      setTimeout(() => {
        setImageOrder((prev) => [
          prev[5],
          prev[0],
          prev[1],
          prev[2],
          prev[3],
          prev[4],
        ]);
        setIsRotating(false);
      }, 800);
    }, 4500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-transparent text-[#C89B7B] py-12 px-6 lg:px-16 overflow-hidden font-serif">
      
      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Vertical Title & Detailed Housewarming Content */}
        <div className="lg:col-span-3 flex flex-col justify-between h-full py-4">
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest text-[#C89B7B] font-bold">
              Griha Pravesh Photography
            </span>

            {/* Title with Staggered Letter Reveal - Hidden on Mobile, Visible on Desktop (lg) */}
            <h1
              ref={titleRef}
              className="hidden lg:flex text-5xl lg:text-7xl m-6 font-light tracking-widest text-[#C89B7B] uppercase [writing-mode:vertical-rl] rotate-180 flex-row-reverse"
            >
              {homeText.split("").map((char, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all ${
                    isTitleVisible ? "animate-slowLetterReveal" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${index * 0.35}s`,
                  }}
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>
          
          <div className="mt-8 lg:mt-0 flex flex-col gap-4">
            <p className="text-xs font-sans text-[#C89B7B] leading-relaxed tracking-wide border-l-2 border-[#C89B7B] pl-4">
              May your new home be filled with peace, endless laughter, and countless blessings. Through every new chapter and cherished milestone, may your family's bond grow stronger with each passing day.
            </p>
          </div>
        </div>

        {/* Right Column: Photo Collage Grid Layout - ALL 6 SLOTS ROTATE */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Column 1 of Images */}
          <div className="flex flex-col gap-4">
            {/* Slot 0 */}
            <div className={`relative w-full ${housewarmingPoints[imageOrder[0]].height} rounded-xl overflow-hidden transition-all duration-800 ease-in-out ${isRotating ? "translate-x-12 scale-90 opacity-10 rotate-3" : "translate-x-0 scale-100 opacity-100 rotate-0"}`}>
              <img
                src={housewarmingPoints[imageOrder[0]].src}
                alt={housewarmingPoints[imageOrder[0]].title}
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Slot 1 */}
            <div className={`relative w-full ${housewarmingPoints[imageOrder[1]].height} rounded-xl overflow-hidden transition-all duration-800 ease-in-out ${isRotating ? "translate-y-8 scale-90 opacity-10 -rotate-2" : "translate-y-0 scale-100 opacity-100 rotate-0"}`}>
              <img
                src={housewarmingPoints[imageOrder[1]].src}
                alt={housewarmingPoints[imageOrder[1]].title}
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Column 2 of Images */}
          <div className="flex flex-col gap-4">
            {/* Slot 2 */}
            <div className={`relative w-full ${housewarmingPoints[imageOrder[2]].height} mt-5 rounded-xl overflow-hidden transition-all duration-800 ease-in-out ${isRotating ? "-translate-y-8 scale-90 opacity-10 rotate-2" : "translate-y-0 scale-100 opacity-100 rotate-0"}`}>
              <img
                src={housewarmingPoints[imageOrder[2]].src}
                alt={housewarmingPoints[imageOrder[2]].title}
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Slot 3 */}
            <div className={`relative w-full ${housewarmingPoints[imageOrder[3]].height} rounded-xl overflow-hidden transition-all duration-800 ease-in-out ${isRotating ? "scale-90 opacity-10 -rotate-3" : "scale-100 opacity-100 rotate-0"}`}>
              <img
                src={housewarmingPoints[imageOrder[3]].src}
                alt={housewarmingPoints[imageOrder[3]].title}
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Column 3 of Images */}
          <div className="flex flex-col gap-4">
            {/* Slot 4 */}
            <div className="relative w-full h-[340px] p-3 rounded-xl flex flex-col">
              <div className={`relative w-full h-[270px] rounded-lg overflow-hidden transition-all duration-800 ease-in-out ${isRotating ? "translate-x-8 scale-90 opacity-10 rotate-2" : "translate-x-0 scale-100 opacity-100 rotate-0"}`}>
                <img
                  src={housewarmingPoints[imageOrder[4]].src}
                  alt={housewarmingPoints[imageOrder[4]].title}
                  className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            {/* Slot 5 */}
            <div className={`relative w-full ${housewarmingPoints[imageOrder[5]].height} rounded-xl overflow-hidden transition-all duration-800 ease-in-out ${isRotating ? "-translate-x-12 scale-90 opacity-10 -rotate-3" : "translate-x-0 scale-100 opacity-100 rotate-0"}`}>
              <img
                src={housewarmingPoints[imageOrder[5]].src}
                alt={housewarmingPoints[imageOrder[5]].title}
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

        </div>

      </div>

      <style jsx>{`
        @keyframes slowLetterReveal {
          0% {
            opacity: 0;
            transform: scale(0.65);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }

        .animate-slowLetterReveal {
          animation: slowLetterReveal 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

    </section>
  );
}