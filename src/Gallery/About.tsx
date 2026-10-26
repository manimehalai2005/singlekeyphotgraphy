'use client';

import React from 'react';
import ArtisticCollage from './ArticleCollege';
import StarfieldCursor from '../StarFieldCursor';

export default function AboutUs() {
  return (
    <>
      
      <div className="w-full bg-transparent flex items-center justify-center py-6 px-4 sm:px-6 md:p-12 relative overflow-hidden font-sans">

        {/* Main Container Card */}
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          {/* right */}
          <div className="flex flex-col justify-center text-left">
          
            {/* Tag / Title */}
            <div className="inline-block border-b-2 border-[#E58123] pb-1 mb-3 sm:mb-4 w-fit">
              <span className="text-orange-300 font-bold text-xs sm:text-sm tracking-widest uppercase">
                Collections
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-orange-300 leading-snug mb-3 sm:mb-4">
              Capturing Every Precious Moment of Your Special Celebrations.
            </h2>

            {/* Description Paragraph */}
            <div className="text-orange-200 font-sans italic text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 font-medium space-y-3">
              <p>
                We specialize in preserving the timeless beauty and emotions of your grand celebrations. From intimate moments to vibrant festivities, we meticulously cover all 9 essential wedding ceremonies:
              </p>
              
              <p>
                Every frame is crafted with artistic passion to turn your priceless memories into everlasting visual stories.
              </p>
            </div>

          </div>

          {/* Left Side: Image with Accent Background */}
          <div className="relative w-full flex items-center justify-center overflow-hidden py-4 lg:py-0">
            <div className="absolute -bottom-4 -left-4 w-full h-full"></div>
            <div className="w-full max-w-md lg:max-w-none">
              <ArtisticCollage />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}