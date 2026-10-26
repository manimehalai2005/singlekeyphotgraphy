'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Top row images list (Will move Left continuously)
const topRowImages = [
  'https://pestafiesta.com/wp-content/uploads/2021/05/Party-Venue.jpg',
  'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9bca2982139067.5d143f90d55eb.jpg',
  'https://th.bing.com/th/id/R.ffa4aa11aedba1dc9992b07cec69feff?rik=M9aqq%2bM4JD3zlg&riu=http%3a%2f%2fjasmineleephotography.com%2fwp-content%2fuploads%2f2013%2f11%2findian_baby_shower_photography_07.jpg&ehk=yiT2IytavdcRqT%2fIN0bU%2be%2bNnyVUYE%2bMbZ2pNLRcd%2bc%3d&risl=&pid=ImgRaw&r=0',
  'https://5.imimg.com/data5/CW/UF/MJ/GLADMIN-90860557/selection-882-500x500.png',
  'https://tse3.mm.bing.net/th/id/OIP.Tre-c80NPWt_7qeWqFl8-gHaFG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
];

// Bottom row images list (Will move Right continuously)
const bottomRowImages = [
  'https://cdn0.weddingwire.in/article/8737/3_2/960/jpg/27378-indian-wedding-couple-hitched-clicked-cover.jpeg',
  'https://mir-s3-cdn-cf.behance.net/project_modules/disp/bcd6f19083983.560c82d4b28f5.jpg',
  'https://tse3.mm.bing.net/th/id/OIP.QhUqxHns8TV2TbjdsRfJBQHaE8?r=0&w=735&h=490&rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://miro.medium.com/v2/resize:fit:1400/1*QCUh5DjZI-t1BrP_qDDFTQ.jpeg',
  'https://tse3.mm.bing.net/th/id/OIP.Br8Og0aLya7hgv6qMP18ZQHaFL?r=0&w=1024&h=716&rs=1&pid=ImgDetMain&o=7&rm=3',
];

export default function InfinitePhotoSlider() {
  return (
    <section className="relative w-full mx-auto bg-transparent text-white py-12 md:py-20 overflow-hidden flex flex-col justify-center gap-6 md:gap-10">
      
      {/* --- TOP ROW: Moving Left --- */}
      <div className="relative mx-auto w-full overflow-hidden flex">
        <motion.div
          className="flex gap-4 md:gap-6 shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
        >
          {/* Duplicate array for seamless infinite looping */}
          {[...topRowImages, ...topRowImages].map((src, index) => (
            <div
              key={`top-${index}`}
              className="relative w-48 h-32 sm:w-64 sm:h-44 md:w-80 md:h-52 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shrink-0"
            >
              <img
                src={src}
                alt={`Wedding top ${index}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- BOTTOM ROW: Moving Right --- */}
      <div className="relative w-full mx-auto overflow-hidden flex">
        <motion.div
          className="flex gap-4 md:gap-6 shrink-0"
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 28,
          }}
        >
          {/* Duplicate array for seamless infinite looping */}
          {[...bottomRowImages, ...bottomRowImages].map((src, index) => (
            <div
              key={`bottom-${index}`}
              className="relative w-48 h-32 sm:w-64 sm:h-44 md:w-80 md:h-52 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl shrink-0"
            >
              <img
                src={src}
                alt={`Wedding bottom ${index}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}