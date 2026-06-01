
import Hero from "@/components/hero/Hero";
import LatestChapters from "@/components/sections/LatestChapters";
import FeaturedCharacters from "@/components/sections/FeaturedCharacters";
import type { Metadata } from "next";
import UniverseTimeline from "@/components/sections/UniverseTimeline";
import WorldFactions from "@/components/sections/WorldFactions";
import CrystalSystem from "@/components/sections/CrystalSystem";
import CommunitySection from "@/components/sections/CommunitySection";


export const metadata: Metadata = {
  title: "Red-Eye Universe",
  description:
    "A dark fantasy universe built around Agastha Crystals, rebellion, and forbidden power.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <LatestChapters />
      <FeaturedCharacters />
      <UniverseTimeline />
      <WorldFactions />
      <CrystalSystem />
      <CommunitySection />
    </>
  );
}