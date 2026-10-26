'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const mediaQueries = queries.map(q => matchMedia(q));
    const handler = () => setValue(get);
    mediaQueries.forEach(query => query.addEventListener('change', handler));
    return () => mediaQueries.forEach(query => query.removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  title: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: string;
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
}

export default function Masonry({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}: MasonryProps) {
  // 4 columns configuration for desktop matching the design
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [4, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  // Trigger animation only when this section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { grid, totalHeight } = useMemo(() => {
    if (!width) return { grid: [], totalHeight: 500 };
    const colHeights = new Array(columns).fill(0);
    const gap = 10;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    const computedGrid: GridItem[] = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const h = child.height * 0.55; // Proportional scaling
      const y = colHeights[col];

      colHeights[col] += h + gap;
      return { ...child, x, y, w: columnWidth, h };
    });

    return {
      grid: computedGrid,
      totalHeight: Math.max(...colHeights)
    };
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (!imagesReady || !isInView) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      gsap.fromTo(
        selector,
        {
          opacity: 0,
          x: item.x,
          y: item.y + 50,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(8px)' })
        },
        {
          opacity: 1,
          ...animProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration,
          ease,
          delay: index * stagger
        }
      );
    });
  }, [grid, imagesReady, isInView, stagger, blurToFocus, ease, duration]);

  const handleMouseEnter = (id: string) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.25, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = (id: string) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.25, ease: 'power2.out' });
    }
  };

  return (
    <div ref={sectionRef} className="w-full">
      <div 
        ref={containerRef} 
        className="relative w-full overflow-hidden transition-all duration-300"
        style={{ height: `${totalHeight}px` }}
      >
        {grid.map(item => (
          <div
            key={item.id}
            data-key={item.id}
            className="absolute box-content cursor-pointer opacity-0"
            style={{ willChange: 'transform, width, height, opacity' }}
            onClick={() => window.open(item.url, '_blank', 'noopener')}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave(item.id)}
          >
            <div
              className="relative w-full h-full bg-cover bg-center rounded-xl overflow-hidden  shadow-lg group"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className="absolute inset-0 flex items-end p-2.5">
                <span className="text-white text-[11px] font-medium tracking-wide">{item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}