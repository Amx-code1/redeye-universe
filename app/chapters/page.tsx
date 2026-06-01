import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import {
  BookOpen,
  Clock3,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Chapters | Red-Eye Universe",
  description:
    "Explore every chapter of the Red-Eye Universe.",
};

export default async function ChaptersPage() {
  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .order("chapter_number", {
      ascending: true,
    });

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}

      <section className="relative overflow-hidden border-b border-red-900/20">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_70%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">

          <h1 className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
            CHAPTERS
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-zinc-400">
            Follow the journey through Agastha Crystals,
            rebellion, forbidden power, and the rise of
            legends.
          </p>

          <div className="mt-10 flex justify-center">

            <div className="rounded-full border border-red-900/30 bg-zinc-900/50 px-6 py-3 backdrop-blur">
              {chapters?.length || 0} Chapters Available
            </div>

          </div>

        </div>

      </section>

      {/* Chapters */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-6">

          {chapters?.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/chapters/${chapter.slug}`}
              className="group"
            >
              <div
                className="
                rounded-3xl
                border
                border-red-900/20
                bg-zinc-900
                p-8
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-red-500
                hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]
              "
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  <div>

                    <div className="mb-3 flex items-center gap-3">

                      <div className="rounded-full bg-red-950/50 px-4 py-2 text-sm font-semibold text-red-400">
                        Chapter {chapter.chapter_number}
                      </div>

                    </div>

                    <h2 className="text-3xl font-bold transition group-hover:text-red-400">
                      {chapter.title}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">

                      <div className="flex items-center gap-2">
                        <BookOpen size={16} />
                        Story Chapter
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 size={16} />
                        5-10 Min Read
                      </div>

                    </div>

                  </div>

                  <div className="flex items-center gap-2 text-red-500">

                    <span>
                      Continue Reading
                    </span>

                    <ArrowRight
                      size={20}
                      className="
                        transition
                        duration-300
                        group-hover:translate-x-1
                      "
                    />

                  </div>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}