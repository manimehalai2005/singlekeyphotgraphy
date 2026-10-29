
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface HouseWarmingImages {
  banner: string;
  image1: string;
  image2: string;
  image3: string;
}

interface HouseWarmingContextType {
  houseWarmingImages: HouseWarmingImages;
  updateHouseWarmingImage: (
    key: keyof HouseWarmingImages,
    file: File,
  ) => void;
  resetHouseWarmingImage: (key: keyof HouseWarmingImages) => void;
}

const STORAGE_KEY = 'singlekey_housewarming_gallery';
const UPDATE_EVENT = 'housewarming_updated';
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const initialHouseWarmingImages: HouseWarmingImages = {
  banner:
    'https://i.pinimg.com/736x/84/69/52/846952f4b8f38fe306bb8a555e17674c.jpg',
  image1:
    'https://d3e1m60ptf1oym.cloudfront.net/445f7c6b-2d88-471a-bb10-39f7e89e18b8/08_SFE_110217_239_xgaplus.jpg',
  image2:
    'https://tse1.mm.bing.net/th/id/OIP.LWqO_LqE9RWAtZUAhP5izwHaLG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
  image3:
    'https://i.pinimg.com/originals/0e/25/67/0e256719e8583d15183eac0c956ae541.jpg',
};

const HouseWarmingContext =
  createContext<HouseWarmingContextType | undefined>(undefined);

const isValidImageUrl = (value: unknown): value is string =>
  typeof value === 'string' && /^https?:\/\//i.test(value);

const sanitizeImages = (value: unknown): HouseWarmingImages => {
  const defaults = initialHouseWarmingImages;

  if (!value || typeof value !== 'object') {
    return { ...defaults };
  }

  const saved = value as Partial<HouseWarmingImages>;

  return {
    banner: isValidImageUrl(saved.banner)
      ? saved.banner
      : defaults.banner,
    image1: isValidImageUrl(saved.image1)
      ? saved.image1
      : defaults.image1,
    image2: isValidImageUrl(saved.image2)
      ? saved.image2
      : defaults.image2,
    image3: isValidImageUrl(saved.image3)
      ? saved.image3
      : defaults.image3,
  };
};

export function HouseWarmingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [houseWarmingImages, setHouseWarmingImages] =
    useState<HouseWarmingImages>({ ...initialHouseWarmingImages });

  const imagesRef = useRef<HouseWarmingImages>({
    ...initialHouseWarmingImages,
  });

  const persistImages = (updated: HouseWarmingImages) => {
    imagesRef.current = updated;
    setHouseWarmingImages(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (error) {
      console.error('Failed to save housewarming images:', error);
      alert('Unable to save image URLs in browser storage.');
    }
  };

  useEffect(() => {
    const loadImages = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved || saved === 'undefined' || saved === 'null') {
          return;
        }

        const parsed: unknown = JSON.parse(saved);
        const sanitized = sanitizeImages(parsed);

        imagesRef.current = sanitized;
        setHouseWarmingImages(sanitized);

        // Save only valid HTTP(S) image URLs; discard legacy Base64 data.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      } catch (error) {
        console.error('Failed to load housewarming images:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    loadImages();

    const handleStorageChange = () => {
      loadImages();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  const updateHouseWarmingImage = async (
    key: keyof HouseWarmingImages,
    file: File,
  ): Promise<void> => {
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
      alert('Cloudinary configuration is missing. Check your .env.local file.');
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

      const updated: HouseWarmingImages = {
        ...imagesRef.current,
        [key]: imageUrl,
      };

      persistImages(updated);
      console.log('Housewarming image uploaded:', imageUrl);
    } catch (error) {
      console.error('Housewarming image upload failed:', error);

      alert(
        error instanceof Error
          ? `Image upload failed: ${error.message}`
          : 'Image upload failed. Please try again.',
      );
    }
  };

  const resetHouseWarmingImage = (
    key: keyof HouseWarmingImages,
  ): void => {
    const updated: HouseWarmingImages = {
      ...imagesRef.current,
      [key]: initialHouseWarmingImages[key],
    };

    persistImages(updated);
  };

  return (
    <HouseWarmingContext.Provider
      value={{
        houseWarmingImages,
        updateHouseWarmingImage,
        resetHouseWarmingImage,
      }}
    >
      {children}
    </HouseWarmingContext.Provider>
  );
}

export function useHouseWarming() {
  const context = useContext(HouseWarmingContext);

  if (!context) {
    throw new Error(
      'useHouseWarming must be used within a HouseWarmingProvider',
    );
  }

  return context;
}
