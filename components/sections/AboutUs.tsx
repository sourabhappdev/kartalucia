"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MonoLabel from "@/components/ui/MonoLabel";
import { about } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1600",
        pin: pinRef.current,
        scrub: true,
        invalidateOnRefresh: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative bg-[var(--canvas)]">
      <div
        ref={pinRef}
        className="relative h-[100svh] w-full overflow-hidden"
      >
        {/* Corner labels */}
        <div className="absolute left-5 top-24 z-20 md:left-8 md:top-28">
          <MonoLabel>{about.labelLeft}</MonoLabel>
        </div>
        <div className="absolute right-5 top-24 z-20 md:right-8 md:top-28">
          <span className="mono-label">{about.labelCenter}</span>
        </div>
        <div className="absolute bottom-8 left-5 z-20 md:bottom-10 md:left-8">
          <MonoLabel>{about.labelRight}</MonoLabel>
        </div>

        {/* Intro headline — bottom right */}
        <div className="absolute bottom-8 right-5 z-20 max-w-[76vw] text-right md:bottom-10 md:right-8 md:max-w-[38rem]">
          <p className="font-display text-3xl leading-[1.08] tracking-[-0.01em] md:text-5xl">
            <span className="text-[var(--ink)]">Karta Lucia </span>
            <span className="text-[var(--faint)]">Is Our </span>
            <span className="text-[var(--ink)]">Creative Content Lab </span>
            <span className="text-[var(--faint)]">Based In </span>
            <span className="text-[var(--flare)]">India.</span>
          </p>
        </div>
      </div>

      {/* Mission statement — scrolls in after the pinned emblem */}
      <div className="mx-auto max-w-[1100px] px-5 py-24 md:px-8 md:py-36">
        <p className="font-display text-2xl uppercase leading-[1.3] tracking-[0.01em] text-[var(--ink)] md:text-[2.4rem] md:leading-[1.28]">
          {about.mission}
        </p>
      </div>
    </section>
  );
}
