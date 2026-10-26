'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface EngagementImage {
  id: number;
  src: string;
  alt: string;
}

interface EngagementContextType {
  engagementImages: EngagementImage[];
  updateEngagementImage: (index: number, file: File) => void;
  resetEngagementImage: (index: number) => void;
}

const initialEngagementImages: EngagementImage[] = [
  { id: 1, src: "https://i.pinimg.com/originals/19/e6/02/19e60291fa780b500ba72db76976da76.jpg", alt: "Ring exchange ceremony" },
  { id: 2, src: "https://yt3.googleusercontent.com/NPClHi9pCFowaawgGJ3563S5m0YRBpF8f3rIPKxd3_58gyN6gPKmXFzlzsNjGuGBIAFMuUWLVw=s900-c-k-c0x00ffffff-no-rj", alt: "Engagement ring close up" },
  { id: 3, src: "https://www.shubhlaxmifilms.com/wp-content/uploads/2022/11/IMG_3486-01-scaled-1.webp", alt: "Couple laughing together" },
  { id: 4, src: "https://cdn.pixabay.com/photo/2021/09/03/06/10/wedding-6595092_640.jpg", alt: "Engagement celebration details" },
  { id: 5, src: "https://tse1.explicit.bing.net/th/id/OIP.nNDORWpB_IaV_Sp5RfoY8gAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Romantic couple moment" },
  { id: 6, src: "https://featheredarrowstudio.com/wp-content/uploads/2024/01/JANELLEHENRY_0765.jpg", alt: "Couple portrait" },
  { id: 7, src: "https://www.redeyecollection.com/wp-content/uploads/2020/02/SD-534.jpg", alt: "Celebration toast" },
];

const EngagementContext = createContext<EngagementContextType | undefined>(undefined);

export function EngagementProvider({ children }: { children: React.ReactNode }) {
  const [engagementImages, setEngagementImages] = useState<EngagementImage[]>(initialEngagementImages);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('singlekey_engagement_gallery');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 7) {
          setEngagementImages(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse engagement gallery from localStorage", e);
      localStorage.removeItem('singlekey_engagement_gallery');
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('singlekey_engagement_gallery');
        if (saved && saved !== 'undefined' && saved !== 'null') {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 7) {
            setEngagementImages(parsed);
          }
        }
      } catch (e) {
        console.error("Storage event parse error:", e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('engagement_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('engagement_updated', handleStorageChange);
    };
  }, []);

  const updateEngagementImage = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setEngagementImages((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], src: base64Image };
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('singlekey_engagement_gallery', JSON.stringify(updated));
          window.dispatchEvent(new Event('engagement_updated'));
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const resetEngagementImage = (index: number) => {
    setEngagementImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], src: initialEngagementImages[index].src };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('singlekey_engagement_gallery', JSON.stringify(updated));
        window.dispatchEvent(new Event('engagement_updated'));
      }
      return updated;
    });
  };

  return (
    <EngagementContext.Provider value={{ engagementImages, updateEngagementImage, resetEngagementImage }}>
      {children}
    </EngagementContext.Provider>
  );
}

export function useEngagement() {
  const context = useContext(EngagementContext);
  if (!context) throw new Error('useEngagement must be used within an EngagementProvider');
  return context;
}