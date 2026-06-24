"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Crown,
  ShieldAlert,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import type { Character } from "@/types/character";

export default function FeaturedCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadCharacters() {
    const { data } = await supabase
      .from("characters")
      .select("*")
      .limit(4);

    setCharacters(data || []);
    setLoading(false);
  }

  return (
    <section className="relative overflow-hidden py-32">

      {/* Background */}

      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,transparent_65%)] opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-16 text-center">

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
            LEGENDS OF THE REALM
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
            Featured Characters
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-zinc-400">
            Heroes, tyrants, crystal bearers and forgotten rulers.
          </p>

        </div>

        {/* Loading */}

        {loading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="
                h-[520px]
                animate-pulse
                rounded-3xl
                bg-zinc-900
              "
              />
            ))}
          </div>
        )}

        {/* Character Cards */}

        {!loading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {characters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{
                  opacity: 0,
                  y: 50,
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
                <Link href={`/characters/${character.id}`}>

                  <div
                    className="
                    group
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-red-900/20
                    bg-zinc-950
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-red-500/40
                    hover:shadow-[0_0_60px_rgba(239,68,68,0.2)]
                  "
                  >

                    {/* Image */}

                    <div className="relative h-[420px] overflow-hidden">

                      {character.avatar_url ? (
                        <Image
                          src={character.avatar_url}
                          alt={character.name}
                          fill
                          className="
                          object-cover
                          transition
                          duration-700
                          group-hover:scale-110
                        "
                        />
                      ) : (
                        <div className="h-full w-full bg-zinc-900" />
                      )}

                      {/* Overlays */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                      <div
                        className="
                        absolute
                        inset-0
                        opacity-0
                        transition
                        duration-500
                        group-hover:opacity-100
                        bg-gradient-to-t
                        from-red-950/40
                        to-transparent
                      "
                      />

                      {/* Rank */}

                      {character.rank && (
                        <div
                          className="
                          absolute
                          left-4
                          top-4
                          flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-red-500/20
                          bg-black/70
                          px-3
                          py-1
                          backdrop-blur
                        "
                        >
                          <Crown
                            size={14}
                            className="text-yellow-400"
                          />

                          <span className="text-xs">
                            {character.rank}
                          </span>
                        </div>
                      )}

                      {/* Name */}

                      <div className="absolute bottom-5 left-5 right-5">

                        <h3
                          className="
                          text-3xl
                          font-black
                          text-white
                        "
                        >
                          {character.name}
                        </h3>

                        <p className="mt-1 text-sm text-zinc-300">
                          {character.title}
                        </p>

                      </div>

                    </div>

                    {/* Bottom Content */}

                    <div className="p-5">

                      <div className="flex flex-wrap gap-2">

                        {character.faction && (
                          <span
                            className="
                            rounded-full
                            bg-zinc-800
                            px-3
                            py-1
                            text-xs
                          "
                          >
                            {character.faction}
                          </span>
                        )}

                        {character.danger_level && (
                          <span
                            className="
                            flex
                            items-center
                            gap-1
                            rounded-full
                            bg-red-950/40
                            px-3
                            py-1
                            text-xs
                            text-red-400
                          "
                          >
                            <ShieldAlert size={12} />
                            {character.danger_level}
                          </span>
                        )}

                      </div>

                      {character.quote && (
                        <p
                          className="
                          mt-4
                          line-clamp-2
                          text-sm
                          italic
                          text-zinc-400
                        "
                        >
                          "{character.quote}"
                        </p>
                      )}

                      <div
                        className="
                        mt-5
                        flex
                        items-center
                        gap-2
                        text-red-400
                        transition
                        group-hover:translate-x-1
                      "
                      >
                        View Profile

                        <ArrowRight size={16} />
                      </div>

                    </div>

                  </div>

                </Link>
              </motion.div>
            ))}

          </div>
        )}

        {/* CTA */}

        <div className="mt-16 text-center">

          <Link
            href="/characters"
            className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            border
            border-red-500/30
            bg-red-950/10
            px-8
            py-4
            font-semibold
            text-white
            transition
            hover:border-red-500
            hover:bg-red-500/10
          "
          >
            View All Characters

            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
}