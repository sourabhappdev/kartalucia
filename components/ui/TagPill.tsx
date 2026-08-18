/** Rounded outline pill used for ecosystem card tags. */
export default function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[var(--line)] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-[var(--muted)] whitespace-nowrap">
      {children}
    </span>
  );
}
