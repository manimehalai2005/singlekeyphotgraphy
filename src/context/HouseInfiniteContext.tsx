
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface HouseInfiniteState {
  topRow: string[];
  bottomRow: string[];
}

interface HouseInfiniteContextType {
  state: HouseInfiniteState;
  updateImage: (row: 'top' | 'bottom', index: number, file: File) => void;
  resetSingleImage: (row: 'top' | 'bottom', index: number) => void;
  resetImages: () => void;
}

const STORAGE_KEY = 'singlekey_house_infinite_slider';
const UPDATE_EVENT = 'house_slider_updated';
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

const getDefaultState = (): HouseInfiniteState => ({
  topRow: [...initialTopRow],
  bottomRow: [...initialBottomRow],
});

const isValidImageUrl = (value: unknown): value is string =>
  typeof value === 'string' && /^https?:\/\//i.test(value);

const sanitizeSavedState = (parsed: unknown): HouseInfiniteState => {
  const defaults = getDefaultState();

  if (!parsed || typeof parsed !== 'object') {
    return defaults;
  }

  const saved = parsed as Partial<HouseInfiniteState>;

  return {
    topRow: defaults.topRow.map((defaultUrl, index) => {
      const value = saved.topRow?.[index];
      return isValidImageUrl(value) ? value : defaultUrl;
    }),
    bottomRow: defaults.bottomRow.map((defaultUrl, index) => {
      const value = saved.bottomRow?.[index];
      return isValidImageUrl(value) ? value : defaultUrl;
    }),
  };
};

const HouseInfiniteContext =
  createContext<HouseInfiniteContextType | undefined>(undefined);

export function HouseInfiniteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<HouseInfiniteState>(getDefaultState);

  // Keep the latest state available for consecutive image uploads.
  const stateRef = useRef<HouseInfiniteState>(getDefaultState());

  const persistState = (nextState: HouseInfiniteState) => {
    stateRef.current = nextState;
    setState(nextState);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (error) {
      console.error('Failed to save house slider state:', error);
      alert('Unable to save the image URLs in this browser.');
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
        const nextState = sanitizeSavedState(parsed);

        stateRef.current = nextState;
        setState(nextState);

        // Replace legacy Base64 values with URL-only state.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      } catch (error) {
        console.error('Failed to load house slider state:', error);
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
      alert('Cloudinary configuration is missing. Please check .env.local.');
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
        throw new Error(result.error?.message || 'Cloudinary upload failed.');
      }

      const imageUrl: string = result.secure_url;
      const currentState = stateRef.current;

      const updatedState: HouseInfiniteState = {
        topRow: [...currentState.topRow],
        bottomRow: [...currentState.bottomRow],
      };

      if (row === 'top') {
        if (index < 0 || index >= updatedState.topRow.length) {
          alert('Invalid top-row image index.');
          return;
        }

        updatedState.topRow[index] = imageUrl;
      } else {
        if (index < 0 || index >= updatedState.bottomRow.length) {
          alert('Invalid bottom-row image index.');
          return;
        }

        updatedState.bottomRow[index] = imageUrl;
      }

      persistState(updatedState);
      console.log('House slider image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('House slider image upload failed:', error);
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
    const currentState = stateRef.current;

    const updatedState: HouseInfiniteState = {
      topRow: [...currentState.topRow],
      bottomRow: [...currentState.bottomRow],
    };

    if (row === 'top') {
      if (index < 0 || index >= initialTopRow.length) return;
      updatedState.topRow[index] = initialTopRow[index];
    } else {
      if (index < 0 || index >= initialBottomRow.length) return;
      updatedState.bottomRow[index] = initialBottomRow[index];
    }

    persistState(updatedState);
  };

  const resetImages = (): void => {
    persistState(getDefaultState());
  };

  return (
    <HouseInfiniteContext.Provider
      value={{
        state,
        updateImage,
        resetSingleImage,
        resetImages,
      }}
    >
      {children}
    </HouseInfiniteContext.Provider>
  );
}

export function useHouseInfinite() {
  const context = useContext(HouseInfiniteContext);

  if (!context) {
    throw new Error(
      'useHouseInfinite must be used within a HouseInfiniteProvider',
    );
  }

  return context;
}
