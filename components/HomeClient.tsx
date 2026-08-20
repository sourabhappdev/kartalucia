"use client";

import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import CreativePartners from "@/components/sections/CreativePartners";
import CreativePortfolio from "@/components/sections/CreativePortfolio";
import ToonHub from "@/components/sections/ToonHub";
import Testimonials from "@/components/sections/Testimonials";

export default function HomeClient() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <SplashScreen onComplete={() => setLoaded(true)} />}
      <Nav />
      <main>
        <Hero />
        <CreativePartners />
        <CreativePortfolio />
        <ToonHub />
        <Testimonials />
      </main>
    </>
  );
}
