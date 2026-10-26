'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  Sliders, 
  RefreshCw, 
  Layers, 
  Maximize2, 
  Clock, 
  Zap, 
  MousePointer, 
  CheckCircle2, 
  Copy, 
  Terminal,
  Code2
} from 'lucide-react';

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = false
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  useEffect(() => {
    // Load GSAP via CDN script if not already present
    if (!(window as any).gsap) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.async = true;
      script.onload = () => setGsapLoaded(true);
      document.body.appendChild(script);
    } else {
      setGsapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!gsapLoaded) return;
    const gsap = (window as any).gsap;
    if (!gsap || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationDelay, animationStagger, easeType, images, gsapLoaded]);

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    const gsap = (window as any).gsap;
    if (!gsap || !enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform);
        gsap.to(selector, {
          transform: noRotation,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto'
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);
        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto'
        });
      }
    });
  };

  const resetSiblings = () => {
    const gsap = (window as any).gsap;
    if (!gsap || !enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || 'none';
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className} `}
      ref={containerRef}
      style={{
        width: containerWidth,
        height: containerHeight
      }}
    >
      {images.map((src, idx) => (
        <div
          key={`${src}-${idx}`}
          className={`card card-${idx} absolute w-[180px] sm:w-[200px] aspect-square border-8 border-white dark:border-slate-800 rounded-[30px] overflow-hidden shadow-2xl cursor-pointer transition-shadow`}
          style={{
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            transform: transformStyles[idx] || 'none'
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img className="w-full h-full object-cover pointer-events-none" src={src} alt={`card-${idx}`} />
        </div>
      ))}
    </div>
  );
}

const collections = {
  nature: [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1426604966848-d7adacbd02bff?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60"
  ],
  architecture: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&auto=format&fit=crop&q=60"
  ],
  grayscale: [
    "https://picsum.photos/400/400?grayscale",
    "https://picsum.photos/500/500?grayscale",
    "https://picsum.photos/600/600?grayscale",
    "https://picsum.photos/700/700?grayscale",
    "https://picsum.photos/300/300?grayscale"
  ]
};

const transformPresets = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)"
];

export default function Page() {
  const [activeTheme, setActiveTheme] = useState<'nature' | 'architecture' | 'grayscale'>('nature');
  const [containerWidth, setContainerWidth] = useState<number>(460);
  const [containerHeight, setContainerHeight] = useState<number>(260);
  const [animationDelay, setAnimationDelay] = useState<number>(0.3);
  const [animationStagger, setAnimationStagger] = useState<number>(0.08);
  const [easeType, setEaseType] = useState<string>('elastic.out(1, 0.5)');
  const [enableHover, setEnableHover] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);

  const triggerReplay = () => {
    setKey(prev => prev + 1);
  };

  const codeSnippet = `import BounceCards from '@/components/BounceCards';

const images = ${JSON.stringify(collections[activeTheme], null, 2)};

const transformStyles = ${JSON.stringify(transformPresets, null, 2)};

export default function MyComponent() {
  return (
    <BounceCards
      className="custom-bounceCards"
      images={images}
      containerWidth={${containerWidth}}
      containerHeight={${containerHeight}}
      animationDelay={${animationDelay}}
      animationStagger={${animationStagger}}
      easeType="${easeType}"
      transformStyles={transformStyles}
      enableHover={${enableHover}}
    />
  );
}`;

  const handleCopyCode = () => {
    const textarea = document.createElement('textarea');
    textarea.value = codeSnippet;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
    document.body.removeChild(textarea);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/80 to-slate-950 pt-16 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm mb-3">
            <Sparkles className="w-4 h-4" />
            <span>React Bits • Next.js 14+ App Router Component Integration</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            BounceCards <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Playground</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-400">
            Interactive demonstration showcasing physics-based staggering, smooth GSAP elastic animations, and dynamic sibling pushing on hover.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Live Preview Arena */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
              
              {/* Background Glow */}
              <div className="absolute w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -top-10 -left-10"></div>
              <div className="absolute w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10"></div>

              {/* Action Toolbar */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <button
                  onClick={triggerReplay}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl border border-slate-700 transition shadow-sm"
                  title="Replay Animation"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Replay</span>
                </button>
              </div>

              {/* BounceCards Component Render */}
              <div className="w-full flex items-center justify-center py-10 overflow-hidden">
                <BounceCards
                  key={key}
                  images={collections[activeTheme]}
                  containerWidth={containerWidth}
                  containerHeight={containerHeight}
                  animationDelay={animationDelay}
                  animationStagger={animationStagger}
                  easeType={easeType}
                  transformStyles={transformPresets}
                  enableHover={enableHover}
                />
              </div>

              {/* Helper text */}
              <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <MousePointer className="w-3.5 h-3.5 text-indigo-400" />
                <span>{enableHover ? "Hover over cards to witness sibling displacement!" : "Enable hover mode in controls to interact with cards."}</span>
              </div>
            </div>

            {/* Generated Code Preview Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
                  <Code2 className="w-4 h-4 text-indigo-400" />
                  <span>Implementation Code</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-medium transition"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Code"}</span>
                </button>
              </div>
              <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-xs text-indigo-200/90 overflow-x-auto font-mono">
                {codeSnippet}
              </pre>
            </div>
          </div>

          {/* Right Panel: Interactive Playground Controls */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Playground Controls</h2>
            </div>

            {/* Collection Preset Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Image Collection Theme</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['nature', 'architecture', 'grayscale'] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => { setActiveTheme(theme); triggerReplay(); }}
                    className={`py-2 px-3 rounded-xl text-xs font-medium capitalize border transition ${
                      activeTheme === theme
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20'
                        : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Hover Mode Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800/80">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-200">Enable Hover Physics</span>
                <span className="text-xs text-slate-400">Pushes siblings aside and flattens rotation</span>
              </div>
              <button
                onClick={() => setEnableHover(!enableHover)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  enableHover ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    enableHover ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Container Dimensions */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Width: {containerWidth}px</span>
                </label>
                <input
                  type="range"
                  min="300"
                  max="600"
                  step="10"
                  value={containerWidth}
                  onChange={(e) => setContainerWidth(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Height: {containerHeight}px</span>
                </label>
                <input
                  type="range"
                  min="200"
                  max="400"
                  step="10"
                  value={containerHeight}
                  onChange={(e) => setContainerHeight(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Animation Timing Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Delay: {animationDelay}s</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1.5"
                  step="0.1"
                  value={animationDelay}
                  onChange={(e) => setAnimationDelay(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Stagger: {animationStagger}s</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  value={animationStagger}
                  onChange={(e) => setAnimationStagger(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Ease Type Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                GSAP Easing Function
              </label>
              <select
                value={easeType}
                onChange={(e) => setEaseType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="elastic.out(1, 0.8)">elastic.out(1, 0.8) [Bouncy]</option>
                <option value="elastic.out(1, 0.5)">elastic.out(1, 0.5) [High Bounce]</option>
                <option value="back.out(1.7)">back.out(1.7) [Snap]</option>
                <option value="power2.out">power2.out [Smooth]</option>
                <option value="bounce.out">bounce.out [Classic Bounce]</option>
              </select>
            </div>

            {/* Quick Setup Instructions */}
            <div className="mt-4 border-t border-slate-800 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-semibold text-slate-200">Installation Quickstart</h3>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                npm install gsap
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}