import Link from "next/link";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";

import {
  BookOpen,
  Clock3,
  ArrowRight,
  ScrollText,
  Flame,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Chapters | Red-Eye Universe",
  description:
    "Explore every chapter of the Red-Eye Universe.",
};

export default async function ChaptersPage() {
  const { data: chapters, error } = await supabase
    .from("chapters")
    .select("*")
    .order("chapter_number", {
      ascending: true,
    });

  const safeChapters = chapters ?? [];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-red-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_75%)] opacity-40" />

        <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[220px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-950/20 px-5 py-2 text-sm uppercase tracking-[0.25em] text-red-400">
              <Sparkles size={14} />
              Story Archive
            </div>

            <h1 className="bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
              CHAPTERS
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
              Follow the rise of legends, forbidden powers,
              Agastha Crystals, fallen kingdoms, and the
              mysteries hidden inside the Red-Eye Universe.
            </p>
          </div>

          {/* STATS */}

          <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
              <BookOpen className="mb-4 text-red-500" />

              <div className="text-4xl font-black">
                {safeChapters.length}
              </div>

              <div className="mt-2 text-zinc-500">
                Published Chapters
              </div>
            </div>

            <div className="rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
              <ScrollText className="mb-4 text-red-500" />

              <div className="text-4xl font-black">
                Main Story
              </div>

              <div className="mt-2 text-zinc-500">
                Ongoing Journey
              </div>
            </div>

            <div className="rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
              <Flame className="mb-4 text-red-500" />

              <div className="text-4xl font-black">
                Endless
              </div>

              <div className="mt-2 text-zinc-500">
                Mysteries Ahead
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER LIST */}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-black">
              Chapter Archive
            </h2>

            <p className="mt-3 text-zinc-500">
              Every chapter published in chronological order.
            </p>
          </div>

          <div className="rounded-full border border-red-900/20 bg-zinc-950 px-5 py-3 text-sm text-zinc-500">
            {safeChapters.length} Chapters Available
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-900/20 bg-zinc-950 p-16 text-center">
            <h3 className="text-3xl font-bold text-red-500">
              Failed To Load Chapters
            </h3>

            <p className="mt-4 text-zinc-500">
              An error occurred while loading chapter data.
            </p>
          </div>
        ) : safeChapters.length > 0 ? (
          <div className="grid gap-6">
            {safeChapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.slug}`}
                className="group"
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-red-900/20
                    bg-zinc-950/80
                    p-8
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-red-500/40
                    hover:shadow-[0_0_50px_rgba(239,68,68,0.15)]
                  "
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 via-red-600 to-transparent" />

                  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="mb-4 flex flex-wrap gap-3">
                        <div className="rounded-full bg-red-950/40 px-4 py-2 text-sm font-semibold text-red-400">
                          Chapter {chapter.chapter_number}
                        </div>

                        <div className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
                          Story Arc
                        </div>
                      </div>

                      <h3 className="text-3xl font-black transition group-hover:text-red-400">
                        {chapter.title}
                      </h3>

                      <div className="mt-5 flex flex-wrap gap-5 text-sm text-zinc-500">
                        <div className="flex items-center gap-2">
                          <BookOpen size={16} />
                          Main Story
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 size={16} />
                          5 - 10 Min Read
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-red-400">
                      <span className="font-semibold">
                        Continue Reading
                      </span>

                      <ArrowRight
                        size={20}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-red-900/20 bg-zinc-950 p-16 text-center">
            <h3 className="text-3xl font-bold text-red-500">
              No Chapters Published
            </h3>

            <p className="mt-4 text-zinc-500">
              Publish your first chapter from the admin panel.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}