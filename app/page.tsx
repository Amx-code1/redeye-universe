
import Hero from "@/components/hero/Hero";
import LatestChapters from "@/components/sections/LatestChapters";
import FeaturedCharacters from "@/components/sections/FeaturedCharacters";
import type { Metadata } from "next";

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
    </>
  );
}