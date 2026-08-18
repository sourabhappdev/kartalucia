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

const CARDS = 8;

export default function CreativePortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<DitherCarouselHandle>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.5}`,
        pin: pinRef.current,
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate(self) {
          if (!self.isActive) return;
          // progress 0→1 maps to (CARDS-1)→0 (scroll down = spiral up)
          carouselRef.current?.setProgress((CARDS - 1) * (1 - self.progress));
        },
      });

      // Heading: animate from below viewport to its resting position (top-left)
      gsap.fromTo(
        headingRef.current,
        { y: "40vh", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top top",
            scrub: 0.3,
          },
        }
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

        {/* Heading — animates in before pin, rests at top-left */}
        <h2
          ref={headingRef}
          className="pointer-events-none absolute left-5 top-6 z-[300] origin-bottom-left text-[3vw] uppercase leading-[0.9] text-[var(--ink)] md:left-8 md:text-[3vw]"
        >
          Creative
          <br />
          Portfolio
        </h2>

        {/* WebGL dither carousel — card 0 centered before pin */}
        <DitherCarousel ref={carouselRef} />
      </div>
    </section>
  );
}
