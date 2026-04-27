"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ModernLife() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.from(".modern-life-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 0.5,
        },
        y: 40,
        opacity: 0,
      });

      // Animate portrait
      gsap.from(".modern-life-portrait", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 30%",
          scrub: 0.5,
        },
        scale: 0.8,
        opacity: 0,
      });

      // Animate text below
      gsap.from(".modern-life-text", {
        scrollTrigger: {
          trigger: ".modern-life-text",
          start: "top 85%",
          end: "top 60%",
          scrub: 0.5,
        },
        y: 30,
        opacity: 0,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-it's-for"
      className="relative overflow-hidden py-24 md:py-36 bg-[#fbf8f2]"
    >
      {/* Subtle transition gradient into Book Call */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#f0f4f8] pointer-events-none z-0" />
      <div className="absolute top-[-20%] left-[-10%] w-full md:w-[50%] h-[60%] bg-[#fde7db] rounded-full blur-[140px] opacity-30 pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-full md:w-[50%] h-[60%] bg-[#d8ebf7] rounded-full blur-[140px] opacity-30 pointer-events-none" />
      <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
        {/* Heading */}
        <div className="modern-life-heading mb-12 md:mb-16">
          <p className="text-3xl md:text-5xl font-light text-foreground mb-1 italic"
             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Built for
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
            Modern Life
          </h2>
        </div>

        {/* Portrait */}
        <div className="modern-life-portrait flex justify-center mb-10 md:mb-14">
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl">
            <Image
              src="/images/headimage.png"
              alt="Founder portrait"
              fill
              className="object-cover"
              sizes="224px"
            />
          </div>
        </div>

        {/* Text */}
        <div className="modern-life-text space-y-4 max-w-[700px] mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">
            Focused on Root, Not Symptoms
          </h3>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            Joyzen was built on a simple realization: life has changed, but healthcare hasn&apos;t
            kept up. Care still begins too late. Joyzen enables earlier understanding, proactive
            care, and continuous guidance.
          </p>
        </div>
      </div>
    </section>
  );
}
