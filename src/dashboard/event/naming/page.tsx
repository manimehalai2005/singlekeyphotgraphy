'use client';

import React, { ChangeEvent } from 'react';
import { useNaming, NamingProvider } from '@/src/context/NamingContext';

function DashboardNamingContent() {
  const { cards, updateCardImage, resetCardImages } = useNaming();

  const handleFileChange = (id: string, type: 'front' | 'back', event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateCardImage(id, type, file);
    }
  };

  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen p-6 md:p-10 space-y-8">
      <div className="border-b border-neutral-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#C89B7B] font-serif italic">
          Naming Ceremony Event Photos 
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Manage flip card front and back images. Changes reflect live instantly on the public website.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="flex flex-col  p-5 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
           
              <button
                type="button"
                onClick={() => resetCardImages(card.id)}
                className="text-xs text-neutral-400 hover:text-red-400 cursor-pointer"
              >
                ↺ Reset Both
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Front Image Box */}
              <div className="space-y-2">
                <p className="text-[11px] text-neutral-400 uppercase tracking-wider">Front View</p>
                <div className="w-[160px] h-[230px] overflow-hidden rounded-xl  relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.front} alt="Front view" className="w-full h-full object-cover rounded-xl" />
                </div>
                <label className="block cursor-pointer bg-[#C89B7B] hover:bg-[#b08566] text-black font-semibold text-xs py-2 rounded-lg text-center transition-all">
                  Change Front
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(card.id, 'front', e)} />
                </label>
              </div>

              {/* Back Image Box */}
              <div className="space-y-2">
                <p className="text-[11px] text-neutral-400 uppercase tracking-wider">Back View</p>
                <div className="w-[160px] h-[230px] overflow-hidden rounded-xl bg-neutral-950 relative border border-neutral-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.back} alt="Back view" className="w-full h-full object-cover rounded-xl" />
                </div>
                <label className="block cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-[#C89B7B] border border-neutral-700 font-semibold text-xs py-2 rounded-lg text-center transition-all">
                  Change Back
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(card.id, 'back', e)} />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardNamingPage() {
  return (
    <NamingProvider>
      <DashboardNamingContent />
    </NamingProvider>
  );
}