"use client";

import { useEffect, useRef } from "react";

type Sparkle = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  speedY: number;
  speedX: number;
  phase: number;
  blinkSpeed: number;
  rotation: number;
  rotationSpeed: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
};

export default function StarfieldCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let animationId = 0;

    const pointer = { x: -1000, y: -1000, active: false };
    const sparkles: Sparkle[] = [];
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sparkles.length = 0;

      const count = Math.min(180, Math.floor((width * height) / 5500));

      for (let i = 0; i < count; i++) {
        sparkles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 5.5 + 3.5,
          alpha: Math.random(),
          maxAlpha: Math.random() * 0.4 + 0.6,
          speedY: Math.random() * 0.9 + 0.4,
          speedX: (Math.random() - 0.5) * 0.4,
          phase: Math.random() * Math.PI * 2,
          blinkSpeed: Math.random() * 0.06 + 0.03,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
        });
      }
    };

    const onMove = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;

      if (Math.random() > 0.25) {
        particles.push({
          x: pointer.x + (Math.random() - 0.5) * 12,
          y: pointer.y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 + 0.5,
          life: 1,
          size: Math.random() * 6.5 + 3.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const onClick = (event: MouseEvent) => {
      for (let i = 0; i < 45; i++) {
        const angle = (Math.PI * 2 * i) / 45;
        const speed = Math.random() * 5 + 1.5;

        particles.push({
          x: event.clientX,
          y: event.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: Math.random() * 9 + 4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
        });
      }
    };

    const drawSparkleSymbol = (
      x: number,
      y: number,
      size: number,
      alpha: number,
      rotation: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

      ctx.fillStyle = "#ffff99"; 
      ctx.shadowColor = "#ffea00";
      ctx.shadowBlur = size * 4;

      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.lineTo(size, 0);
        ctx.lineTo(size * 0.22, size * 0.22);
      }
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      // Background-ai solid black-ah paint pannirukkom so athu true background-ah irukkum
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      for (const sparkle of sparkles) {
        sparkle.phase += sparkle.blinkSpeed;
        sparkle.rotation += sparkle.rotationSpeed;

        sparkle.y += sparkle.speedY;
        sparkle.x += sparkle.speedX + Math.sin(sparkle.phase * 0.5) * 0.2;

        if (pointer.active) {
          const dx = pointer.x - sparkle.x;
          const dy = pointer.y - sparkle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180 && distance > 1) {
            const force = (1 - distance / 180) * 0.05;
            sparkle.x += (dx / distance) * force * 2;
            sparkle.y += (dy / distance) * force * 2;
          }
        }

        if (sparkle.y > height + 10) {
          sparkle.y = -10;
          sparkle.x = Math.random() * width;
        }
        if (sparkle.x < -10) sparkle.x = width + 10;
        if (sparkle.x > width + 10) sparkle.x = -10;

        const twinkle = (Math.sin(sparkle.phase) + 1) * 0.5;
        const currentAlpha = sparkle.maxAlpha * (0.4 + twinkle * 0.6);

        drawSparkleSymbol(
          sparkle.x,
          sparkle.y,
          sparkle.size,
          currentAlpha,
          sparkle.rotation
        );
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= 0.015;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        drawSparkleSymbol(
          p.x,
          p.y,
          p.size * p.life,
          p.life,
          p.rotation
        );
      }

      if (pointer.active) {
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          70
        );

        glow.addColorStop(0, "rgba(255, 238, 100, 0.35)");
        glow.addColorStop(0.4, "rgba(255, 200, 0, 0.12)");
        glow.addColorStop(1, "rgba(255, 200, 0, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 70, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -10, // Innum deep-ah poka zIndex -10 kuduthurukken
      }}
    />
  );
}