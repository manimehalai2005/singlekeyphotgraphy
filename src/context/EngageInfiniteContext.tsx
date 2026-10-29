
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface EngageInfiniteState {
  topRow: string[];
  bottomRow: string[];
}

interface EngageInfiniteContextType {
  state: EngageInfiniteState;
  updateImage: (row: 'top' | 'bottom', index: number, file: File) => void;
  resetSingleImage: (row: 'top' | 'bottom', index: number) => void;
  resetImages: () => void;
}

const STORAGE_KEY = 'singlekey_engage_infinite_slider';
const UPDATE_EVENT = 'engage_slider_updated';

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

const createDefaultState = (): EngageInfiniteState => ({
  topRow: [...initialTopRow],
  bottomRow: [...initialBottomRow],
});

const isValidState = (value: unknown): value is EngageInfiniteState => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as EngageInfiniteState;

  return (
    Array.isArray(candidate.topRow) &&
    Array.isArray(candidate.bottomRow) &&
    candidate.topRow.length === initialTopRow.length &&
    candidate.bottomRow.length === initialBottomRow.length &&
    [...candidate.topRow, ...candidate.bottomRow].every(
      (image) =>
        typeof image === 'string' &&
        image.length > 0 &&
        !image.startsWith('data:image/')
    )
  );
};

const EngageInfiniteContext = createContext<
  EngageInfiniteContextType | undefined
>(undefined);

export function EngageInfiniteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] =
    useState<EngageInfiniteState>(createDefaultState);

  const stateRef = useRef<EngageInfiniteState>(createDefaultState());

  const persistState = (updated: EngageInfiniteState) => {
    stateRef.current = updated;
    setState(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (error) {
      console.error('Failed to save engagement slider:', error);
    }
  };

  // Load saved URLs and clean up invalid or old Base64 data.
  useEffect(() => {
    const loadSavedState = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved || saved === 'undefined' || saved === 'null') {
          return;
        }

        const parsed: unknown = JSON.parse(saved);

        if (isValidState(parsed)) {
          stateRef.current = parsed;
          setState(parsed);
        } else {
          localStorage.removeItem(STORAGE_KEY);

          const defaults = createDefaultState();
          stateRef.current = defaults;
          setState(defaults);
        }
      } catch (error) {
        console.error('Failed to load engagement slider:', error);

        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore storage cleanup errors.
        }

        const defaults = createDefaultState();
        stateRef.current = defaults;
        setState(defaults);
      }
    };

    loadSavedState();

    const handleStorageChange = (event: Event) => {
      if (event.type === UPDATE_EVENT) return;
      loadSavedState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  // Upload to Cloudinary; save only the resulting URL.
  const updateImage = async (
    row: 'top' | 'bottom',
    index: number,
    file: File
  ) => {
    try {
      const currentRow =
        row === 'top'
          ? stateRef.current.topRow
          : stateRef.current.bottomRow;

      if (index < 0 || index >= currentRow.length) {
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

      const latestState = stateRef.current;

      const updated: EngageInfiniteState = {
        topRow: [...latestState.topRow],
        bottomRow: [...latestState.bottomRow],
      };

      if (row === 'top') {
        updated.topRow[index] = result.secure_url;
      } else {
        updated.bottomRow[index] = result.secure_url;
      }

      persistState(updated);
    } catch (error) {
      console.error('Engagement image upload failed:', error);

      alert(
        error instanceof Error
          ? error.message
          : 'Image upload failed. Please try again.'
      );
    }
  };

  const resetSingleImage = (
    row: 'top' | 'bottom',
    index: number
  ) => {
    const currentRow =
      row === 'top' ? initialTopRow : initialBottomRow;

    if (index < 0 || index >= currentRow.length) return;

    const updated: EngageInfiniteState = {
      topRow: [...stateRef.current.topRow],
      bottomRow: [...stateRef.current.bottomRow],
    };

    if (row === 'top') {
      updated.topRow[index] = initialTopRow[index];
    } else {
      updated.bottomRow[index] = initialBottomRow[index];
    }

    persistState(updated);
  };

  const resetImages = () => {
    persistState(createDefaultState());
  };

  return (
    <EngageInfiniteContext.Provider
      value={{
        state,
        updateImage,
        resetSingleImage,
        resetImages,
      }}
    >
      {children}
    </EngageInfiniteContext.Provider>
  );
}

export function useEngageInfinite() {
  const context = useContext(EngageInfiniteContext);

  if (!context) {
    throw new Error(
      'useEngageInfinite must be used within an EngageInfiniteProvider'
    );
  }

  return context;
}
