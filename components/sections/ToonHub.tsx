"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const IMAGES = [
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png", bg: "#F4845F", panel: "#F79B7F" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png", bg: "#6BBF7A", panel: "#85CC92" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png", bg: "#E882B4", panel: "#ED9DC4" },
  { src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png", bg: "#6EB5FF", panel: "#8DC4FF" },
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
      height: isMobile ? "60%" : "92%",
      bottom: isMobile ? "22%" : "0%",
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

  return (
    <div
      className="relative w-full overflow-hidden bg-[var(--canvas)]"
    >
      <div className="relative w-full" style={{ height: "100vh", overflow: "hidden" }}>
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

        {/* Giant ghost text */}
        <div
          className="pointer-events-none absolute inset-x-0 flex items-center justify-center select-none"
          style={{ zIndex: 2, top: "18%" }}
        >
          <span
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
            3D SHAPE
          </span>
        </div>

        {/* Top-left brand label */}
        <div className="absolute left-4 top-6 sm:left-8" style={{ zIndex: 60 }}>
          <span className="text-xs font-semibold uppercase" style={{ color: "white", opacity: 0.9, letterSpacing: "0.18em" }}>
            TOONHUB
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
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: 320 }}
        >
          <p
            className="mb-2 font-bold uppercase sm:mb-3 sm:text-[22px]"
            style={{ color: "white", opacity: 0.95, letterSpacing: "0.02em", fontSize: isMobile ? "1rem" : undefined }}
          >
            TOONHUB FIGURINES
          </p>
          <p
            className="mb-4 hidden text-xs leading-relaxed sm:mb-5 sm:block sm:text-sm"
            style={{ color: "white", opacity: 0.85, lineHeight: 1.6 }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a
            vision, the 3D craft is flawless. Many thanks! Wishing you the win.
            Order now.
          </p>
          <div className="flex gap-3">
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

        {/* Bottom-right link */}
        <div className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10" style={{ zIndex: 60 }}>
          <a
            href="#"
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-100"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(20px, 4vw, 56px)",
              fontWeight: 400,
              color: "white",
              opacity: 0.95,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            DISCOVER IT
            <ArrowRight style={{ width: isMobile ? 20 : 32, height: isMobile ? 20 : 32, strokeWidth: 2.25 }} />
          </a>
        </div>
      </div>
    </div>
  );
}
