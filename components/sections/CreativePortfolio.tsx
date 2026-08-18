"use client";

import { useRef } from "react";
import MonoLabel from "@/components/ui/MonoLabel";
import { portfolio } from "@/lib/content";
import DitherCarousel from "@/components/DitherCarousel";

export default function CreativePortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative h-[100svh] w-full overflow-hidden bg-[var(--canvas)]"
    >
      {/* Label — top right */}
      <div className="pointer-events-none absolute right-5 top-0 z-[300] pt-24 md:right-8 md:pt-28">
        <MonoLabel>{portfolio.label}</MonoLabel>
      </div>

      {/* Heading — bottom left */}
      <div
        ref={headingRef}
        className="pointer-events-none absolute bottom-8 left-5 z-[300] origin-bottom-left md:bottom-10 md:left-8"
      >
        <h2 className="display-hero text-[3vw] uppercase leading-[0.9] text-[var(--ink)] md:text-[3vw]">
          Creative
          <br />
          Portfolio
        </h2>
      </div>

      {/* WebGL dither carousel */}
      <DitherCarousel />
    </section>
  );
}
