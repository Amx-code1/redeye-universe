"use client";

import { motion } from "framer-motion";

const factions = [
  {
    name: "Eleven Crux",
    description:
      "Elite warriors possessing unmatched combat abilities.",
  },
  {
    name: "Imperial Army",
    description:
      "The largest military force protecting the central kingdoms.",
  },
  {
    name: "Crystal Hunters",
    description:
      "Mercenaries searching for forbidden Agastha Crystals.",
  },
  {
    name: "Shadow Council",
    description:
      "A hidden organization manipulating world events.",
  },
];

export default function WorldFactions() {
  return (
    <section className="bg-black py-32 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-5xl font-black text-red-500">
            World Factions
          </h2>

          <p className="mt-4 text-zinc-400">
            The powers fighting for control of the world.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {factions.map((faction, index) => (
            <motion.div
              key={faction.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group rounded-3xl border border-red-900/30 bg-zinc-900 p-8 transition hover:-translate-y-2 hover:border-red-500"
            >
              <h3 className="text-2xl font-bold text-red-500">
                {faction.name}
              </h3>

              <p className="mt-4 text-zinc-400">
                {faction.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}