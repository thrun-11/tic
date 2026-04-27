"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-logo-img", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "top 20%",
          scrub: 1.5,
        },
        opacity: 0,
        scale: 1.04,
      });

      gsap.from(".footer-info", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "top 45%",
          scrub: 1,
        },
        y: 15,
        opacity: 0,
        stagger: 0.1,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="products"
      className="relative overflow-hidden bg-[#d8ebf7]"
    >
      <div className="relative w-full overflow-hidden min-h-[450px] sm:min-h-[500px] md:min-h-[auto] md:aspect-[12/5]">
        <div className="footer-logo-img absolute inset-0">
          {/* Mobile Image */}
          <Image
            src="/images/logo_ice_mock_up.jpg.webp"
            alt="Joyzen footer artwork mobile"
            fill
            className="object-cover object-center md:hidden"
            sizes="100vw"
          />
          {/* Desktop Image */}
          <Image
            src="/images/icebluefoot.png"
            alt="Joyzen footer artwork desktop"
            fill
            className="hidden md:block object-cover object-center"
            sizes="100vw"
          />
          {/* Top gradient for smooth transition from previous section */}
          <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-[#d8ebf7] via-[#d8ebf7]/90 to-transparent pointer-events-none" />
          
          {/* Bottom gradient to blend into the base blue and provide contrast for white text */}
          <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#9ac5e3] via-[#9ac5e3]/90 to-transparent pointer-events-none" />
        </div>

        {/* Top Text - Centered, Dark */}
        <div className="absolute inset-x-0 top-12 sm:top-16 z-10 flex flex-col items-center justify-center gap-2 px-4 text-center text-[13px] font-medium text-slate-700 sm:flex-row sm:gap-10 md:top-20 md:text-sm">
          <a
            href="mailto:info@joyzenlife.in"
            className="footer-info hover:text-black transition-colors"
          >
            Email: info@joyzenlife.in
          </a>
          <a
            href="https://instagram.com/joyzen.in"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-info hover:text-black transition-colors"
          >
            Instagram: @joyzen.in
          </a>
        </div>

        {/* Bottom Text - Centered, White */}
        <div className="absolute inset-x-0 bottom-8 sm:bottom-10 z-10 flex flex-col items-center justify-center gap-1.5 px-4 text-center text-[12px] font-medium leading-relaxed text-white/95 sm:gap-2 sm:text-[13px] md:bottom-12">
          <p>2026 Joyzen. Built for healthcare. Designed for trust.</p>
          <p>Designed and Developed by TIC Global Services</p>
        </div>
      </div>
    </footer>
  );
}
