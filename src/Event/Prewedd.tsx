'use client';

import React, { CSSProperties, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

export interface DriftWallItem {
  image: string;
  title?: string;
  href?: string;
}

export interface DriftWallProps {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  style?: CSSProperties;
}

interface ColumnMeta {
  copyHeight: number;
  copies: number;
}

const DEFAULT_ITEMS: DriftWallItem[] = Array.from({ length: 15 }, (_, i) => {
  const ids = [1015, 1025, 1039, 1043, 1044, 1050, 1062, 1069, 1074, 1080, 1084, 110, 133, 164];
  return {
    image: `https://picsum.photos/id/${ids[i % ids.length]}/600/400`,
    title: `Tile ${i + 1}`,
    href: undefined
  };
});

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' ');

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index: number, variance: number): number => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export const DriftWall = ({
  items = DEFAULT_ITEMS,
  columns = 7,
  tileWidth = 240,
  tileHeight = 150,
  gap = 22,
  radius = 16,
  tilt = 10,
  turn = -8,
  roll = 0,
  perspective = 1000,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.4,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 1, // Full opacity for brighter look
  grayscale = false,
  overlayColor = '#030008',
  className = '',
  style
}: DriftWallProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColRef = useRef<number>(-1);
  const wallHoveredRef = useRef<boolean>(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef<number | null>(null);

  const [containerHeight, setContainerHeight] = useState(600);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const columnItems = useMemo<DriftWallItem[][]>(() => {
    const cols: DriftWallItem[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => cols[i % columns].push(item));
    return cols.map(col => (col.length ? col : items.slice(0, 1)));
  }, [items, columns]);

  const columnMeta = useMemo<ColumnMeta[]>(() => {
    const unit = tileHeight + gap;
    return columnItems.map(col => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 600);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo<number[]>(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.18) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      if (!reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = baseVelocities[c] * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      } else {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const el = trackRefs.current[c];
          const meta = columnMeta[c];
          if (el && meta) el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = useCallback((id: string, index: number): void => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback((): void => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5
        };
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && hit.closest ? (hit.closest('[data-tile-id]') as HTMLElement | null) : null;
      if (!tile) return;
      const id = tile.dataset.tileId ?? null;
      if (id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColRef.current = Number(tile.dataset.col);
      setActiveId(id);
    },
    [parallax, reduced]
  );

  const handlePointerLeaveWall = useCallback((): void => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const maskStyle =
    'radial-gradient(ellipse 78% 82% at 50% 46%, #000 var(--dw-edge), transparent 100%), ' +
    'linear-gradient(to top, #000 var(--dw-edge), transparent 100%)';

  const cssVars = useMemo<CSSProperties>(
    () =>
      ({
        '--dw-tile-w': `${tileWidth}px`,
        '--dw-tile-h': `${tileHeight}px`,
        '--dw-gap': `${gap}px`,
        '--dw-radius': `${radius}px`,
        '--dw-lift': `${lift}px`,
        '--dw-dim': dim,
        '--dw-gray': grayscale ? 1 : 0,
        '--dw-overlay': overlayColor,
        '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`,
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
        WebkitMaskImage: maskStyle,
        maskImage: maskStyle,
        WebkitMaskComposite: 'source-in',
        maskComposite: 'intersect',
        ...style
      }) as CSSProperties,
    [tileWidth, tileHeight, gap, radius, lift, dim, grayscale, overlayColor, fade, perspective, maskStyle, style]
  );

  const tileClass = cx(
    'group/tile relative block flex-none cursor-pointer outline-none',
    'w-full h-[calc(var(--dw-tile-h)+var(--dw-gap))] [transform-style:preserve-3d]'
  );
  const innerClass = cx(
    'pointer-events-none absolute inset-[calc(var(--dw-gap)/2)] block overflow-hidden bg-[#0b0b12]',
    'rounded-[var(--dw-radius)] opacity-[var(--dw-dim)] [transform:translateZ(0)]',
    'transition-[transform,opacity,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
    'group-[.is-active]/tile:opacity-100 group-[.is-active]/tile:[transform:translateZ(var(--dw-lift))]',
    'group-[.is-active]/tile:shadow-[0_0_50px_rgba(236,72,153,1),0_0_80px_rgba(168,85,247,0.8)]',
    'group-focus-visible/tile:opacity-100 group-focus-visible/tile:[transform:translateZ(var(--dw-lift))]'
  );

  // Updated image filter for maximum brightness & vivid colors
  const imgClass = cx(
    'block h-full w-full select-none object-cover',
    '[filter:grayscale(var(--dw-gray))_saturate(1.4)_brightness(1.35)_contrast(1.05)]',
    'transition-[filter] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
    'group-[.is-active]/tile:[filter:grayscale(0)_saturate(1.6)_brightness(1.4)] group-focus-visible/tile:[filter:grayscale(0)_saturate(1.6)_brightness(1.4)]'
  );
  const overlayClass = cx(
    'pointer-events-none absolute inset-0 bg-[var(--dw-overlay)] opacity-0',
    'transition-opacity duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
  );

  const renderTile = (item: DriftWallItem, id: string, colIndex: number) => {
    const inner = (
      <span className={innerClass}>
        <img
          src={item.image}
          alt={item.title ?? ''}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={imgClass}
        />
        <span className={overlayClass} aria-hidden="true" />
      </span>
    );
    const commonProps = {
      className: cx(tileClass, activeId === id && 'is-active'),
      'data-tile-id': id,
      'data-col': colIndex,
      onFocus: () => activate(id, colIndex),
      onBlur: release
    };
    if (item.href) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }
    return (
      <div key={id} tabIndex={0} role="button" aria-label={item.title ?? 'tile'} {...commonProps}>
        {inner}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cx('relative h-full w-full overflow-hidden', className)}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Drifting wall of tiles"
    >
      <div
        ref={planeRef}
        className="absolute left-1/2 top-1/2 flex cursor-pointer flex-row [transform-style:preserve-3d] [transform-origin:50%_50%] will-change-transform"
      >
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          const copies = Array.from({ length: meta.copies });
          return (
            <div
              className="relative w-[calc(var(--dw-tile-w)+var(--dw-gap))] [transform-style:preserve-3d]"
              key={`col-${c}`}
            >
              <div
                className="flex flex-col [transform-style:preserve-3d] will-change-transform"
                ref={el => {
                  trackRefs.current[c] = el;
                }}
              >
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) => renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function WeddingDriftGallery() {
  const weddingItems = [
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHPU5RP6NzjeO3t5kFparUjSi0vIXXUtn2ZaS2wcfQlCsGodP0vD9dHOx&s=10', title: 'First Dance' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0tlgw2pmGEvanYW7VJeWQs_u-6-AIcFWnpOEL47PngptFZxFnT0Zxso&s=10', title: 'Bridal Prep' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHPU5RP6NzjeO3t5kFparUjSi0vIXXUtn2ZaS2wcfQlCsGodP0vD9dHOx&s=10', title: 'Ceremony Vows' },
    { image: 'https://richardarunachala.wordpress.com/wp-content/uploads/2013/09/dsc01668_thumb.jpg?w=364&h=484', title: 'Reception Details' },
    { image: 'https://www.focuzstudios.in/wp-content/uploads/2023/02/brahmin-wedding-rituals-photos-73.jpg', title: 'Sunset Portraits' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHPU5RP6NzjeO3t5kFparUjSi0vIXXUtn2ZaS2wcfQlCsGodP0vD9dHOx&s=10', title: 'Table Settings' },
    { image: 'https://img.perniaspopupshop.com/store-locator-v2/uploads/Nishchayathramsec1mob3_3b5233dcb0.jpg', title: 'Couple Entry' },
    { image: 'https://www.shutterstock.com/image-photo/brahmin-metti-ring-rituals-ceremony-260nw-2475534303.jpg', title: 'Floral Decor' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0tlgw2pmGEvanYW7VJeWQs_u-6-AIcFWnpOEL47PngptFZxFnT0Zxso&s=10', title: 'Ring Exchange' },
    { image: 'https://www.focuzstudios.in/wp-content/uploads/2023/02/brahmin-wedding-rituals-photos-73.jpg', title: 'Haldi Ceremony' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHPU5RP6NzjeO3t5kFparUjSi0vIXXUtn2ZaS2wcfQlCsGodP0vD9dHOx&s=10', title: 'Mandap Setup' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0tlgw2pmGEvanYW7VJeWQs_u-6-AIcFWnpOEL47PngptFZxFnT0Zxso&s=10', title: 'Reception Stage' },
    { image: 'https://weddingsutra.com/images/wedding-images/entertaining/tamil-traditional-wedding/tamil-wedding-ritual-intro.webp', title: 'Bridal Entry' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1IiCqmHHzazY-AWhLxnaWrJd8tyo42-Xs5vCWlLi4oFDa0RuFCnF4UU1q&s=10', title: 'Groom Portrait' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1IiCqmHHzazY-AWhLxnaWrJd8tyo42-Xs5vCWlLi4oFDa0RuFCnF4UU1q&s=10', title: 'Mehendi Night' },
    { image: 'https://weddingsutra.com/images/wedding-images/entertaining/tamil-traditional-wedding/tamil-wedding-ritual-intro.webp', title: 'Sangeet Dance' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHPU5RP6NzjeO3t5kFparUjSi0vIXXUtn2ZaS2wcfQlCsGodP0vD9dHOx&s=10', title: 'Jewelry Details' },
    { image: 'https://richardarunachala.wordpress.com/wp-content/uploads/2013/09/dsc01668_thumb.jpg?w=364&h=484', title: 'Reception Lights' },
    { image: 'https://www.edigamatchmaker.com/uploads/blog_image/blog_69.jpeg', title: 'Groom Entry' },
    { image: 'https://www.namastegod.com/static/a34b61cad5d7ad11dc91f846ecc8bd9c/212bf/baby-shower.jpg', title: 'Candid Moments' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1IiCqmHHzazY-AWhLxnaWrJd8tyo42-Xs5vCWlLi4oFDa0RuFCnF4UU1q&s=10', title: 'Bride Smile' },
    { image: 'https://www.namastegod.com/static/a34b61cad5d7ad11dc91f846ecc8bd9c/212bf/baby-shower.jpg', title: 'Wedding Cake' },
    { image: 'https://www.shutterstock.com/image-photo/brahmin-metti-ring-rituals-ceremony-260nw-2475534303.jpg', title: 'Romantic Walk' },
    { image: 'https://www.focuzstudios.in/wp-content/uploads/2023/02/brahmin-wedding-rituals-photos-73.jpg', title: 'Stage Lighting' },
    { image: 'https://richardarunachala.wordpress.com/wp-content/uploads/2013/09/dsc01668_thumb.jpg?w=364&h=484', title: 'Celebration' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy0tlgw2pmGEvanYW7VJeWQs_u-6-AIcFWnpOEL47PngptFZxFnT0Zxso&s=10', title: 'Smile' },
    { image: 'https://www.edigamatchmaker.com/uploads/blog_image/blog_69.jpeg', title: 'Bridal Glow' },
    { image: 'https://www.shutterstock.com/image-photo/brahmin-metti-ring-rituals-ceremony-260nw-2475534303.jpg', title: 'Scenic Backdrop' },
    { image: 'https://thumbs.dreamstime.com/b/indian-tamil-traditional-wedding-cerremony-23538013.jpg', title: 'Portrait Session' },
    { image: 'https://weddingsutra.com/images/wedding-images/entertaining/tamil-traditional-wedding/tamil-wedding-ritual-intro.webp', title: 'Traditional Attire' },
    { image: 'https://thetalesoftradition.com/wp-content/uploads/2024/01/vivekkrishnanphotography-779-1024x683.jpg', title: 'Happy Guests' },
    { image: 'https://petermalakoff.jalbum.net/AGNILINGAM%20HOUSE%20PUJA%20TIRUVANNAMALAI%2C%20TAMIL%20NADU%202011/slides/Worship%20of%20the%20cow%20on%20threshold%20of%20house.JPG', title: 'Groom Smile' },
    { image: 'https://img.perniaspopupshop.com/store-locator-v2/uploads/Maruvidumainmobile_fc0401f4be.jpg', title: 'Bridal Portrait' },
    { image: 'https://img.staticmb.com/mbcontent/images/crop/uploads/ver2/XIwvQlc61t8ZIpanz4mAnjUzcpDvwxtAGgoneFOu_Uc5mA/puthandu-tamil-new-year-decoration-ideas_0_1200.jpg', title: 'Friends & Family' },
    { image: 'https://phometo.com/images/gallery/Housewarming_Photoshoot_bangalore.jpg', title: 'Joyful Moments' }
  ];

  return (
    <section className="relative w-screen h-screen bg-[#020005] overflow-hidden mx-auto p-0 left-[calc(-50vw+50%)]">
      <div className="absolute inset-0 z-10 w-full h-full">
        <DriftWall
          items={weddingItems}
          columns={7}
          tileWidth={240}
          tileHeight={150}
          gap={22}
          tilt={10}
          turn={-8}
          perspective={1000}
          speed={42}
          direction="up"
          variance={0.4}
          parallax={0.6}
          lift={64}
          fade={0.6}
          dim={1}
        />
      </div>
    </section>
  );
}