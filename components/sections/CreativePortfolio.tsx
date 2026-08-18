"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MonoLabel from "@/components/ui/MonoLabel";
import { assets } from "@/lib/assets";
import { portfolio } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

type CardKind = { type: "video"; src: string } | { type: "cta" };

const CARDS: CardKind[] = [
  ...assets.portfolio.map((src) => ({ type: "video" as const, src })),
  { type: "cta" as const },
];

export default function CreativePortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const N = cards.length;

      const isMobile = () => window.innerWidth < 768;

      // Vertical DNA double-helix: cards ride two strands (π apart) as paired
      // "rungs" around a vertical axis; scrolling flows the rungs upward while
      // the helix twists ~1 full rotation, so the two strands cross left↔right.
      const place = (p: number) => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        const mobile = isMobile();

        // Heading: shrink to its pinned (medium) size over the first 18%.
        const hp = gsap.utils.clamp(0, 1, p / 0.12);
        const he = gsap.parseEase("power3.out")(hp);
        if (headingRef.current) {
          headingRef.current.style.transform = `scale(${gsap.utils.interpolate(
            1,
            0.56,
            he
          )})`;
        }

        // 3D flowing gallery (helical orbit): each work travels a curved path —
        // in from the bottom-right → bows to CENTRE where it's large & front
        // (the "hero") → recedes up and to the LEFT, tilting to face centre —
        // then exits top-left. Several are visible at once, staggered, so works
        // continuously flow past as you scroll.
        const STAGGER = mobile ? 0.36 : 0.28; // journey gap between cards
        const SPAN = 1 + (N - 1) * STAGGER + 0.55; // scroll span so all pass through
        const START_U = mobile ? 0.36 : 0.44; // a couple already mid-flight at p=0

        cards.forEach((card, i) => {
          // u = this card's progress along its journey (0 enter → 1 exit).
          const u = START_U + p * SPAN - i * STAGGER;
          if (u < -0.16 || u > 1.16) {
            card.style.opacity = "0";
            return;
          }
          const tc = gsap.utils.clamp(0, 1, u);
          const bell = Math.sin(tc * Math.PI); // 0 →1(centre)→ 0

          // Path: bottom-right → centre → top-left, bowed so the hero sits centre.
          const y = gsap.utils.interpolate(H * 0.62, -H * 0.62, u);
          const x =
            gsap.utils.interpolate(W * 0.14, -W * 0.34, u) + bell * (W * 0.16);

          const scale = 0.55 + bell * (mobile ? 0.5 : 0.62); // peak ~1.17 at centre
          const spinY = gsap.utils.interpolate(34, -34, u); // turn to face centre
          const rollZ = gsap.utils.interpolate(-3, 4, u);

          // Fade in/out at the journey ends; keep solid through the middle.
          const fade =
            gsap.utils.clamp(0, 1, (u + 0.12) / 0.18) *
            gsap.utils.clamp(0, 1, (1.12 - u) / 0.18);
          const opacity = fade * (0.7 + 0.3 * bell);

          card.style.transform = `translate(${x}px, ${y}px) rotateY(${spinY}deg) rotateZ(${rollZ}deg) scale(${scale})`;
          card.style.opacity = String(opacity);
          card.style.zIndex = String(Math.round(bell * 100));
        });
      };

      place(0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=" + (isMobile() ? 2800 : 3400),
        pin: pinRef.current,
        scrub: 1,
        onUpdate: (self) => place(self.progress),
        invalidateOnRefresh: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative bg-[var(--canvas)]"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
      >
        {/* Label — top right */}
        <div className="pointer-events-none absolute right-5 top-0 z-[300] pt-24 md:right-8 md:pt-28">
          <MonoLabel>{portfolio.label}</MonoLabel>
        </div>

        {/* Heading — bottom left (medium), shrinks in from large */}
        <div
          ref={headingRef}
          className="pointer-events-none absolute bottom-8 left-5 z-[300] origin-bottom-left md:bottom-10 md:left-8"
        >
          <h2 className="display-hero text-[13vw] uppercase leading-[0.9] text-[var(--ink)] md:text-[9vw]">
            Creative
            <br />
            Portfolio
          </h2>
        </div>

        {/* Gallery stage */}
        <div ref={stageRef} className="relative h-full w-full" style={{ perspective: 1200 }}>
          {CARDS.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 -ml-[44vw] -mt-[29vw] h-[58vw] w-[88vw] overflow-hidden rounded-xl border border-[var(--line)] shadow-2xl will-change-transform sm:-ml-[30vw] sm:-mt-[19vw] sm:h-[38vw] sm:w-[60vw] md:-ml-[240px] md:-mt-[150px] md:h-[300px] md:w-[480px]"
            >
              {card.type === "video" ? (
                <video
                  className="h-full w-full object-cover"
                  src={card.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <a
                  href={portfolio.ctaHref}
                  className="group relative block h-full w-full"
                >
                  <video
                    className="h-full w-full object-cover"
                    src={assets.altVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <span className="flex items-center gap-2 rounded-full bg-black/55 px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors group-hover:bg-black/70">
                      {portfolio.cta}
                      <span className="transition-transform group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </span>
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
