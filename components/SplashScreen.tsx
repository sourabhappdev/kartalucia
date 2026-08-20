"use client";

import { useEffect, useRef, useState } from "react";
import { assets } from "@/lib/assets";
import AnimatedLogo from "./ui/AnimatedLogo";

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function preloadVideo(src: string): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.oncanplaythrough = () => resolve();
    video.onerror = () => resolve();
    video.src = src;
    video.preload = "auto";
  });
}

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const allAssets: Promise<void>[] = [];

    // hero + alt videos
    allAssets.push(preloadVideo(assets.heroVideo));
    allAssets.push(preloadVideo(assets.altVideo));

    // partner logos
    assets.partnerLogos.forEach((src) => allAssets.push(preloadImage(src)));

    // portfolio clips
    assets.portfolio.forEach((src) => allAssets.push(preloadVideo(src)));

    // ecosystem clips
    assets.ecosystem.forEach((src) => allAssets.push(preloadVideo(src)));

    const total = allAssets.length;
    let loaded = 0;

    allAssets.forEach((p) =>
      p.then(() => {
        loaded++;
        setProgress(Math.round((loaded / total) * 100));
      }),
    );

    // Fallback: force-complete after 6s so the user isn't stuck
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setFading(true), 300);
      return () => clearTimeout(t);
    }
  }, [progress]);

  useEffect(() => {
    if (fading) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [fading, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <AnimatedLogo />

      <h1
        className="mb-3 text-lg font-semibold tracking-tight text-white md:text-xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Karta Lucia
      </h1>

      <div className="flex w-48 flex-col items-center gap-2 md:w-64">
        {/* Progress bar track */}
        <div className="h-px w-full overflow-hidden bg-white/20">
          <div
            className="h-full bg-[var(--flare)] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <span
          className="text-xs tabular-nums text-white/50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
}
