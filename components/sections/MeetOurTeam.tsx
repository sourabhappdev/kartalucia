"use client";

import { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MonoLabel from "@/components/ui/MonoLabel";
import { team } from "@/lib/content";

type Role = "center" | "left" | "right";

const TRANSITION = "650ms cubic-bezier(0.4,0,0.2,1)";

export default function MeetOurTeam() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const count = team.members.length;

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (animating) return;
      setAnimating(true);
      setActive((p) => (dir === "next" ? (p + 1) % count : (p + count - 1) % count));
      setTimeout(() => setAnimating(false), 650);
    },
    [animating, count]
  );

  const getRole = (i: number): Role => {
    if (i === active) return "center";
    if (i === (active + count - 1) % count) return "left";
    return "right";
  };

  const cardStyles = (role: Role): React.CSSProperties => {
    const base: React.CSSProperties = {
      transition: `transform ${TRANSITION}, filter ${TRANSITION}, opacity ${TRANSITION}, left ${TRANSITION}`,
      willChange: "transform, filter, opacity",
    };
    switch (role) {
      case "center":
        return {
          ...base,
          transform: "translateX(-50%) scale(1)",
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
          left: "50%",
        };
      case "left":
        return {
          ...base,
          transform: "translateX(-50%) scale(0.72)",
          filter: "blur(3px)",
          opacity: 0.5,
          zIndex: 10,
          left: "12%",
        };
      case "right":
        return {
          ...base,
          transform: "translateX(-50%) scale(0.72)",
          filter: "blur(3px)",
          opacity: 0.5,
          zIndex: 10,
          left: "88%",
        };
    }
  };

  const member = team.members[active];

  return (
    <section
      id="team"
      className="relative h-screen w-full overflow-hidden bg-[var(--canvas)]"
    >
      {/* Label — top right */}
      <div className="pointer-events-none absolute right-5 top-0 z-[60] pt-24 md:right-8 md:pt-28">
        <MonoLabel>{team.label}</MonoLabel>
      </div>

      {/* Giant ghost name */}
      <div className="pointer-events-none absolute inset-x-0 top-[14%] z-[2] flex items-start justify-center select-none">
        <span
          key={member.name}
          className="display-hero whitespace-nowrap text-[clamp(60px,18vw,260px)] uppercase text-white opacity-100"
          style={{ letterSpacing: "-0.03em" }}
        >
          {member.name}
        </span>
      </div>

      {/* Card carousel */}
      <div className="absolute inset-0 z-[3]">
        {team.members.map((m, i) => {
          const role = getRole(i);
          return (
            <div
              key={m.name}
              className="absolute bottom-[18%] aspect-[3/4] w-[220px] sm:w-[280px]"
              style={cardStyles(role)}
            >
              {/* Card face */}
              <div
                className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-[var(--line-strong)]"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                {/* Initials */}
                <span
                  className="display-hero text-[3.5rem] uppercase leading-none sm:text-[5rem]"
                  style={{ color: m.accent }}
                >
                  {m.initials}
                </span>
                {/* Name */}
                <span className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink)] sm:text-base">
                  {m.name}
                </span>
                {/* Role */}
                <span className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                  {m.role}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom-left text + nav */}
      <div className="absolute bottom-6 left-5 z-[60] max-w-[320px] sm:bottom-16 sm:left-20">
        <p className="font-display text-base font-bold uppercase tracking-[0.1em] text-[var(--ink)] sm:text-xl">
          {member.role}
        </p>
        <p className="mt-2 hidden text-sm leading-relaxed text-[var(--muted)] sm:mb-5 sm:block">
          {member.description}
        </p>
        <div className="flex gap-3">
          {(["prev", "next"] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => navigate(dir)}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 text-[var(--ink)] transition-all duration-150 hover:scale-105 hover:border-white/50 hover:bg-white/10 sm:h-14 sm:w-14"
            >
              {dir === "prev" ? (
                <ArrowLeft size={22} strokeWidth={2.25} />
              ) : (
                <ArrowRight size={22} strokeWidth={2.25} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Counter dots — bottom right */}
      <div className="absolute bottom-8 right-5 z-[60] flex items-center gap-2 sm:bottom-16 sm:right-10">
        {team.members.map((_, i) => (
          <span
            key={i}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === active ? "24px" : "8px",
              backgroundColor: i === active ? "var(--flare)" : "var(--faint)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
