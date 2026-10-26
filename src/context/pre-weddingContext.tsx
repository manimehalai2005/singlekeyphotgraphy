'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PreWeddingImage {
  id: number;
  src: string;
  alt: string;
}

interface PreWeddingContextType {
  preWeddingImages: PreWeddingImage[];
  updatePreWeddingImage: (index: number, file: File) => void;
  resetPreWeddingImage: (index: number) => void;
}

// Default initial images (Ungaloda original pre-wedding images-a inga potukonga)
const initialPreWeddingImages: PreWeddingImage[] = [
  { id: 1, src: "https://image.wedmegood.com/resized/1000X/uploads/member/661638/1565173084_57313638_2403209236377478_5708667755847221248_o.jpg", alt: "Pre-wedding moment 1" },
  { id: 2, src: "https://5.imimg.com/data5/ANDROID/Default/2022/8/FF/LX/IC/158524229/prod-20220815-131158136609912306463596-jpg-500x500.jpg", alt: "Pre-wedding moment 2" },
  { id: 3, src: "https://i.pinimg.com/originals/81/57/b3/8157b39c1e592d34df1e94f97a0173fc.png", alt: "Pre-wedding moment 3" },
  { id: 4, src: "https://i.pinimg.com/736x/02/44/7c/02447c13cd07fcdb42150a8337ed525d.jpg", alt: "Pre-wedding moment 4" },
];

const PreWeddingContext = createContext<PreWeddingContextType | undefined>(undefined);

export function PreWeddingProvider({ children }: { children: React.ReactNode }) {
  // 1. Initial render hydration fix-kkaga default initialImages-a vechutom
  const [preWeddingImages, setPreWeddingImages] = useState<PreWeddingImage[]>(initialPreWeddingImages);

  // 2. Component mount aanathum localStorage-la irundhu data-a load panrom
  useEffect(() => {
    const saved = localStorage.getItem('singlekey_prewedding_gallery');
    if (saved) {
      try {
        setPreWeddingImages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse pre-wedding gallery from localStorage", e);
      }
    }
  }, []);

  // 3. Real-time tab/page sync: Listen for custom events or storage updates
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('singlekey_prewedding_gallery');
      if (saved) {
        try {
          setPreWeddingImages(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('prewedding_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('prewedding_updated', handleStorageChange);
    };
  }, []);

  // 4. Update image & convert to Base64 to store in localStorage
  const updatePreWeddingImage = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setPreWeddingImages((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], src: base64Image };
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('singlekey_prewedding_gallery', JSON.stringify(updated));
          window.dispatchEvent(new Event('prewedding_updated')); // Instant cross-page sync!
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  // 5. Reset image back to default
  const resetPreWeddingImage = (index: number) => {
    setPreWeddingImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], src: initialPreWeddingImages[index].src };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('singlekey_prewedding_gallery', JSON.stringify(updated));
        window.dispatchEvent(new Event('prewedding_updated'));
      }
      return updated;
    });
  };

  return (
    <PreWeddingContext.Provider value={{ preWeddingImages, updatePreWeddingImage, resetPreWeddingImage }}>
      {children}
    </PreWeddingContext.Provider>
  );
}

// Custom hook to use pre-wedding context safely
export function usePreWedding() {
  const context = useContext(PreWeddingContext);
  if (!context) throw new Error('usePreWedding must be used within a PreWeddingProvider');
  return context;
}