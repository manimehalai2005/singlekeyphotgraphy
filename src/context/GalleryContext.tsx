'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

interface GalleryContextType {
  images: GalleryItem[];
  updateImage: (index: number, file: File) => void;
  resetImage: (index: number) => void;
}

const initialImages: GalleryItem[] = [
  { id: 1, src: "https://tse4.mm.bing.net/th/id/OIP.8dFD88Upz8M6hdg3LXHukgAAAA?r=0&w=440&h=660&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Setup 1" },
  { id: 2, src: "https://i.pinimg.com/736x/44/6e/24/446e24fe2a2dffa23963829fcfb040e7.jpg", alt: "Setup 2" },
  { id: 3, src: "https://i.ytimg.com/vi/vlg-IQ4eoKs/maxresdefault.jpg", alt: "Top Wide Room" },
  { id: 4, src: "https://media.istockphoto.com/id/2187253642/photo/a-hindu-ritual-with-offerings-being-made-into-a-sacred-fire.jpg?s=170667a&w=0&k=20&c=xpC7pHSmTuj8ZCD2s4u_OUdJgKdiOIXVjf8GiV6bqBU=", alt: "Ritual" },
  { id: 5, src: "https://phometo.com/images/gallery/NamingCeremony/20.jpg", alt: "Naming Ceremony" },
  { id: 6, src: "https://i.pinimg.com/736x/91/fb/1e/91fb1e5f4725265012ee0fc0f8aaa520.jpg", alt: "Living Room" },
  { id: 7, src: "https://tse1.mm.bing.net/th/id/OIP.RZEAfB6_LawgXFji4acvnQHaFS?r=0&w=600&h=429&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Detail 1" },
  { id: 8, src: "https://tse2.mm.bing.net/th/id/OIP.cVy756bn4LHFVYpCQf0C4wHaLe?r=0&w=661&h=1024&rs=1&pid=ImgDetMain&o=7&rm=3", alt: "Detail 2" },
  { id: 9, src: "https://i.pinimg.com/originals/f0/48/d1/f048d1694b9d9199bb394837745d46d2.jpg", alt: "Detail 3" },
  { id: 10, src: "https://i.pinimg.com/originals/ad/93/80/ad9380d453f911e4e5825e1f88c6dc72.png", alt: "Detail 4" },
  { id: 11, src: "https://i.pinimg.com/736x/7c/9e/17/7c9e175670b0a62cbfc258af60d6ab08.jpg", alt: "Detail 5" },
  { id: 12, src: "https://images.pexels.com/photos/7694286/pexels-photo-7694286.jpeg?cs=srgb&dl=pexels-anoop1992-7694286.jpeg&fm=jpg", alt: "Detail 6" },
  { id: 13, src: "https://i.pinimg.com/originals/f0/48/d1/f048d1694b9d9199bb394837745d46d2.jpg", alt: "Detail 3" },
  { id: 14, src: "https://i.pinimg.com/originals/ad/93/80/ad9380d453f911e4e5825e1f88c6dc72.png", alt: "Detail 4" },
  { id: 15, src: "https://i.pinimg.com/736x/7c/9e/17/7c9e175670b0a62cbfc258af60d6ab08.jpg", alt: "Detail 5" },
  { id: 16, src: "https://images.pexels.com/photos/7694286/pexels-photo-7694286.jpeg?cs=srgb&dl=pexels-anoop1992-7694286.jpeg&fm=jpg", alt: "Detail 6" },
];

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<GalleryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('singlekey_gallery');
      return saved ? JSON.parse(saved) : initialImages;
    }
    return initialImages;
  });

  useEffect(() => {
    localStorage.setItem('singlekey_gallery', JSON.stringify(images));
  }, [images]);

  const updateImage = (index: number, file: File) => {
    const newImageUrl = URL.createObjectURL(file);
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], src: newImageUrl };
      return updated;
    });
  };

  const resetImage = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], src: initialImages[index].src };
      return updated;
    });
  };

  return (
    <GalleryContext.Provider value={{ images, updateImage, resetImage }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) throw new Error('useGallery must be used within a GalleryProvider');
  return context;
}