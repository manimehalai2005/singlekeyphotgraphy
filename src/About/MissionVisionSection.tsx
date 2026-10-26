'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function MissionVisionSection() {
  return (
    <section className="w-full bg-transparent text-[#C89b7b] py-14 px-6 lg:px-16 font-sans overflow-hidden">
      <div className="max-w-8xl mx-auto space-y-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto space-y-2"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#C89b7b]">
            <span className="italic font-normal text-[#C89b7b]">
              Mission & Vision
            </span>
          </h2>
          <p className="text-[#C89b7b] text-sm font-sans italic leading-relaxed">
            Crafting visual artistic excellence, genuine emotion, and timeless storytelling.
          </p>
        </motion.div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-8 lg:p-10 rounded-[32px] overflow-hidden group hover:border-[#C89b7b]/50 transition-colors shadow-2xl"
          >
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 text-[#C89b7b] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
                Our Mission
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#C89b7b] tracking-wide">
                Preserving Genuine{" "}
                <span className="italic text-[#C89b7b]">
                  Emotions
                </span>
              </h3>
              
              <p className="text-[#C89b7b] text-sm font-light leading-relaxed">
                At SingleKey Photography, our mission is to freeze fleeting moments in time with authenticity and artistic excellence. We strive to craft visual narratives that capture the true soul and unscripted joy of every celebration—whether it is a wedding, birthday, or milestone event—ensuring your cherished memories remain vibrant and alive for a lifetime.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-8 lg:p-10 rounded-[32px] overflow-hidden group hover:border-[#C89b7b]/50 transition-colors shadow-2xl"
          >
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 text-[#C89b7b] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
                Our Vision
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#C89b7b] tracking-wide">
                Redefining{" "}
                <span className="italic text-[#C89b7b]">
                  Visual Storytelling
                </span>
              </h3>
              
              <p className="text-[#C89b7b] text-sm font-sans italic leading-relaxed">
                To stand as a premier photography platform known for innovation, elegance, and deep emotional resonance. We aim to continually elevate the standards of event and lifestyle documentation through cutting-edge framing, creative depth, and personalized client experiences that set new benchmarks in the industry.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}