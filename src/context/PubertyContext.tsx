'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PubertyCard {
  id: string;
  src: string;
  rotation: string;
}

interface PubertyContextType {
  pubertyCards: PubertyCard[];
  updatePubertyCard: (index: number, file: File) => void;
  resetPubertyCard: (index: number) => void;
}

const initialCards: PubertyCard[] = [
  {
    id: "card-1",
    src: "https://tse4.mm.bing.net/th/id/OIP.SzqVBxGS4vV0MLtRsTbmGgHaNK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    rotation: "-rotate-2",
  },
  {
    id: "card-2",
    src: "https://live.staticflickr.com/1177/1397474014_c59638a94f_b.jpg",
    rotation: "rotate-1",
  },
  {
    id: "card-3",
    src: "https://camouflageclicks.com/assets/uploads/blog/7197561.jpg",
    rotation: "-rotate-1",
  },
  {
    id: "card-4",
    src: "https://i.ytimg.com/vi/8nmUL2QdgRw/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLCWYtRtxuxlI0DvC90L9blAhTQ4qA&usqp=CCk",
    rotation: "rotate-2",
  },
  {
    id: "card-5",
    src: "https://i.pinimg.com/originals/c2/76/cf/c276cf80afd5fdee948cde21b18d8a23.jpg",
    rotation: "rotate-1",
  },
  {
    id: "card-6",
    src: "https://tse3.mm.bing.net/th/id/OIP.Fwpj05vs2Fj7kh4EIdl2_AHaEK?r=0&pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3",
    rotation: "-rotate-2",
  },
  {
    id: "card-7",
    src: "https://media.istockphoto.com/id/2168209620/photo/fun-moments-between-bride-and-her-aunty-at-the-haldi-ceremony.jpg?s=612x612&w=0&k=20&c=JBRtxT8d8FOffhNL5By4-3OdYezvO8GhTjrednKYfeE=",
    rotation: "rotate-2",
  },
  {
    id: "card-8",
    src: "https://tse2.mm.bing.net/th/id/OIP.1EqL1ZfOqae8_QC5byuyigHaFM?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    rotation: "-rotate-1",
  },
];

const PubertyContext = createContext<PubertyContextType | undefined>(undefined);

export function PubertyProvider({ children }: { children: React.ReactNode }) {
  const [pubertyCards, setPubertyCards] = useState<PubertyCard[]>(initialCards);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('singlekey_puberty_gallery');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 8) {
          setPubertyCards(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse puberty gallery from localStorage", e);
      localStorage.removeItem('singlekey_puberty_gallery');
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('singlekey_puberty_gallery');
        if (saved && saved !== 'undefined' && saved !== 'null') {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 8) {
            setPubertyCards(parsed);
          }
        }
      } catch (e) {
        console.error("Storage event parse error:", e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('puberty_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('puberty_updated', handleStorageChange);
    };
  }, []);

  const updatePubertyCard = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setPubertyCards((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], src: base64Image };
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('singlekey_puberty_gallery', JSON.stringify(updated));
          window.dispatchEvent(new Event('puberty_updated'));
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const resetPubertyCard = (index: number) => {
    setPubertyCards((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], src: initialCards[index].src };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('singlekey_puberty_gallery', JSON.stringify(updated));
        window.dispatchEvent(new Event('puberty_updated'));
      }
      return updated;
    });
  };

  return (
    <PubertyContext.Provider value={{ pubertyCards, updatePubertyCard, resetPubertyCard }}>
      {children}
    </PubertyContext.Provider>
  );
}

export function usePuberty() {
  const context = useContext(PubertyContext);
  if (!context) throw new Error('usePuberty must be used within a PubertyProvider');
  return context;
}