'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  relativePublishTimeDescription: string;
  rating: number;
  text: string;
  authorAttribution: string;
}

// Background images for the 3 grid cards (Aesthetic Photography style)
const cardBackgrounds = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
];

// 👉 Ingu ungal Google Maps-il irukkura ungaloda ACTUAL REAL REVIEWS-ai podungal:
const realReviews: Review[] = [
 
  {
    relativePublishTimeDescription: '2 days ago',
    rating: 5,
    text: 'Excellent event coverage and very professional cinematic video outputs. Best photographer in Madurai!',
    authorAttribution: 'vanisri'
  },
  {
    relativePublishTimeDescription: '3 days ago',
    rating: 5,
    text: 'Great team and wonderful memories captured for our family function. Highly satisfied with their work.',
    authorAttribution: 'Priya Dharshini'
  }
];

export default function ReviewSection() {
  return (
    <section className="bg-[#000000] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#C89B7B] tracking-widest uppercase">
            Client Testimonials
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-2 tracking-wide">What Our Clients Say on Google</p>
          <div className="w-16 h-[2px] bg-[#C89B7B] mx-auto mt-3" />
        </div>

        {/* 3-Grid Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {realReviews.map((item, index) => {
            const bgImage = cardBackgrounds[index % cardBackgrounds.length];

            return (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden min-h-[460px] flex flex-col justify-between p-6 sm:p-8 shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-neutral-800 group"
                style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Dark Monochromatic Overlay for contrast */}
                <div className="absolute inset-0 bg-black/75 group-hover:bg-black/65 transition-colors duration-300" />

                {/* Top Badge */}
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                    GOOGLE REVIEW
                  </span>
                  <span className="text-xs text-neutral-400">
                    {item.relativePublishTimeDescription}
                  </span>
                </div>

                {/* Review Text */}
                <div className="relative z-10 my-auto py-4">
                  <p className="text-white/90 text-sm sm:text-base font-serif italic leading-relaxed line-clamp-6">
                    "{item.text}"
                  </p>
                </div>

                {/* Rating & Author Name */}
                <div className="relative z-10 border-t border-white/15 pt-4">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-neutral-600'
                        }`}
                      />
                    ))}
                  </div>

                  <h4 className="text-white font-medium text-base tracking-wide">
                    {item.authorAttribution}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}