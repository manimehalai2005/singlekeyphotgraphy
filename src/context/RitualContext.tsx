
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

export interface RitualImage {
  id: number;
  src: string;
  alt: string;
  span: string;
}

interface RitualContextType {
  ritualImages: RitualImage[];
  updateRitualImage: (index: number, file: File) => Promise<void>;
  resetRitualImage: (index: number) => void;
}

const initialRitualImages: RitualImage[] = [
  {
    id: 1,
    src: 'https://tse2.mm.bing.net/th/id/OIP.YjFWzlEVloMZmzSOEqt0ZwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    alt: 'Main Ritual Gathering',
    span: 'col-span-2 row-span-2 h-72 sm:h-[420px]',
  },
  {
    id: 2,
    src: 'https://i.pinimg.com/474x/02/2b/42/022b424c9b20d97874636c425e8522f1.jpg',
    alt: 'Sacred Offerings',
    span: 'h-34 sm:h-[200px]',
  },
  {
    id: 3,
    src: 'https://tse4.mm.bing.net/th/id/OIP.LEunDPG7H0n_yd5qHHuVEwHaE8?r=0&w=1200&h=800&rs=1&pid=ImgDetMain&o=7&rm=3',
    alt: 'Family Moments',
    span: 'h-34 sm:h-[200px]',
  },
  {
    id: 4,
    src: 'https://2.bp.blogspot.com/-nRCTljrW3RU/VoZPRq9iiuI/AAAAAAAAPe4/nrGh29qO17Q/s1600/FB_IMG_1451642522139.jpg',
    alt: 'Traditional Rituals',
    span: 'h-34 sm:h-[200px]',
  },
  {
    id: 5,
    src: 'https://www.makemytraveling.com/Images/1/KokilambalThirukameshwara-97c55.jpeg',
    alt: 'Ceremony Blessings',
    span: 'h-34 sm:h-[200px]',
  },
];

const STORAGE_KEY = 'singlekey_ritual_gallery';
const UPDATE_EVENT = 'ritual_updated';

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const RitualContext = createContext<RitualContextType | undefined>(
  undefined
);

function sanitizeImages(value: unknown): RitualImage[] {
  if (!Array.isArray(value) || value.length !== initialRitualImages.length) {
    return initialRitualImages;
  }

  return initialRitualImages.map((defaultImage, index) => {
    const savedImage = value[index] as Partial<RitualImage> | null;

    const savedSrc =
      typeof savedImage?.src === 'string' &&
      savedImage.src.trim() !== '' &&
      !savedImage.src.startsWith('data:')
        ? savedImage.src
        : defaultImage.src;

    return {
      ...defaultImage,
      src: savedSrc,
    };
  });
}

function readSavedImages(): RitualImage[] {
  if (typeof window === 'undefined') {
    return initialRitualImages;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved || saved === 'undefined' || saved === 'null') {
      return initialRitualImages;
    }

    const parsed: unknown = JSON.parse(saved);
    const sanitized = sanitizeImages(parsed);

    // Remove old Base64 image data from localStorage.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));

    return sanitized;
  } catch (error) {
    console.error('Failed to read ritual gallery:', error);
    localStorage.removeItem(STORAGE_KEY);
    return initialRitualImages;
  }
}

export function RitualProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ritualImages, setRitualImages] =
    useState<RitualImage[]>(initialRitualImages);

  const imagesRef = useRef<RitualImage[]>(initialRitualImages);

  useEffect(() => {
    const savedImages = readSavedImages();

    imagesRef.current = savedImages;
    setRitualImages(savedImages);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedImages = readSavedImages();

      imagesRef.current = savedImages;
      setRitualImages(savedImages);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  const persistImages = (updatedImages: RitualImage[]) => {
    imagesRef.current = updatedImages;
    setRitualImages(updatedImages);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    }
  };

  const updateRitualImage = async (
    index: number,
    file: File
  ): Promise<void> => {
    if (index < 0 || index >= initialRitualImages.length) {
      throw new Error('Invalid ritual image index.');
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

    const updatedImages = [...imagesRef.current];

    updatedImages[index] = {
      ...updatedImages[index],
      src: result.secure_url as string,
    };

    // Save the Cloudinary URL only, not Base64 image data.
    persistImages(updatedImages);
  };

  const resetRitualImage = (index: number) => {
    if (index < 0 || index >= initialRitualImages.length) {
      return;
    }

    const updatedImages = [...imagesRef.current];

    updatedImages[index] = {
      ...updatedImages[index],
      src: initialRitualImages[index].src,
    };

    persistImages(updatedImages);
  };

  return (
    <RitualContext.Provider
      value={{
        ritualImages,
        updateRitualImage,
        resetRitualImage,
      }}
    >
      {children}
    </RitualContext.Provider>
  );
}

export function useRitual() {
  const context = useContext(RitualContext);

  if (!context) {
    throw new Error('useRitual must be used within a RitualProvider');
  }

  return context;
}
