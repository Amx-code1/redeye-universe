"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  Clock3,
  Sparkles,
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  slug: string;
  chapter_number: number;
}

export default function LatestChapters() {
  const [chapters, setChapters] = useState<Chapter[]>([]);

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
      .limit(3);

    setChapters(data || []);
  }

  return (
    <section className="relative overflow-hidden bg-black py-32 text-white">

      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#991b1b_0%,#000000_70%)] opacity-20" />

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-20 text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-900/30 bg-zinc-900/50 px-4 py-2 text-sm text-red-400">
            <Sparkles size={14} />
            Latest Story Content
          </div>

          <h2 className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-5xl font-black text-transparent md:text-6xl">
            Latest Chapters
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Continue your journey through the Red-Eye Universe and uncover
            secrets hidden within the Agastha Crystals.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-3">

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
                delay: index * 0.15,
              }}
            >
              <Link href={`/chapters/${chapter.slug}`}>

                <div
                  className="
                    group
                    h-full
                    overflow-hidden
                    rounded-3xl
                    border
                    border-red-900/20
                    bg-zinc-900/80
                    backdrop-blur
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-red-500
                    hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]
                  "
                >

                  {/* Top Bar */}

                  <div className="h-2 bg-gradient-to-r from-red-500 via-red-700 to-red-900" />

                  <div className="p-8">

                    <BookOpen className="mb-6 h-10 w-10 text-red-500" />

                    <div className="mb-3 inline-flex rounded-full bg-red-950/40 px-3 py-1 text-xs uppercase tracking-widest text-red-400">
                      Chapter {chapter.chapter_number}
                    </div>

                    <h3 className="text-3xl font-bold transition group-hover:text-red-400">
                      {chapter.title}
                    </h3>

                    <p className="mt-5 text-zinc-400">
                      Continue the saga and discover new truths hidden
                      within the ancient powers of the Agastha Crystals.
                    </p>

                    {/* Meta */}

                    <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500">

                      <div className="flex items-center gap-2">
                        <Clock3 size={14} />
                        5-10 min read
                      </div>

                    </div>

                    {/* CTA */}

                    <div className="mt-8 flex items-center gap-2 text-red-400 transition group-hover:translate-x-1">

                      Read Chapter

                      <ArrowRight size={18} />

                    </div>

                  </div>

                </div>

              </Link>
            </motion.div>
          ))}

        </div>

        {/* Bottom CTA */}

        <div className="mt-16 text-center">

          <Link
            href="/chapters"
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              border
              border-red-500
              px-8
              py-4
              font-semibold
              transition-all
              hover:scale-105
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