import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import CreativePartners from "@/components/sections/CreativePartners";
import CreativePortfolio from "@/components/sections/CreativePortfolio";
import Social from "@/components/sections/Social";
import ToonHub from "@/components/sections/ToonHub";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CreativePartners />
        <CreativePortfolio />
        <Social />
        <ToonHub />
      </main>
    </>
  );
}
