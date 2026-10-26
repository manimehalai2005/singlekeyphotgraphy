'use client';

import React, { ChangeEvent } from 'react';
import { useGallery } from '@/src/context/GalleryContext';

export default function InteriorGallery() {
  const { images, updateImage, resetImage } = useGallery();

  const handleFileChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateImage(index, file);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] p-6 md:p-10 space-y-8">
      
      {/* Header Section */}
      <div className=" pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#C89B7B] font-serif italic">
            SingleKey Collections 
          </h1>
          <p className="text-sm text-neutral-400 mt-1 font-sans">
            Manage your gallery images. Updates sync instantly with the public website.
          </p>
        </div>
        
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div 
            key={img.id} 
            className="group flex flex-col   rounded-2xl   transition-all duration-300 shadow-xl"
          >
            
            {/* Image Preview Container */}
            <div className="w-full h-[260px] overflow-hidden rounded-xl  relative ">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" 
              />
              
            </div>

            {/* Action Bar */}
            <div className="mt-4 flex items-center justify-between gap-3 pt-2">
              
              {/* Cancel / Reset Button */}
              <button
                type="button"
                onClick={() => resetImage(index)}
                className="flex-1 bg-neutral-800/70 hover:bg-red-950/40 text-neutral-400 hover:text-red-400 font-medium text-xs py-2.5 px-3 rounded-xl border border-neutral-700/60 hover:border-red-900/60 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>↺ Reset</span>
              </button>

              {/* Direct Clickable File Input Label */}
              <label className="flex-1 cursor-pointer bg-[#C89B7B] hover:bg-[#b08566] text-black font-semibold text-xs py-2.5 px-3 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 text-center">
                <span>📷 Change</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleFileChange(index, e)}
                />
              </label>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}