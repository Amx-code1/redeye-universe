
import Hero from "@/components/hero/Hero";
import LatestChapters from "@/components/sections/LatestChapters";
import FeaturedCharacters from "@/components/sections/FeaturedCharacters";

export default function Home() {
  return (
    <>
      <Hero />
      <LatestChapters />
      <FeaturedCharacters />
    </>
  );
}