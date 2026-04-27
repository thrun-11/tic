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
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Background Image with parallax */}
      <div ref={heroRef} className="absolute inset-0 will-change-transform">
        <picture className="absolute inset-0">
          <source media="(min-width: 640px)" srcSet="/images/heroimage.png" />
          <Image
            src="/images/IMG_1019.JPG"
            alt="Gynecological consultation"
            fill
            className="object-cover object-[center_top] sm:object-center"
            priority
            sizes="100vw"
          />
        </picture>
      </div>

      {/* Gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(17,24,39,0.68)_0%,rgba(17,24,39,0.28)_35%,rgba(17,24,39,0.1)_58%,rgba(17,24,39,0.38)_100%)] opacity-58"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full max-w-[1400px] flex-col justify-end px-4 pb-14 sm:px-6 sm:pb-16 md:px-10 md:pb-24"
      >
        <h1 className="max-w-[12ch] text-3xl font-semibold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-6xl lg:text-7xl">
          A New Health System
        </h1>
        <div className="mt-3 max-w-[34rem] space-y-1.5 sm:mt-4 md:mt-6">
          <p className="text-sm font-light text-white/85 sm:text-base md:text-lg">
            Joyzen is not a clinic.
          </p>
          <p className="text-sm font-light text-white/85 sm:text-base md:text-lg">
            It&apos;s a new way of delivering reproductive healthcare.
          </p>
        </div>
      </div>

      {/* Bottom gradient fade — warm cream transition into TextReveal */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#fbf8f2] via-[#fbf8f2]/60 to-transparent" />
    </section>
  );
}
