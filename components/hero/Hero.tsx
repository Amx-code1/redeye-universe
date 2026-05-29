"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">

      <div className="absolute h-[700px] w-[700px] rounded-full bg-red-700/20 blur-[200px]" />

      <div className="absolute h-[260px] w-[520px] rounded-full border border-red-600 opacity-50" />

      <div className="absolute h-28 w-28 rounded-full bg-red-600 blur-xl" />

      <div className="absolute h-16 w-16 rounded-full bg-red-900" />

      <div className="z-10 max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 text-7xl font-extrabold"
        >
          RED-EYE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto max-w-2xl text-lg text-gray-300"
        >
          There is a difference between being loved and being preserved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 flex justify-center gap-4"
        >
          <button className="rounded-full bg-red-700 px-8 py-4 font-bold">
            Start Reading
          </button>

          <button className="rounded-full border border-red-700 px-8 py-4">
            Explore Lore
          </button>
        </motion.div>
      </div>
    </section>
  );
}