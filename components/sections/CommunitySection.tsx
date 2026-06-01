"use client";

import { motion } from "framer-motion";

export default function CommunitySection() {
  return (
    <section className="relative overflow-hidden bg-black py-32 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,transparent_70%)] opacity-20" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-black text-red-500"
        >
          Join The Journey
        </motion.h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
          Follow the development of Red-Eye Universe, discover new
          characters, chapters, lore updates and future releases.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 md:flex-row">

          <a
            href="https://discord.gg"
            target="_blank"
            className="rounded-2xl bg-red-600 px-8 py-4 font-bold hover:bg-red-700"
          >
            Join Discord
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            className="rounded-2xl border border-red-500 px-8 py-4 font-bold hover:bg-red-500/10"
          >
            Follow Updates
          </a>

        </div>

      </div>

    </section>
  );
}