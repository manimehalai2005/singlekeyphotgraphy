
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface PreWeddingImage {
  id: number;
  src: string;
  alt: string;
}

interface PreWeddingContextType {
  preWeddingImages: PreWeddingImage[];
  updatePreWeddingImage: (index: number, file: File) => void;
  resetPreWeddingImage: (index: number) => void;
}

const STORAGE_KEY = 'singlekey_prewedding_gallery';
const UPDATE_EVENT = 'prewedding_updated';
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const initialPreWeddingImages: PreWeddingImage[] = [
  {
    id: 1,
    src: 'https://image.wedmegood.com/resized/1000X/uploads/member/661638/1565173084_57313638_2403209236377478_5708667755847221248_o.jpg',
    alt: 'Pre-wedding moment 1',
  },
  {
    id: 2,
    src: 'https://5.imimg.com/data5/ANDROID/Default/2022/8/FF/LX/IC/158524229/prod-20220815-131158136609912306463596-jpg-500x500.jpg',
    alt: 'Pre-wedding moment 2',
  },
  {
    id: 3,
    src: 'https://i.pinimg.com/originals/81/57/b3/8157b39c1e592d34df1e94f97a0173fc.png',
    alt: 'Pre-wedding moment 3',
  },
  {
    id: 4,
    src: 'https://i.pinimg.com/736x/02/44/7c/02447c13cd07fcdb42150a8337ed525d.jpg',
    alt: 'Pre-wedding moment 4',
  },
];

const PreWeddingContext =
  createContext<PreWeddingContextType | undefined>(undefined);

const isValidImageUrl = (value: unknown): value is string =>
  typeof value === 'string' && /^https?:\/\//i.test(value);

const sanitizeImages = (value: unknown): PreWeddingImage[] => {
  if (!Array.isArray(value)) {
    return initialPreWeddingImages.map((image) => ({ ...image }));
  }

  return initialPreWeddingImages.map((original, index) => {
    const saved = value.find(
      (item: unknown) =>
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        item.id === original.id,
    ) as Partial<PreWeddingImage> | undefined;

    // Fall back to original images if saved data is invalid.
    return {
      ...original,
      src: isValidImageUrl(saved?.src)
        ? saved.src
        : original.src,
      alt:
        typeof saved?.alt === 'string'
          ? saved.alt
          : original.alt,
    };
  });
};

export function PreWeddingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [preWeddingImages, setPreWeddingImages] =
    useState<PreWeddingImage[]>(() =>
      initialPreWeddingImages.map((image) => ({ ...image })),
    );

  const imagesRef = useRef<PreWeddingImage[]>(
    initialPreWeddingImages.map((image) => ({ ...image })),
  );

  const persistImages = (updated: PreWeddingImage[]) => {
    imagesRef.current = updated;
    setPreWeddingImages(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (error) {
      console.error('Failed to save pre-wedding images:', error);
      alert('Unable to save image URLs in browser storage.');
    }
  };

  useEffect(() => {
    const loadSavedImages = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved || saved === 'undefined' || saved === 'null') {
          return;
        }

        const parsed: unknown = JSON.parse(saved);
        const sanitized = sanitizeImages(parsed);

        imagesRef.current = sanitized;
        setPreWeddingImages(sanitized);

        // Remove legacy Base64 data and retain only image URLs.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      } catch (error) {
        console.error('Failed to load pre-wedding images:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    loadSavedImages();

    const handleStorageChange = () => {
      loadSavedImages();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  const updatePreWeddingImage = async (
    index: number,
    file: File,
  ): Promise<void> => {
    if (index < 0 || index >= imagesRef.current.length) {
      alert('Invalid pre-wedding image index.');
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

      const updated = imagesRef.current.map((image, currentIndex) =>
        currentIndex === index
          ? { ...image, src: imageUrl }
          : image,
      );

      persistImages(updated);
      console.log('Pre-wedding image uploaded:', imageUrl);
    } catch (error) {
      console.error('Pre-wedding image upload failed:', error);

      alert(
        error instanceof Error
          ? `Image upload failed: ${error.message}`
          : 'Image upload failed. Please try again.',
      );
    }
  };

  const resetPreWeddingImage = (index: number): void => {
    if (index < 0 || index >= initialPreWeddingImages.length) {
      return;
    }

    const updated = imagesRef.current.map((image, currentIndex) =>
      currentIndex === index
        ? {
            ...image,
            src: initialPreWeddingImages[index].src,
          }
        : image,
    );

    persistImages(updated);
  };

  return (
    <PreWeddingContext.Provider
      value={{
        preWeddingImages,
        updatePreWeddingImage,
        resetPreWeddingImage,
      }}
    >
      {children}
    </PreWeddingContext.Provider>
  );
}

export function usePreWedding() {
  const context = useContext(PreWeddingContext);

  if (!context) {
    throw new Error(
      'usePreWedding must be used within a PreWeddingProvider',
    );
  }

  return context;
}
