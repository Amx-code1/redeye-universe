import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  ScrollText,
  Sparkles,
} from "lucide-react";

import ReadingProgress from "@/components/reader/ReadingProgress";
import ProgressSaver from "@/components/reader/ProgressSaver";
import LibraryButton from "@/components/library/LibraryButton";
import CommentSection from "@/components/comments/CommentSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { data: chapter } = await supabase
    .from("chapters")
    .select("title")
    .eq("slug", slug)
    .single();

  return {
    title: chapter?.title
      ? `${chapter.title} | Red-Eye Universe`
      : "Chapter | Red-Eye Universe",

    description:
      "Read the next chapter of the Red-Eye Universe.",
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: chapter } = await supabase
    .from("chapters")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!chapter) {
    notFound();
  }

  const { data: allChapters } = await supabase
    .from("chapters")
    .select("*")
    .order("chapter_number", {
      ascending: true,
    });

  const currentIndex =
    allChapters?.findIndex(
      (c) => c.slug === slug
    ) ?? -1;

  const previousChapter =
    currentIndex > 0
      ? allChapters?.[currentIndex - 1]
      : null;

  const nextChapter =
    currentIndex <
    (allChapters?.length ?? 0) - 1
      ? allChapters?.[currentIndex + 1]
      : null;

  return (
    <>
      <ReadingProgress />

      <ProgressSaver
        chapterId={chapter.id}
      />

      <main className="min-h-screen bg-black text-white">
        {/* HERO */}

        <section className="relative overflow-hidden border-b border-red-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_75%)] opacity-40" />

          <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[220px]" />

          <div className="relative mx-auto max-w-6xl px-6 py-20">
            <Link
              href="/chapters"
              className="
                mb-8
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-red-900/20
                bg-zinc-950/80
                px-4
                py-2
                text-zinc-400
                transition
                hover:border-red-500/40
                hover:text-red-400
              "
            >
              <ArrowLeft size={16} />
              Back To Chapters
            </Link>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-full bg-red-950/40 px-4 py-2 text-sm text-red-400">
                Chapter {chapter.chapter_number}
              </div>

              <div className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
                Main Story
              </div>
            </div>

            <h1 className="mt-8 text-5xl font-black md:text-7xl">
              {chapter.title}
            </h1>

            <div className="mt-8 flex flex-wrap gap-6 text-zinc-500">
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                Story Chapter
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={18} />
                5-10 Min Read
              </div>

              <div className="flex items-center gap-2">
                <ScrollText size={18} />
                Red-Eye Universe
              </div>
            </div>

            <div className="mt-10">
              <LibraryButton
                chapterId={chapter.id}
              />
            </div>
          </div>
        </section>

        {/* READING AREA */}

        <section className="relative">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <article
              className="
                rounded-[36px]
                border
                border-red-900/20
                bg-zinc-950/70
                p-8
                md:p-14
                backdrop-blur-xl
              "
            >
              <div
                className="
                  prose
                  prose-invert
                  max-w-none
                  text-lg
                  leading-10
                  text-zinc-200
                  whitespace-pre-wrap
                "
              >
                {chapter.content}
              </div>
            </article>

            {/* READING BREAK */}

            <div className="my-16 rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 text-center backdrop-blur-xl">
              <Sparkles className="mx-auto mb-4 text-red-500" />

              <h3 className="text-2xl font-bold">
                Enjoying The Story?
              </h3>

              <p className="mt-4 text-zinc-500">
                Save your progress, add this
                chapter to your library, and
                continue exploring the Red-Eye
                Universe.
              </p>
            </div>

            {/* CHAPTER NAVIGATION */}

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <div>
                {previousChapter && (
                  <Link
                    href={`/chapters/${previousChapter.slug}`}
                    className="
                      flex
                      h-full
                      items-center
                      gap-3
                      rounded-3xl
                      border
                      border-red-900/20
                      bg-zinc-950/80
                      p-6
                      transition
                      hover:border-red-500/40
                    "
                  >
                    <ArrowLeft size={20} />

                    <div>
                      <div className="text-xs text-zinc-500">
                        Previous
                      </div>

                      <div className="font-semibold">
                        Chapter{" "}
                        {
                          previousChapter.chapter_number
                        }
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              <Link
                href="/chapters"
                className="
                  flex
                  items-center
                  justify-center
                  rounded-3xl
                  border
                  border-red-900/20
                  bg-zinc-950/80
                  p-6
                  transition
                  hover:border-red-500/40
                "
              >
                All Chapters
              </Link>

              <div>
                {nextChapter && (
                  <Link
                    href={`/chapters/${nextChapter.slug}`}
                    className="
                      flex
                      h-full
                      items-center
                      justify-end
                      gap-3
                      rounded-3xl
                      border
                      border-red-900/20
                      bg-zinc-950/80
                      p-6
                      transition
                      hover:border-red-500/40
                    "
                  >
                    <div className="text-right">
                      <div className="text-xs text-zinc-500">
                        Next
                      </div>

                      <div className="font-semibold">
                        Chapter{" "}
                        {
                          nextChapter.chapter_number
                        }
                      </div>
                    </div>

                    <ArrowRight size={20} />
                  </Link>
                )}
              </div>
            </div>

            {/* COMMENTS */}

            <div className="mt-24">
              <CommentSection
                chapterId={chapter.id}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}