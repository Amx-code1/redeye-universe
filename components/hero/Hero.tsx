"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Users, Flame } from "lucide-react";
import Eye from "./Eye";
import SmokeBackground from "./SmokeBackground";
import FloatingParticles from "./FloatingParticles";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
      <SmokeBackground />
      <Eye />
      <FloatingParticles /> 

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_70%)] opacity-80" />

      {/* Floating Aura */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute h-[900px] w-[900px] rounded-full bg-red-600/10 blur-[200px]"
      />

      {/* Floating Particles */}

      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -120, 0],
            opacity: [0.1, 1, 0.1],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
          }}
          className="absolute h-2 w-2 rounded-full bg-red-500/30"
          style={{
            left: `${(i * 13) % 100}%`,
            top: `${(i * 7) % 100}%`,
          }}
        />
      ))}
      {/* Hero Glow */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          -z-10
          h-[450px]
          w-[450px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-600/10
          blur-[140px]
        "
      />

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.h1
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="
            mb-6
            bg-gradient-to-r
            from-red-400
            via-red-500
            to-red-700
            bg-clip-text
            text-7xl
            font-black
            tracking-[0.3em]
            text-transparent
            md:text-9xl
          "
        >
          RED-EYE
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="mx-auto max-w-3xl text-xl text-zinc-300 md:text-2xl"
        >
          There is a difference between being loved and being preserved. The
          Agastha Crystals changed everything.
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
          className="mt-12 flex flex-col justify-center gap-4 md:flex-row"
        >
          <Link
            href="/chapters"
            className="
              rounded-2xl
              bg-red-600
              px-10
              py-5
              font-bold
              shadow-lg
              shadow-red-500/30
              transition-all
              hover:scale-105
              hover:bg-red-700
            "
          >
            Start Reading
          </Link>

          <Link
            href="/characters"
            className="
              rounded-2xl
              border
              border-red-500
              px-10
              py-5
              font-bold
              transition-all
              hover:scale-105
              hover:bg-red-500/10
            "
          >
            Meet The Characters
          </Link>
        </motion.div>

        {/* Stats */}

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="rounded-3xl border border-red-900/30 bg-zinc-900/60 p-6 backdrop-blur"
          >
            <BookOpen className="mx-auto mb-4 h-8 w-8 text-red-500" />

            <div className="text-3xl font-bold">50+</div>

            <div className="text-zinc-400">Chapters</div>
          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="rounded-3xl border border-red-900/30 bg-zinc-900/60 p-6 backdrop-blur"
          >
            <Users className="mx-auto mb-4 h-8 w-8 text-red-500" />

            <div className="text-3xl font-bold">20+</div>

            <div className="text-zinc-400">Characters</div>
          </motion.div>

          <motion.div
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="rounded-3xl border border-red-900/30 bg-zinc-900/60 p-6 backdrop-blur"
          >
            <Flame className="mx-auto mb-4 h-8 w-8 text-red-500" />

            <div className="text-3xl font-bold">Endless</div>

            <div className="text-zinc-400">Mysteries</div>
          </motion.div>
        </div>

        {/* Lore Quote */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          className="mt-20"
        >
          <p className="mx-auto max-w-3xl text-xl italic text-zinc-400">
            "When the Agastha Crystal awakens, kingdoms kneel and history
            burns."
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        className="absolute bottom-8 text-zinc-500"
      >
        ↓ Scroll
      </motion.div>
    </section>
  );
}
