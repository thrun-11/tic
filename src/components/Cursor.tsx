"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use quickTo for high performance mouse tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over an element that should trigger the expanded cursor
      if (
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".bento-card") ||
        target.closest("[data-cursor='hover']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[10000] hidden md:flex items-center justify-center rounded-full bg-white mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
        isHovering ? "w-16 h-16 opacity-50 blur-[1px]" : "w-4 h-4 opacity-100"
      }`}
    />
  );
}
