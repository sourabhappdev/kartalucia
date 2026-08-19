"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const IMAGES = [
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png", name: "BLAZE", role: "Creative Director", about: "Leads the visual identity and creative strategy behind every campaign, shaping bold narratives that resonate." },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png", name: "FERN", role: "Motion Designer", about: "Brings ideas to life through fluid animations and cinematic motion graphics that captivate audiences." },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png", name: "ROSA", role: "Brand Strategist", about: "Crafts compelling brand stories and positioning strategies that create lasting cultural impact." },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png", name: "AZURE", role: "3D Artist", about: "Sculpts and renders hyper-detailed 3D figurines and environments with meticulous precision." },
];

type Role = "center" | "left" | "right" | "back";

function getRole(idx: number, active: number): Role {
  if (idx === active) return "center";
  if (idx === (active + 3) % 4) return "left";
  if (idx === (active + 1) % 4) return "right";
  return "back";
}

function roleStyles(role: Role, isMobile: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    aspectRatio: "0.6 / 1",
    width: "100%",
    transition: "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)",
    willChange: "transform, filter, opacity",
  };

  if (role === "center") {
    return {
      ...base,
      transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
      filter: "blur(0px)",
      opacity: 1,
      zIndex: 20,
      left: "50%",
      height: isMobile ? "50%" : "65%",
      bottom: isMobile ? "5%" : "0%",
    };
  }

  if (role === "left") {
    return {
      ...base,
      transform: "translateX(-50%) scale(1)",
      filter: "blur(2px)",
      opacity: 0.85,
      zIndex: 10,
      left: isMobile ? "20%" : "30%",
      height: isMobile ? "16%" : "28%",
      bottom: isMobile ? "32%" : "12%",
    };
  }

  if (role === "right") {
    return {
      ...base,
      transform: "translateX(-50%) scale(1)",
      filter: "blur(2px)",
      opacity: 0.85,
      zIndex: 10,
      left: isMobile ? "80%" : "70%",
      height: isMobile ? "16%" : "28%",
      bottom: isMobile ? "32%" : "12%",
    };
  }

  return {
    ...base,
    transform: "translateX(-50%) scale(1)",
    filter: "blur(4px)",
    opacity: 1,
    zIndex: 5,
    left: "50%",
    height: isMobile ? "13%" : "22%",
    bottom: isMobile ? "32%" : "12%",
  };
}

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E";

export default function ToonHub() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    IMAGES.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        dir === "next" ? (prev + 1) % 4 : (prev + 3) % 4
      );
      setTimeout(() => setIsAnimating(false), 650);
    },
    [isAnimating]
  );

  // Swipe gestures (mobile) — horizontal drag changes the active figurine.
  // Vertical scroll is untouched since we only act past the horizontal threshold.
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const threshold = 40;
    // Only treat as a swipe when it's mostly horizontal.
    if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy)) {
      navigate(dx < 0 ? "next" : "prev");
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-[var(--canvas)]"
      style={{ paddingTop: "var(--section-gap)" }}
    >
      <div
        className="relative w-full"
        style={{ height: "100vh", overflow: "hidden" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("${GRAIN_SVG}")`,
            backgroundSize: "200px 200px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Giant ghost text — dynamic character name */}
        <div
          className="pointer-events-none absolute inset-x-0 flex items-center justify-center select-none"
          style={{ zIndex: 2, top: "18%" }}
        >
          <span
            key={activeIndex}
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(90px, 28vw, 380px)",
              fontWeight: 900,
              color: "white",
              opacity: 1,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {IMAGES[activeIndex].name}
          </span>
        </div>

        {/* Top-left brand label */}
        <div className="absolute left-5 top-6 sm:left-8" style={{ zIndex: 60 }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "3vw",
              fontWeight: 700,
              color: "white",
              opacity: 0.9,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            OUR TEAM
          </span>
        </div>

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((img, idx) => {
            const role = getRole(idx, activeIndex);
            return (
              <div key={idx} style={roleStyles(role, isMobile)}>
                <img
                  src={img.src}
                  alt={`Figurine ${idx + 1}`}
                  draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "bottom center" }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom-left text + nav buttons */}
        <div
          className="absolute bottom-8 left-4 sm:bottom-24 sm:left-24"
          style={{ zIndex: 60, maxWidth: 380 }}
        >
          <p
            key={`role-${activeIndex}`}
            className="mb-1 font-bold uppercase sm:mb-2 sm:text-[18px]"
            style={{ color: "white", opacity: 0.95, letterSpacing: "0.02em", fontSize: isMobile ? "0.875rem" : undefined }}
          >
            {IMAGES[activeIndex].role}
          </p>
          <p
            key={`about-${activeIndex}`}
            className="mb-4 hidden text-xs leading-relaxed sm:mb-5 sm:block sm:text-sm"
            style={{ color: "white", opacity: 0.85, lineHeight: 1.6 }}
          >
            {IMAGES[activeIndex].about}
          </p>
          <div className="flex gap-3" style={{ display: isMobile ? "none" : "flex" }}>
            <button
              onClick={() => navigate("prev")}
              className="flex items-center justify-center rounded-full transition-transform duration-150 hover:scale-105"
              style={{
                width: isMobile ? 48 : 64,
                height: isMobile ? 48 : 64,
                backgroundColor: "transparent",
                border: "2px solid white",
                color: "white",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate("next")}
              className="flex items-center justify-center rounded-full transition-transform duration-150 hover:scale-105"
              style={{
                width: isMobile ? 48 : 64,
                height: isMobile ? 48 : 64,
                backgroundColor: "transparent",
                border: "2px solid white",
                color: "white",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
