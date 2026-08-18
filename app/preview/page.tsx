import CreativePartners from "@/components/sections/CreativePartners";
import CreativePortfolio from "@/components/sections/CreativePortfolio";
import AboutUs from "@/components/sections/AboutUs";

/**
 * Dev-only preview route: renders a single section at the top of the page so it
 * can be inspected/screenshotted without the full-height hero above it.
 * Usage: /preview?s=partners
 */
const SECTIONS: Record<string, React.ComponentType> = {
  partners: CreativePartners,
  portfolio: CreativePortfolio,
  about: AboutUs,
};

export default async function Preview({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>;
}) {
  const { s = "partners" } = await searchParams;
  const Section = SECTIONS[s] ?? CreativePartners;
  return (
    <main className="min-h-screen bg-[var(--canvas)] pt-24">
      <Section />
    </main>
  );
}
