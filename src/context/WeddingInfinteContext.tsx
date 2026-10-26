'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WeddingInfiniteState {
  topRow: string[];
  bottomRow: string[];
}

interface WeddingInfiniteContextType {
  state: WeddingInfiniteState;
  updateImage: (row: 'top' | 'bottom', index: number, file: File) => void;
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

const WeddingInfiniteContext = createContext<WeddingInfiniteContextType | undefined>(undefined);

export function WeddingInfiniteProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WeddingInfiniteState>({
    topRow: initialTopRow,
    bottomRow: initialBottomRow,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('singlekey_wedding_infinite_slider');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.topRow) && Array.isArray(parsed.bottomRow)) {
          setState(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse wedding infinite slider from localStorage", e);
      localStorage.removeItem('singlekey_wedding_infinite_slider');
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('singlekey_wedding_infinite_slider');
        if (saved && saved !== 'undefined' && saved !== 'null') {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.topRow) && Array.isArray(parsed.bottomRow)) {
            setState(parsed);
          }
        }
      } catch (e) {
        console.error("Storage event parse error:", e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('wedding_slider_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wedding_slider_updated', handleStorageChange);
    };
  }, []);

  const updateImage = (row: 'top' | 'bottom', index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setState((prev) => {
        const updated = { ...prev };
        if (row === 'top') {
          const newTop = [...prev.topRow];
          newTop[index] = base64Image;
          updated.topRow = newTop;
        } else {
          const newBottom = [...prev.bottomRow];
          newBottom[index] = base64Image;
          updated.bottomRow = newBottom;
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem('singlekey_wedding_infinite_slider', JSON.stringify(updated));
          window.dispatchEvent(new Event('wedding_slider_updated'));
        }
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  const resetSingleImage = (row: 'top' | 'bottom', index: number) => {
    setState((prev) => {
      const updated = { ...prev };
      if (row === 'top') {
        const newTop = [...prev.topRow];
        newTop[index] = initialTopRow[index];
        updated.topRow = newTop;
      } else {
        const newBottom = [...prev.bottomRow];
        newBottom[index] = initialBottomRow[index];
        updated.bottomRow = newBottom;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('singlekey_wedding_infinite_slider', JSON.stringify(updated));
        window.dispatchEvent(new Event('wedding_slider_updated'));
      }
      return updated;
    });
  };

  const resetImages = () => {
    const defaultState = { topRow: initialTopRow, bottomRow: initialBottomRow };
    setState(defaultState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('singlekey_wedding_infinite_slider', JSON.stringify(defaultState));
      window.dispatchEvent(new Event('wedding_slider_updated'));
    }
  };

  return (
    <WeddingInfiniteContext.Provider value={{ state, updateImage, resetSingleImage, resetImages }}>
      {children}
    </WeddingInfiniteContext.Provider>
  );
}

export function useWeddingInfinite() {
  const context = useContext(WeddingInfiniteContext);
  if (!context) throw new Error('useWeddingInfinite must be used within a WeddingInfiniteProvider');
  return context;
}