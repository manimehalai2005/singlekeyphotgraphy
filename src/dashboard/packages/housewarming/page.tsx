'use client';

import React, { ChangeEvent } from 'react';
import { HouseInfiniteProvider, useHouseInfinite } from '@/src/context/HouseInfiniteContext';

function DashboardHouseSliderContent() {
  const { state, updateImage, resetSingleImage, resetImages } = useHouseInfinite();

  const handleFileChange = (row: 'top' | 'bottom', index: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateImage(row, index, file);
    }
  };

  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen p-6 md:p-10 space-y-10">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#C89B7B] font-serif italic">
            House Warming Infinite Slider (Dashboard)
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage top and bottom moving slider photos. Changes reflect live instantly on the public website.
          </p>
        </div>
        <button
          type="button"
          onClick={resetImages}
          className="bg-neutral-800 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 text-xs font-medium py-2.5 px-4 rounded-xl border border-neutral-700 transition-all cursor-pointer"
        >
          ↺ Reset All Default
        </button>
      </div>

      {/* Top Row Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-[#C89B7B]">Top Row (Moving Left - 5 Photos)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {state.topRow.map((src, index) => (
            <div key={`top-${index}`} className="flex flex-col  p-4 rounded-2xl  shadow-xl">
              <div className="w-[230px] h-[200px] overflow-hidden rounded-xl  relative ">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Top ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
              
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => resetSingleImage('top', index)}
                  className="flex-1 bg-neutral-800 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 font-medium text-xs py-2 rounded-xl border border-neutral-700 transition-all cursor-pointer"
                  title="Reset to default image"
                >
                  ↺ Reset
                </button>
                <label className="flex-1 cursor-pointer bg-[#C89B7B] hover:bg-[#b08566] text-black font-semibold text-xs py-2 rounded-xl text-center shadow transition-all">
                  📷 Change
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('top', index, e)} />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-semibold text-[#C89B7B]">Bottom Row (Moving Right - 5 Photos)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {state.bottomRow.map((src, index) => (
            <div key={`bottom-${index}`} className="flex flex-col  p-4 rounded-2xl shadow-xl">
              <div className="w-[230px] h-[200px] overflow-hidden rounded-xl  relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Bottom ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
                
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => resetSingleImage('bottom', index)}
                  className="flex-1 bg-neutral-800 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 font-medium text-xs py-2 rounded-xl border border-neutral-700 transition-all cursor-pointer"
                  title="Reset to default image"
                >
                  ↺ Reset
                </button>
                <label className="flex-1 cursor-pointer bg-[#C89B7B] hover:bg-[#b08566] text-black font-semibold text-xs py-2 rounded-xl text-center shadow transition-all">
                  📷 Change
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('bottom', index, e)} />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default function DashboardHouseSliderPage() {
  return (
    <HouseInfiniteProvider>
      <DashboardHouseSliderContent />
    </HouseInfiniteProvider>
  );
}