"use client";

import { motion } from "framer-motion";
import {
  Crown,
  Shield,
  Sword,
  Eye,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const factions = [
  {
    name: "Eleven Crux",
    description:
      "Legendary crystal bearers whose strength eclipses entire armies.",
    icon: Crown,
    color: "text-yellow-400",
  },
  {
    name: "Imperial Army",
    description:
      "The greatest military power protecting the central kingdoms.",
    icon: Shield,
    color: "text-blue-400",
  },
  {
    name: "Crystal Hunters",
    description:
      "Mercenaries and adventurers pursuing forbidden Agastha Crystals.",
    icon: Sword,
    color: "text-red-400",
  },
  {
    name: "Shadow Council",
    description:
      "An unseen force manipulating kings, wars and destiny itself.",
    icon: Eye,
    color: "text-purple-400",
  },
];

export default function WorldFactions() {
  return (
    <section className="relative overflow-hidden py-36">

      {/* Background */}

      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,transparent_65%)] opacity-20" />

      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-red-900/20 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-20 text-center">

          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-red-500/20
            bg-red-950/20
            px-4
            py-2
            text-sm
            tracking-widest
            text-red-400
          "
          >
            <Sparkles size={14} />
            POWER STRUGGLE
          </div>

          <h2
            className="
            mt-6
            text-5xl
            font-black
            text-white
            md:text-7xl
          "
          >
            World Factions
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-zinc-400">
            Powerful groups competing for control of the Agastha Crystals.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {factions.map((faction, index) => {
            const Icon = faction.icon;

            return (
              <motion.div
                key={faction.name}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
              >
                <div
                  className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-red-900/20
                  bg-zinc-950
                  p-8
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-red-500/40
                  hover:shadow-[0_0_60px_rgba(239,68,68,0.18)]
                "
                >

                  {/* Glow */}

                  <div
                    className="
                    absolute
                    inset-0
                    opacity-0
                    transition
                    duration-500
                    group-hover:opacity-100
                    bg-gradient-to-b
                    from-red-950/20
                    to-transparent
                  "
                  />

                  {/* Icon */}

                  <div
                    className="
                    relative
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-black
                    border
                    border-red-900/20
                  "
                  >
                    <Icon
                      size={28}
                      className={faction.color}
                    />
                  </div>

                  {/* Content */}

                  <h3
                    className="
                    mt-6
                    text-3xl
                    font-bold
                    text-white
                  "
                  >
                    {faction.name}
                  </h3>

                  <p
                    className="
                    mt-4
                    leading-relaxed
                    text-zinc-400
                  "
                  >
                    {faction.description}
                  </p>

                  {/* Power Meter */}

                  <div className="mt-6">

                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-zinc-500">
                      <span>Influence</span>
                      <span>High</span>
                    </div>

                    <div className="h-2 rounded-full bg-zinc-800">
                      <div
                        className="
                        h-2
                        w-[85%]
                        rounded-full
                        bg-gradient-to-r
                        from-red-500
                        to-red-700
                      "
                      />
                    </div>

                  </div>

                  {/* Footer */}

                  <div
                    className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    text-red-400
                    transition
                    group-hover:translate-x-1
                  "
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}