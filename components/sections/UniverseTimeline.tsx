"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Crown,
  Flame,
  Skull,
} from "lucide-react";

const timeline = [
  {
    year: "Year 0",
    title: "Agastha Crystal Appears",
    description:
      "The first Agastha Crystal emerged from the heavens, forever altering the destiny of mankind.",
    icon: Sparkles,
  },
  {
    year: "Year 5",
    title: "Rise of Eleven Crux",
    description:
      "The strongest crystal bearers united and established the legendary Eleven Crux.",
    icon: Crown,
  },
  {
    year: "Year 12",
    title: "Crystal Wars",
    description:
      "Entire nations burned as rulers fought for control of crystal power.",
    icon: Flame,
  },
  {
    year: "Year 18",
    title: "Red-Eye Incident",
    description:
      "A forbidden awakening shattered reality and unleashed horrors upon the world.",
    icon: Skull,
  },
];

export default function UniverseTimeline() {
  return (
    <section className="relative overflow-hidden py-36">

      {/* Background */}

      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,transparent_70%)] opacity-20" />

      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-red-900/20 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-24 text-center">

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
            HISTORY OF THE REALM
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
            Universe Timeline
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-zinc-400">
            Key events that shaped kingdoms, crystal bearers and the fate of
            the Red-Eye Universe.
          </p>

        </div>

        {/* Timeline */}

        <div className="relative">

          {/* Center Line */}

          <div
            className="
            absolute
            left-1/2
            top-0
            hidden
            h-full
            w-px
            -translate-x-1/2
            bg-gradient-to-b
            from-transparent
            via-red-500/40
            to-transparent
            lg:block
          "
          />

          <div className="space-y-24">

            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.year}
                  initial={{
                    opacity: 0,
                    y: 80,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  className="
                  relative
                  grid
                  items-center
                  gap-5
                  lg:grid-cols-2
                "
                >

                  {/* Card */}

                  <div
                    className={`
                      ${isLeft ? "lg:pr-20" : "lg:col-start-2 lg:pl-20"}
                    `}
                  >
                    <div
                      className="
                      group
                      overflow-hidden
                      rounded-[32px]
                      border
                      border-red-900/20
                      bg-zinc-950
                      p-8
                      transition-all
                      duration-500
                      hover:border-red-500/40
                      hover:shadow-[0_0_60px_rgba(239,68,68,0.15)]
                    "
                    >
                      <div className="flex items-center gap-4">

                        <div
                          className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          bg-red-950/40
                          text-red-400
                        "
                        >
                          <Icon size={24} />
                        </div>

                        <div>
                          <div className="text-sm uppercase tracking-widest text-red-400">
                            {item.year}
                          </div>

                          <h3 className="text-3xl font-bold text-white">
                            {item.title}
                          </h3>
                        </div>

                      </div>

                      <p className="mt-6 leading-relaxed text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Crystal Node */}

                  <div
                    className="
                    absolute
                    left-1/2
                    top-1/2
                    hidden
                    -translate-x-1/2
                    -translate-y-1/2
                    lg:flex
                  "
                  >
                    <div className="relative">

                      <div
                        className="
                        h-8
                        w-8
                        rotate-45
                        bg-red-500
                        shadow-[0_0_40px_rgba(239,68,68,0.9)]
                      "
                      />

                      <div
                        className="
                        absolute
                        inset-0
                        animate-ping
                        rotate-45
                        bg-red-500/40
                      "
                      />

                    </div>
                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}