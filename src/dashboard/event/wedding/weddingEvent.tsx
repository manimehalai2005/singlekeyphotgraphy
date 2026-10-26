'use client';

import React, { ChangeEvent } from 'react';
import { useWedding } from '@/src/context/WeddingContenxt';
import Prewedding from './pre-wedding';

export default function DashboardWeddingControl() {
  const { weddingImages, updateWeddingImage, resetWeddingImage } = useWedding();

  const handleFileChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateWeddingImage(index, file);
    }
  };

  return (
    <>
    <div className="w-full bg-[#0a0a0a] min-h-screen p-6 md:p-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#C89B7B] font-serif italic">
          Wedding Event Photos 
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Update images for the main wedding event layout. Changes reflect live on the website.
        </p>
      </div>

      {/* Grid of Editable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {weddingImages.map((img, index) => (
          <div 
            key={img.id} 
            className="flex flex-col  p-4 rounded-2xl  shadow-xl"
          >
            <div className="w-full h-[250px] overflow-hidden rounded-xl bg-neutral-950 relative border border-neutral-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover rounded-xl" 
              />
            
            </div>

            {/* Action Bar */}
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => resetWeddingImage(index)}
                className="flex-1 bg-neutral-800 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 font-medium text-xs py-2.5 px-3 rounded-xl border border-neutral-700 transition-all cursor-pointer"
              >
                ↺ Cancel
              </button>

              <label className="flex-1 cursor-pointer bg-[#C89B7B] hover:bg-[#b08566] text-black font-semibold text-xs py-2.5 px-3 rounded-xl shadow transition-all text-center">
                📷 Change
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
       <Prewedding/>

    </div>
   
    </>
  );
}