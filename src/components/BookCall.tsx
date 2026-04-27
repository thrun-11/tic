"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MagneticButton from "@/components/MagneticButton";

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
      className="relative overflow-hidden bg-[#fbf8f2] py-14 sm:py-16 md:py-28"
    >
      {/* Subtle transition gradient from Modern Life */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#f0f4f8] to-transparent pointer-events-none z-0" />
      <div className="pointer-events-none absolute bottom-[-30%] left-[-10%] h-[70%] w-full rounded-full bg-[#d8ebf7] opacity-40 blur-[110px] sm:blur-[130px] md:w-[60%] md:blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-30%] right-[-10%] h-[70%] w-full rounded-full bg-[#ecdcf9] opacity-40 blur-[110px] sm:blur-[130px] md:w-[60%] md:blur-[140px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(216,235,247,0)_0%,rgba(216,235,247,0.6)_60%,#d8ebf7_100%)] pointer-events-none" />
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-10">
        <div className="cta-card cta-glass relative overflow-hidden p-6 sm:p-8 md:p-16">
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
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground sm:mb-5 sm:text-3xl md:text-5xl">
              Book a clarity call
            </h2>
            <p className="mb-7 text-sm leading-relaxed text-text-secondary sm:mb-8 sm:text-base md:text-lg">
              If you would like to understand your reproductive health better or learn how
              Joyzen can support your journey, you can schedule a conversation with our care team.
            </p>
            <MagneticButton strength={30}>
              <a
                href="#"
                className="btn-primary glass-button inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground sm:px-6 sm:py-3"
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
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
