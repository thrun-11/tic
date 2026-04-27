"use client";

import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const noiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    // A simple step-based animation to shift the background position randomly
    // This creates the illusion of moving 35mm film grain.
    const interval = setInterval(() => {
      if (noiseRef.current) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        noiseRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden overflow-hidden mix-blend-overlay opacity-[0.06] md:block">
      <div
        ref={noiseRef}
        className="absolute inset-[-200%] w-[400%] h-[400%]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
