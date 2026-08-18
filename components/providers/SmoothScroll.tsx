"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LenisCtx = {
  lenis: Lenis | null;
  stop: () => void;
  start: () => void;
  scrollTo: (target: string | number | HTMLElement, opts?: object) => void;
};

const SmoothScrollContext = createContext<LenisCtx>({
  lenis: null,
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      touchMultiplier: 1.5,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Dev convenience: drive smooth scroll from the console / tooling.
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { lenis?: Lenis }).lenis = instance;
    }

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync after layout/asset loads.
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const ctx: LenisCtx = {
    lenis,
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
    scrollTo: (target, opts) => lenisRef.current?.scrollTo(target, opts),
  };

  return (
    <SmoothScrollContext.Provider value={ctx}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
