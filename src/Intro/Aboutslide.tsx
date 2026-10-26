'use client';

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Camera } from "lucide-react";
import { motion } from "framer-motion";
import Masonry from "./Mansory";
import PhotographyServicesSection from "./Service";

export default function PhotoAboutSection() {
  const masonryItems = [
    { id: "1", img: "https://cdn0.weddingwire.in/real-wedding-photo/482/3_2/1280/jpg/10274.jpeg", url: "#", height: 350, title: "wedding" },
    { id: "2", img: "https://admin.expatica.com/wp-content/uploads/2018/11/wedding-ring-india.jpg", url: "#", height: 280, title: "RingCeremony" },
    { id: "3", img: "https://1.bp.blogspot.com/-1XilnCXa2SU/Tmnr1PQ7ecI/AAAAAAAAARI/Du9L5pvjTHw/s1600/DSCN1103.JPG", url: "#", height: 240, title: "birthday" },
    { id: "4", img: "https://i.pinimg.com/564x/bb/e7/c1/bbe7c1f5545240386bc2e1a07c9aeb38.jpg", url: "#", height: 280, title: "pre-wedding" },
    { id: "5", img: "https://phometo.com/images/gallery/post-wedding-shoot-in-bangalore.jpg", url: "#", height: 350, title: "post-wedding" },
    { id: "6", img: "https://tse3.mm.bing.net/th/id/OIP.GA9TjPAHMHz6Gl-R3rU6HAHaLI?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", url: "#", height: 240, title: "couple-shoot" },
    { id: "7", img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/039948144851405.629432ed58499.jpg", url: "#", height: 240, title: "fashion" },
    { id: "8", img: "https://imgcdn.stablediffusionweb.com/2025/7/27/2e51a698-e14b-4af1-98e3-93ae2a1ac7a6.jpg", url: "#", height: 280, title: "portrait" },
    { id: "9", img: "https://i.pinimg.com/736x/c8/47/30/c8473060a0b9638b152b1d8b52caf76c.jpg", url: "#", height: 320, title: "babyshower" },
    { id: "10", img: "https://bangalorephotographers.in/images/gallery/Naming_Ceremony_Photoshoot.jpg", url: "#", height: 280, title: "namingCeremony" },
    { id: "11", img: "https://phometo.com/images/gallery/Housewarming/2.jpg", url: "#", height: 240, title: "housewarming" },
    { id: "12", img: "https://5.imimg.com/data5/SELLER/Default/2025/7/530559779/RI/SR/HJ/16073614/award-ceremony-event-services-1000x1000.jpg", url: "#", height: 300, title: "partyevent" },
    { id: "13", img: "https://www.hlimg.com/images/stories/738X538/Neeta-Shankar-Photography-Lalbagh-Couple-Pre-Wedding-Shoot-Bangalore-127_1496641657s11.jpg", url: "#", height: 300, title: "couple-shoot" },
    { id: "14", img: "https://tse3.mm.bing.net/th/id/OIP.lQGhX1LcWGiWNCJT458IBAHaDg?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", url: "#", height: 300, title: "collegeEvent" },
  ];

  // Mobile curated highlight items for cleaner mobile preview
  const mobileHighlights = [
    { title: "Baby Shower", img: "https://tse1.mm.bing.net/th/id/OIP.7KOAjvvwdKBacnZ_3UlLbQHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { title: "Pre Wedding", img: "https://dstudios.in/wp-content/uploads/2024/06/pre-wedding-adarsh-asihwarya-shoot-768x1152.jpeg" },
    { title: "Haldi & Mehendi", img: "https://images.filmibeat.com/ph-big/2018/04/meghana-raj-mehendi-ceremony-photos_152480123700.jpg" },
    { title: "Social Moments", img: "https://i.pinimg.com/736x/fd/a7/a2/fda7a255971143599a0124b3a56489c9.jpg" },
  ];

  return (
    <main className="w-full bg-transparent flex flex-col items-center justify-center p-3 md:p-8 overflow-hidden">
      <div className="block md:hidden w-full space-y-6">
        {/* Top Tagline */}
        <div className="flex items-center justify-between px-2">
          <p className="text-[11px] uppercase tracking-wider text-[#C89B7B] font-medium flex items-center gap-1.5">
            <Sparkles size={12} />
            Capturing timeless stories.
          </p>
          <span className="text-[10px] text-[#C89B7B]/80 uppercase tracking-widest">
            Excellence
          </span>
        </div>

        {/* Mobile Header / Intro */}
        <div className="px-2 space-y-1">
          <h2 className="text-2xl font-serif text-[#C89B7B]">Our Gallery Highlights</h2>
          <p className="text-xs text-[#C89B7B]">Explore our best moments captured across weddings, pre-weddings, and celebrations.</p>
        </div>

        {/* Mobile Grid Layout for Highlights */}
        <div className="grid grid-cols-2 gap-3 px-1">
          {mobileHighlights.map((item, idx) => (
            <div 
              key={idx}
              className="relative h-44 rounded-2xl overflow-hidden  flex flex-col justify-end p-3 bg-cover bg-center shadow-lg brightness-125 contrast-105"
              style={{ backgroundImage: `url('${item.img}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <span className="relative z-10 text-[10px] uppercase tracking-wider text-[#C89B7B] font-bold">
                {item.title}
              </span>
            </div>
          ))}
        </div>

      </div>

      <div className="hidden md:flex relative w-full bg-transparent rounded-3xl overflow-hidden flex-col p-6 md:p-12">
        
        {/* Top Small Tagline */}
        <div className="flex items-center justify-between pb-4">
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xs uppercase tracking-[0.2em] text-[#C89B7B] font-medium flex items-center gap-2"
          >
            <Sparkles size={14} />
            Capturing emotions, preserving timeless stories.
          </motion.p>

          <motion.span 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xs text-[#C89B7B] uppercase tracking-widest hidden md:inline-block"
          >
            Established Excellence
          </motion.span>
        </div>

        {/* Main Section Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Masonry Grid */}
          <div className="lg:col-span-5 space-y-6 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full pt-2"
            >
              <Masonry
                items={masonryItems}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
              />
            </motion.div>
          </div>

          {/* Right Column: Bento Grid with High Brightness Images */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Card 1: Baby Shower */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="md:col-span-5 relative h-[550px] mt-10 rounded-3xl overflow-hidden flex flex-col justify-between p-6 bg-cover bg-center group shadow-2xl brightness-125 contrast-105" 
              style={{ backgroundImage: `url('https://tse1.mm.bing.net/th/id/OIP.7KOAjvvwdKBacnZ_3UlLbQHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3')` }}
            >
              <div className="absolute inset-0 pointer-events-none" />
              <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-[#C89B7B] font-bold drop-shadow">Baby shower</span>
            </motion.div>

            {/* Right Stacked Column Cards */}
            <div className="md:col-span-7 flex flex-col gap-4">
              
              {/* Card 2: Community */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative h-[195px] rounded-3xl overflow-hidden flex flex-col justify-between p-6 bg-cover bg-center group shadow-2xl brightness-125 contrast-105" 
                style={{ backgroundImage: `url('https://static2.bigstockphoto.com/2/3/3/large1500/332228464.jpg')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
                <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-[#C89B7B] font-bold drop-shadow">Community</span>
              </motion.div>

              {/* Card 3: Pre Wedding */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative h-[195px] rounded-3xl overflow-hidden flex flex-col justify-between p-6 bg-cover bg-center group shadow-2xl brightness-125 contrast-105" 
                style={{ backgroundImage: `url('https://dstudios.in/wp-content/uploads/2024/06/pre-wedding-adarsh-asihwarya-shoot-768x1152.jpeg')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
                <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-[#C89B7B] font-bold drop-shadow">Pre Wedding</span>
              </motion.div>

              {/* Bottom Split Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Card 4: Haldi & Mehendi */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="relative h-[205px] rounded-3xl overflow-hidden flex flex-col justify-between p-5 bg-cover bg-center group shadow-2xl brightness-125 contrast-105" 
                  style={{ backgroundImage: `url('https://images.filmibeat.com/ph-big/2018/04/meghana-raj-mehendi-ceremony-photos_152480123700.jpg')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
                  <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-[#C89B7B] font-bold drop-shadow">Haldi & Mehendi</span>
                </motion.div>

                {/* Card 5: Social Moments */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="relative h-[205px] rounded-3xl overflow-hidden flex flex-col justify-between p-5 bg-cover bg-center group shadow-2xl brightness-125 contrast-105" 
                  style={{ backgroundImage: `url('https://i.pinimg.com/736x/fd/a7/a2/fda7a255971143599a0124b3a56489c9.jpg')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />
                  <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-[#C89B7B] font-bold drop-shadow">Social Moments</span>
                </motion.div>

              </div>

            </div>

          </div>

        </div>
      </div>

      <PhotographyServicesSection />
    </main>
  );
}