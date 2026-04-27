"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JoyzenLogo from "@/components/JoyzenLogo";

gsap.registerPlugin(ScrollTrigger);

const TEXT_CONTENT = [
  { text: "Joyzen", isOrange: true },
  { text: " replaces fragmented care with a continuous system where hormones, fertility, and long-term health are managed together. Online or in clinic, it's the same person guiding your care. Tracking your progress." },
  { text: " Adjusting your treatment. Moving you forward.", isLight: true },
  { text: " Joyzen connects you to the right doctor and keeps your care continuous across every step. Always accessible speak to your doctor anytime not just during appointment.", isLight: true },
];

const FEATURES = [
  {
    title: "Beyond Visits",
    description:
      "Traditional care treats moments. Joyzen manages the entire journey continuously, not occasionally.",
    type: "text" as const,
  },
  {
    title: "Integrated Care",
    description:
      "Doctors, lifestyle, and emotional support, working together as one system.",
    type: "text" as const,
  },
  {
    image: "/images/consultation-care.png",
    alt: "Doctor consultation with patient",
    type: "image" as const,
  },
  {
    title: "Focused on Root, Not Symptoms",
    description:
      "Hormones, lifestyle, fertility, long-term health, everything connected, everything managed.",
    type: "text" as const,
  },
  {
    image: "/images/nurse-consultation.png",
    alt: "Nurse consulting with patient",
    type: "image" as const,
  },
  {
    title: "Designed for Better Outcomes",
    description:
      "Not more visits. Not more confusion. Clear direction. Continuous support. Real results.",
    type: "text" as const,
  },
];

export default function TextReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const joyzenRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = Array.from(
        textRef.current?.querySelectorAll<HTMLElement>(".text-word") ?? []
      );
      if (!words.length) return;

      const orangeWords = words.filter((word) =>
        word.classList.contains("orange-text")
      );
      const regularWords = words.filter(
        (word) => !word.classList.contains("orange-text")
      );

      gsap.set(regularWords, {
        color: "#bbb6ae",
        opacity: 0.24,
      });

      gsap.set(orangeWords, {
        color: "#e8613c",
        opacity: 1,
      });

      gsap.set(joyzenRef.current, {
        opacity: 0,
        y: 22,
        scale: 0.98,
      });

      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.94,
      });

      const cards = cardsRef.current.filter(
        (card): card is HTMLDivElement => card !== null
      );
      const cardOffsets = [
        { x: 220, y: 140 },
        { x: 0, y: 150 },
        { x: -220, y: 140 },
        { x: 220, y: -140 },
        { x: 0, y: -150 },
        { x: -220, y: -140 },
      ];

      cards.forEach((card, idx) => {
        gsap.set(card, {
          opacity: 0,
          scale: 0.7,
          filter: "blur(10px)",
          ...cardOffsets[idx],
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: stageRef.current,
          pinSpacing: false,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        textRef.current,
        { y: 36, opacity: 0.75 },
        { y: 0, opacity: 1, duration: 0.35, ease: "none" }
      )
        .to(
          regularWords,
          {
            color: "#111827",
            opacity: 1,
            stagger: 0.045,
            duration: 0.55,
            ease: "none",
          }
        )
        .to(
          orangeWords,
          {
            color: "#e8613c",
            opacity: 1,
            duration: 0.2,
            ease: "none",
          },
          "<"
        )
        .to(
          {},
          {
            duration: 1.0,
          }
        )
        .to(
          textRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 0.55,
            ease: "none",
          }
        )
        .to(
          joyzenRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.62,
            ease: "none",
          }
        )
        .to(
          {},
          {
            duration: 0.38,
          }
        )
        .to(
          joyzenRef.current,
          {
            opacity: 0,
            y: 22,
            scale: 0.98,
            duration: 0.62,
            ease: "none",
          }
        )
        .to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.72,
            ease: "none",
          }
        )
        .to(
          cards,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.06,
            ease: "none",
          }
        )
        .to(
          {},
          {
            duration: 0.8,
          }
        );
    }, stageRef);

    return () => ctx.revert();
  }, []);

  // Build the word spans
  const renderText = () => {
    const allWords: { word: string; isOrange: boolean }[] = [];

    TEXT_CONTENT.forEach((segment) => {
      const words = segment.text.split(/(\s+)/);
      words.forEach((word) => {
        if (word.trim()) {
          allWords.push({
            word,
            isOrange: segment.isOrange ?? false,
          });
        } else if (word) {
          allWords.push({ word, isOrange: false });
        }
      });
    });

    return allWords.map((item, idx) => {
      if (!item.word.trim()) {
        return <span key={idx}> </span>;
      }
      return (
        <span
          key={idx}
          className={`text-word inline ${item.isOrange ? "orange-text" : ""}`}
        >
          {item.word}{" "}
        </span>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative h-[560vh] overflow-hidden bg-[#fbf8f2] gradient-pastel md:h-[620vh]"
    >
      <div
        ref={stageRef}
        className="flex min-h-screen items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#fbf8f2]" />
        <div className="absolute inset-0 gradient-pastel opacity-95" />
        <div className="absolute left-[-12%] top-[8%] h-64 w-64 rounded-full bg-orange-primary/10 blur-3xl" />
        <div className="absolute bottom-[-8%] right-[-4%] h-72 w-72 rounded-full bg-sky-200/28 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1280px] items-center px-6 md:px-10">
          <div
            ref={textRef}
            className="mx-auto max-w-[1100px] text-center text-[clamp(2rem,3vw,4rem)] leading-[1.15] font-medium tracking-tight"
          >
            {renderText()}
          </div>

          <div
            ref={joyzenRef}
            className="absolute inset-x-6 top-1/2 z-20 -translate-y-1/2 md:inset-x-10"
          >
            <p className="text-center text-4xl font-semibold tracking-tight text-foreground md:text-7xl">
              This is <span className="text-orange-primary">Joyzen</span>
            </p>
          </div>

          <div
            ref={logoRef}
            className="absolute inset-x-6 top-1/2 z-20 flex -translate-y-1/2 justify-center md:inset-x-10"
          >
            <JoyzenLogo
              className="w-[180px] md:w-[340px]"
              sizes="(max-width: 767px) 180px, 340px"
            />
          </div>

          <div
            id="programs"
            className="absolute inset-0 z-10 flex flex-col justify-center gap-4 px-6 py-20 md:gap-10 md:px-10 md:py-0"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {FEATURES.slice(0, 3).map((feature, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  className={`bento-card rounded-[2rem] overflow-hidden ${
                    feature.type === "text"
                      ? "glass-card flex min-h-[220px] flex-col justify-center p-8 md:min-h-[260px]"
                      : "glass-card min-h-[220px] p-1.5 md:min-h-[260px]"
                  }`}
                >
                  {feature.type === "text" ? (
                    <>
                      <h3 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-secondary md:text-base">
                        {feature.description}
                      </p>
                    </>
                  ) : (
                    <div className="relative h-full min-h-[220px] w-full overflow-hidden rounded-[1.55rem] md:min-h-[260px]">
                      <Image
                        src={feature.image!}
                        alt={feature.alt!}
                        fill
                        className="object-cover"
                        sizes="(max-width: 767px) 100vw, 33vw"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden h-28 md:block" />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {FEATURES.slice(3).map((feature, idx) => (
                <div
                  key={idx + 3}
                  ref={(el) => {
                    cardsRef.current[idx + 3] = el;
                  }}
                  className={`bento-card rounded-[2rem] overflow-hidden ${
                    feature.type === "text"
                      ? "glass-card flex min-h-[220px] flex-col justify-center p-8 md:min-h-[260px]"
                      : "glass-card min-h-[220px] p-1.5 md:min-h-[260px]"
                  }`}
                >
                  {feature.type === "text" ? (
                    <>
                      <h3 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-secondary md:text-base">
                        {feature.description}
                      </p>
                    </>
                  ) : (
                    <div className="relative h-full min-h-[220px] w-full overflow-hidden rounded-[1.55rem] md:min-h-[260px]">
                      <Image
                        src={feature.image!}
                        alt={feature.alt!}
                        fill
                        className="object-cover"
                        sizes="(max-width: 767px) 100vw, 33vw"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
