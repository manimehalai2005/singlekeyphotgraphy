"use client"
import React, { useState } from 'react';
import { Camera, Edit3, Download, Sparkles, Globe, Phone, ArrowUpRight } from 'lucide-react';
import DepthCarousel from '../About/secondsection';
import FeaturedStoriesSection from '../Intro/FeaturesSection';
import MyComponent from '../About/BoounceCard';

export default function WeddingPlannerTemplate() {
      const [isHovered, setIsHovered] = useState(false);

  // 10 different cards with calculated fan angles and translations
  const cards = [
    {
      title: "Card 1",
      description: "First card in the deck.",
      image:
        "https://assets.zyrosite.com/dOqyXGzr7kf8awpe/save-the-date-photography-ooty-06-1-MCYzEMIvTCOBupvn.webp",
      rotation: "-rotate-[35deg] -translate-x-[140px]",
    },
    {
      title: "Card 2",
      description: "Second card in the deck.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTKzIV6gNiRZTWxriQAx5T7p-rqXbK8I8ypOUcpO8BKCIW5bvkHDw1Ygc&s=10",
      rotation: "-rotate-[27deg] -translate-x-[110px]",
    },
    {
      title: "Card 3",
      description: "Third card in the deck.",
      image:
        "https://assets.zyrosite.com/dOqyXGzr7kf8awpe/save-the-date-photography-ooty-06-1-MCYzEMIvTCOBupvn.webp",
      rotation: "-rotate-[19deg] -translate-x-[80px]",
    },
    {
      title: "Card 4",
      description: "Fourth card in the deck.",
      image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTKzIV6gNiRZTWxriQAx5T7p-rqXbK8I8ypOUcpO8BKCIW5bvkHDw1Ygc&s=10",
      rotation: "-rotate-[10deg] -translate-x-[40px]",
    },
    {
      title: "Card 5",
      description: "Fifth card in the deck.",
      image:
        "https://i.etsystatic.com/43529110/r/il/f003cf/7108098382/il_570xN.7108098382_lb8d.jpg",
      rotation: "-rotate-[3deg] -translate-x-[10px]",
    },
    {
      title: "Card 6",
      description: "Sixth card in the deck.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9kGoB38Cc1WphF7p84eidBbQUDdUZ1tZUQ-0uw2idFoofqoEDeYwhuM8&s=10",
      rotation: "rotate-[4deg] translate-x-[20px]",
    },
    {
      title: "Card 7",
      description: "Seventh card in the deck.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrr8Dkmxff_ba2G9hCSdQGvhvaX2-Wcc-I3K7tIe0mig&s=10",
      rotation: "rotate-[12deg] translate-x-[60px]",
    },
    {
      title: "Card 8",
      description: "Eighth card in the deck.",
      image:
        "https://images.prismic.io/rigbiswas/aU6C7HNYClf9opbj_wedding-couple-poses-for-timeless-photo.webp?auto=format,compress",
      rotation: "rotate-[20deg] translate-x-[100px]",
    },
    {
      title: "Card 9",
      description: "Ninth card in the deck.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVpVjU_xn2dkyIAL77HvE-TDnbbjHenWAYi7WXapwNJg&s=10",
      rotation: "rotate-[28deg] translate-x-[130px]",
    },
    {
      title: "Card 10",
      description: "Tenth card in the deck.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTbbrwdL319lLtqzSBgbaevjjm-5KQkC4kPjvyvptOAvWJ9TYDLh3qwydR&s=10",
      rotation: "rotate-[36deg] translate-x-[160px]",
    },
  ];
  const [studioName, setStudioName] = useState("Collab Studio");
  const [mainTitle, setMainTitle] = useState("WEDDING PLANNER");
  const [isEditing, setIsEditing] = useState(false);

  const [photos, setPhotos] = useState({
    topLeft: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    topRight: "https://images.unsplash.com/photo-1594552072238-b8a3da72ae8c?auto=format&fit=crop&q=80&w=800",
    bottomLeft: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    bottomRight: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800"
  });

  const handleImageChange = (position:any) => {
    const newUrl = prompt("Enter new image URL:");
    if (newUrl) {
      setPhotos(prev => ({ ...prev, [position]: newUrl }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#3a2e2b] p-4 sm:p-8 flex flex-col items-center justify-center font-sans">
      
      {/* Main Template Container */}
      <div className="w-full  p-6 sm:p-10 relative flex flex-col md:flex-row gap-6 items-center">
        
        {/* Left Side: Rotated Vertical Brand & Title Section */}
        <div className="flex md:flex-col items-center justify-center text-center md:w-1/4 py-4 border-b md:border-b-0 md:border-r border-[#e6ded1] pr-0 md:pr-6 w-full">
          <div className="text-[10px] tracking-widest uppercase text-white mb-4 font-semibold">
            {studioName}
          </div>
          
          {/* Vertical Title for Desktop, Horizontal for Mobile */}
          <div className="group cursor-pointer relative">
            {isEditing ? (
              <input 
                type="text" 
                value={mainTitle} 
                onChange={(e) => setMainTitle(e.target.value)}
                onBlur={() => setIsEditing(false)}
                autoFocus
                className="bg-white text-white font-serif text-xl p-2 rounded text-center outline-none border border-[#8c6d53] w-full"
              />
            ) : (
              <div onClick={() => setIsEditing(true)} className="relative flex items-center justify-center">
                <h2 className="font-serif tracking-[0.25em] text-2xl sm:text-3xl md:text-4xl text-white font-light md:[writing-mode:vertical-lr] md:rotate-180 select-none hover:text-[#8c6d53] transition py-4">
                  {mainTitle}
                </h2>
                <span className="absolute -bottom-6 md:-left-6 md:bottom-auto text-[9px] uppercase tracking-wider text-[#a38a74] opacity-0 group-hover:opacity-100 transition whitespace-nowrap flex items-center gap-0.5">
                  <Edit3 className="w-3 h-3" /> Edit Title
                </span>
              </div>
            )}
          </div>
        </div>

       

          {/* Bottom 2 Photos Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full">

  <div className="flex  flex-col items-center justify-center p-6 bg-black text-gray-900 overflow-hidden">
    
    <div className="text-center space-y-2 ">
      <h1 className="text-3xl font-bold text-white">
        10-Card Deck Spread Effect
      </h1>

      <p className="text-gray-600">
        Hover over the stack below to see all 10 cards fan out.
      </p>
    </div>

    {/* Cards */}
    <div
      className="relative flex items-center justify-center h-96 w-72 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className={`absolute w-56 h-80 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-none transition-all duration-500 ease-out transform origin-bottom ${
            isHovered
              ? card.rotation
              : "rotate-0 translate-x-0"
          }`}
          style={{
            zIndex: isHovered
              ? index
              : cards.length - index,
          }}
        >
          <div className="relative h-44 w-full">
            <img
              src={card.image}
              alt={card.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="p-3 space-y-1 bg-white">
            <h3 className="font-semibold text-base text-gray-900">
              {card.title}
            </h3>

            <p className="text-xs text-gray-500">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Right Side */}
  <div className="flex items-center justify-center min-h-[600px]">
    <MyComponent />
  </div>

</div>

          

         

        </div>

      </div>
  );
}