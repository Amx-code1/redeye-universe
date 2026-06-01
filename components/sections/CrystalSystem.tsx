"use client";

import { motion } from "framer-motion";

const crystals = [
  {
    name: "Type 1",
    ability: "Physical Enhancement",
  },
  {
    name: "Type 2",
    ability: "Elemental Control",
  },
  {
    name: "Type 3",
    ability: "Summoning",
  },
  {
    name: "Type 4",
    ability: "Mind Influence",
  },
  {
    name: "Type 5",
    ability: "Dimensional Power",
  },
  {
    name: "Type 6",
    ability: "Forbidden Evolution",
  },
];

export default function CrystalSystem() {
  return (
    <section className="relative overflow-hidden bg-black py-32 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,transparent_70%)] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-5xl font-black text-red-500">
            Agastha Crystal System
          </h2>

          <p className="mt-4 text-zinc-400">
            Every power originates from the mysterious Agastha Crystals.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {crystals.map((crystal, index) => (
            <motion.div
              key={crystal.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-3xl border border-red-900/30 bg-zinc-900/70 p-8 backdrop-blur"
            >
              <div className="mb-4 text-2xl font-bold text-red-500">
                {crystal.name}
              </div>

              <div className="text-zinc-300">
                {crystal.ability}
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}