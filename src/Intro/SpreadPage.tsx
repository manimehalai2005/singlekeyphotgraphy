'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function ExploreGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryItems = [
    {
      id: 1,
      title: "wedding",
      subtitle: "wedding ceremony photoshoot",
      image: "https://jermainechandra.com/wp-content/uploads/2022/08/08-68304-post/tamil-hindu-wedding-scaled.jpg",
    },
    {
      id: 2,
      title: "Engagement ",
      subtitle: "Engagement ceremony photoshoot",
      image: "https://c8.alamy.com/comp/2PH0GEA/bride-and-groom-at-their-engagement-ceremony-in-trichy-tamil-naduindia-2PH0GEA.jpg",
    },
    {
      id: 3,
      title: "Birthday",
      subtitle: "Birthaday ceremony photoshoot",
      image: "https://th.bing.com/th/id/R.f84d416514d3aea730d29192ff143dcf?rik=fe4GIjZA6pU9OA&riu=http%3a%2f%2f5.imimg.com%2fdata5%2fSELLER%2fDefault%2f2022%2f6%2fAM%2fLL%2fEK%2f32023105%2fbirthday-photography-1000x1000.jpg&ehk=5QBmZvvkbLbZLFBcBiClkWuet3%2bMVkPeC3KyJ93CkK4%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: 4,
      title: "Baby shower",
      subtitle: "Baby shower photoshoot",
      image: "https://i.pinimg.com/736x/5c/37/db/5c37db25ed7ff87c7e3401d065eafc63.jpg",
    },
     {
      id: 5,
      title: "Naming ceremony",
      subtitle: "Naming ceremony photoshoot",
      image: "https://tse2.mm.bing.net/th/id/OIP.FCTR3ELdOW2_svYWPQxNFgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
     {
      id: 6,
      title: "Earpiercing",
      subtitle: "Earpiercing cermony photshoot",
      image: "https://c8.alamy.com/comp/2RD42E3/young-child-screams-as-her-ears-are-pierced-in-ceremony-at-sri-ranganathaswamy-hindu-temple-thanjavur-tamil-nadu-india-asia-2RD42E3.jpg",
    },
    
  ];

  const loopItems = [...galleryItems, ...galleryItems, ...galleryItems];

  return (
    <section className="bg-transparent text-[#C89B7B] font-sans w-full py-6 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-[1200px] mx-auto text-center">
        
    

        {/* Horizontal Marquee / Infinite Auto Scroll Section */}
        <div className="relative w-full overflow-hidden py-4">
          
          {/* Left and Right Smooth Fade Gradients */}
          <div className="absolute left-0 inset-y-0 w-24  z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24  z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 items-center cursor-grab active:cursor-grabbing"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {loopItems.map((item, idx) => {
              const originalIdx = idx % galleryItems.length;
              const isCenterFocus = activeIndex === originalIdx;

              return (
                <motion.div
                  key={`${item.id}-${idx}`}
                  onClick={() => setActiveIndex(originalIdx)}
                  whileHover={{ scale: 1.03 }}
                  className={`relative shrink-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer ${
                    isCenterFocus
                      ? "w-[450px] sm:w-[650px] h-[320px] sm:h-[420px] z-20 ring-4 ring-[#C89B7B]/20"
                      : "w-[260px] sm:w-[340px] h-[220px] sm:h-[280px] opacity-75 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient & Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                    <span className="text-[11px] font-bold tracking-wider text-[#C89B7B] uppercase block mb-1">
                      {item.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black tracking-wide text-[#C89B7B]">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Pagination Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {galleryItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx ? "w-8 bg-[#C89B7B]" : "w-2 bg-neutral-700"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}