"use client";

import React, { useState, useEffect, useRef } from "react";

// Honeycomb / Hexagonal photo grid items for the Post-Wedding memories showcase
const hexImages = [
  {
    id: "hex-1",
    src: "https://tse4.mm.bing.net/th/id/OIP.REED7Ynu0wp8IbhNszcDkAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Wedding reception ceremony",
  },
  {
    id: "hex-2",
    src: "https://cdn0.weddingwire.in/article/6886/original/1280/jpg/126886-akclicks-weddingphotography.jpeg",
    alt: "First dance as married couple",
  },
  {
    id: "hex-3",
    src: "https://cdn0.weddingwire.in/article/9886/original/960/jpg/126889-akclicks-weddingphotography4.jpeg",
    alt: "Beach sunset moments",
  },
  {
    id: "hex-4",
    src: "https://tse1.mm.bing.net/th/id/OIP.eTk-RySJGyIgPXX1ybK29QHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Ring exchange celebration",
  },
  {
    id: "hex-5",
    src: "https://images.squarespace-cdn.com/content/v1/52ed3507e4b041396187d22b/1636341312774-R1V36399MVLRAF13PGC3/Tamarind+Tree+Wedding+15.jpeg",
    alt: "Couple smiling together",
  },
  {
    id: "hex-6",
    src: "https://tse2.mm.bing.net/th/id/OIP.ydhf8wa-gwlRPhhpNyL8GgHaE8?r=0&w=600&h=400&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Reception party night",
  },
  {
    id: "hex-7",
    src: "https://studioa.amarramesh.com/wp-content/uploads/2019/10/VamshiHarika_Wedding_65.jpg",
    alt: "Grand wedding feast",
  },
  {
    id: "hex-8",
    src: "https://th.bing.com/th/id/R.3f6ea7308b4596eec1b8f5af002b1b2c?rik=WKlfsuzRNm%2bSNg&riu=http%3a%2f%2fwww.emotioninpictures.com%2fwp-content%2fuploads%2f2019%2f04%2findian-tamil-wedding-kuala-lumpur-andy-lim-12.jpg&ehk=lXoVjF5X%2bLcJ4tZM6QLqC5FleLGufd0Du1Iw4M309ys%3d&risl=&pid=ImgRaw&r=0",
    alt: "Candid couple laughs",
  },
  {
    id: "hex-9",
    src: "https://cdn0.weddingwire.in/vendor/4589/3_2/960/jpg/moments-from-heaven-1722407812-3424127365893587669-5024864110_15_214589-172914376769976.jpeg",
    alt: "Romantic outdoor portraits",
  },
  {
    id: "hex-10",
    src: "https://i.pinimg.com/originals/32/e6/45/32e6459d612c1cfdebd03dd8779c733c.jpg",
    alt: "Bridal portrait close-up",
  },
  {
    id: "hex-11",
    src: "https://tse3.mm.bing.net/th/id/OIP.Qo3uENXxOdpb78mRgxQIXAHaEx?r=0&w=1024&h=660&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Celebration fireworks",
  },
  {
    id: "hex-12",
    src: "https://tse4.mm.bing.net/th/id/OIP.OGzBaR61tZGLlE5EOkge0wHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-13",
    src: "https://crystallinestudio.com/image_gallery/thumbs/Crystalline-photography-4348.jpg",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-14",
    src: "https://tse1.mm.bing.net/th/id/OIP.mUA7tSnDNYDnhhOvToMSEQHaHa?r=0&w=1365&h=1365&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-15",
    src: "https://i.pinimg.com/736x/da/8c/ec/da8cec9d55872bfe79cf2458ca2f35b3.jpg",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-15",
    src: "https://tse3.mm.bing.net/th/id/OIP._CGULKrGgDxA7zdCstfKEgHaE8?r=0&pid=ImgDet&w=474&h=316&rs=1&o=7&rm=3",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-16",
    src: "https://tse1.mm.bing.net/th/id/OIP.3QiM55bUZmcxKe_IzN07bQHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Lifetime journey begins",
  },
   {
    id: "hex-17",
    src: "https://tse2.mm.bing.net/th/id/OIP.3z0GPyE76IBK9h4_dFaD9wHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Lifetime journey begins",
  }
];

export default function WeddingHexagonSaveTheDate() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-transparent text-white py-16 px-6 lg:px-20 overflow-hidden font-serif flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        {/* Honeycomb Mosaic Cluster with a rich grid layout for multiple photos */}
       <div className="lg:col-span-8 relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center lg:justify-start">
  {/* Flex layout with negative margins to remove extra padding/gaps between hexagons */}
  <div className="flex flex-wrap max-w-2xl py-6 -space-x-3 sm:-space-x-5 -space-y-2">
    {hexImages.map((img, idx) => (
      <div 
        key={`${img.id}-${idx}`}
        className={`relative w-24 h-28 sm:w-32 sm:h-36 overflow-hidden shadow-2xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
        }`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          transitionDelay: `${idx * 0.08}s`,
          // Staggered honeycomb offset without unwanted padding gaps
          marginTop: idx % 2 === 1 ? "1.8rem" : "-0.4rem",
          marginLeft: idx % 4 === 0 ? "0px" : "-0.8rem",
        }}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
      </div>
    ))}
  </div>
</div>

        {/* Right side: Post-Wedding Details & Memories */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right z-10 space-y-6">
          
          {/* Couple Names in Cursive Script */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl uppercase   tracking-wide text-[#c89B7B] ">
              post wedding <span className="text-2xl sm:text-4xl not-italic font-light text-[#c89B7B]"></span>
            </h2>
          </div>

          {/* Post-Wedding Heading & Milestone Date */}
          <div className="pt-6 flex flex-col items-center lg:items-end">
            <h1 className="text-2xl sm:text-2xl font-light tracking-[0.25em] uppercase text-[#c89B7B]">
              Happily Ever After
            </h1>
            <p className="text-xs sm:text-xs font-sans tracking-[0.35em] text-[#c89B7B] mt-3">
              THANK YOU FOR CELEBRATING WITH US
            </p>
          </div>

          <p className="text-[#c89B7B] font-sans text-sm max-w-xs leading-relaxed italic">
            &quot;Our greatest adventure has just begun. Thank you for filling our special day with endless love and joy.&quot;
          </p>


        </div>

      </div>

    </section>
  );
}