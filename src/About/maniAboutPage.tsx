// app/page.tsx
'use client';

import React from 'react';
import MyComponent from './BoounceCard';
import PhotographyAboutPage from './Aboutusintro';
import PhotoAboutSection from '../Intro/Aboutslide';
import ZigzagImages from './Nextslide';

export default function VeroneAboutPage() {
  return (
    <main className=" flex  bg-black items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Typography & Content */}
      <MyComponent/>
        {/* Right Column: Featured Image Card */}
      <ZigzagImages/>
      </div>
    </main>
  );
}