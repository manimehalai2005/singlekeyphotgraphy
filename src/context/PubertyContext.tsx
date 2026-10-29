
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

export interface PubertyCard {
  id: string;
  src: string;
  rotation: string;
}

interface PubertyContextType {
  pubertyCards: PubertyCard[];
  updatePubertyCard: (index: number, file: File) => Promise<void>;
  resetPubertyCard: (index: number) => void;
}

const initialCards: PubertyCard[] = [
  {
    id: 'card-1',
    src: 'https://tse4.mm.bing.net/th/id/OIP.SzqVBxGS4vV0MLtRsTbmGgHaNK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    rotation: '-rotate-2',
  },
  {
    id: 'card-2',
    src: 'https://live.staticflickr.com/1177/1397474014_c59638a94f_b.jpg',
    rotation: 'rotate-1',
  },
  {
    id: 'card-3',
    src: 'https://camouflageclicks.com/assets/uploads/blog/7197561.jpg',
    rotation: '-rotate-1',
  },
  {
    id: 'card-4',
    src: 'https://i.ytimg.com/vi/8nmUL2QdgRw/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&rs=AOn4CLCWYtRtxuxlI0DvC90L9blAhTQ4qA&usqp=CCk',
    rotation: 'rotate-2',
  },
  {
    id: 'card-5',
    src: 'https://i.pinimg.com/originals/c2/76/cf/c276cf80afd5fdee948cde21b18d8a23.jpg',
    rotation: 'rotate-1',
  },
  {
    id: 'card-6',
    src: 'https://tse3.mm.bing.net/th/id/OIP.Fwpj05vs2Fj7kh4EIdl2_AHaEK?r=0&pid=ImgDet&w=474&h=266&rs=1&o=7&rm=3',
    rotation: '-rotate-2',
  },
  {
    id: 'card-7',
    src: 'https://media.istockphoto.com/id/2168209620/photo/fun-moments-between-bride-and-her-aunty-at-the-haldi-ceremony.jpg?s=612x612&w=0&k=20&c=JBRtxT8d8FOffhNL5By4-3OdYezvO8GhTjrednKYfeE=',
    rotation: 'rotate-2',
  },
  {
    id: 'card-8',
    src: 'https://tse2.mm.bing.net/th/id/OIP.1EqL1ZfOqae8_QC5byuyigHaFM?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    rotation: '-rotate-1',
  },
];

const STORAGE_KEY = 'singlekey_puberty_gallery';
const UPDATE_EVENT = 'puberty_updated';

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const PubertyContext = createContext<PubertyContextType | undefined>(
  undefined
);

// Prevent old Base64 data or invalid values from being restored.
function sanitizeCards(value: unknown): PubertyCard[] {
  if (!Array.isArray(value) || value.length !== initialCards.length) {
    return initialCards;
  }

  return initialCards.map((defaultCard, index) => {
    const savedCard = value[index] as Partial<PubertyCard> | null;

    const savedSrc =
      typeof savedCard?.src === 'string' &&
      savedCard.src.trim() !== '' &&
      !savedCard.src.startsWith('data:')
        ? savedCard.src
        : defaultCard.src;

    return {
      ...defaultCard,
      src: savedSrc,
    };
  });
}

function readSavedCards(): PubertyCard[] {
  if (typeof window === 'undefined') {
    return initialCards;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved || saved === 'undefined' || saved === 'null') {
      return initialCards;
    }

    const parsed: unknown = JSON.parse(saved);
    const sanitized = sanitizeCards(parsed);

    // Save cleaned data so legacy Base64 images aren't kept in storage.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));

    return sanitized;
  } catch (error) {
    console.error('Failed to read puberty gallery:', error);
    localStorage.removeItem(STORAGE_KEY);
    return initialCards;
  }
}

export function PubertyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pubertyCards, setPubertyCards] =
    useState<PubertyCard[]>(initialCards);

  // Keeps the latest state available for consecutive uploads.
  const cardsRef = useRef<PubertyCard[]>(initialCards);

  useEffect(() => {
    const savedCards = readSavedCards();

    cardsRef.current = savedCards;
    setPubertyCards(savedCards);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedCards = readSavedCards();

      cardsRef.current = savedCards;
      setPubertyCards(savedCards);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  const persistCards = (updatedCards: PubertyCard[]) => {
    cardsRef.current = updatedCards;
    setPubertyCards(updatedCards);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    }
  };

  const updatePubertyCard = async (index: number, file: File) => {
    if (index < 0 || index >= initialCards.length) {
      throw new Error('Invalid puberty card index.');
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('Please select a valid image file.');
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error('Image size must be 10 MB or less.');
    }

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error(
        'Cloudinary configuration is missing. Check your .env.local file.'
      );
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok || !result.secure_url) {
      console.error('Cloudinary upload failed:', result);

      throw new Error(
        result.error?.message || 'Failed to upload image to Cloudinary.'
      );
    }

    // Store only the Cloudinary URL, never Base64 image data.
    const updatedCards = [...cardsRef.current];

    updatedCards[index] = {
      ...updatedCards[index],
      src: result.secure_url as string,
    };

    persistCards(updatedCards);
  };

  const resetPubertyCard = (index: number) => {
    if (index < 0 || index >= initialCards.length) {
      return;
    }

    const updatedCards = [...cardsRef.current];

    updatedCards[index] = {
      ...updatedCards[index],
      src: initialCards[index].src,
    };

    persistCards(updatedCards);
  };

  return (
    <PubertyContext.Provider
      value={{
        pubertyCards,
        updatePubertyCard,
        resetPubertyCard,
      }}
    >
      {children}
    </PubertyContext.Provider>
  );
}

export function usePuberty() {
  const context = useContext(PubertyContext);

  if (!context) {
    throw new Error(
      'usePuberty must be used within a PubertyProvider'
    );
  }

  return context;
}
