'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

export default function WhatICaptureSection() {
  const initialCategories = [
    { title: 'Ring engagement', count:1,  image: 'https://images.squarespace-cdn.com/content/v1/52ed3507e4b041396187d22b/1614070522666-AZE21LRE48HHLETJZXHT/NICHAYATHARTHAM-1.jpg', subtitle: 'Timeless love stories' },
    { title: 'weddings',count:2, image: 'https://tse4.mm.bing.net/th/id/OIP.YDrOhqkCZv9unMfVl3_0vQHaE8?r=0&pid=ImgDet&w=474&h=316&rs=1&o=7&rm=3', subtitle: 'Romantic chemistry' },
    { title: 'birthday',count:3, image: 'https://5.imimg.com/data5/SELLER/Default/2022/8/IX/IG/SF/4110450/1200px-birthday-party-500x500.jpg', subtitle: 'Vibrant celebrations' },
    { title: 'wedding', count:4, image: 'https://thetalesoftradition.com/wp-content/uploads/2024/01/vivekkrishnanphotography-696-1024x1536.jpg', subtitle: 'Expressive personality' },
    { title: 'Fashion',count:5, image: 'https://www.indiatravel.app/wp-content/uploads/2024/11/Saree.jpg', subtitle: 'High-end style & aesthetics' },
    { title: 'postwedding',count:6, image: 'https://i.pinimg.com/originals/79/3d/dd/793ddd4af63fa1a9d23a115f38caf9b3.jpg', subtitle: 'Intimate moments' },
    { title: 'Baby / Family', count:7, image: 'https://www.jaihindhphotography.com/wp-content/uploads/2025/03/Baby-Shower-Photography-in-Chennai-9-1.jpg', subtitle: 'Pure joy & bonds' },
  ];

  const [categories, setCategories] = useState(initialCategories);

  const shuffleCategories = (array: typeof initialCategories) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCategories((prev) => shuffleCategories(prev));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-transparent text-[#c89b7b] font-sans antialiased overflow-hidden">
      
      <style jsx>{`
        @keyframes slowMove {
          0% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.08) translate(-10px, -5px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        .animate-slow-move {
          animation: slowMove 12s ease-in-out infinite;
        }
      `}</style>

      <div className="p-5 max-w-8xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 lg:p-10 mb-6"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            {/* Title Block */}
            <div className="space-y-2">
              
              <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-[#c89b7b]">
                What we <span className="italic font-normal text-[#c89b7b]">Capture</span>
              </h2>
            </div>

            {/* Subtitle / Description */}
            <p className="text-[#c89b7b] text-sm max-w-md font-light leading-relaxed opacity-90">
              Every frame is carefully curated to reflect authenticity, emotion, and elegance. Explore the moments we can create together.
            </p>

          </div>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Featured Large Hero Card (Span 5 columns) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative group h-[460px] rounded-[32px] overflow-hidden shadow-lg border border-slate-800 bg-neutral-900 cursor-pointer flex flex-col justify-end p-8"
          >
            <img
              src={categories[0].image}
              alt={categories[0].title}
              className="absolute inset-0 w-full h-full object-cover animate-slow-move transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 text-[#c89b7b] space-y-2">
              <h3 className="text-3xl font-serif font-bold text-[#c89b7b]">{categories[0].title}</h3>
              <p className="text-xs text-[#c89b7b] font-light opacity-90">{categories[0].subtitle}</p>
            </div>
          </motion.div>

          {/* Grid Cards (Span 7 columns - grid of 6 remaining items) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.slice(1).map((item, index) => (
              <motion.div
                key={item.count}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative group h-[218px] rounded-3xl overflow-hidden shadow-md cursor-pointer flex flex-col justify-end p-5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover animate-slow-move transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="relative z-10 text-[#c89b7b]">
                  <h4 className="text-base font-serif font-bold text-[#c89b7b]">{item.title}</h4>
                  <p className="text-[11px] text-[#c89b7b] font-light opacity-90">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}