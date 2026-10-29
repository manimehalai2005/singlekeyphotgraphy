
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface EngagementImage {
  id: number;
  src: string;
  alt: string;
}

interface EngagementContextType {
  engagementImages: EngagementImage[];
  updateEngagementImage: (index: number, file: File) => void;
  resetEngagementImage: (index: number) => void;
}

const STORAGE_KEY = 'singlekey_engagement_gallery';
const UPDATE_EVENT = 'engagement_updated';

const initialEngagementImages: EngagementImage[] = [
  {
    id: 1,
    src: 'https://i.pinimg.com/originals/19/e6/02/19e60291fa780b500ba72db76976da76.jpg',
    alt: 'Ring exchange ceremony',
  },
  {
    id: 2,
    src: 'https://yt3.googleusercontent.com/NPClHi9pCFowaawgGJ3563S5m0YRBpF8f3rIPKxd3_58gyN6gPKmXFzlzsNjGuGBIAFMuUWLVw=s900-c-k-c0x00ffffff-no-rj',
    alt: 'Engagement ring close up',
  },
  {
    id: 3,
    src: 'https://www.shubhlaxmifilms.com/wp-content/uploads/2022/11/IMG_3486-01-scaled-1.webp',
    alt: 'Couple laughing together',
  },
  {
    id: 4,
    src: 'https://cdn.pixabay.com/photo/2021/09/03/06/10/wedding-6595092_640.jpg',
    alt: 'Engagement celebration details',
  },
  {
    id: 5,
    src: 'https://tse1.explicit.bing.net/th/id/OIP.nNDORWpB_IaV_Sp5RfoY8gAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    alt: 'Romantic couple moment',
  },
  {
    id: 6,
    src: 'https://featheredarrowstudio.com/wp-content/uploads/2024/01/JANELLEHENRY_0765.jpg',
    alt: 'Couple portrait',
  },
  {
    id: 7,
    src: 'https://www.redeyecollection.com/wp-content/uploads/2020/02/SD-534.jpg',
    alt: 'Celebration toast',
  },
];

const createDefaultImages = (): EngagementImage[] =>
  initialEngagementImages.map((image) => ({ ...image }));

const isValidImages = (value: unknown): value is EngagementImage[] => {
  if (!Array.isArray(value) || value.length !== initialEngagementImages.length) {
    return false;
  }

  return value.every(
    (image) =>
      image &&
      typeof image.id === 'number' &&
      typeof image.src === 'string' &&
      image.src.length > 0 &&
      !image.src.startsWith('data:image/') &&
      typeof image.alt === 'string'
  );
};

const EngagementContext = createContext<
  EngagementContextType | undefined
>(undefined);

export function EngagementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [engagementImages, setEngagementImages] =
    useState<EngagementImage[]>(createDefaultImages);

  const imagesRef = useRef<EngagementImage[]>(createDefaultImages());

  const persistImages = (updated: EngagementImage[]) => {
    imagesRef.current = updated;
    setEngagementImages(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (error) {
      console.error('Failed to save engagement images:', error);
    }
  };

  // Load saved URLs and remove old Base64 data if present.
  useEffect(() => {
    const loadSavedImages = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved || saved === 'undefined' || saved === 'null') {
          return;
        }

        const parsed: unknown = JSON.parse(saved);

        if (isValidImages(parsed)) {
          imagesRef.current = parsed;
          setEngagementImages(parsed);
        } else {
          localStorage.removeItem(STORAGE_KEY);

          const defaults = createDefaultImages();
          imagesRef.current = defaults;
          setEngagementImages(defaults);
        }
      } catch (error) {
        console.error('Failed to load engagement images:', error);

        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore storage cleanup errors.
        }

        const defaults = createDefaultImages();
        imagesRef.current = defaults;
        setEngagementImages(defaults);
      }
    };

    loadSavedImages();

    const handleStorageChange = (event: Event) => {
      if (event.type === UPDATE_EVENT) return;
      loadSavedImages();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  // Upload to Cloudinary and save only its secure URL.
  const updateEngagementImage = async (
    index: number,
    file: File
  ) => {
    try {
      if (index < 0 || index >= initialEngagementImages.length) {
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
      console.error('Engagement image upload failed:', error);

      alert(
        error instanceof Error
          ? error.message
          : 'Image upload failed. Please try again.'
      );
    }
  };

  // Reset just one image to its original URL.
  const resetEngagementImage = (index: number) => {
    if (index < 0 || index >= initialEngagementImages.length) {
      return;
    }

    const updated = imagesRef.current.map((image, i) =>
      i === index
        ? { ...image, src: initialEngagementImages[index].src }
        : image
    );

    persistImages(updated);
  };

  return (
    <EngagementContext.Provider
      value={{
        engagementImages,
        updateEngagementImage,
        resetEngagementImage,
      }}
    >
      {children}
    </EngagementContext.Provider>
  );
}

export function useEngagement() {
  const context = useContext(EngagementContext);

  if (!context) {
    throw new Error(
      'useEngagement must be used within an EngagementProvider'
    );
  }

  return context;
}
