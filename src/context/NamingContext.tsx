'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface NamingCard {
  id: string;
  front: string;
  back: string;
  category: string;
  title: string;
  isHero: boolean;
}

interface NamingContextType {
  cards: NamingCard[];
  updateCardImage: (id: string, type: 'front' | 'back', file: File) => void;
  resetCardImages: (id: string) => void;
}

const initialCards: NamingCard[] = [
  {
    id: 'hero',
    front: 'https://i.pinimg.com/originals/2b/5f/62/2b5f6222ae70c8395b6f6d2c5bd88375.jpg',
    back: 'https://i.pinimg.com/736x/e2/74/27/e27427739c56d70200fad938ac8181f1.jpg',
    category: 'Grand Celebration',
    title: 'Naming Day Blessing',
    isHero: true,
  },
  {
    id: 'img1',
    front: 'https://tse4.mm.bing.net/th/id/OIP.lHdStzM68KpFvxBhiS0lHgHaLH?r=0&w=736&h=1104&rs=1&pid=ImgDetMain&o=7&rm=3',
    back: 'https://i.pinimg.com/736x/e7/a2/9a/e7a29a7f4e142b48198c179d1db4f5ca.jpg',
    category: 'Ritual',
    title: 'Cradle Ceremony',
    isHero: false,
  },
  {
    id: 'img2',
    front: 'https://i.pinimg.com/736x/84/f3/16/84f316ce237db8223c26d7dcefdc4595.jpg',
    back: 'https://tse4.mm.bing.net/th/id/OIP.Q2z5euk8JJGO_0-HslCnnAHaFT?r=0&pid=ImgDet&w=474&h=339&rs=1&o=7&rm=3',
    category: 'Feast',
    title: 'Traditional Lunch',
    isHero: false,
  },
  {
    id: 'img3',
    front: 'https://www.tinytoddlersphotography.com/wp-content/uploads/2023/07/Avyaan-Cradle-Ceremony-019.jpg',
    back: 'https://www.sengalleries.com/images/photos_image/11729853389.jpg',
    category: 'Family',
    title: 'Blessings & Joy',
    isHero: false,
  },
  {
    id: 'img4',
    front: 'https://www.tinytoddlersphotography.com/wp-content/uploads/2023/07/Avyaan-Cradle-Ceremony-012.jpg',
    back: 'https://images.unsplash.com/photo-1730130596425-197566414dc4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhbWlseSUyMHRyYWRpdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    category: 'Decor',
    title: 'Floral Setup',
    isHero: false,
  },
];

const NamingContext = createContext<NamingContextType | undefined>(undefined);

export function NamingProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<NamingCard[]>(initialCards);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('singlekey_naming_ceremony');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 5) {
          setCards(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse naming gallery from localStorage", e);
      localStorage.removeItem('singlekey_naming_ceremony');
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('singlekey_naming_ceremony');
        if (saved && saved !== 'undefined' && saved !== 'null') {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 5) {
            setCards(parsed);
          }
        }
      } catch (e) {
        console.error("Storage event parse error:", e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('naming_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('naming_updated', handleStorageChange);
    };
  }, []);

  const updateCardImage = (id: string, type: 'front' | 'back', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setCards((prev) => {
        const updated = prev.map((card) => {
          if (card.id === id) {
            return { ...card, [type]: base64Image };
          }
          return card;
        });
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('singlekey_naming_ceremony', JSON.stringify(updated));
          window.dispatchEvent(new Event('naming_updated'));
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const resetCardImages = (id: string) => {
    const original = initialCards.find((c) => c.id === id);
    if (!original) return;

    setCards((prev) => {
      const updated = prev.map((card) => {
        if (card.id === id) {
          return { ...card, front: original.front, back: original.back };
        }
        return card;
      });
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('singlekey_naming_ceremony', JSON.stringify(updated));
        window.dispatchEvent(new Event('naming_updated'));
      }
      return updated;
    });
  };

  return (
    <NamingContext.Provider value={{ cards, updateCardImage, resetCardImages }}>
      {children}
    </NamingContext.Provider>
  );
}

export function useNaming() {
  const context = useContext(NamingContext);
  if (!context) throw new Error('useNaming must be used within a NamingProvider');
  return context;
}