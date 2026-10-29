
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface NamingInfiniteState {
  topRow: string[];
  bottomRow: string[];
}

interface NamingInfiniteContextType {
  state: NamingInfiniteState;
  updateImage: (row: 'top' | 'bottom', index: number, file: File) => void;
  resetSingleImage: (row: 'top' | 'bottom', index: number) => void;
  resetImages: () => void;
}

const STORAGE_KEY = 'singlekey_naming_infinite_slider';
const UPDATE_EVENT = 'naming_slider_updated';
const MAX_FILE_SIZE = 10 * 1024 * 1024;

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

const getDefaultState = (): NamingInfiniteState => ({
  topRow: [...initialTopRow],
  bottomRow: [...initialBottomRow],
});

const isValidImageUrl = (value: unknown): value is string =>
  typeof value === 'string' && /^https?:\/\//i.test(value);

const sanitizeState = (value: unknown): NamingInfiniteState => {
  const defaults = getDefaultState();

  if (!value || typeof value !== 'object') {
    return defaults;
  }

  const saved = value as Partial<NamingInfiniteState>;

  return {
    topRow: defaults.topRow.map((url, index) =>
      isValidImageUrl(saved.topRow?.[index])
        ? saved.topRow[index]
        : url,
    ),
    bottomRow: defaults.bottomRow.map((url, index) =>
      isValidImageUrl(saved.bottomRow?.[index])
        ? saved.bottomRow[index]
        : url,
    ),
  };
};

const NamingInfiniteContext =
  createContext<NamingInfiniteContextType | undefined>(undefined);

export function NamingInfiniteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<NamingInfiniteState>(getDefaultState);

  const stateRef = useRef<NamingInfiniteState>(getDefaultState());

  const persistState = (updated: NamingInfiniteState) => {
    stateRef.current = updated;
    setState(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (error) {
      console.error('Failed to save naming slider state:', error);
      alert('Unable to save image URLs in browser storage.');
    }
  };

  useEffect(() => {
    const loadSavedState = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved || saved === 'undefined' || saved === 'null') {
          return;
        }

        const parsed: unknown = JSON.parse(saved);
        const sanitized = sanitizeState(parsed);

        stateRef.current = sanitized;
        setState(sanitized);

        // Keep only HTTP(S) URLs; replace legacy Base64 values.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      } catch (error) {
        console.error('Failed to load naming slider state:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    loadSavedState();

    const handleStorageChange = () => {
      loadSavedState();
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
    file: File,
  ): Promise<void> => {
    const currentRow =
      row === 'top' ? stateRef.current.topRow : stateRef.current.bottomRow;

    if (index < 0 || index >= currentRow.length) {
      alert('Invalid image index.');
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
      alert('Cloudinary configuration is missing. Check .env.local.');
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
      const latestState = stateRef.current;

      const updated: NamingInfiniteState = {
        topRow: [...latestState.topRow],
        bottomRow: [...latestState.bottomRow],
      };

      if (row === 'top') {
        updated.topRow[index] = imageUrl;
      } else {
        updated.bottomRow[index] = imageUrl;
      }

      persistState(updated);
      console.log('Naming slider image uploaded:', imageUrl);
    } catch (error) {
      console.error('Naming slider image upload failed:', error);

      alert(
        error instanceof Error
          ? `Image upload failed: ${error.message}`
          : 'Image upload failed. Please try again.',
      );
    }
  };

  const resetSingleImage = (
    row: 'top' | 'bottom',
    index: number,
  ): void => {
    const defaults = getDefaultState();
    const latestState = stateRef.current;

    const updated: NamingInfiniteState = {
      topRow: [...latestState.topRow],
      bottomRow: [...latestState.bottomRow],
    };

    if (row === 'top') {
      if (index < 0 || index >= defaults.topRow.length) return;
      updated.topRow[index] = defaults.topRow[index];
    } else {
      if (index < 0 || index >= defaults.bottomRow.length) return;
      updated.bottomRow[index] = defaults.bottomRow[index];
    }

    persistState(updated);
  };

  const resetImages = (): void => {
    persistState(getDefaultState());
  };

  return (
    <NamingInfiniteContext.Provider
      value={{
        state,
        updateImage,
        resetSingleImage,
        resetImages,
      }}
    >
      {children}
    </NamingInfiniteContext.Provider>
  );
}

export function useNamingInfinite() {
  const context = useContext(NamingInfiniteContext);

  if (!context) {
    throw new Error(
      'useNamingInfinite must be used within a NamingInfiniteProvider',
    );
  }

  return context;
}
