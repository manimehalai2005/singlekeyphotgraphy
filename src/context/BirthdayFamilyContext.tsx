'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FamilyImage {
  id: number;
  src: string;
  alt: string;
}

interface FamilyContextType {
  familyImages: FamilyImage[];
  updateFamilyImage: (index: number, file: File) => void;
  resetFamilyImage: (index: number) => void;
}

const initialFamilyImages: FamilyImage[] = [
  { id: 1, src: "https://i.pinimg.com/736x/af/5d/d3/af5dd3a99a7b2bc175d52cc9b544987f.jpg", alt: "Family 1" },
  { id: 2, src: "https://i.pinimg.com/736x/af/e0/9d/afe09d61e0109948acae7b386f7599de.jpg", alt: "Family 2" },
  { id: 3, src: "https://www.fotonstudio.in/wp-content/uploads/2021/05/Aarav-9.jpg", alt: "Family 3" },
  { id: 4, src: "https://1.bp.blogspot.com/-1a1iTCFuINQ/YK3Wt9N0BnI/AAAAAAAAvDs/7oK88et7jZ4IZU4CCB4PrsGV17oeK_OKACLcBGAsYHQ/s850/71%2BDSC_8713c.jpg", alt: "Family 4" },
  { id: 5, src: "https://tse1.mm.bing.net/th/id/OIP.wm4kAqNi-FSv2rOfac4f6AHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Family 5" },
  { id: 6, src: "https://i.ytimg.com/vi/L_yv_xBbGaw/maxresdefault.jpg?v=67ac9443", alt: "Family 6" },
  { id: 7, src: "https://tse1.mm.bing.net/th/id/OIP.V_UiPQxbfVkJ445WxoIXHQHaE8?r=0&w=1000&h=667&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Happy multi-generation family" },
  { id: 8, src: "https://i.pinimg.com/736x/0b/8c/26/0b8c26a883abe89e0f15b9e3e58bbd04.jpg", alt: "Family having fun together" },
];

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export function FamilyProvider({ children }: { children: React.ReactNode }) {
  const [familyImages, setFamilyImages] = useState<FamilyImage[]>(initialFamilyImages);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('singlekey_family_gallery');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 8) {
          setFamilyImages(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse family gallery from localStorage", e);
      localStorage.removeItem('singlekey_family_gallery');
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('singlekey_family_gallery');
        if (saved && saved !== 'undefined' && saved !== 'null') {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 8) {
            setFamilyImages(parsed);
          }
        }
      } catch (e) {
        console.error("Storage event parse error:", e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('family_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('family_updated', handleStorageChange);
    };
  }, []);

  const updateFamilyImage = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setFamilyImages((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], src: base64Image };
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('singlekey_family_gallery', JSON.stringify(updated));
          window.dispatchEvent(new Event('family_updated'));
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const resetFamilyImage = (index: number) => {
    setFamilyImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], src: initialFamilyImages[index].src };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('singlekey_family_gallery', JSON.stringify(updated));
        window.dispatchEvent(new Event('family_updated'));
      }
      return updated;
    });
  };

  return (
    <FamilyContext.Provider value={{ familyImages, updateFamilyImage, resetFamilyImage }}>
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const context = useContext(FamilyContext);
  if (!context) throw new Error('useFamily must be used within a FamilyProvider');
  return context;
}