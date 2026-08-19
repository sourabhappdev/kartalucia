"use client";

import { useEffect, useRef, useState } from "react";

const CHARACTER_URL =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260801_104316_80b428ea-dc99-4399-afb3-8ccb7b34b2d0.png&w=1280&q=85";

const LEFT_WORDS = ["spark", "imagine", "evolve", "render"];
const RIGHT_WORDS = ["blaze", "genesis", "purpose", "ignite"];

const MARQUEE_TEXT =
  "SPARK \u00B7 RENDER \u00B7 IGNITE \u00B7 UNFOLD \u00B7 GENESIS \u00B7 EVOLVE \u00B7 PURPOSE \u00B7 BEYOND \u00B7 ";

const BEYOND_LAYERS = [
  { color: "#89CFF0", desktopOffset: 36, mobileOffset: 18 },
  { color: "#EC612C", desktopOffset: 24, mobileOffset: 12 },
  { color: "#90EE90", desktopOffset: 12, mobileOffset: 6 },
  { color: "#FFFFFF", desktopOffset: 0, mobileOffset: 0 },
];

export default function Social() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - vh)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scaleFactor = isMobile ? 0.5 : 1;

  return (
    <div style={{ background: "#000000", fontFamily: "'Inter', sans-serif", paddingTop: "var(--section-gap)" }}>
      {/* Hero */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: "120vh", backgroundColor: "var(--canvas)" }}
      >
        {/* Character image z10 */}
        <div className="pointer-events-none absolute inset-0" style={{ zIndex: 10 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CHARACTER_URL}
            alt="Character"
            draggable={false}
            className="absolute bottom-0 left-1/2 block w-auto max-w-none"
            style={{
              transform: "translateX(-50%)",
              height: "115%",
              maxHeight: "115%",
              minHeight: "80%",
            }}
          />
        </div>

        {/* Sticky text overlay z5 */}
        <div className="sticky top-0 h-screen w-full" style={{ zIndex: 5 }}>
          {/* BEYOND stacked title */}
          <div className="absolute inset-0 flex items-start justify-center pt-[2vh] md:pt-[3vh]">
            {BEYOND_LAYERS.map((layer, i) => {
              const offset = isMobile ? layer.mobileOffset : layer.desktopOffset;
              return (
                <h1
                  key={i}
                  className="absolute select-none"
                  style={{
                    fontFamily: "'Bamboly Demo', sans-serif",
                    fontSize: "clamp(7.5rem, 30vw, 28rem)",
                    fontWeight: 400,
                    lineHeight: 0.85,
                    letterSpacing: "tight",
                    color: layer.color,
                    textTransform: "uppercase",
                    transform: `translateY(${offset}px)`,
                    position: i === 3 ? "relative" : "absolute",
                  }}
                >
                  BEYOND
                </h1>
              );
            })}
          </div>

          {/* Side word columns */}
          <div
            className="pointer-events-none absolute inset-0 flex items-end justify-between px-[3vw] md:px-[6vw]"
            style={{ bottom: "-8vh" }}
          >
            {/* Left column */}
            <div className="flex flex-col gap-1 md:gap-2">
              {LEFT_WORDS.map((word, i) => {
                const baseOffset = (60 + i * 40) * scaleFactor;
                const xOffset = -baseOffset * (1 - scrollProgress);
                const opacity = 0.35 + scrollProgress * 0.65;
                return (
                  <span
                    key={word}
                    className="select-none uppercase"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(1.6rem, 7vw, 9rem)",
                      lineHeight: 1.1,
                      color: "white",
                      opacity,
                      transform: `translateX(${xOffset}px)`,
                      transition: "transform 0.05s linear",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            {/* Right column */}
            <div className="flex flex-col items-end gap-1 md:gap-2">
              {RIGHT_WORDS.map((word, i) => {
                const baseOffset = (60 + i * 40) * scaleFactor;
                const xOffset = baseOffset * (1 - scrollProgress);
                const opacity = 0.35 + scrollProgress * 0.65;
                return (
                  <span
                    key={word}
                    className="select-none text-right uppercase"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(1.6rem, 7vw, 9rem)",
                      lineHeight: 1.1,
                      color: "white",
                      opacity,
                      transform: `translateX(${xOffset}px)`,
                      transition: "transform 0.05s linear",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full overflow-hidden py-6 md:py-8" style={{ backgroundColor: "var(--canvas)" }}>
        <div className="social-marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="shrink-0 whitespace-nowrap"
              style={{
                fontFamily: "'Bamboly Demo', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: 1,
                color: "var(--ink)",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                paddingRight: "0.25em",
                userSelect: "none",
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
