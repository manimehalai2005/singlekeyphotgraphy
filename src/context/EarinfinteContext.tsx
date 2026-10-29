
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface EarInfiniteState {
  topRow: string[];
  bottomRow: string[];
}

interface EarInfiniteContextType {
  state: EarInfiniteState;
  updateImage: (row: 'top' | 'bottom', index: number, file: File) => void;
  resetSingleImage: (row: 'top' | 'bottom', index: number) => void;
  resetImages: () => void;
}

const STORAGE_KEY = 'singlekey_ear_infinite_slider';
const UPDATE_EVENT = 'ear_slider_updated';

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

const createDefaultState = (): EarInfiniteState => ({
  topRow: [...initialTopRow],
  bottomRow: [...initialBottomRow],
});

const EarInfiniteContext = createContext<
  EarInfiniteContextType | undefined
>(undefined);

const isValidState = (value: unknown): value is EarInfiniteState => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as EarInfiniteState;

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

export function EarInfiniteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<EarInfiniteState>(createDefaultState);

  // Keep the latest state available when multiple uploads happen quickly.
  const stateRef = useRef<EarInfiniteState>(createDefaultState());

  const persistState = (nextState: EarInfiniteState) => {
    stateRef.current = nextState;
    setState(nextState);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      window.dispatchEvent(new Event(UPDATE_EVENT));
    } catch (error) {
      console.error('Failed to save ear slider images:', error);
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

        if (isValidState(parsed)) {
          stateRef.current = parsed;
          setState(parsed);
        } else {
          // Remove invalid or old Base64 data to prevent quota errors.
          localStorage.removeItem(STORAGE_KEY);

          const defaults = createDefaultState();
          stateRef.current = defaults;
          setState(defaults);
        }
      } catch (error) {
        console.error('Failed to load ear slider images:', error);

        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore localStorage cleanup errors.
        }

        const defaults = createDefaultState();
        stateRef.current = defaults;
        setState(defaults);
      }
    };

    loadSavedState();

    const handleStorageChange = (event: Event) => {
      // Ignore our own same-tab update event to avoid redundant state updates.
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

  const updateImage = async (
    row: 'top' | 'bottom',
    index: number,
    file: File
  ) => {
    try {
      // Validate the selected file.
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Keep uploads within 10 MB.
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

      const rowImages =
        row === 'top'
          ? stateRef.current.topRow
          : stateRef.current.bottomRow;

      if (index < 0 || index >= rowImages.length) {
        throw new Error('Invalid image index.');
      }

      // Upload the selected image to Cloudinary.
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
          result.error?.message || 'Cloudinary image upload failed.'
        );
      }

      // Save only the Cloudinary URL, never Base64 data.
      const currentState = stateRef.current;

      const updatedState: EarInfiniteState = {
        topRow: [...currentState.topRow],
        bottomRow: [...currentState.bottomRow],
      };

      if (row === 'top') {
        updatedState.topRow[index] = result.secure_url;
      } else {
        updatedState.bottomRow[index] = result.secure_url;
      }

      persistState(updatedState);
    } catch (error) {
      console.error('Ear slider image upload failed:', error);

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
    const currentState = stateRef.current;

    const updatedState: EarInfiniteState = {
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

  const resetImages = () => {
    persistState(createDefaultState());
  };

  return (
    <EarInfiniteContext.Provider
      value={{
        state,
        updateImage,
        resetSingleImage,
        resetImages,
      }}
    >
      {children}
    </EarInfiniteContext.Provider>
  );
}

export function useEarInfinite() {
  const context = useContext(EarInfiniteContext);

  if (!context) {
    throw new Error(
      'useEarInfinite must be used within an EarInfiniteProvider'
    );
  }

  return context;
}
