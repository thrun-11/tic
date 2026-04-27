"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import JoyzenLogo from "@/components/JoyzenLogo";
import MagneticButton from "@/components/MagneticButton";

const NAV_ITEMS = ["About", "Programs", "Who It's For", "Products"];
const SECTION_IDS = ["about", "programs", "who-it's-for", "products"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const pillRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Track scroll position to determine active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY < window.innerHeight * 0.3) {
        setActiveIndex(0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use IntersectionObserver to track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id, idx) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(idx);
            }
          });
        },
        {
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Animate the pill position to match the active nav link
  const updatePill = useCallback(() => {
    const activeLink = navLinksRef.current[activeIndex];
    const pill = pillRef.current;
    if (!activeLink || !pill) return;

    const linkRect = activeLink.getBoundingClientRect();
    const parentRect = activeLink.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const left = linkRect.left - parentRect.left;
    const width = linkRect.width;

    pill.style.transform = `translateX(${left}px)`;
    pill.style.width = `${width}px`;
    pill.style.opacity = "1";
  }, [activeIndex]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2.5 sm:py-3" : "py-3 sm:py-4"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 md:px-10">
        <a
          href="#hero"
          className="transition-all duration-300"
          id="logo"
        >
          <JoyzenLogo
            className="w-[104px] sm:w-[112px] md:w-[126px]"
            imageClassName="drop-shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
            priority
            sizes="126px"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 px-1.5 py-1 relative rounded-full glass-button bg-white/5">
          {/* Animated pill indicator */}
          <div
            ref={pillRef}
            className="absolute top-1 left-0 h-[calc(100%-8px)] rounded-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-0 glass-pill-indicator bg-white/15"
            style={{ willChange: "transform, width" }}
          />

          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item}
              ref={(el) => { navLinksRef.current[idx] = el; }}
              href={`#${SECTION_IDS[idx]}`}
              className={`nav-link relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                scrolled ? "text-foreground" : "text-white"
              } ${
                activeIndex === idx ? "!text-foreground" : ""
              }`}
              id={`nav-${SECTION_IDS[idx]}`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <MagneticButton strength={30} className="hidden md:inline-block">
          <a
            href="#book-call"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:text-orange-primary glass-button bg-white/10 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
            id="nav-cta"
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

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-1.5 sm:p-2 ${scrolled ? "text-foreground" : "text-white"}`}
          id="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-3 mt-2 space-y-2 rounded-2xl px-4 py-4 sm:mx-4 sm:px-6 glass-card">
          {NAV_ITEMS.map((item, idx) => (
              <a
                key={item}
                href={`#${SECTION_IDS[idx]}`}
                className={`block px-4 py-3 text-sm font-medium text-foreground hover:text-orange-primary rounded-xl transition-colors ${
                  activeIndex === idx ? "glass-button" : ""
                }`}
                onClick={() => setMobileOpen(false)}
                id={`mobile-nav-${SECTION_IDS[idx]}`}
              >
                {item}
              </a>
          ))}
          <a
            href="#book-call"
            className="block px-4 py-3 text-sm font-medium text-orange-primary rounded-xl text-center mt-2 border border-orange-primary/20"
            onClick={() => setMobileOpen(false)}
          >
            Book Clarity Call
          </a>
        </div>
      </div>
    </nav>
  );
}
