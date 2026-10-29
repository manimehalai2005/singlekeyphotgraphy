
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

export interface EarPiercingImage {
  id: string;
  src: string;
  alt: string;
  height: string;
  type: string;
}

interface EarPiercingContextType {
  earPiercingImages: EarPiercingImage[];
  updateEarPiercingImage: (index: number, file: File) => void;
  resetEarPiercingImage: (index: number) => void;
}

const STORAGE_KEY = 'singlekey_earpiercing_gallery';
const UPDATE_EVENT = 'earpiercing_updated';

const initialImages: EarPiercingImage[] = [
  {
    id: 'img-1',
    src: 'https://i.ytimg.com/vi/xK2iOo8yMfw/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgTShDMA8=&rs=AOn4CLDhFI-iLQnxzG_0cyYa7lEnspNfPA',
    alt: 'Traditional Ear Piercing Vibe',
    height: 'h-[280px]',
    type: 'image',
  },
  {
    id: 'img-2',
    src: 'https://i.ytimg.com/vi/iOMEXwD-QGY/hqdefault.jpg',
    alt: 'Sacred Ritual Details',
    height: 'h-[300px]',
    type: 'image',
  },
  {
    id: 'img-3',
    src: 'https://i.ytimg.com/vi/l_nzcSqq-WE/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgXihOMA8=&rs=AOn4CLBfzz1Lzi7yUMQbchpkI5Meuxc_3Q',
    alt: 'Baby Portrait Moments',
    height: 'h-[200px]',
    type: 'image',
  },
  {
    id: 'img-4',
    src: 'https://tse3.mm.bing.net/th/id/OIP.aOvResg9g6E3UeC2M1MDtgHaE8?r=0&w=1024&h=683&rs=1&pid=ImgDetMain&o=7&rm=3',
    alt: 'Celebration Ambiance',
    height: 'h-[240px]',
    type: 'image',
  },
];

const createDefaultImages = (): EarPiercingImage[] =>
  initialImages.map((image) => ({ ...image }));

const isValidImages = (value: unknown): value is EarPiercingImage[] => {
  if (!Array.isArray(value) || value.length !== initialImages.length) {
    return false;
  }

  return value.every(
    (image) =>
      image &&
      typeof image.id === 'string' &&
      typeof image.src === 'string' &&
      !image.src.startsWith('data:image/') &&
      typeof image.alt === 'string' &&
      typeof image.height === 'string' &&
      typeof image.type === 'string'
  );
};

const EarPiercingContext = createContext<
  EarPiercingContextType | undefined
>(undefined);

export function EarPiercingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [earPiercingImages, setEarPiercingImages] =
    useState<EarPiercingImage[]>(createDefaultImages);

  const imagesRef = useRef<EarPiercingImage[]>(createDefaultImages());

  const persistImages = (updated: EarPiercingImage[]) => {
    imagesRef.current = updated;
    setEarPiercingImages(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (error) {
      console.error('Failed to save ear piercing gallery:', error);
    }
  };

  // Load saved image URLs after the component mounts.
  useEffect(() => {
    const loadImages = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved || saved === 'undefined' || saved === 'null') {
          return;
        }

        const parsed: unknown = JSON.parse(saved);

        if (isValidImages(parsed)) {
          imagesRef.current = parsed;
          setEarPiercingImages(parsed);
        } else {
          // Remove invalid or legacy Base64 data.
          localStorage.removeItem(STORAGE_KEY);

          const defaults = createDefaultImages();
          imagesRef.current = defaults;
          setEarPiercingImages(defaults);
        }
      } catch (error) {
        console.error(
          'Failed to load ear piercing gallery:',
          error
        );

        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore storage cleanup errors.
        }

        const defaults = createDefaultImages();
        imagesRef.current = defaults;
        setEarPiercingImages(defaults);
      }
    };

    loadImages();

    const handleStorageChange = (event: Event) => {
      // Same-tab updates are already handled by persistImages.
      if (event.type === UPDATE_EVENT) return;

      loadImages();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  // Upload the image to Cloudinary and save only its URL.
  const updateEarPiercingImage = async (
    index: number,
    file: File
  ) => {
    try {
      if (index < 0 || index >= initialImages.length) {
        alert('Invalid image selection.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      const MAX_FILE_SIZE = 10 * 1024 * 1024;

      if (file.size > MAX_FILE_SIZE) {
        alert('Image size must be 10 MB or less.');
        return;
      }

      const cloudName =
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      const uploadPreset =
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error(
          'Cloudinary configuration is missing. Check your .env.local file.'
        );
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.secure_url) {
        throw new Error(
          result.error?.message || 'Cloudinary upload failed.'
        );
      }

      const updated = imagesRef.current.map((image, i) =>
        i === index
          ? { ...image, src: result.secure_url }
          : image
      );

      persistImages(updated);
    } catch (error) {
      console.error(
        'Ear piercing image upload failed:',
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : 'Image upload failed. Please try again.'
      );
    }
  };

  // Restore only the selected image to its default URL.
  const resetEarPiercingImage = (index: number) => {
    if (index < 0 || index >= initialImages.length) {
      return;
    }

    const updated = imagesRef.current.map((image, i) =>
      i === index
        ? { ...image, src: initialImages[index].src }
        : image
    );

    persistImages(updated);
  };

  return (
    <EarPiercingContext.Provider
      value={{
        earPiercingImages,
        updateEarPiercingImage,
        resetEarPiercingImage,
      }}
    >
      {children}
    </EarPiercingContext.Provider>
  );
}

export function useEarPiercing() {
  const context = useContext(EarPiercingContext);

  if (!context) {
    throw new Error(
      'useEarPiercing must be used within an EarPiercingProvider'
    );
  }

  return context;
}
