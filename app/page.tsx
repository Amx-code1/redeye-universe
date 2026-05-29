import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import LatestChapters from "@/components/sections/LatestChapters";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LatestChapters />
    </>
  );
}