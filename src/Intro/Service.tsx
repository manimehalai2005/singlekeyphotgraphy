'use client';

import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ClientGallery from './mainChoosuspage';
import Mainchooseus from './mainChooseus';
import Chooseus from './SpreadPage';
import BookingSection from './BookingSection';

export default function PhotographyServicesSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Safe scroll handler for horizontal slider controls
  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const services = [
    {
      id: "01",
      title: "Wedding Photography",
      description: "Capturing the heartbeat of your timeless union with full-day cinematic coverage and high-resolution galleries.",
      image: "https://tse4.mm.bing.net/th/id/OIP.YQwlbCWCitJPIPK9W2Ol_AHaE7?r=0&w=2048&h=1365&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: "02",
      title: "Event Photography",
      description: "Preserving the energy, scale, and candid guest interactions with crisp precision and professional lighting.",
      image: "https://i.pinimg.com/originals/00/42/c1/0042c119b39ce2cca8322c844cfb8cba.jpg",
    },
    {
      id: "04",
      title: "Pre-Wedding",
      description: "Cinematic love letters before the walk down the aisle with customized location scouting and styling concepts.",
      image: "https://i.pinimg.com/originals/14/81/43/148143447ae1de3cc8cdb7d363b07abb.jpg",
    },
    {
      id: "05",
      title: "Wedding Photography",
      description: "High-impact product, fashion, and architectural photography engineered to elevate your commercial presence.",
      image: "https://bookmyfestive.com/hero_image_1.webp",
    },
    {
      id: "06",
      title: "Naming Ceremony",
      description: "Cinematic love letters before the walk down the aisle with customized location scouting and styling concepts.",
      image: "https://i.pinimg.com/originals/84/f3/16/84f316ce237db8223c26d7dcefdc4595.jpg",
    },
    {
      id: "07",
      title: "Housewarming Ceremony",
      description: "High-impact product, fashion, and architectural photography engineered to elevate your commercial presence.",
      image: "https://th.bing.com/th/id/OIP.p1nfANx5JRLZ_O62MBlheQHaE8?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: "08",
      title: "Ritual Ceremony",
      description: "Cinematic love letters before the walk down the aisle with customized location scouting and styling concepts.",
      image: "https://static.vecteezy.com/system/resources/previews/040/805/968/non_2x/ai-generated-traditional-hindu-wedding-bride-groom-family-and-priest-perform-sacred-fire-rituals-in-traditional-attire-free-photo.jpg",
    },
    {
      id: "09",
      title: "Puberty Ceremony Photography",
      description: "High-impact product, fashion, and architectural photography engineered to elevate your commercial presence.",
      image: "https://i.pinimg.com/236x/cd/25/23/cd2523b1d22747702969f7863ab43a45.jpg",
    }
  ];

  return (
    <>
      <main className="relative w-full bg-transparent text-[#C89B7B] flex items-center justify-center p-4 sm:p-8 antialiased overflow-hidden font-sans">
        
        {/* Custom Keyframe Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {/* Background Glow Accents */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none" />

        {/* Outer Sleek Card Container - Fully Transparent */}
        <div className="relative w-full bg-transparent rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Side: Headings & Action Button */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-4 flex flex-col justify-between space-y-6 sm:space-y-8"
            >
              <div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#C89B7B] leading-[1.15] mb-4 sm:mb-6">
                  Our main areas <br className="hidden sm:inline" />of work
                </h2>

                <p className="text-[#C89B7B]/80 text-xs sm:text-base leading-relaxed max-w-sm font-medium">
                  From conceptual storytelling to high-end cinematic delivery, we provide tailored photography services that capture the heartbeat of your moments.
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-4">
                <button 
                  type="button"
                  onClick={() => handleScroll('right')}
                  className="group inline-flex items-center space-x-2 sm:space-x-3 text-[#C89B7B] transition-all duration-300 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm shadow-lg active:scale-95 cursor-pointer  backdrop-blur-md"
                >
                  <span>All Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C89B7B]" />
                </button>

                {/* Mobile Navigation Arrows (Visible only on mobile screen for fast access) */}
                <div className="flex items-center space-x-2 sm:hidden">
                  <button 
                    type="button"
                    onClick={() => handleScroll('left')} 
                    className="p-2.5 rounded-full bg-neutral-900/80 text-[#C89B7B] active:scale-90"
                    title="Slide Left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleScroll('right')} 
                    className="p-2.5 rounded-full bg-neutral-900/80 text-[#C89B7B] active:scale-90"
                    title="Slide Right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Horizontal Slider Cards with Floating Water Wave */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-8 flex flex-col space-y-4"
            >
              
              {/* Slider Control Header (Desktop Only Controls) */}
              <div className="hidden sm:flex items-center justify-between px-1">
                <span className="text-xs font-medium text-[#C89B7B] uppercase tracking-wider">
                  Explore Services Showcase
                </span>
                <div className="flex items-center space-x-2">
                  <button 
                    type="button"
                    onClick={() => handleScroll('left')} 
                    className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-[#C89B7B] transition cursor-pointer"
                    title="Slide Left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleScroll('right')} 
                    className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-[#C89B7B] transition border border-neutral-800 cursor-pointer"
                    title="Slide Right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Flex Container for Horizontal Fast Scroll */}
              <div 
                ref={sliderRef}
                className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-6 pt-2 items-stretch"
              >
                {services.map((service, index) => (
                  <motion.div 
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    animate={{
                      y: [0, -6, 0, 6, 0],
                    }}
                    transition={{
                      y: {
                        duration: 5 + (index % 3),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      },
                      opacity: { duration: 0.5 },
                    }}
                    className="w-[82vw] sm:w-[320px] min-w-[82vw] sm:min-w-[320px] max-w-[320px] flex-shrink-0 snap-center border border-neutral-800/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-[340px] sm:h-[380px] transition-all duration-500 hover:shadow-2xl hover:border-[#C89B7B]/50 group relative overflow-hidden cursor-pointer"
                  >
                    {/* Floating Water Wave Background Image Overlay */}
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 1, -1, 0],
                      }}
                      transition={{
                        duration: 6 + (index % 2),
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 bg-cover bg-center brightness-125 contrast-105 transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />

                    {/* Gradient Overlay for Readable Text */}
                    <div className="absolute inset-0  pointer-events-none" />

                    {/* Card Top: Number Index Tag */}
                    <div className="flex items-center justify-between relative z-10">
                    </div>

                    {/* Card Bottom: Title & Description */}
                    <div className="relative z-10 space-y-1.5 sm:space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#C89B7B] transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>

          </div>

        </div>
        
      </main>

      <div className='bg-transparent '>
        <ClientGallery />
        <Mainchooseus />
        <Chooseus />
      

      </div>
    
        
      
    </>
  );
}