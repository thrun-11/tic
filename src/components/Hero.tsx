"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top top",
          end: "bottom top+=20%",
          scrub: 0.8,
        },
        yPercent: 4,
        ease: "none",
      });

      gsap.from(contentRef.current?.children ?? [], {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top top",
          end: "bottom top+=20%",
          scrub: 0.8,
        },
        opacity: 0.66,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with parallax */}
      <div ref={heroRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/heroimage.png"
          alt="Gynecological consultation"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(17,24,39,0.68)_0%,rgba(17,24,39,0.28)_35%,rgba(17,24,39,0.1)_58%,rgba(17,24,39,0.38)_100%)] opacity-58"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-24"
      >
        <h1 className="max-w-[12ch] text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight">
          A New Health System
        </h1>
        <div className="mt-4 max-w-[34rem] md:mt-6 space-y-1.5">
          <p className="text-base md:text-lg text-white/85 font-light">
            Joyzen is not a clinic.
          </p>
          <p className="text-base md:text-lg text-white/85 font-light">
            It&apos;s a new way of delivering reproductive healthcare.
          </p>
        </div>
      </div>

      {/* Bottom gradient fade — warm cream transition into TextReveal */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#fbf8f2] via-[#fbf8f2]/60 to-transparent" />
    </section>
  );
}
