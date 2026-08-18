import { clsx } from "@/lib/clsx";

/**
 * Small monospace uppercase label with an optional leading dot "logo",
 * used across sections (CREATIVE PARTNERS, WHAT WE DO, ABOUT US, …).
 */
export default function MonoLabel({
  children,
  dot = true,
  className,
}: {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span className={clsx("mono-label inline-flex items-center gap-2", className)}>
      {dot && (
        <span
          aria-hidden
          className="inline-block h-[7px] w-[7px] rounded-full bg-[var(--flare)]"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
