
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

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
  updateCardImage: (
    id: string,
    type: 'front' | 'back',
    file: File,
  ) => void;
  resetCardImages: (id: string) => void;
}

const STORAGE_KEY = 'singlekey_naming_ceremony';
const UPDATE_EVENT = 'naming_updated';
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const initialCards: NamingCard[] = [
  {
    id: 'hero',
    front:
      'https://i.pinimg.com/originals/2b/5f/62/2b5f6222ae70c8395b6f6d2c5bd88375.jpg',
    back:
      'https://i.pinimg.com/736x/e2/74/27/e27427739c56d70200fad938ac8181f1.jpg',
    category: 'Grand Celebration',
    title: 'Naming Day Blessing',
    isHero: true,
  },
  {
    id: 'img1',
    front:
      'https://tse4.mm.bing.net/th/id/OIP.lHdStzM68KpFvxBhiS0lHgHaLH?r=0&w=736&h=1104&rs=1&pid=ImgDetMain&o=7&rm=3',
    back:
      'https://i.pinimg.com/736x/e7/a2/9a/e7a29a7f4e142b48198c179d1db4f5ca.jpg',
    category: 'Ritual',
    title: 'Cradle Ceremony',
    isHero: false,
  },
  {
    id: 'img2',
    front:
      'https://i.pinimg.com/736x/84/f3/16/84f316ce237db8223c26d7dcefdc4595.jpg',
    back:
      'https://tse4.mm.bing.net/th/id/OIP.Q2z5euk8JJGO_0-HslCnnAHaFT?r=0&pid=ImgDet&w=474&h=339&rs=1&o=7&rm=3',
    category: 'Feast',
    title: 'Traditional Lunch',
    isHero: false,
  },
  {
    id: 'img3',
    front:
      'https://www.tinytoddlersphotography.com/wp-content/uploads/2023/07/Avyaan-Cradle-Ceremony-019.jpg',
    back:
      'https://www.sengalleries.com/images/photos_image/11729853389.jpg',
    category: 'Family',
    title: 'Blessings & Joy',
    isHero: false,
  },
  {
    id: 'img4',
    front:
      'https://www.tinytoddlersphotography.com/wp-content/uploads/2023/07/Avyaan-Cradle-Ceremony-012.jpg',
    back:
      'https://images.unsplash.com/photo-1730130596425-197566414dc4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhbWlseSUyMHRyYWRpdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    category: 'Decor',
    title: 'Floral Setup',
    isHero: false,
  },
];

const NamingContext =
  createContext<NamingContextType | undefined>(undefined);

const isValidImageUrl = (value: unknown): value is string =>
  typeof value === 'string' && /^https?:\/\//i.test(value);

const sanitizeCards = (value: unknown): NamingCard[] => {
  if (!Array.isArray(value) || value.length !== initialCards.length) {
    return initialCards.map((card) => ({ ...card }));
  }

  return initialCards.map((original) => {
    const saved = value.find(
      (item: unknown) =>
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        item.id === original.id,
    ) as Partial<NamingCard> | undefined;

    if (!saved) {
      return { ...original };
    }

    return {
      ...original,
      front: isValidImageUrl(saved.front)
        ? saved.front
        : original.front,
      back: isValidImageUrl(saved.back)
        ? saved.back
        : original.back,
    };
  });
};

export function NamingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cards, setCards] = useState<NamingCard[]>(() =>
    initialCards.map((card) => ({ ...card })),
  );

  const cardsRef = useRef<NamingCard[]>(
    initialCards.map((card) => ({ ...card })),
  );

  const persistCards = (updated: NamingCard[]) => {
    cardsRef.current = updated;
    setCards(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (error) {
      console.error('Failed to save naming ceremony images:', error);
      alert('Unable to save image URLs in browser storage.');
    }
  };

  useEffect(() => {
    const loadCards = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved || saved === 'undefined' || saved === 'null') {
          return;
        }

        const parsed: unknown = JSON.parse(saved);
        const sanitized = sanitizeCards(parsed);

        cardsRef.current = sanitized;
        setCards(sanitized);

        // Keep only valid image URLs in localStorage.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      } catch (error) {
        console.error('Failed to load naming ceremony images:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    loadCards();

    const handleStorageChange = () => {
      loadCards();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  const updateCardImage = async (
    id: string,
    type: 'front' | 'back',
    file: File,
  ): Promise<void> => {
    const existingCard = cardsRef.current.find((card) => card.id === id);

    if (!existingCard) {
      alert('Naming card not found.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert('Image size must be 10 MB or less.');
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.error('Cloudinary environment variables are missing.');
      alert('Cloudinary configuration is missing. Please check .env.local.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok || !result.secure_url) {
        throw new Error(
          result.error?.message || 'Cloudinary upload failed.',
        );
      }

      const imageUrl: string = result.secure_url;

      const updated = cardsRef.current.map((card) =>
        card.id === id ? { ...card, [type]: imageUrl } : card,
      );

      persistCards(updated);

      console.log('Naming card image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Naming card image upload failed:', error);

      alert(
        error instanceof Error
          ? `Image upload failed: ${error.message}`
          : 'Image upload failed. Please try again.',
      );
    }
  };

  const resetCardImages = (id: string): void => {
    const original = initialCards.find((card) => card.id === id);

    if (!original) {
      return;
    }

    const updated = cardsRef.current.map((card) =>
      card.id === id
        ? {
            ...card,
            front: original.front,
            back: original.back,
          }
        : card,
    );

    persistCards(updated);
  };

  return (
    <NamingContext.Provider
      value={{
        cards,
        updateCardImage,
        resetCardImages,
      }}
    >
      {children}
    </NamingContext.Provider>
  );
}

export function useNaming() {
  const context = useContext(NamingContext);

  if (!context) {
    throw new Error('useNaming must be used within a NamingProvider');
  }

  return context;
}
