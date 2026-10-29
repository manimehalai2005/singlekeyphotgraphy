"use client";

import React, { useState, useEffect, useRef } from "react";

// Honeycomb / Hexagonal photo grid items for the Post-Wedding memories showcase
const hexImages = [
  {
    id: "hex-1",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793269556/pwo35gw4kgtvmebtv2zs.jpg",
    alt: "Wedding reception ceremony",
  },
  {
    id: "hex-2",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793269466/ddqda4x3o5icer08jnvq.jpg",
    alt: "First dance as married couple",
  },
  {
    id: "hex-3",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793269122/oymzrdopmcox24tdazwl.jpg",
    alt: "Beach sunset moments",
  },
  {
    id: "hex-4",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793269212/ylgboh0isblqrur3etl5.jpg",
    alt: "Ring exchange celebration",
  },
  {
    id: "hex-5",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793269556/pwo35gw4kgtvmebtv2zs.jpg",
    alt: "Couple smiling together",
  },
  {
    id: "hex-6",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793268925/cibjnp7thkltvlkxmywt.jpg",
    alt: "Reception party night",
  },
  {
    id: "hex-7",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793262604/SK_04893_copy_1.jpg",
    alt: "Grand wedding feast",
  },
  {
    id: "hex-8",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793268870/jxqri57xfmlewj8fgqzp.jpg",
    alt: "Candid couple laughs",
  },
  {
    id: "hex-9",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793258010/SK_08489_A.jpg",
    alt: "Romantic outdoor portraits",
  },
  {
    id: "hex-10",
    src:"https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793270204/00b.jpg",
    alt: "Bridal portrait close-up",
  },
  {
    id: "hex-11",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793269122/oymzrdopmcox24tdazwl.jpg",
    alt: "Celebration fireworks",
  },
  {
    id: "hex-12",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793262604/SK_04893_copy_1.jpg",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-13",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793269008/qedsvsehdnkxjr7cajak.jpg",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-14",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793268925/cibjnp7thkltvlkxmywt.jpg",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-15",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793260418/SK_08306_A_1.jpg",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-15",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793268960/cfaoaro9w9ngn144dqcx.jpg",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-16",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793269466/ddqda4x3o5icer08jnvq.jpg",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-17",
    src: "https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793269008/qedsvsehdnkxjr7cajak.jpg",
    alt: "Lifetime journey begins",
  }
];

export default function WeddingHexagonSaveTheDate() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-transparent text-white py-16 px-6 lg:px-20 overflow-hidden font-serif flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        {/* Honeycomb Mosaic Cluster with a rich grid layout for multiple photos */}
       <div className="lg:col-span-8 relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center lg:justify-start">
  {/* Flex layout with negative margins to remove extra padding/gaps between hexagons */}
  <div className="flex flex-wrap max-w-2xl py-6 -space-x-3 sm:-space-x-5 -space-y-2">
    {hexImages.map((img, idx) => (
      <div 
        key={`${img.id}-${idx}`}
        className={`relative w-24 h-28 sm:w-32 sm:h-36 overflow-hidden shadow-2xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
        }`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          transitionDelay: `${idx * 0.08}s`,
          // Staggered honeycomb offset without unwanted padding gaps
          marginTop: idx % 2 === 1 ? "1.8rem" : "-0.4rem",
          marginLeft: idx % 4 === 0 ? "0px" : "-0.8rem",
        }}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
      </div>
    ))}
  </div>
</div>

        {/* Right side: Post-Wedding Details & Memories */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right z-10 space-y-6">
          
          {/* Couple Names in Cursive Script */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl uppercase   tracking-wide text-[#c89B7B] ">
              post wedding <span className="text-2xl sm:text-4xl not-italic font-light text-[#c89B7B]"></span>
            </h2>
          </div>

          {/* Post-Wedding Heading & Milestone Date */}
          <div className="pt-6 flex flex-col items-center lg:items-end">
            <h1 className="text-2xl sm:text-2xl font-light tracking-[0.25em] uppercase text-[#c89B7B]">
              Happily Ever After
            </h1>
            <p className="text-xs sm:text-xs font-sans tracking-[0.35em] text-[#c89B7B] mt-3">
              THANK YOU FOR CELEBRATING WITH US
            </p>
          </div>

          <p className="text-[#c89B7B] font-sans text-sm max-w-xs leading-relaxed italic">
            &quot;Our greatest adventure has just begun. Thank you for filling our special day with endless love and joy.&quot;
          </p>


        </div>

      </div>

    </section>
  );
}