"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "Year 0",
    title: "Agastha Crystal Appears",
    description:
      "The first Agastha Crystal emerged, changing the balance of the world forever.",
  },
  {
    year: "Year 5",
    title: "Rise of Eleven Crux",
    description:
      "The strongest warriors gathered under one banner and formed Eleven Crux.",
  },
  {
    year: "Year 12",
    title: "Crystal Wars",
    description:
      "Entire kingdoms fought to control the power hidden inside the crystals.",
  },
  {
    year: "Year 18",
    title: "Red-Eye Incident",
    description:
      "A catastrophic event awakened powers never meant for humanity.",
  },
];

export default function UniverseTimeline() {
  return (
    <section className="relative bg-black py-32 text-white">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-20 text-center">
          <h2 className="text-5xl font-black text-red-500">
            Universe Timeline
          </h2>

          <p className="mt-4 text-zinc-400">
            Key moments that shaped the Red-Eye Universe.
          </p>
        </div>

        <div className="relative border-l border-red-800">

          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative mb-16 ml-8"
            >
              <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]" />

              <div className="rounded-3xl border border-red-900/30 bg-zinc-900 p-8">
                <div className="mb-2 text-red-400">
                  {item.year}
                </div>

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 text-zinc-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}