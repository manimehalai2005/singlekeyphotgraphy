'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface EarPiercingImage {
  id: string;
  src: string;
  alt: string;
  height: string;
  type: string;
}

interface EarPiercingContextType {
  earPiercingImages: EarPiercingImage[];
  updateEarPiercingImage: (index: number, file: File) => void;
  resetEarPiercingImage: (index: number) => void;
}

const initialImages: EarPiercingImage[] = [
  {
    id: "img-1",
    src: "https://i.ytimg.com/vi/xK2iOo8yMfw/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgTShDMA8=&rs=AOn4CLDhFI-iLQnxzG_0cyYa7lEnspNfPA",
    alt: "Traditional Ear Piercing Vibe",
    height: "h-[280px]",
    type: "image",
  },
  {
    id: "img-2",
    src: "https://i.ytimg.com/vi/iOMEXwD-QGY/hqdefault.jpg",
    alt: "Sacred Ritual Details",
    height: "h-[300px]",
    type: "image",
  },
  {
    id: "img-3",
    src: "https://i.ytimg.com/vi/l_nzcSqq-WE/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgXihOMA8=&rs=AOn4CLBfzz1Lzi7yUMQbchpkI5Meuxc_3Q",
    alt: "Baby Portrait Moments",
    height: "h-[200px]",
    type: "image",
  },
  {
    id: "img-4",
    src: "https://tse3.mm.bing.net/th/id/OIP.aOvResg9g6E3UeC2M1MDtgHaE8?r=0&w=1024&h=683&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Celebration Ambiance",
    height: "h-[240px]",
    type: "image",
  },
];

const EarPiercingContext = createContext<EarPiercingContextType | undefined>(undefined);

export function EarPiercingProvider({ children }: { children: React.ReactNode }) {
  const [earPiercingImages, setEarPiercingImages] = useState<EarPiercingImage[]>(initialImages);

  // 1. Safe Hydration Load on Mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('singlekey_earpiercing_gallery');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 4) {
          setEarPiercingImages(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse ear piercing gallery from localStorage", e);
      localStorage.removeItem('singlekey_earpiercing_gallery');
    }
  }, []);

  // 2. Real-time Cross-Tab/Page Sync Listener
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('singlekey_earpiercing_gallery');
        if (saved && saved !== 'undefined' && saved !== 'null') {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 4) {
            setEarPiercingImages(parsed);
          }
        }
      } catch (e) {
        console.error("Storage event parse error:", e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('earpiercing_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('earpiercing_updated', handleStorageChange);
    };
  }, []);

  // 3. Update Image Handler (Base64 conversion)
  const updateEarPiercingImage = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setEarPiercingImages((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], src: base64Image };
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('singlekey_earpiercing_gallery', JSON.stringify(updated));
          window.dispatchEvent(new Event('earpiercing_updated'));
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  // 4. Reset Image Handler
  const resetEarPiercingImage = (index: number) => {
    setEarPiercingImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], src: initialImages[index].src };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('singlekey_earpiercing_gallery', JSON.stringify(updated));
        window.dispatchEvent(new Event('earpiercing_updated'));
      }
      return updated;
    });
  };

  return (
    <EarPiercingContext.Provider value={{ earPiercingImages, updateEarPiercingImage, resetEarPiercingImage }}>
      {children}
    </EarPiercingContext.Provider>
  );
}

export function useEarPiercing() {
  const context = useContext(EarPiercingContext);
  if (!context) throw new Error('useEarPiercing must be used within an EarPiercingProvider');
  return context;
}