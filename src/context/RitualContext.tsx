'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface RitualImage {
  id: number;
  src: string;
  alt: string;
  span: string;
}

interface RitualContextType {
  ritualImages: RitualImage[];
  updateRitualImage: (index: number, file: File) => void;
  resetRitualImage: (index: number) => void;
}

const initialRitualImages: RitualImage[] = [
  {
    id: 1,
    src: "https://tse2.mm.bing.net/th/id/OIP.YjFWzlEVloMZmzSOEqt0ZwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Main Ritual Gathering",
    span: "col-span-2 row-span-2 h-72 sm:h-[420px]",
  },
  {
    id: 2,
    src: "https://i.pinimg.com/474x/02/2b/42/022b424c9b20d97874636c425e8522f1.jpg",
    alt: "Sacred Offerings",
    span: "h-34 sm:h-[200px]",
  },
  {
    id: 3,
    src: "https://tse4.mm.bing.net/th/id/OIP.LEunDPG7H0n_yd5qHHuVEwHaE8?r=0&w=1200&h=800&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Family Moments",
    span: "h-34 sm:h-[200px]",
  },
  {
    id: 4,
    src: "https://2.bp.blogspot.com/-nRCTljrW3RU/VoZPRq9iiuI/AAAAAAAAPe4/nrGh29qO17Q/s1600/FB_IMG_1451642522139.jpg",
    alt: "Traditional Rituals",
    span: "h-34 sm:h-[200px]",
  },
  {
    id: 5,
    src: "https://www.makemytraveling.com/Images/1/KokilambalThirukameshwara-97c55.jpeg",
    alt: "Ceremony Blessings",
    span: "h-34 sm:h-[200px]",
  },
];

const RitualContext = createContext<RitualContextType | undefined>(undefined);

export function RitualProvider({ children }: { children: React.ReactNode }) {
  const [ritualImages, setRitualImages] = useState<RitualImage[]>(initialRitualImages);

  // 1. Safe Hydration Load on Mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('singlekey_ritual_gallery');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 5) {
          setRitualImages(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse ritual gallery from localStorage", e);
      localStorage.removeItem('singlekey_ritual_gallery');
    }
  }, []);

  // 2. Real-time Tab/Window Sync Listener
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('singlekey_ritual_gallery');
        if (saved && saved !== 'undefined' && saved !== 'null') {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 5) {
            setRitualImages(parsed);
          }
        }
      } catch (e) {
        console.error("Storage event parse error:", e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('ritual_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('ritual_updated', handleStorageChange);
    };
  }, []);

  // 3. Update Image Handler (Base64 conversion)
  const updateRitualImage = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setRitualImages((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], src: base64Image };
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('singlekey_ritual_gallery', JSON.stringify(updated));
          window.dispatchEvent(new Event('ritual_updated'));
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  // 4. Reset Image Handler
  const resetRitualImage = (index: number) => {
    setRitualImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], src: initialRitualImages[index].src };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('singlekey_ritual_gallery', JSON.stringify(updated));
        window.dispatchEvent(new Event('ritual_updated'));
      }
      return updated;
    });
  };

  return (
    <RitualContext.Provider value={{ ritualImages, updateRitualImage, resetRitualImage }}>
      {children}
    </RitualContext.Provider>
  );
}

export function useRitual() {
  const context = useContext(RitualContext);
  if (!context) throw new Error('useRitual must be used within a RitualProvider');
  return context;
}