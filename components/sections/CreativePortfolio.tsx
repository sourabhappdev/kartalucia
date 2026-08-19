"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MonoLabel from "@/components/ui/MonoLabel";
import { portfolio } from "@/lib/content";
import { PROJECTS, VIDEO_SOURCES } from "@/gl/config";
import DitherCarousel, {
  type DitherCarouselHandle,
} from "@/components/DitherCarousel";

gsap.registerPlugin(ScrollTrigger);

const CARDS = 8;

// Mobile fallback cards — same 8 works the helix cycles through, shown as a
// plain vertical list (matches the original site's mobile layout).
const MOBILE_CARDS = PROJECTS.map((label, i) => ({
  label,
  src: VIDEO_SOURCES[i],
}));

export default function CreativePortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<DitherCarouselHandle>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    // On mobile we skip the pinned WebGL helix entirely — it traps scroll and
    // overwhelms mobile GPUs. The vertical list below is rendered instead.
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const heading = headingRef.current!;
      const container = pinRef.current!;

      gsap.set(heading, { fontSize: "3vw" });
      const finalHeight = heading.offsetHeight;
      gsap.set(heading, { fontSize: "9vw" });

      const containerH = container.offsetHeight;
      const targetY = containerH - 1.5 * 16 - 2 * 16 - finalHeight;
      const targetX = -12;

      const animH = window.innerHeight * 1.2;

      gsap.set(headingRef.current, { position: "absolute" });

      gsap.fromTo(
        heading,
        { fontSize: "9vw", y: 0, x: 0 },
        {
          fontSize: "3vw",
          y: targetY,
          x: targetX,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: () => `+=${animH}`,
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.5}`,
        pin: pinRef.current,
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate(self) {
          if (!self.isActive) return;
          carouselRef.current?.setProgress((CARDS - 1) * (1 - self.progress));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <section
        id="portfolio"
        className="relative w-full bg-[var(--canvas)] px-5 pb-16 pt-20"
      >
        <div className="mb-8">
          <MonoLabel>{portfolio.label}</MonoLabel>
          <h2 className="mt-3 text-[13vw] uppercase leading-[0.9] text-[var(--ink)]">
            Creative
            <br />
            Portfolio
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {MOBILE_CARDS.map((card, i) => (
            <MobilePortfolioCard key={i} src={card.src} label={card.label} />
          ))}
        </div>
      </section>
    );
  }

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

// A single video card in the mobile list. Only plays while in view so we never
// decode more than a couple of videos at once (mobile browsers cap this).
function MobilePortfolioCard({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(video);

    return () => io.disconnect();
  }, []);

  return (
    <div className="relative aspect-[2/1] overflow-hidden rounded-xl border border-[var(--line)] bg-black">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Scrim for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      {/* Title overlay — centered */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
        <span className="text-center font-mono text-xs uppercase tracking-[0.14em] text-white">
          {label}
        </span>
      </div>
    </div>
  );
}
