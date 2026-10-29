
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

interface BirthdayInfiniteState {
  topRow: string[];
  bottomRow: string[];
}

interface BirthdayInfiniteContextType {
  state: BirthdayInfiniteState;
  updateImage: (
    row: 'top' | 'bottom',
    index: number,
    file: File
  ) => Promise<void>;
  resetSingleImage: (
    row: 'top' | 'bottom',
    index: number
  ) => void;
  resetImages: () => void;
}

const STORAGE_KEY = 'singlekey_birthday_infinite_slider';

const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const initialTopRow = [
  'https://pestafiesta.com/wp-content/uploads/2021/05/Party-Venue.jpg',
  'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9bca2982139067.5d143f90d55eb.jpg',
  'https://th.bing.com/th/id/R.ffa4aa11aedba1dc9992b07cec69feff?rik=M9aqq%2bM4JD3zlg&riu=http%3a%2f%2fjasmineleephotography.com%2fwp-content%2fuploads%2f2013%2f11%2findian_baby_shower_photography_07.jpg&ehk=yiT2IytavdcRqT%2fIN0bU%2be%2bNnyVUYE%2bMbZ2pNLRcd%2bc%3d&risl=&pid=ImgRaw&r=0',
  'https://5.imimg.com/data5/CW/UF/MJ/GLADMIN-90860557/selection-882-500x500.png',
  'https://tse3.mm.bing.net/th/id/OIP.Tre-c80NPWt_7qeWqFl8-gHaFG?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
];

const initialBottomRow = [
  'https://cdn0.weddingwire.in/article/8737/3_2/960/jpg/27378-indian-wedding-couple-hitched-clicked-cover.jpeg',
  'https://mir-s3-cdn-cf.behance.net/project_modules/disp/bcd6f19083983.560c82d4b28f5.jpg',
  'https://tse3.mm.bing.net/th/id/OIP.QhUqxHns8TV2TbjdsRfJBQHaE8?r=0&w=735&h=490&rs=1&pid=ImgDetMain&o=7&rm=3',
  'https://miro.medium.com/v2/resize:fit:1400/1*QCUh5DjZI-t1BrP_qDDFTQ.jpeg',
  'https://tse3.mm.bing.net/th/id/OIP.Br8Og0aLya7hgv6qMP18ZQHaFL?r=0&w=1024&h=716&rs=1&pid=ImgDetMain&o=7&rm=3',
];

const initialState: BirthdayInfiniteState = {
  topRow: initialTopRow,
  bottomRow: initialBottomRow,
};

const BirthdayInfiniteContext =
  createContext<BirthdayInfiniteContextType | undefined>(
    undefined
  );

function saveState(state: BirthdayInfiniteState): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error('Failed to save birthday slider URLs:', error);
    return false;
  }
}

function readSavedState(): BirthdayInfiniteState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved || saved === 'undefined' || saved === 'null') {
      return null;
    }

    const parsed = JSON.parse(saved);

    if (
      !parsed ||
      !Array.isArray(parsed.topRow) ||
      !Array.isArray(parsed.bottomRow) ||
      parsed.topRow.length !== initialTopRow.length ||
      parsed.bottomRow.length !== initialBottomRow.length
    ) {
      return null;
    }

    const allImages = [...parsed.topRow, ...parsed.bottomRow];

    // Remove legacy Base64 data that can exceed localStorage quota.
    if (
      !allImages.every(
        (src) =>
          typeof src === 'string' &&
          !src.startsWith('data:')
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
    console.error('Failed to read birthday slider:', error);
    return null;
  }
}

export function BirthdayInfiniteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] =
    useState<BirthdayInfiniteState>(initialState);

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
      'birthday_slider_updated',
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        'storage',
        handleStorageChange
      );
      window.removeEventListener(
        'birthday_slider_updated',
        handleStorageChange
      );
    };
  }, []);

  const updateImage = useCallback(
    async (
      row: 'top' | 'bottom',
      index: number,
      file: File
    ) => {
      const rowLength =
        row === 'top'
          ? initialTopRow.length
          : initialBottomRow.length;

      if (index < 0 || index >= rowLength) {
        console.error('Invalid birthday image index:', index);
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert('Image exceeds 10 MB. Compress it before uploading.');
        return;
      }

      if (!CLOUD_NAME || !UPLOAD_PRESET) {
        alert(
          'Cloudinary settings missing. Check your .env.local file.'
        );
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
            result.error?.message ||
              'Failed to upload image to Cloudinary.'
          );
          return;
        }

        const imageUrl: string = result.secure_url;

        // Update the latest state and persist only image URLs.
        setState((previous) => {
          const updated: BirthdayInfiniteState = {
            topRow: [...previous.topRow],
            bottomRow: [...previous.bottomRow],
          };

          if (row === 'top') {
            updated.topRow[index] = imageUrl;
          } else {
            updated.bottomRow[index] = imageUrl;
          }

          saveState(updated);
          return updated;
        });

        window.dispatchEvent(
          new Event('birthday_slider_updated')
        );

        alert('Birthday image uploaded successfully!');
      } catch (error) {
        console.error('Birthday image upload error:', error);
        alert('Upload failed. Check your internet connection.');
      }
    },
    []
  );

  const resetSingleImage = useCallback(
    (row: 'top' | 'bottom', index: number) => {
      const rowLength =
        row === 'top'
          ? initialTopRow.length
          : initialBottomRow.length;

      if (index < 0 || index >= rowLength) {
        return;
      }

      setState((previous) => {
        const updated: BirthdayInfiniteState = {
          topRow: [...previous.topRow],
          bottomRow: [...previous.bottomRow],
        };

        if (row === 'top') {
          updated.topRow[index] = initialTopRow[index];
        } else {
          updated.bottomRow[index] = initialBottomRow[index];
        }

        saveState(updated);
        return updated;
      });

      window.dispatchEvent(
        new Event('birthday_slider_updated')
      );
    },
    []
  );

  const resetImages = useCallback(() => {
    const defaultState: BirthdayInfiniteState = {
      topRow: [...initialTopRow],
      bottomRow: [...initialBottomRow],
    };

    setState(defaultState);
    saveState(defaultState);

    window.dispatchEvent(
      new Event('birthday_slider_updated')
    );
  }, []);

  return (
    <BirthdayInfiniteContext.Provider
      value={{
        state,
        updateImage,
        resetSingleImage,
        resetImages,
      }}
    >
      {children}
    </BirthdayInfiniteContext.Provider>
  );
}

export function useBirthdayInfinite() {
  const context = useContext(BirthdayInfiniteContext);

  if (!context) {
    throw new Error(
      'useBirthdayInfinite must be used within a BirthdayInfiniteProvider'
    );
  }

  return context;
}
