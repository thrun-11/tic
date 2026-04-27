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
      <div className="relative w-full overflow-hidden min-h-[400px] md:min-h-[auto] md:aspect-[12/5]">
        <div className="absolute inset-x-0 top-0 z-10 flex flex-col gap-3 px-6 py-6 text-right text-sm text-slate-800 md:flex-row md:justify-end md:gap-14 md:px-12 md:py-8">
          <a
            href="mailto:info@joyzenlife.com"
            className="footer-info hover:text-foreground transition-colors"
          >
            Email: info@joyzenlife.com
          </a>
          <a
            href="https://instagram.com/joyzen.in"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-info hover:text-foreground transition-colors"
          >
            Instagram: @joyzen.in
          </a>
        </div>

        <div className="footer-logo-img absolute inset-0">
          <Image
            src="/images/icebluefoot.png"
            alt="Joyzen footer artwork"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 px-6 py-5 text-xs text-slate-800 md:flex-row md:items-center md:justify-between md:px-12">
          <p>2026 Joyzen. Built for healthcare. Designed for trust.</p>
          <p>Designed and Developed by TIC Global Services</p>
        </div>
      </div>
    </footer>
  );
}
