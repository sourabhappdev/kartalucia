import { clsx } from "@/lib/clsx";

/**
 * Seamless infinite marquee. Renders the children twice inside a track and
 * translates the track by -50% so the loop is continuous. `reverse` flips the
 * travel direction (L→R instead of R→L).
 */
export default function Marquee({
  children,
  reverse = false,
  durationSec = 34,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  durationSec?: number;
  className?: string;
}) {
  return (
    <div className={clsx("marquee-viewport w-full overflow-hidden", className)}>
      <div
        className={clsx("marquee-track", reverse && "reverse")}
        style={{ animationDuration: `${durationSec}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
