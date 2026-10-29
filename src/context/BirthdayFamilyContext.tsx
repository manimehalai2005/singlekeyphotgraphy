
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

interface FamilyImage {
  id: number;
  src: string;
  alt: string;
}

interface FamilyContextType {
  familyImages: FamilyImage[];
  updateFamilyImage: (index: number, file: File) => Promise<void>;
  resetFamilyImage: (index: number) => void;
}

const STORAGE_KEY = 'singlekey_family_gallery';

const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const initialFamilyImages: FamilyImage[] = [
  {
    id: 1,
    src: 'https://i.pinimg.com/736x/af/5d/d3/af5dd3a99a7b2bc175d52cc9b544987f.jpg',
    alt: 'Family 1',
  },
  {
    id: 2,
    src: 'https://i.pinimg.com/736x/af/e0/9d/afe09d61e0109948acae7b386f7599de.jpg',
    alt: 'Family 2',
  },
  {
    id: 3,
    src: 'https://www.fotonstudio.in/wp-content/uploads/2021/05/Aarav-9.jpg',
    alt: 'Family 3',
  },
  {
    id: 4,
    src: 'https://1.bp.blogspot.com/-1a1iTCFuINQ/YK3Wt9N0BnI/AAAAAAAAvDs/7oK88et7jZ4IZU4CCB4PrsGV17oeK_OKACLcBGAsYHQ/s850/71%2BDSC_8713c.jpg',
    alt: 'Family 4',
  },
  {
    id: 5,
    src: 'https://tse1.mm.bing.net/th/id/OIP.wm4kAqNi-FSv2rOfac4f6AHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    alt: 'Family 5',
  },
  {
    id: 6,
    src: 'https://i.ytimg.com/vi/L_yv_xBbGaw/maxresdefault.jpg?v=67ac9443',
    alt: 'Family 6',
  },
  {
    id: 7,
    src: 'https://tse1.mm.bing.net/th/id/OIP.V_UiPQxbfVkJ445WxoIXHQHaE8?r=0&w=1000&h=667&rs=1&pid=ImgDetMain&o=7&rm=3',
    alt: 'Happy multi-generation family',
  },
  {
    id: 8,
    src: 'https://i.pinimg.com/736x/0b/8c/26/0b8c26a883abe89e0f15b9e3e58bbd04.jpg',
    alt: 'Family having fun together',
  },
];

const FamilyContext =
  createContext<FamilyContextType | undefined>(undefined);

function saveFamilyImages(images: FamilyImage[]) {
  try {
    // Save image URLs only, never Base64 image data.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    return true;
  } catch (error) {
    console.error('Failed to save family gallery:', error);
    return false;
  }
}

function readFamilyImages(): FamilyImage[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved || saved === 'undefined' || saved === 'null') {
      return null;
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed) || parsed.length !== 8) {
      return null;
    }

    // Clear old Base64 image data that may fill browser storage.
    if (
      !parsed.every(
        (item) =>
          item &&
          typeof item.src === 'string' &&
          !item.src.startsWith('data:')
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Failed to read family gallery:', error);
    return null;
  }
}

export function FamilyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [familyImages, setFamilyImages] =
    useState<FamilyImage[]>(initialFamilyImages);

  useEffect(() => {
    const saved = readFamilyImages();

    if (saved) {
      setFamilyImages(saved);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = readFamilyImages();

      if (saved) {
        setFamilyImages(saved);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('family_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('family_updated', handleStorageChange);
    };
  }, []);

  const updateFamilyImage = useCallback(
    async (index: number, file: File) => {
      if (index < 0 || index >= initialFamilyImages.length) {
        console.error('Invalid family image index:', index);
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image.');
        return;
      }

      if (!CLOUD_NAME || !UPLOAD_PRESET) {
        alert(
          'Cloudinary configuration missing. Check your .env.local file.'
        );
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('Image exceeds 10 MB. Please compress it before uploading.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok || !result.secure_url) {
          console.error('Cloudinary upload failed:', result);
          alert(
            result.error?.message || 'Cloudinary upload failed.'
          );
          return;
        }

        const imageUrl: string = result.secure_url;

        // Use the latest state in case another image was updated
        // while this upload was in progress.
        setFamilyImages((previous) => {
          const updated = previous.map((image, i) =>
            i === index ? { ...image, src: imageUrl } : image
          );

          saveFamilyImages(updated);

          return updated;
        });

        window.dispatchEvent(new Event('family_updated'));
        alert('Family image uploaded successfully!');
      } catch (error) {
        console.error('Family image upload error:', error);
        alert('Upload failed. Check your internet connection.');
      }
    },
    []
  );

  const resetFamilyImage = useCallback((index: number) => {
    if (index < 0 || index >= initialFamilyImages.length) {
      return;
    }

    setFamilyImages((previous) => {
      const updated = previous.map((image, i) =>
        i === index
          ? { ...image, src: initialFamilyImages[index].src }
          : image
      );

      saveFamilyImages(updated);

      return updated;
    });

    window.dispatchEvent(new Event('family_updated'));
  }, []);

  return (
    <FamilyContext.Provider
      value={{
        familyImages,
        updateFamilyImage,
        resetFamilyImage,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const context = useContext(FamilyContext);

  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }

  return context;
}
