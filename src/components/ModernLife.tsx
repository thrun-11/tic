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

      // Animate text below words smoothly
      gsap.from(".modern-life-text-word", {
        scrollTrigger: {
          trigger: ".modern-life-text",
          start: "top 85%",
          end: "top 50%",
          scrub: 0.5,
        },
        y: "120%",
        opacity: 0,
        rotationZ: 3,
        stagger: 0.02,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraphText = "Joyzen was built on a simple realization: life has changed, but healthcare hasn't kept up. Care still begins too late. Joyzen enables earlier understanding, proactive care, and continuous guidance.";
  const words = paragraphText.split(" ");

  return (
    <section
      ref={sectionRef}
      id="who-it's-for"
      className="relative overflow-hidden bg-[#fbf8f2] py-20 sm:py-24 md:py-48"
    >
      {/* Subtle transition gradient into Book Call */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[#f0f4f8] pointer-events-none z-0" />
      <div className="animate-breathe pointer-events-none absolute left-[-10%] top-[-20%] h-[60%] w-full rounded-full bg-[#fde7db] blur-[100px] sm:blur-[120px] md:w-[50%] md:blur-[140px]" />
      <div className="animate-breathe-delayed pointer-events-none absolute right-[-10%] top-[-20%] h-[60%] w-full rounded-full bg-[#d8ebf7] blur-[100px] sm:blur-[120px] md:w-[50%] md:blur-[140px]" />
      <div className="mx-auto max-w-[900px] px-4 text-center sm:px-6 md:px-10">
        {/* Heading */}
        <div className="modern-life-heading mb-12 sm:mb-16 md:mb-24">
          <p className="mb-2 text-2xl font-light italic text-foreground sm:text-3xl md:text-5xl"
             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Built for
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-6xl lg:text-7xl">
            Modern Life
          </h2>
        </div>

        {/* Portrait */}
        <div className="modern-life-portrait mb-12 flex justify-center sm:mb-16 md:mb-20">
          <div className="relative h-44 w-44 overflow-hidden rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:h-56 sm:w-56 md:h-72 md:w-72">
            <Image
              src="/images/headimage.png"
              alt="Founder portrait"
              fill
              className="object-cover"
              sizes="(max-width: 767px) 224px, 288px"
            />
          </div>
        </div>

        {/* Text */}
        <div className="modern-life-text mx-auto max-w-[800px] space-y-5 sm:space-y-6">
          <h3 className="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
            Focused on Root, Not Symptoms
          </h3>
          <p className="flex flex-wrap justify-center gap-x-[0.25em] text-base leading-[1.75] text-text-secondary sm:text-lg md:text-xl md:leading-[1.8]">
            {words.map((word, i) => (
              <span key={i} className="overflow-hidden inline-flex">
                <span className="modern-life-text-word inline-block will-change-transform">{word}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
