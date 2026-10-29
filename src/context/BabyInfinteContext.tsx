
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

interface BabyInfiniteState {
  topRow: string[];
  bottomRow: string[];
}

interface BabyInfiniteContextType {
  state: BabyInfiniteState;
  updateImage: (
    row: 'top' | 'index' | 'bottom',
    index: number,
    file: File
  ) => void;
  resetImages: () => void;
}

const STORAGE_KEY = 'singlekey_baby_infinite_slider';

const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const initialTopRow = [
  'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793262717/SK_08277_A_1.jpg',
  'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793262604/SK_04893_copy_1.jpg',
  'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793260028/SK_08284_A_1.jpg',
  'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793260146/SK_08649_A_1.jpg',
  'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793258010/SK_08489_A.jpg',
];

const initialBottomRow = [
  'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793259540/SK_08595_a_1.jpg',
  'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793259227/SK_08588_a_1.jpg',
  'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793259647/SK_08301_A_1.jpg',
  'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793259769/SK_08626_A_1.jpg',
  'https://res.cloudinary.com/dtu6kmq6r/image/upload/v1793259892/SK_08284_A-Recovered_A_1.jpg',
];

const initialState: BabyInfiniteState = {
  topRow: initialTopRow,
  bottomRow: initialBottomRow,
};

const BabyInfiniteContext =
  createContext<BabyInfiniteContextType | undefined>(undefined);

function saveState(data: BabyInfiniteState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Failed to save slider URLs:', error);
    return false;
  }
}

function readSavedState(): BabyInfiniteState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved || saved === 'undefined' || saved === 'null') {
      return null;
    }

    const parsed = JSON.parse(saved);

    if (
      !parsed ||
      !Array.isArray(parsed.topRow) ||
      !Array.isArray(parsed.bottomRow)
    ) {
      return null;
    }

    const images = [...parsed.topRow, ...parsed.bottomRow];

    // Remove legacy Base64 data that caused storage quota errors.
    if (
      !images.every(
        (image) =>
          typeof image === 'string' &&
          !image.startsWith('data:')
      )
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return {
      topRow: parsed.topRow,
      bottomRow: parsed.bottomRow,
    };
  } catch (error) {
    console.error('Failed to read saved slider:', error);
    return null;
  }
}

export function BabyInfiniteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] =
    useState<BabyInfiniteState>(initialState);

  useEffect(() => {
    const saved = readSavedState();

    if (saved) {
      setState(saved);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = readSavedState();

      if (saved) {
        setState(saved);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(
      'baby_slider_updated',
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        'storage',
        handleStorageChange
      );
      window.removeEventListener(
        'baby_slider_updated',
        handleStorageChange
      );
    };
  }, []);

  const updateImage = useCallback(
    async (
      row: 'top' | 'index' | 'bottom',
      index: number,
      file: File
    ) => {
      try {
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image.');
          return;
        }

        if (!CLOUD_NAME || !UPLOAD_PRESET) {
          alert(
            'Cloudinary configuration missing. Check .env.local and restart the server.'
          );
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          alert(
            'Image is larger than 10 MB. Please compress it before uploading.'
          );
          return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        // Upload the original file directly to Cloudinary.
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
            result.error?.message ||
              'Image upload failed. Check your Cloudinary preset.'
          );
          return;
        }

        // Save only the returned URL, never Base64 image data.
        const imageUrl: string = result.secure_url;

        setState((previous) => {
          const updated: BabyInfiniteState = {
            topRow: [...previous.topRow],
            bottomRow: [...previous.bottomRow],
          };

          if (row === 'top') {
            if (index < 0 || index >= updated.topRow.length) {
              return previous;
            }

            updated.topRow[index] = imageUrl;
          } else {
            if (
              index < 0 ||
              index >= updated.bottomRow.length
            ) {
              return previous;
            }

            updated.bottomRow[index] = imageUrl;
          }

          return updated;
        });

        // Save outside the state updater to avoid side effects.
        const updated: BabyInfiniteState = {
          topRow: [...state.topRow],
          bottomRow: [...state.bottomRow],
        };

        if (row === 'top') {
          if (index < 0 || index >= updated.topRow.length) {
            return;
          }

          updated.topRow[index] = imageUrl;
        } else {
          if (
            index < 0 ||
            index >= updated.bottomRow.length
          ) {
            return;
          }

          updated.bottomRow[index] = imageUrl;
        }

        saveState(updated);

        window.dispatchEvent(
          new Event('baby_slider_updated')
        );

        alert('Image uploaded successfully!');
      } catch (error) {
        console.error('Image upload error:', error);
        alert(
          'Unable to upload image. Check your internet connection and try again.'
        );
      }
    },
    [state]
  );

  const resetImages = useCallback(() => {
    const defaultState: BabyInfiniteState = {
      topRow: [...initialTopRow],
      bottomRow: [...initialBottomRow],
    };

    setState(defaultState);
    saveState(defaultState);

    window.dispatchEvent(
      new Event('baby_slider_updated')
    );
  }, []);

  return (
    <BabyInfiniteContext.Provider
      value={{ state, updateImage, resetImages }}
    >
      {children}
    </BabyInfiniteContext.Provider>
  );
}

export function useBabyInfinite() {
  const context = useContext(BabyInfiniteContext);

  if (!context) {
    throw new Error(
      'useBabyInfinite must be used within a BabyInfiniteProvider'
    );
  }

  return context;
}
