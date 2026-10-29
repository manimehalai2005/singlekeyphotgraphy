
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface WeddingImage {
  id: number;
  src: string;
  alt: string;
}

interface WeddingContextType {
  weddingImages: WeddingImage[];
  updateWeddingImage: (index: number, file: File) => Promise<void>;
  resetWeddingImage: (index: number) => void;
}

const initialWeddingImages: WeddingImage[] = [
  {
    id: 1,
    src: 'https://www.atlhea.in/wp-content/uploads/2020/11/ATLHEA-87.jpg',
    alt: 'Bride and groom portrait',
  },
  {
    id: 2,
    src: 'https://images-pw.pixieset.com/elementfield/36171942/044-6bd6664e.JPG',
    alt: 'Couple embracing',
  },
  {
    id: 3,
    src: 'https://www.weddingsutra.com/images/wedding-images/entertaining/tamil-traditional-wedding/tamil-wedding-ritual-29.webp',
    alt: 'Wedding romantic moment',
  },
];

const STORAGE_KEY = 'singlekey_wedding_gallery';
const UPDATE_EVENT = 'wedding_updated';

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const WeddingContext = createContext<WeddingContextType | undefined>(
  undefined
);

function sanitizeImages(value: unknown): WeddingImage[] {
  if (!Array.isArray(value) || value.length !== initialWeddingImages.length) {
    return initialWeddingImages;
  }

  return initialWeddingImages.map((defaultImage, index) => {
    const savedImage = value[index] as Partial<WeddingImage> | null;

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

function readSavedImages(): WeddingImage[] {
  if (typeof window === 'undefined') {
    return initialWeddingImages;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved || saved === 'undefined' || saved === 'null') {
      return initialWeddingImages;
    }

    const parsed: unknown = JSON.parse(saved);
    const sanitized = sanitizeImages(parsed);

    // Remove legacy Base64 images from localStorage.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));

    return sanitized;
  } catch (error) {
    console.error('Failed to read wedding gallery:', error);
    localStorage.removeItem(STORAGE_KEY);
    return initialWeddingImages;
  }
}

export function WeddingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Keep the initial server/client render identical to prevent hydration errors.
  const [weddingImages, setWeddingImages] =
    useState<WeddingImage[]>(initialWeddingImages);

  const imagesRef = useRef<WeddingImage[]>(initialWeddingImages);

  useEffect(() => {
    const savedImages = readSavedImages();

    imagesRef.current = savedImages;
    setWeddingImages(savedImages);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedImages = readSavedImages();

      imagesRef.current = savedImages;
      setWeddingImages(savedImages);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  const persistImages = (updatedImages: WeddingImage[]) => {
    imagesRef.current = updatedImages;
    setWeddingImages(updatedImages);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    }
  };

  const updateWeddingImage = async (
    index: number,
    file: File
  ): Promise<void> => {
    if (index < 0 || index >= initialWeddingImages.length) {
      throw new Error('Invalid wedding image index.');
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

    // Store only the Cloudinary URL, never Base64 image data.
    persistImages(updatedImages);
  };

  const resetWeddingImage = (index: number) => {
    if (index < 0 || index >= initialWeddingImages.length) {
      return;
    }

    const updatedImages = [...imagesRef.current];

    updatedImages[index] = {
      ...updatedImages[index],
      src: initialWeddingImages[index].src,
    };

    persistImages(updatedImages);
  };

  return (
    <WeddingContext.Provider
      value={{
        weddingImages,
        updateWeddingImage,
        resetWeddingImage,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);

  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }

  return context;
}
