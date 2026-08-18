"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MonoLabel from "@/components/ui/MonoLabel";
import TagPill from "@/components/ui/TagPill";
import { ecosystem } from "@/lib/content";
import { assets } from "@/lib/assets";

gsap.registerPlugin(ScrollTrigger);

const HEAD_TOP = 92; // px where the heading sticks
const CARD_STEP = 74; // px header strip left visible per stacked card

export default function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Shrink the big ECOSYSTEM heading to medium as the section enters, then
      // it stays (sticky) at the top while the cards stack beneath it.
      gsap.to(headingRef.current, {
        scale: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=420",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      className="relative bg-[var(--canvas)] pb-[10vh]"
    >
      {/* Sticky heading */}
      <div
        className="sticky top-0 z-40 flex items-start justify-between bg-[var(--canvas)] px-5 pb-3 pt-6 md:px-8"
        style={{ minHeight: HEAD_TOP }}
      >
        <h2
          ref={headingRef}
          className="display-hero origin-top-left text-[16vw] uppercase leading-[0.8] text-[var(--ink)] md:text-[7.5vw]"
        >
          {ecosystem.headingLeft}
        </h2>
        <MonoLabel className="mt-2 shrink-0">{ecosystem.labelRight}</MonoLabel>
      </div>

      {/* Stacking cards */}
      <div className="px-3 md:px-6">
        {ecosystem.cards.map((card, i) => (
          <div
            key={card.n}
            className="sticky"
            style={{ top: HEAD_TOP + i * CARD_STEP }}
          >
            <div className="rounded-b-2xl border-t border-dashed border-[var(--line-strong)] bg-[var(--canvas)] px-5 pt-6 md:px-9 md:pt-7">
              <div className="grid min-h-[80vh] gap-7 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
                {/* Left — number, title, description, tags */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <span className="flex h-9 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-mono text-sm text-white">
                      {card.n}
                    </span>
                    <h3 className="font-display text-3xl text-[var(--ink)] md:text-5xl">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-6 max-w-md text-[var(--muted)] md:mt-8 md:text-lg">
                    {card.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {card.tags.map((t) => (
                      <TagPill key={t}>{t}</TagPill>
                    ))}
                  </div>
                </div>

                {/* Right — BTS video */}
                <div className="h-[36vh] overflow-hidden rounded-xl border border-[var(--line)] md:h-auto md:min-h-[42vh]">
                  <video
                    className="h-full w-full object-cover"
                    src={assets.ecosystem[i % assets.ecosystem.length]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
