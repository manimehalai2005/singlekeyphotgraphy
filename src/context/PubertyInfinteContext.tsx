
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface PubertyInfiniteState {
  topRow: string[];
  bottomRow: string[];
}

interface PubertyInfiniteContextType {
  state: PubertyInfiniteState;
  updateImage: (
    row: 'top' | 'bottom',
    index: number,
    file: File
  ) => Promise<void>;
  resetSingleImage: (row: 'top' | 'bottom', index: number) => void;
  resetImages: () => void;
}

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

const STORAGE_KEY = 'singlekey_puberty_infinite_slider';
const UPDATE_EVENT = 'puberty_slider_updated';

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const PubertyInfiniteContext =
  createContext<PubertyInfiniteContextType | undefined>(undefined);

const defaultState: PubertyInfiniteState = {
  topRow: initialTopRow,
  bottomRow: initialBottomRow,
};

function sanitizeRow(
  savedRow: unknown,
  defaultRow: string[]
): string[] {
  return defaultRow.map((defaultUrl, index) => {
    if (!Array.isArray(savedRow)) {
      return defaultUrl;
    }

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
}

function sanitizeState(value: unknown): PubertyInfiniteState {
  const saved = value as Partial<PubertyInfiniteState> | null;

  return {
    topRow: sanitizeRow(saved?.topRow, initialTopRow),
    bottomRow: sanitizeRow(saved?.bottomRow, initialBottomRow),
  };
}

function readSavedState(): PubertyInfiniteState {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved || saved === 'undefined' || saved === 'null') {
      return defaultState;
    }

    const parsed: unknown = JSON.parse(saved);
    const sanitized = sanitizeState(parsed);

    // Remove legacy Base64 images from localStorage.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));

    return sanitized;
  } catch (error) {
    console.error('Failed to read puberty infinite slider:', error);
    localStorage.removeItem(STORAGE_KEY);
    return defaultState;
  }
}

export function PubertyInfiniteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] =
    useState<PubertyInfiniteState>(defaultState);

  const stateRef = useRef<PubertyInfiniteState>(defaultState);

  useEffect(() => {
    const savedState = readSavedState();

    stateRef.current = savedState;
    setState(savedState);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = readSavedState();

      stateRef.current = savedState;
      setState(savedState);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(UPDATE_EVENT, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(UPDATE_EVENT, handleStorageChange);
    };
  }, []);

  const persistState = (updatedState: PubertyInfiniteState) => {
    stateRef.current = updatedState;
    setState(updatedState);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    }
  };

  const updateImage = async (
    row: 'top' | 'bottom',
    index: number,
    file: File
  ): Promise<void> => {
    const currentRow =
      row === 'top'
        ? stateRef.current.topRow
        : stateRef.current.bottomRow;

    if (index < 0 || index >= currentRow.length) {
      throw new Error('Invalid image index.');
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

    const imageUrl = result.secure_url as string;

    // Use the latest state so consecutive uploads do not overwrite each other.
    const updatedState: PubertyInfiniteState = {
      topRow: [...stateRef.current.topRow],
      bottomRow: [...stateRef.current.bottomRow],
    };

    if (row === 'top') {
      updatedState.topRow[index] = imageUrl;
    } else {
      updatedState.bottomRow[index] = imageUrl;
    }

    // Save only the Cloudinary URL, not Base64 data.
    persistState(updatedState);
  };

  const resetSingleImage = (
    row: 'top' | 'bottom',
    index: number
  ) => {
    const currentRow =
      row === 'top'
        ? stateRef.current.topRow
        : stateRef.current.bottomRow;

    const originalRow =
      row === 'top' ? initialTopRow : initialBottomRow;

    if (index < 0 || index >= currentRow.length) {
      return;
    }

    const updatedState: PubertyInfiniteState = {
      topRow: [...stateRef.current.topRow],
      bottomRow: [...stateRef.current.bottomRow],
    };

    if (row === 'top') {
      updatedState.topRow[index] = originalRow[index];
    } else {
      updatedState.bottomRow[index] = originalRow[index];
    }

    persistState(updatedState);
  };

  const resetImages = () => {
    const freshDefaultState: PubertyInfiniteState = {
      topRow: [...initialTopRow],
      bottomRow: [...initialBottomRow],
    };

    persistState(freshDefaultState);
  };

  return (
    <PubertyInfiniteContext.Provider
      value={{
        state,
        updateImage,
        resetSingleImage,
        resetImages,
      }}
    >
      {children}
    </PubertyInfiniteContext.Provider>
  );
}

export function usePubertyInfinite() {
  const context = useContext(PubertyInfiniteContext);

  if (!context) {
    throw new Error(
      'usePubertyInfinite must be used within a PubertyInfiniteProvider'
    );
  }

  return context;
}
