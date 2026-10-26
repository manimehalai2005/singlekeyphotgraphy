'use client';

import { HouseWarmingProvider ,useHouseWarming } from '@/src/context/HousewarmingContext';
import React, { ChangeEvent } from 'react';


function DashboardHouseWarmingContent() {
  const { houseWarmingImages, updateHouseWarmingImage, resetHouseWarmingImage } = useHouseWarming();

  const handleFileChange = (key: keyof typeof houseWarmingImages, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateHouseWarmingImage(key, file);
    }
  };

  const items = [
    { key: 'banner' as const, label: 'Top Banner Background' },
    { key: 'image1' as const, label: 'Falling Photo 1 (Left)' },
    { key: 'image2' as const, label: 'Falling Photo 2 (Center)' },
    { key: 'image3' as const, label: 'Falling Photo 3 (Right)' },
  ];

  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen p-6 md:p-10 space-y-8">
      <div className="border-b border-neutral-800 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#C89B7B] font-serif italic">
          House Warming Event Photos 
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Manage top banner and falling rain photos. Changes reflect live instantly on the public website.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.key} className="flex flex-col  p-4 rounded-2xl  shadow-xl">
            <div className="w-[280px] h-[280px] overflow-hidden rounded-xl bg-neutral-950 relative ">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={houseWarmingImages[item.key]} alt={item.label} className="w-full h-full object-cover rounded-xl" />
            
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => resetHouseWarmingImage(item.key)}
                className="flex-1 bg-neutral-800 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 font-medium text-xs py-2.5 px-3 rounded-xl border border-neutral-700 transition-all cursor-pointer"
              >
                ↺ Cancel
              </button>
              <label className="flex-1 cursor-pointer bg-[#C89B7B] hover:bg-[#b08566] text-black font-semibold text-xs py-2.5 px-3 rounded-xl shadow transition-all text-center">
                📷 Change
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(item.key, e)} />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardHouseWarmingControl() {
  return (
    <HouseWarmingProvider>
      <DashboardHouseWarmingContent />
    </HouseWarmingProvider>
  );
}