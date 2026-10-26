'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MissionVisionSection from './MissionVisionSection';

export default function WhyChooseUsSection() {
  const features = [
    {
      title: 'Professional Experience',
      desc: 'Years of expertise capturing life’s most precious milestones with creative vision.',
      image: 'https://5.imimg.com/data5/VF/RL/XE/SELLER-72113790/cameraman-jpg-500x500.jpg',
    },
    {
      title: 'High-Quality Editing',
      desc: 'Meticulous color grading and retouching for cinematic, timeless imagery.',
      image: 'https://content.jdmagicbox.com/v2/comp/chennai/z7/044pxx44.xx44.120113110800.d5z7/catalogue/best-photo-studio-t-nagar-chennai-photo-studios-uupn12-250.jpg',
    },
    {
      title: 'Natural Moments',
      desc: 'Candid storytelling approach that preserves genuine emotions and unscripted joy.',
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/7/436515509/GQ/XB/YQ/4857115/cheapest-teleprompter-1000x1000.jpg',
    },
    {
      title: 'Professional Equipment',
      desc: 'Top-tier camera bodies and prime lenses ensuring pristine clarity in any lighting.',
      image: 'https://static.vecteezy.com/system/resources/previews/032/481/652/non_2x/interior-of-a-studio-with-lighting-equipment-and-professional-equipment-interior-of-modern-studio-with-professional-equipment-ai-generated-free-photo.jpg',
    },
    {
      title: 'Fast Delivery',
      desc: 'Quick turnaround timelines so you can relive and share your memories sooner.',
      image: 'https://tse2.mm.bing.net/th/id/OIP.c46-XtYoXEk5CjDW9b1ArgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      title: 'Personalized Service',
      desc: 'Tailored photography packages designed to fit your unique style and vision.',
      image: 'https://i1.sndcdn.com/avatars-000617034471-tehxqx-t500x500.jpg',
    },
  ];

  return (
    <>
    <section className="w-full bg-transparent text-[#c89b7b] py-24 px-6 lg:px-16 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Content with Smooth Fade-down Motion */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-block text-[#c89b7b]  text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            Why Choose Us
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#c89b7b]">
            SingleKey Photography built on passion, driven by <span className="italic font-serif text-[#c89b7b]">excellence.</span>
          </h2>
        </motion.div>

        {/* Card Grid with Staggered Fade-up Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="relative group h-[220px] rounded-[28px] overflow-hidden  shadow-2xl flex flex-col justify-end p-6 cursor-pointer"
            >
              {/* Brightened Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 brightness-110"
              />
              {/* Softened Gradient Overlay for Higher Visibility & Readable Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

              {/* Content Card Info */}
              <div className="relative z-10 space-y-2 text-[#c89b7b]">
                <h3 className="text-xl font-serif font-bold text-[#c89b7b] tracking-wide transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#c89b7b] font-light leading-relaxed opacity-95">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
    <MissionVisionSection/>
    </>
  );
}