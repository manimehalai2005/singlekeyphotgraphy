'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface HouseWarmingImages {
  banner: string;
  image1: string;
  image2: string;
  image3: string;
}

interface HouseWarmingContextType {
  houseWarmingImages: HouseWarmingImages;
  updateHouseWarmingImage: (key: keyof HouseWarmingImages, file: File) => void;
  resetHouseWarmingImage: (key: keyof HouseWarmingImages) => void;
}

const initialHouseWarmingImages: HouseWarmingImages = {
  banner: "https://i.pinimg.com/736x/84/69/52/846952f4b8f38fe306bb8a555e17674c.jpg",
  image1: "https://d3e1m60ptf1oym.cloudfront.net/445f7c6b-2d88-471a-bb10-39f7e89e18b8/08_SFE_110217_239_xgaplus.jpg",
  image2: "https://tse1.mm.bing.net/th/id/OIP.LWqO_LqE9RWAtZUAhP5izwHaLG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  image3: "https://i.pinimg.com/originals/0e/25/67/0e256719e8583d15183eac0c956ae541.jpg",
};

const HouseWarmingContext = createContext<HouseWarmingContextType | undefined>(undefined);

export function HouseWarmingProvider({ children }: { children: React.ReactNode }) {
  const [houseWarmingImages, setHouseWarmingImages] = useState<HouseWarmingImages>(initialHouseWarmingImages);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('singlekey_housewarming_gallery');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setHouseWarmingImages(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse house warming gallery from localStorage", e);
      localStorage.removeItem('singlekey_housewarming_gallery');
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('singlekey_housewarming_gallery');
        if (saved && saved !== 'undefined' && saved !== 'null') {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            setHouseWarmingImages(parsed);
          }
        }
      } catch (e) {
        console.error("Storage event parse error:", e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('housewarming_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('housewarming_updated', handleStorageChange);
    };
  }, []);

  const updateHouseWarmingImage = (key: keyof HouseWarmingImages, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setHouseWarmingImages((prev) => {
        const updated = { ...prev, [key]: base64Image };
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('singlekey_housewarming_gallery', JSON.stringify(updated));
          window.dispatchEvent(new Event('housewarming_updated'));
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const resetHouseWarmingImage = (key: keyof HouseWarmingImages) => {
    setHouseWarmingImages((prev) => {
      const updated = { ...prev, [key]: initialHouseWarmingImages[key] };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('singlekey_housewarming_gallery', JSON.stringify(updated));
        window.dispatchEvent(new Event('housewarming_updated'));
      }
      return updated;
    });
  };

  return (
    <HouseWarmingContext.Provider value={{ houseWarmingImages, updateHouseWarmingImage, resetHouseWarmingImage }}>
      {children}
    </HouseWarmingContext.Provider>
  );
}

export function useHouseWarming() {
  const context = useContext(HouseWarmingContext);
  if (!context) throw new Error('useHouseWarming must be used within a HouseWarmingProvider');
  return context;
}