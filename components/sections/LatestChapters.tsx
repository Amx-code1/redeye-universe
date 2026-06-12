"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Sparkles,
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  slug: string;
  chapter_number: number;
  cover_image: string | null;
  created_at: string;
}

export default function LatestChapters() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChapters();
  }, []);

  async function loadChapters() {
    const { data } = await supabase
      .from("chapters")
      .select("*")
      .order("chapter_number", {
        ascending: false,
      })
      .limit(6);

    setChapters(data || []);
    setLoading(false);
  }

  return (
    <section className="relative py-32 overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#7f1d1d_0%,transparent_60%)] opacity-30" />

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
            LATEST STORY CONTENT
          </div>

          <h2
            className="
            mt-6
            font-title
            text-5xl
            font-black
            text-white
            md:text-7xl
          "
          >
            Latest Chapters
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-zinc-400">
            Continue your journey through the Red-Eye Universe.
          </p>
        </div>

        {/* Loading */}

        {loading && (
          <div className="grid gap-8 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="
                h-[420px]
                animate-pulse
                rounded-3xl
                bg-zinc-900
              "
              />
            ))}
          </div>
        )}

        {/* Cards */}

        {!loading && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{
                  opacity: 0,
                  y: 40,
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
                <Link href={`/chapters/${chapter.slug}`}>

                  <div
                    className="
                    group
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-red-900/20
                    bg-zinc-950
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-red-500/40
                    hover:shadow-[0_0_60px_rgba(239,68,68,0.18)]
                  "
                  >

                    {/* Cover */}

                    <div className="relative h-[260px] overflow-hidden">

                      {chapter.cover_image ? (
                        <Image
                          src={chapter.cover_image}
                          alt={chapter.title}
                          fill
                          className="
                          object-cover
                          transition
                          duration-700
                          group-hover:scale-110
                        "
                        />
                      ) : (
                        <div
                          className="
                          h-full
                          w-full
                          bg-[url('/world/castle.webp')]
                          bg-cover
                          bg-center
                        "
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                      <div
                        className="
                        absolute
                        left-5
                        top-5
                        rounded-full
                        border
                        border-red-500/30
                        bg-black/70
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-red-400
                        backdrop-blur
                      "
                      >
                        Chapter {chapter.chapter_number}
                      </div>
                    </div>

                    {/* Content */}

                    <div className="p-6">

                      <h3
                        className="
                        line-clamp-2
                        text-2xl
                        font-bold
                        text-white
                        transition
                        group-hover:text-red-400
                      "
                      >
                        {chapter.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 text-zinc-400">
                        The story continues deeper into the mysteries
                        of the Agastha Crystals.
                      </p>

                      <div
                        className="
                        mt-5
                        flex
                        items-center
                        gap-4
                        text-sm
                        text-zinc-500
                      "
                      >
                        <div className="flex items-center gap-2">
                          <Clock3 size={14} />
                          5–10 min read
                        </div>

                        <div className="flex items-center gap-2">
                          <BookOpen size={14} />
                          New Chapter
                        </div>
                      </div>

                      <div
                        className="
                        mt-6
                        flex
                        items-center
                        gap-2
                        font-semibold
                        text-red-400
                      "
                      >
                        Read Now

                        <ArrowRight
                          size={18}
                          className="
                          transition
                          group-hover:translate-x-1
                        "
                        />
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
            href="/chapters"
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
            View All Chapters
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
}