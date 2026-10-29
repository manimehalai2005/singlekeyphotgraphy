
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface WeddingInfiniteState {
  topRow: string[];
  bottomRow: string[];
}

interface WeddingInfiniteContextType {
  state: WeddingInfiniteState;
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

const STORAGE_KEY = 'singlekey_wedding_infinite_slider';
const UPDATE_EVENT = 'wedding_slider_updated';

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
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

const WeddingInfiniteContext =
  createContext<WeddingInfiniteContextType | undefined>(undefined);

const getDefaultState = (): WeddingInfiniteState => ({
  topRow: [...initialTopRow],
  bottomRow: [...initialBottomRow],
});

// Old Base64 data URLs are replaced with the original default URLs.
// Only valid image URLs are kept in localStorage.
const sanitizeState = (value: unknown): WeddingInfiniteState => {
  const parsed = value as Partial<WeddingInfiniteState> | null;

  const sanitizeRow = (
    savedRow: unknown,
    defaults: string[]
  ): string[] => {
    if (!Array.isArray(savedRow)) {
      return [...defaults];
    }

    return defaults.map((defaultUrl, index) => {
      const savedUrl = savedRow[index];

      if (
        typeof savedUrl === 'string' &&
        savedUrl.trim() !== '' &&
        !savedUrl.startsWith('data:')
      ) {
        return savedUrl;
      }

      return defaultUrl;
    });
  };

  return {
    topRow: sanitizeRow(parsed?.topRow, initialTopRow),
    bottomRow: sanitizeRow(parsed?.bottomRow, initialBottomRow),
  };
};

export function WeddingInfiniteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] =
    useState<WeddingInfiniteState>(getDefaultState);

  // Keeps the latest state available for consecutive updates.
  const stateRef = useRef<WeddingInfiniteState>(getDefaultState());

  const applyState = (nextState: WeddingInfiniteState) => {
    stateRef.current = nextState;
    setState(nextState);
  };

  const persistState = (nextState: WeddingInfiniteState) => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (error) {
      console.error('Failed to save wedding slider state:', error);
      throw error;
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        const sanitized = sanitizeState(parsed);

        applyState(sanitized);

        // Migrate old Base64 values to URL-only storage.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      }
    } catch (error) {
      console.error(
        'Failed to load wedding infinite slider from localStorage:',
        error
      );

      localStorage.removeItem(STORAGE_KEY);
      applyState(getDefaultState());
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved && saved !== 'undefined' && saved !== 'null') {
          const sanitized = sanitizeState(JSON.parse(saved));
          applyState(sanitized);
        }
      } catch (error) {
        console.error('Wedding slider storage event error:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  const updateImage = async (
    row: 'top' | 'bottom',
    index: number,
    file: File
  ): Promise<void> => {
    if (!file.type.startsWith('image/')) {
      throw new Error('Please select a valid image file.');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error('Image size must be 10 MB or less.');
    }

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      throw new Error(
        'Cloudinary configuration is missing. Check your .env.local file.'
      );
    }

    const currentState = stateRef.current;
    const currentRow =
      row === 'top' ? currentState.topRow : currentState.bottomRow;

    if (index < 0 || index >= currentRow.length) {
      throw new Error('Invalid wedding slider image index.');
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
      throw new Error(
        result.error?.message || 'Cloudinary image upload failed.'
      );
    }

    const imageUrl: string = result.secure_url;

    const latestState = stateRef.current;

    const updatedState: WeddingInfiniteState = {
      topRow: [...latestState.topRow],
      bottomRow: [...latestState.bottomRow],
    };

    if (row === 'top') {
      updatedState.topRow[index] = imageUrl;
    } else {
      updatedState.bottomRow[index] = imageUrl;
    }

    applyState(updatedState);
    persistState(updatedState);
  };

  const resetSingleImage = (
    row: 'top' | 'bottom',
    index: number
  ) => {
    const latestState = stateRef.current;
    const updatedState: WeddingInfiniteState = {
      topRow: [...latestState.topRow],
      bottomRow: [...latestState.bottomRow],
    };

    if (row === 'top') {
      if (index < 0 || index >= initialTopRow.length) return;
      updatedState.topRow[index] = initialTopRow[index];
    } else {
      if (index < 0 || index >= initialBottomRow.length) return;
      updatedState.bottomRow[index] = initialBottomRow[index];
    }

    applyState(updatedState);
    persistState(updatedState);
  };

  const resetImages = () => {
    const defaultState = getDefaultState();

    applyState(defaultState);
    persistState(defaultState);
  };

  return (
    <WeddingInfiniteContext.Provider
      value={{
        state,
        updateImage,
        resetSingleImage,
        resetImages,
      }}
    >
      {children}
    </WeddingInfiniteContext.Provider>
  );
}

export function useWeddingInfinite() {
  const context = useContext(WeddingInfiniteContext);

  if (!context) {
    throw new Error(
      'useWeddingInfinite must be used within a WeddingInfiniteProvider'
    );
  }

  return context;
}
