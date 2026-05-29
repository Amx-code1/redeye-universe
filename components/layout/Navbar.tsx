"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 z-50 w-full border-b border-red-900/20 bg-black/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-red-500">
          RED-EYE
        </h1>

        <div className="hidden gap-8 md:flex text-white">
          <a href="#">Story</a>
          <a href="#">Characters</a>
          <a href="#">Factions</a>
          <a href="#">Lore</a>
          <a href="#">Community</a>
        </div>

        <button className="rounded-full bg-red-700 px-5 py-2 text-white">
          Read Now
        </button>
      </div>
    </motion.nav>
  );
}