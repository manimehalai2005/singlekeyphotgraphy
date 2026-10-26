"use client";

import React, { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import * as THREE from "three";

type Orientation = "portrait" | "landscape";

interface LanyardProps {
  frontImage: string;
  backImage: string;
  orientation?: Orientation;
  className?: string;
  style?: CSSProperties;
}

const CARD_SIZES: Record<Orientation, [number, number]> = {
  portrait: [1.6, 2.25],
  landscape: [2.25, 1.6],
};

const FOV = 24;

// Very thin card
const CARD_THICKNESS = 0.015;

export const Lanyard: React.FC<LanyardProps> = ({
  frontImage,
  backImage,
  orientation = "portrait",
  className = "",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      FOV,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Card size
    const [width, height] = CARD_SIZES[orientation];

    // Thin card body
    const cardGeometry = new THREE.BoxGeometry(
      width,
      height,
      CARD_THICKNESS
    );

    const cardMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0,
    });

    const card = new THREE.Mesh(cardGeometry, cardMaterial);
    scene.add(card);

    const textureLoader = new THREE.TextureLoader();

    // =========================
    // FRONT IMAGE
    // =========================
    textureLoader.load(frontImage, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;

      const frontMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
      });

      const frontGeometry = new THREE.PlaneGeometry(
        width - 0.04,
        height - 0.04
      );

      const frontImageMesh = new THREE.Mesh(
        frontGeometry,
        frontMaterial
      );

      frontImageMesh.position.z = CARD_THICKNESS / 2 + 0.001;
      card.add(frontImageMesh);
    });

    // =========================
    // BACK IMAGE
    // =========================
    textureLoader.load(backImage, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;

      const backMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.FrontSide,
      });

      const backGeometry = new THREE.PlaneGeometry(
        width - 0.04,
        height - 0.04
      );

      const backImageMesh = new THREE.Mesh(
        backGeometry,
        backMaterial
      );

      backImageMesh.position.z = -(CARD_THICKNESS / 2 + 0.001);
      backImageMesh.rotation.y = Math.PI;
      card.add(backImageMesh);
    });

   
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      card.rotation.y += 0.008;
      renderer.render(scene, camera);
    };

    animate();

    // =========================
    // RESIZE
    // =========================
    const handleResize = () => {
      if (!container) return;

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // =========================
    // CLEANUP
    // =========================
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      cardGeometry.dispose();
      cardMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [frontImage, backImage, orientation]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] ${className}`}
      style={style}
    />
  );
};

export default function WeddingLanyardGallery() {
  const weddingCards = [
    {
      title: "Full Day Wedding",
      subtitle: "We don't pose your love. We simply follow it.",
      frontImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000",
      backImage:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000",
    },
    {
      title: "Engagement Session",
      subtitle: "No posing. No pressure. Just you and the light.",
      frontImage:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000",
      backImage:
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000",
    },
    {
      title: "Destination Wedding",
      subtitle: "Capturing your moments across borders and horizons.",
      frontImage:
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000",
      backImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000",
    },
  ];

  return (
    <section className=" bg-black py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {weddingCards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-black p-6 "
          >
            {/* Lanyard 3D Canvas Container */}
            <div className="w-full h-[400px]">
              <Lanyard
                frontImage={card.frontImage}
                backImage={card.backImage}
              />
            </div>

            {/* Card Description */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-serif italic text-white">
                {card.title}
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                {card.subtitle}
              </p>
              <button className="mt-4 text-xs font-semibold uppercase tracking-widest text-white  pb-1 hover:opacity-75 transition-opacity">
                Explore the Work
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}