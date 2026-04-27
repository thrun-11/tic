"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ children, className = "", strength = 30 }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content) return;

    const xTo = gsap.quickTo(button, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const contentXTo = gsap.quickTo(content, "x", { duration: 0.6, ease: "power3.out" });
    const contentYTo = gsap.quickTo(content, "y", { duration: 0.6, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const x = e.clientX - (rect.left + centerX);
      const y = e.clientY - (rect.top + centerY);

      xTo(x * (strength / 100));
      yTo(y * (strength / 100));
      
      contentXTo(x * (strength / 80));
      contentYTo(y * (strength / 80));
    };

    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
      contentXTo(0);
      contentYTo(0);
    };

    button.addEventListener("mousemove", onMouseMove);
    button.addEventListener("mouseleave", onMouseLeave);

    return () => {
      button.removeEventListener("mousemove", onMouseMove);
      button.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={buttonRef} className={`relative inline-block ${className}`}>
      <div ref={contentRef} className="h-full w-full inline-block">
        {children}
      </div>
    </div>
  );
}
