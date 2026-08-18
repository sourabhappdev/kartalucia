"use client";

import { assets } from "@/lib/assets";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={assets.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Legibility gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      {/* Bottom-left meta line */}
      <div className="absolute bottom-6 left-5 z-10 md:bottom-8 md:left-8">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          Creative Content Lab — Based in India
        </span>
      </div>

      {/* Bottom-right scroll hint */}
      <div className="absolute bottom-6 right-5 z-10 flex items-center gap-2 md:bottom-8 md:right-8">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          Scroll
        </span>
        <span className="h-3 w-[1px] animate-pulse bg-[var(--muted)]" />
      </div>
    </section>
  );
}
