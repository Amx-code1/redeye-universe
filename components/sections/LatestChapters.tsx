"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";

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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#991b1b_0%,#000000_70%)] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <h2 className="text-5xl font-black text-red-500">
            Latest Chapters
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Continue your journey through the world of Red-Eye.
          </p>

        </div>

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

                <div className="group h-full overflow-hidden rounded-3xl border border-red-900/30 bg-zinc-900/80 backdrop-blur transition-all hover:-translate-y-2 hover:border-red-500">

                  <div className="h-2 bg-gradient-to-r from-red-500 to-red-900" />

                  <div className="p-8">

                    <BookOpen className="mb-6 h-10 w-10 text-red-500" />

                    <div className="mb-3 text-sm uppercase tracking-widest text-red-400">
                      Chapter {chapter.chapter_number}
                    </div>

                    <h3 className="text-2xl font-bold">
                      {chapter.title}
                    </h3>

                    <p className="mt-4 text-zinc-400">
                      Continue the saga and uncover new secrets hidden
                      within the Agastha Crystals.
                    </p>

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

        <div className="mt-12 text-center">

          <Link
            href="/chapters"
            className="inline-flex rounded-2xl border border-red-500 px-8 py-4 font-semibold transition hover:bg-red-500/10"
          >
            View All Chapters
          </Link>

        </div>

      </div>

    </section>
  );
}