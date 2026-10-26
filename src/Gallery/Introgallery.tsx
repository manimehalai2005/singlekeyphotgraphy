'use client';

import React from 'react';
import { useGallery } from '@/src/context/GalleryContext';

export default function InteriorGallery() {
  const { images } = useGallery();

  return (
    <div className="w-full bg-black min-h-screen flex flex-col p-0 m-0 overflow-x-hidden">
      
      {/* Header Section */}
      <div className="p-4 bg-black">
        <h1 className="text-xl mb-10 p-9 sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#C89b7b] font-sans italic">
          SingleKey Collections :
        </h1>
      </div>

      {/* Strict 4-Column Grid with Zero Gaps */}
      <div className="max-w-7xl mx-auto bg-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-2xl p-0 m-0 leading-none">
        {images.map((img) => (
          <div key={img.id} className="w-full h-[320px] overflow-hidden p-0 leading-none rounded-2xl">
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-full object-cover block p-0 m-0 align-bottom rounded-2xl" 
            />
          </div>
        ))}
      </div>

    </div>
  );
}