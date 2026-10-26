"use client";

import React from "react";
import Image from "next/image";

export default function PubertyGallery() {
  return (
    <section className="relative w-full min-h-screen bg-transparent text-white py-16 px-6 lg:px-20 overflow-hidden font-serif flex flex-col items-center justify-center">
      
      {/* Outer Card Frame matching template style */}
      <div className="max-w-5xl w-full mx-auto bg-black border border-neutral-800 p-6 md:p-8 rounded-2xl shadow-2xl relative grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        
        {/* Top-Left / Box 1 */}
        <div className="relative w-full h-56 rounded-lg overflow-hidden">
          <img
            src=""
            alt="Sacred Ritual Landscape"
            className="object-cover"
          />
        </div>

        {/* Top-Center / Box 2 */}
        <div className="relative w-full h-56 rounded-lg overflow-hidden">
          <img
            src=""
            alt="Traditional Blessings Path"
            className="object-cover"
          />
        </div>

        {/* Top-Right / Box 3 */}
        <div className="relative w-full h-56 rounded-lg overflow-hidden">
          <img
            src=""
            alt="Family Offering Moment"
            className="object-cover"
          />
        </div>

        {/* Middle-Left / Box 4 */}
        <div className="relative w-full h-56 rounded-lg overflow-hidden">
          <img
            src=""
            alt="Auspicious Customs"
            className="object-cover"
          />
        </div>

        {/* Center Text Box (Date & Initials equivalent) */}
        <div className="flex flex-col items-center justify-center text-center p-6 bg-neutral-900 rounded-lg border border-neutral-800 h-56">
          <span className="text-xl font-light tracking-widest text-neutral-300 mb-2">
            10.08.26
          </span>
          <h2 className="text-4xl italic font-normal text-white tracking-wider">
            R &amp; C
          </h2>
          <span className="text-xs uppercase tracking-widest text-[#C89B7B] font-sans font-bold mt-2">
            Puberty Ceremony
          </span>
        </div>

        {/* Middle-Right / Box 5 */}
        <div className="relative w-full h-56 rounded-lg overflow-hidden ">
          <img
            src=""
            alt="Sacred Ring/Token Exchange"
            className="object-cover"
          />
        </div>

        {/* Bottom-Left / Box 6 */}
        <div className="relative w-full h-56 rounded-lg overflow-hidden">
          <img
            src=""
            alt="Traditional Feast & Setup"
            className="object-cover"
          />
        </div>

        {/* Bottom-Center / Box 7 */}
        <div className="relative w-full h-56 rounded-lg overflow-hidden ">
          <img
            src=""
            alt="Celebration Sparklers"
            className="object-cover"
          />
        </div>

        {/* Bottom-Right / Box 8 */}
        <div className="relative w-full h-56 rounded-lg overflow-hidden ">
          <img
            src=""
            alt="Evening Sunset Blessings"
            className="object-cover"
          />
        </div>

      </div>

    </section>
  );
}