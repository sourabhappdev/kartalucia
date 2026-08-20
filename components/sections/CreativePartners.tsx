import Marquee from "@/components/ui/Marquee";
import MonoLabel from "@/components/ui/MonoLabel";
import { assets } from "@/lib/assets";
import { partners } from "@/lib/content";

function LogoRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <Marquee reverse={reverse} durationSec={reverse ? 40 : 34}>
      {assets.partnerLogos.map((src, i) => (
        <span
          key={`${src}-${i}`}
          className="mx-8 flex h-10 w-[130px] shrink-0 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 md:mx-12 md:h-12 md:w-[160px]"
        >
          {/* plain img: external transparent logos, kept simple + tinted white */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="Partner logo"
            className="max-h-full max-w-full object-contain [filter:brightness(0)_invert(1)]"
            loading="lazy"
          />
        </span>
      ))}
    </Marquee>
  );
}

export default function CreativePartners() {
  return (
    <section
      id="partners"
      className="relative border-t border-[var(--line)] bg-[var(--canvas)] py-16 md:py-24"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-5 md:flex-row md:items-center md:gap-0 md:px-8">
        {/* Left label */}
        <div className="md:shrink-0">
          <MonoLabel>{partners.label}</MonoLabel>
        </div>

        {/* Vertical divider */}
        <div className="hidden md:block md:mx-6 md:h-16 md:w-px md:shrink-0 md:self-center" style={{ backgroundColor: "var(--line)" }} />

        {/* Right — two opposing marquee rows */}
        <div className="flex min-w-0 flex-col gap-8 md:flex-1 md:gap-10">
          <LogoRow />
          <LogoRow reverse />
        </div>
      </div>
    </section>
  );
}
