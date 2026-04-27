"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BookCall() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 45%",
          scrub: 0.5,
        },
        y: 50,
        opacity: 0,
        scale: 0.96,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="book-call"
      className="relative overflow-hidden py-16 md:py-28 bg-[#fbf8f2]"
    >
      {/* Subtle transition gradient from Modern Life */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#f0f4f8] to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-[-30%] left-[-10%] w-full md:w-[60%] h-[70%] bg-[#d8ebf7] rounded-full blur-[140px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[-10%] w-full md:w-[60%] h-[70%] bg-[#ecdcf9] rounded-full blur-[140px] opacity-40 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(216,235,247,0)_0%,rgba(216,235,247,0.6)_60%,#d8ebf7_100%)] pointer-events-none" />
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="cta-card cta-glass p-10 md:p-16 relative overflow-hidden">
          <div className="absolute inset-y-0 right-4 hidden w-64 items-center justify-center md:flex md:right-10 md:w-80">
            <div className="absolute h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(196,176,224,0.18)_0%,rgba(255,255,255,0)_72%)] blur-3xl" />
            <Image
              src="/images/joyzenpurple.png"
              alt="Joyzen icon"
              width={160}
              height={224}
              className="relative z-10 w-24 md:w-32 h-auto opacity-100 drop-shadow-[0_18px_36px_rgba(196,176,224,0.25)]"
              sizes="128px"
            />
          </div>

          <div className="relative z-10 max-w-[550px]">
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground mb-5 tracking-tight">
              Book a clarity call
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8">
              If you would like to understand your reproductive health better or learn how
              Joyzen can support your journey, you can schedule a conversation with our care team.
            </p>
            <a
              href="#"
              className="btn-primary glass-button inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-foreground"
              id="book-clarity-call-btn"
            >
              Book Clarity Call
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
