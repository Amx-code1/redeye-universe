"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Flame,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_70%)]" />

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute h-[800px] w-[800px] rounded-full bg-red-600/10 blur-[180px]"
      />

      {/* Eye */}

      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute h-[280px] w-[560px] rounded-full border border-red-500/40"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute h-32 w-32 rounded-full bg-red-600 blur-xl"
      />

      <div className="absolute h-16 w-16 rounded-full bg-red-900" />

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
          className="mb-6 text-7xl font-black tracking-[0.3em] md:text-9xl"
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
          There is a difference between being loved and being preserved.
          The Agastha Crystals changed everything.
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
            className="rounded-2xl bg-red-600 px-10 py-5 font-bold transition hover:bg-red-700"
          >
            Start Reading
          </Link>

          <Link
            href="/characters"
            className="rounded-2xl border border-red-500 px-10 py-5 font-bold transition hover:bg-red-500/10"
          >
            Meet The Characters
          </Link>
        </motion.div>

        {/* Stats */}

        <div className="mt-24 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-red-900/30 bg-zinc-900/60 p-6 backdrop-blur">
            <BookOpen className="mx-auto mb-4 h-8 w-8 text-red-500" />

            <div className="text-3xl font-bold">
              50+
            </div>

            <div className="text-zinc-400">
              Chapters
            </div>
          </div>

          <div className="rounded-3xl border border-red-900/30 bg-zinc-900/60 p-6 backdrop-blur">
            <Users className="mx-auto mb-4 h-8 w-8 text-red-500" />

            <div className="text-3xl font-bold">
              20+
            </div>

            <div className="text-zinc-400">
              Characters
            </div>
          </div>

          <div className="rounded-3xl border border-red-900/30 bg-zinc-900/60 p-6 backdrop-blur">
            <Flame className="mx-auto mb-4 h-8 w-8 text-red-500" />

            <div className="text-3xl font-bold">
              Endless
            </div>

            <div className="text-zinc-400">
              Mysteries
            </div>
          </div>

        </div>

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