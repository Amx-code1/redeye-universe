"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Flame,
  Brain,
  Swords,
  Orbit,
  Skull,
} from "lucide-react";

const crystals = [
  {
    name: "Type I",
    ability: "Physical Enhancement",
    icon: Swords,
    rarity: "Common",
  },
  {
    name: "Type II",
    ability: "Elemental Control",
    icon: Flame,
    rarity: "Rare",
  },
  {
    name: "Type III",
    ability: "Summoning",
    icon: Orbit,
    rarity: "Rare",
  },
  {
    name: "Type IV",
    ability: "Mind Influence",
    icon: Brain,
    rarity: "Epic",
  },
  {
    name: "Type V",
    ability: "Dimensional Power",
    icon: Sparkles,
    rarity: "Legendary",
  },
  {
    name: "Type VI",
    ability: "Forbidden Evolution",
    icon: Skull,
    rarity: "Mythic",
  },
];

export default function CrystalSystem() {
  return (
    <section className="relative overflow-hidden py-36">

      {/* Background */}

      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,transparent_70%)] opacity-20" />

      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-red-900/20 blur-[200px]" />

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
            SOURCE OF ALL POWER
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
            Agastha Crystal System
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-zinc-400">
            Every ability, kingdom and war traces its origin back to
            the Agastha Crystals.
          </p>

        </div>

        {/* Crystal Showcase */}

        <div
          className="
          mb-24
          grid
          items-center
          gap-12
          lg:grid-cols-2
        "
        >

          {/* Crystal */}

          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="relative flex justify-center"
          >

            <div
              className="
              absolute
              h-[500px]
              w-[500px]
              rounded-full
              bg-red-600/20
              blur-[150px]
            "
            />

            <Image
              src="/world/agastha-crystal.webp"
              alt="Agastha Crystal"
              width={500}
              height={500}
              className="relative z-10 object-contain"
            />

          </motion.div>

          {/* Lore */}

          <div>

            <h3 className="text-4xl font-black text-red-500">
              The Origin Of Power
            </h3>

            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              Long before kingdoms existed, mysterious crimson crystals
              descended from the heavens.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              These relics granted unimaginable abilities to those
              capable of surviving synchronization.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Today, every war, empire and legend is shaped by the
              power hidden within the Agastha Crystals.
            </p>

          </div>

        </div>

        {/* Crystal Types */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {crystals.map((crystal, index) => {
            const Icon = crystal.icon;

            return (
              <motion.div
                key={crystal.name}
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
                className="
                group
                rounded-[30px]
                border
                border-red-900/20
                bg-zinc-950
                p-8
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-red-500/40
                hover:shadow-[0_0_60px_rgba(239,68,68,0.15)]
              "
              >

                <div
                  className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-red-900/20
                  bg-black
                "
                >
                  <Icon
                    size={28}
                    className="text-red-400"
                  />
                </div>

                <div
                  className="
                  mt-6
                  inline-flex
                  rounded-full
                  bg-red-950/40
                  px-3
                  py-1
                  text-xs
                  uppercase
                  tracking-widest
                  text-red-400
                "
                >
                  {crystal.rarity}
                </div>

                <h3
                  className="
                  mt-4
                  text-3xl
                  font-bold
                  text-white
                "
                >
                  {crystal.name}
                </h3>

                <p className="mt-3 text-zinc-400">
                  {crystal.ability}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}