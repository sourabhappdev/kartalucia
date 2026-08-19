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
      const CP_END = 0.35;

      const heading = headingRef.current!;
      const container = pinRef.current!;

      gsap.set(heading, { fontSize: "3vw" });
      const finalHeight = heading.offsetHeight;
      gsap.set(heading, { fontSize: "9vw" });

      const containerH = container.offsetHeight;
      const targetY = containerH - 1.5 * 16 - 2 * 16 - finalHeight;
      const targetX = -12;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 3}`,
        pin: pinRef.current,
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;

          if (p <= CP_END) {
            const t = p / CP_END;
            gsap.set(heading, {
              fontSize: `${9 - 6 * t}vw`,
              y: targetY * t,
              x: targetX * t,
            });
          } else {
            gsap.set(heading, {
              fontSize: "3vw",
              y: targetY,
              x: targetX,
            });
            carouselRef.current?.setProgress(
              (CARDS - 1) * (1 - (p - CP_END) / (1 - CP_END))
            );
          }
        },
      });
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
          className="pointer-events-none absolute left-5 top-6 z-[300] origin-bottom-left text-[9vw] uppercase leading-[0.9] text-[var(--ink)] md:left-8"
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
