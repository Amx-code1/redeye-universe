"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Users, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ====================================================== */}
      {/* BACKGROUND */}
      {/* ====================================================== */}

      <Image
        src="/world/hero-bg.webp"
        alt="Red Eye Universe"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/60" />

      {/* Red Atmosphere */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.35),transparent_70%)]
        "
      />

      {/* ====================================================== */}
      {/* FLOATING CRYSTAL */}
      {/* ====================================================== */}

      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          right-[5%]
          top-1/2
          hidden
          -translate-y-1/2
          lg:block
        "
      >
        <Image
          src="/world/agastha-crystal.webp"
          alt="Agastha Crystal"
          width={550}
          height={550}
          className="
            drop-shadow-[0_0_100px_rgba(239,68,68,0.8)]
          "
        />
      </motion.div>

      {/* ====================================================== */}
      {/* CASTLE FOREGROUND */}
      {/* ====================================================== */}

      <div className="absolute bottom-0 left-0 w-full opacity-50">
        <Image
          src="/world/castle.webp"
          alt="Castle"
          width={1800}
          height={500}
          className="w-full object-cover"
        />
      </div>

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          items-center
          px-6
        "
      >
        <div className="max-w-3xl">
          {/* Badge */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-red-500/20
              bg-black/40
              px-5
              py-2
              text-sm
              tracking-[0.25em]
              text-red-400
              backdrop-blur-xl
            "
          >
            DARK FANTASY UNIVERSE
          </motion.div>

          {/* Title */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              font-title
              text-6xl
              font-black
              uppercase
              leading-none
              tracking-[0.15em]
              md:text-8xl
              xl:text-[8rem]
            "
          >
            <span
              className="
                bg-gradient-to-b
                from-red-200
                via-red-400
                to-red-700
                bg-clip-text
                text-transparent
                drop-shadow-[0_0_50px_rgba(239,68,68,0.8)]
              "
            >
              RED-EYE
            </span>
          </motion.h1>

          {/* Subtitle */}

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="
              mt-8
              max-w-2xl
              text-lg
              leading-relaxed
              text-zinc-300
              md:text-2xl
            "
          >
            Power born from Agastha Crystals.
            Kingdoms consumed by fate.
            Ancient bloodlines, forbidden abilities,
            and a world standing on the edge of collapse.
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
              delay: 0.6,
            }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/chapters"
              className="
                rounded-2xl
                bg-red-600
                px-8
                py-4
                font-bold
                transition-all
                hover:scale-105
                hover:bg-red-700
                hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]
              "
            >
              Start Reading
            </Link>

            <Link
              href="/characters"
              className="
                rounded-2xl
                border
                border-red-500/30
                bg-black/40
                px-8
                py-4
                font-bold
                backdrop-blur-xl
                transition-all
                hover:border-red-500
                hover:bg-red-500/10
              "
            >
              Explore Characters
            </Link>
          </motion.div>

          {/* Stats */}

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <StatCard
              icon={<BookOpen size={22} />}
              title="50+"
              subtitle="Chapters"
            />

            <StatCard
              icon={<Users size={22} />}
              title="20+"
              subtitle="Characters"
            />

            <StatCard
              icon={<Sparkles size={22} />}
              title="Infinite"
              subtitle="Mysteries"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-red-500/10
        bg-black/40
        p-6
        backdrop-blur-xl
        transition
        hover:border-red-500/30
        hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]
      "
    >
      <div className="mb-4 text-red-500">
        {icon}
      </div>

      <div className="text-3xl font-bold">
        {title}
      </div>

      <div className="text-zinc-400">
        {subtitle}
      </div>
    </div>
  );
}