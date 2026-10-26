'use client';

import React, { useEffect, useRef } from 'react';

const images = [
  "https://i.ytimg.com/vi/AV0nhB5VgHU/oardefault.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLAsN8C42mOI-gm0fAZrpK4O5kBP9Q",
  "https://tse3.mm.bing.net/th/id/OIP.2e3r0wg_zYPd1rMInI5b-gHaFj?r=0&w=1600&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse1.mm.bing.net/th/id/OIP.JvQO8npV1vtsncwu9JpfxgHaG7?r=0&w=1300&h=1216&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse3.mm.bing.net/th/id/OIP.NrfXdlwd4NPkHFrI40crgwHaFc?r=0&w=1300&h=956&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://tse2.mm.bing.net/th/id/OIP.ByHs7e9hVb6L4wxAQq4vzgHaLH?r=0&w=600&h=900&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://live.staticflickr.com/3333/3231275545_4b0ff65e9a_b.jpg",
  "https://tse1.mm.bing.net/th/id/OIP.tqeDN2wFzuXJIbTwKhXgNgHaLH?r=0&pid=ImgDet&w=474&h=711&rs=1&o=7&rm=3",
  "https://i.pinimg.com/originals/1a/a7/38/1aa738d084a53c7c088ecec5dc30288c.jpg",
  "https://i.pinimg.com/originals/b4/1f/58/b41f58c6a569aa63b0dfa4d27e34653d.jpg",
  "https://i.ytimg.com/vi/iTqNNCag-nY/maxresdefault.jpg",
  "https://tse3.mm.bing.net/th/id/OIP.FFuD1dTl_ju7xDXsnnFplQHaE7?r=0&w=823&h=548&rs=1&pid=ImgDetMain&o=7&rm=3",
  "https://knotstories.in/wp-content/uploads/2023/07/593A4699-1.jpg"
];

export default function ScrollFadeZigzagGallery() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'blur-none');
            entry.target.classList.remove('opacity-0', 'translate-y-12', 'blur-sm');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.scroll-fade-item');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center  overflow-hidden">
      {/* Custom CSS Keyframes for Floating Effect */}
      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes floatFast {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float-1 {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: floatFast 5s ease-in-out infinite;
        }
      `}</style>

      <div className="w-full">
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {images.map((src, index) => {
            const isEven = index % 2 === 0;
            // Alternating floating animations for natural look
            const floatClass = index % 2 === 0 ? 'animate-float-1' : 'animate-float-2';

            return (
              <div
                key={index}
                className={`scroll-fade-item opacity-0 translate-y-12 blur-sm transition-all duration-1000 ease-out 
                  relative group overflow-hidden rounded-2xl w-full aspect-[3/4] 
                  hover:scale-105 hover:-translate-y-2 hover:shadow-cyan-500/20 hover:z-20 cursor-pointer ${floatClass} ${
                    isEven ? 'translate-y-0' : 'translate-y-6 md:translate-y-10'
                  }`}
                style={{ 
                  transitionDelay: `${(index % 6) * 100}ms`,
                  animationDelay: `${index * 0.3}s` // Each card floats out of sync smoothly
                }}
              >
                <img
                  src={src}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-200"
                />
                <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-[10px] font-semibold tracking-wider uppercase">0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}