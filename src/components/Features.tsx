"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JoyzenLogo from "@/components/JoyzenLogo";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Beyond Visits",
    description:
      "Traditional care treats moments. Joyzen manages the entire journey continuously, not occasionally.",
    type: "text" as const,
    position: "top-left",
  },
  {
    title: "Integrated Care",
    description:
      "Doctors, lifestyle, and emotional support, working together as one system.",
    type: "text" as const,
    position: "top-center",
  },
  {
    image: "/images/consultation-care.png",
    alt: "Doctor consultation with patient",
    type: "image" as const,
    position: "top-right",
  },
  {
    title: "Focused on Root, Not Symptoms",
    description:
      "Hormones, lifestyle, fertility, long-term health, everything connected, everything managed.",
    type: "text" as const,
    position: "bottom-left",
  },
  {
    image: "/images/nurse-consultation.png",
    alt: "Nurse consulting with patient",
    type: "image" as const,
    position: "bottom-center",
  },
  {
    title: "Designed for Better Outcomes",
    description:
      "Not more visits. Not more confusion. Clear direction. Continuous support. Real results.",
    type: "text" as const,
    position: "bottom-right",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const cardsShellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const cards = cardsRef.current.filter(
        (card): card is HTMLDivElement => card !== null
      );

      mm.add("(min-width: 768px)", () => {
        const cardOffsets = [
          { x: 220, y: 140 },
          { x: 0, y: 150 },
          { x: -220, y: 140 },
          { x: 220, y: -140 },
          { x: 0, y: -150 },
          { x: -220, y: -140 },
        ];

        gsap.set(introRef.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(cardsShellRef.current, { opacity: 1 });
        gsap.set(logoRef.current, { opacity: 0, scale: 0.94 });

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
            end: "+=3100",
            pin: true,
            scrub: 0.9,
            anticipatePin: 0,
            invalidateOnRefresh: true,
          },
        });

        tl.to(introRef.current, {
          opacity: 0,
          y: -18,
          scale: 1.02,
          duration: 0.68,
          ease: "none",
        })
          .to(
            logoRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "none",
            },
            "<0.08"
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
            },
            "<0.08"
          )
          .to(
            {},
            {
              duration: 0.7,
            }
          );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          introRef.current,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -18,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
            },
          }
        );

        gsap.fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.84 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: logoRef.current,
              start: "top 78%",
            },
          }
        );

        cards.forEach((card, idx) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              delay: idx * 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="relative overflow-hidden gradient-pastel"
    >
      <div className="absolute left-[-6rem] top-[10%] h-72 w-72 rounded-full bg-sky-200/25 blur-3xl" />
      <div className="absolute bottom-[-8rem] right-[-4rem] h-80 w-80 rounded-full bg-orange-primary/15 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10 py-20 md:py-0">
        <div className="relative min-h-screen md:h-screen">
          <div
            ref={introRef}
            className="relative flex min-h-[32vh] items-center justify-center md:absolute md:inset-0"
          >
            <p className="text-center text-4xl font-semibold tracking-tight text-foreground md:text-7xl">
              This is <span className="text-orange-primary">Joyzen</span>
            </p>
          </div>

          <div
            ref={logoRef}
            className="relative z-20 flex justify-center py-8 md:absolute md:left-1/2 md:top-1/2 md:w-full md:max-w-[440px] md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <JoyzenLogo
              className="w-[220px] md:w-full"
              sizes="(max-width: 767px) 220px, 440px"
            />
          </div>

          <div
            ref={cardsShellRef}
            className="relative z-10 flex flex-col gap-4 pb-8 md:absolute md:inset-0 md:justify-center md:pb-0"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {features.map((feature, idx) => {
                const isMiddle = idx === 1 || idx === 4;
                
                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className={`bento-card rounded-[2rem] overflow-hidden ${
                      idx === 1 ? "md:self-start" : idx === 4 ? "md:self-end" : ""
                    } ${
                      isMiddle ? "md:h-64" : "md:h-96"
                    } ${
                      feature.type === "text"
                        ? "glass-card flex min-h-[240px] flex-col justify-end p-8 md:p-10"
                        : "glass-card min-h-[240px] p-2"
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
                      <div className="relative h-full min-h-[220px] w-full overflow-hidden rounded-[1.55rem]">
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
