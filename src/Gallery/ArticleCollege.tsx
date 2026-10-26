'use client'; 

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const initialSlots = [
  { id: 'slot-1', aspect: "aspect-[3/4]" },
  { id: 'slot-2', aspect: "aspect-[4/3]" },
  { id: 'slot-3', aspect: "aspect-[4/3]" },
  { id: 'slot-4', aspect: "aspect-[4/3]" },
  { id: 'slot-5', aspect: "aspect-[4/3]" },
  { id: 'slot-6', aspect: "aspect-[4/3]" },
  { id: 'slot-7', aspect: "aspect-[3/5]" },
  { id: 'slot-8', aspect: "aspect-[4/3]" },
  { id: 'slot-9', aspect: "aspect-[4/3]" },
  { id: 'slot-10', aspect: "aspect-square" },
  { id: 'slot-11', aspect: "aspect-[4/3]" }
];

const initialImages = [
  { uniqueId: 'img-1', src: "https://images.pexels.com/photos/33786311/pexels-photo-33786311/free-photo-of-vibrant-indian-pre-wedding-ceremony-celebration.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { uniqueId: 'img-2', src: "https://tse1.mm.bing.net/th/id/OIP.6w5iCkvz1J4zY1zyyFh3zQHaLG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { uniqueId: 'img-3', src: "https://tse3.mm.bing.net/th/id/OIP.x3JOq7EQBkSIMPXKN7nvXwHaE7?r=0&w=736&h=490&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { uniqueId: 'img-4', src: "https://i.pinimg.com/originals/6e/3d/2e/6e3d2e22dc3ac9d79dbf50654d679778.jpg" },
  { uniqueId: 'img-5', src: "https://miro.medium.com/v2/resize:fit:1400/1*QCUh5DjZI-t1BrP_qDDFTQ.jpeg" },
  { uniqueId: 'img-6', src: "https://live.staticflickr.com/1177/1397474014_c59638a94f_b.jpg" },
  { uniqueId: 'img-7', src: "https://i.pinimg.com/736x/39/c5/a0/39c5a07f393ab7055c99b4275247fac4.jpg" },
  { uniqueId: 'img-8', src: "https://www.caleidoscope.in/wp-content/uploads/2021/06/Traditional-Dresses-of-Kerala-696x477.jpg" },
  { uniqueId: 'img-9', src: "https://tse4.mm.bing.net/th/id/OIP.PfzUn8oWF4_vLyC40i36LwHaE8?r=0&w=3000&h=2000&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { uniqueId: 'img-10', src: "https://ashirvadcreations.com/wp-content/uploads/2024/01/postwedding-bottom1.jpg" },
  { uniqueId: 'img-11', src: "https://i.pinimg.com/736x/a3/e2/ec/a3e2ecda2a077c40cbfd2b3c0846f7cf.jpg" }
];

export default function ArtisticCollage() {
  const [images, setImages] = useState(initialImages);

  const shuffleArray = (array: typeof initialImages) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImages((prev) => shuffleArray(prev));
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  const currentCollage = initialSlots.map((slot, index) => ({
    ...slot,
    ...images[index]
  }));

  const col1 = currentCollage.slice(0, 4);
  const col2 = currentCollage.slice(4, 7);
  const col3 = currentCollage.slice(7, 11);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-3 sm:p-6 md:p-12">
    
      {/* Responsive Grid: grid-cols-2 for mobile screens, md:grid-cols-3 for tablets/desktops */}
      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 items-start">
        
        {/* Column 1 */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {col1.map((item) => (
            <motion.div 
              key={item.uniqueId} 
              layout 
              transition={{ duration: 0.8, type: "spring", stiffness: 300, damping: 25 }}
              className={`w-full ${item.aspect} overflow-hidden shadow-md bg-gray-900 rounded-lg`}
            >
              <img 
                src={item.src} 
                alt="Art Collage" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3 sm:gap-4 md:mt-12">
          {col2.map((item) => (
            <motion.div 
              key={item.uniqueId} 
              layout 
              transition={{ duration: 0.8, type: "spring", stiffness: 300, damping: 25 }}
              className={`w-full ${item.aspect} overflow-hidden shadow-md bg-gray-900 rounded-lg`}
            >
              <img 
                src={item.src} 
                alt="Art Collage Col2" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>

        {/* Column 3 - Automatically spans full width or flows correctly on 2-column mobile screens */}
        <div className="flex flex-col gap-3 sm:gap-4 md:mt-6 col-span-2 md:col-span-1">
          {col3.map((item) => (
            <motion.div 
              key={item.uniqueId} 
              layout 
              transition={{ duration: 0.8, type: "spring", stiffness: 300, damping: 25 }}
              className={`w-full ${item.aspect} overflow-hidden shadow-md bg-gray-900 rounded-lg`}
            >
              <img 
                src={item.src} 
                alt="Art Collage Col3" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}