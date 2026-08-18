"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { brand, nav as navItems, hero } from "@/lib/content";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const { scrollTo, stop, start } = useSmoothScroll();

  // Animate the full-screen overlay open/closed.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const links = linksRef.current?.querySelectorAll("li") ?? [];

    if (open) {
      stop();
      gsap.set(overlay, { pointerEvents: "auto" });
      gsap
        .timeline()
        .to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .fromTo(
          links,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.2"
        );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: "none" });
          start();
        },
      });
    }
  }, [open, stop, start]);

  const go = (href: string) => {
    setOpen(false);
    // wait a tick so scroll re-enables before jumping
    setTimeout(() => scrollTo(href, { offset: 0 }), 50);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="relative flex items-center justify-between px-5 py-4 md:px-8 md:py-6">
          {/* left spacer keeps the wordmark optically centered */}
          <div className="flex-1" />

          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              go("#hero");
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
          >
            <span className="font-display text-[15px] font-semibold uppercase tracking-[0.28em] text-[var(--ink)] md:text-[17px]">
              {brand.name}
            </span>
          </a>

          <div className="flex flex-1 items-center justify-end gap-6">
            <nav className="hidden items-center gap-6 md:flex">
              {hero.actions.map((a) => (
                <a
                  key={a.label}
                  href={a.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(a.href);
                  }}
                  className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  {a.label}
                </a>
              ))}
            </nav>

            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="group relative z-[60] flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
            >
              <span
                className={`h-[1.5px] w-6 bg-current text-[var(--ink)] transition-all duration-300 ${
                  open ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-6 bg-current text-[var(--ink)] transition-all duration-300 ${
                  open ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex flex-col justify-center bg-black/95 px-8 opacity-0 backdrop-blur-sm md:px-16"
        style={{ pointerEvents: "none" }}
      >
        <ul ref={linksRef} className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.label} className="overflow-hidden">
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className="group flex items-baseline gap-4 py-1 font-display text-[10vw] font-semibold uppercase leading-[1.05] tracking-[-0.01em] text-[var(--ink)] transition-colors hover:text-[var(--flare)] md:text-[6vw]"
              >
                {item.label}
                <span className="translate-y-[-0.4em] font-mono text-[0.8rem] text-[var(--faint)] opacity-0 transition-opacity group-hover:opacity-100">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
