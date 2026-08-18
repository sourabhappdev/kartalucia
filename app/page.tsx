import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import CreativePartners from "@/components/sections/CreativePartners";
import CreativePortfolio from "@/components/sections/CreativePortfolio";
import AboutUs from "@/components/sections/AboutUs";
import Ecosystem from "@/components/sections/Ecosystem";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* --- placeholder sections (built next) --- */}
        <CreativePartners />
        <CreativePortfolio />
        <AboutUs />
        <section
          id="ecosystem"
          className="flex min-h-screen items-center justify-center border-t border-[var(--line)]"
        >
          <span className="mono-label">Ecosystem — coming next</span>
        </section>
        <section
          id="contact"
          className="flex min-h-[80vh] items-center justify-center border-t border-[var(--line)]"
        >
          <span className="mono-label">Contact — coming next</span>
        </section>
      </main>
    </>
  );
}
