"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MonoLabel from "@/components/ui/MonoLabel";
import { portfolio } from "@/lib/content";
import DitherCarousel, {
  type DitherCarouselHandle,
} from "@/components/DitherCarousel";

gsap.registerPlugin(ScrollTrigger);

const CARDS = 12;
const CAROUSEL_START = CARDS / 2;
const CAROUSEL_END = CARDS / 2 + CARDS;

export default function CreativePortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<DitherCarouselHandle>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { val: CAROUSEL_START };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 5}`,
          pin: pinRef.current,
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 (0 → 0.15): heading slides up from bottom to top
      tl.fromTo(
        headingRef.current,
        { y: "calc(100svh - 6rem)" },
        { y: 0, duration: 0.15, ease: "none" },
        0
      );

      // Phase 2 (0.15 → 1): drive carousel through all cards
      tl.to(
        proxy,
        {
          val: CAROUSEL_END,
          duration: 0.85,
          ease: "none",
          onUpdate() {
            carouselRef.current?.setProgress(proxy.val);
          },
        },
        0.15
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-[var(--canvas)]"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Label — top right */}
        <div className="pointer-events-none absolute right-5 top-0 z-[300] pt-24 md:right-8 md:pt-28">
          <MonoLabel>{portfolio.label}</MonoLabel>
        </div>

        {/* Heading — starts at bottom, GSAP animates to top */}
        <div
          ref={headingRef}
          className="pointer-events-none absolute left-5 top-6 z-[300] origin-bottom-left md:left-8"
        >
          <h2 className="display-hero text-[3vw] uppercase leading-[0.9] text-[var(--ink)] md:text-[3vw]">
            Creative
            <br />
            Portfolio
          </h2>
        </div>

        {/* WebGL dither carousel */}
        <DitherCarousel ref={carouselRef} />
      </div>
    </section>
  );
}
