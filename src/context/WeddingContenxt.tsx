'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WeddingImage {
  id: number;
  src: string;
  alt: string;
}

interface WeddingContextType {
  weddingImages: WeddingImage[];
  updateWeddingImage: (index: number, file: File) => void;
  resetWeddingImage: (index: number) => void;
}

const initialWeddingImages: WeddingImage[] = [
  { id: 1, src: "https://www.atlhea.in/wp-content/uploads/2020/11/ATLHEA-87.jpg", alt: "Bride and groom portrait" },
  { id: 2, src: "https://images-pw.pixieset.com/elementfield/36171942/044-6bd6664e.JPG", alt: "Couple embracing" },
  { id: 3, src: "https://www.weddingsutra.com/images/wedding-images/entertaining/tamil-traditional-wedding/tamil-wedding-ritual-29.webp", alt: "Wedding romantic moment" },
];

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export function WeddingProvider({ children }: { children: React.ReactNode }) {
  // 1. Always start with initialImages to ensure Server and Client initial render match (Fixes Hydration Error!)
  const [weddingImages, setWeddingImages] = useState<WeddingImage[]>(initialWeddingImages);

  // 2. Load from localStorage safely after component mounts on client side
  useEffect(() => {
    const saved = localStorage.getItem('singlekey_wedding_gallery');
    if (saved) {
      try {
        setWeddingImages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse wedding gallery from localStorage", e);
      }
    }
  }, []);

  // 3. Listen for changes from other tabs/pages or custom updates
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('singlekey_wedding_gallery');
      if (saved) {
        try {
          setWeddingImages(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wedding_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wedding_updated', handleStorageChange);
    };
  }, []);

  const updateWeddingImage = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setWeddingImages((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], src: base64Image };
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('singlekey_wedding_gallery', JSON.stringify(updated));
          window.dispatchEvent(new Event('wedding_updated'));
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const resetWeddingImage = (index: number) => {
    setWeddingImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], src: initialWeddingImages[index].src };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('singlekey_wedding_gallery', JSON.stringify(updated));
        window.dispatchEvent(new Event('wedding_updated'));
      }
      return updated;
    });
  };

  return (
    <WeddingContext.Provider value={{ weddingImages, updateWeddingImage, resetWeddingImage }}>
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);
  if (!context) throw new Error('useWedding must be used within a WeddingProvider');
  return context;
}