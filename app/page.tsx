import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import CreativePartners from "@/components/sections/CreativePartners";
import CreativePortfolio from "@/components/sections/CreativePortfolio";
import MeetOurTeam from "@/components/sections/MeetOurTeam";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CreativePartners />
        <CreativePortfolio />
        <MeetOurTeam />
      </main>
    </>
  );
}
