import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/reader/ReadingProgress";
import CommentSection from "@/components/comments/CommentSection";
import ProgressSaver from "@/components/reader/ProgressSaver";


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
    .order("chapter_number", { ascending: true });

  const currentIndex =
    allChapters?.findIndex(
      (c) => c.slug === slug
    ) ?? -1;

  const previousChapter =
    currentIndex > 0
      ? allChapters?.[currentIndex - 1]
      : null;

  const nextChapter =
    currentIndex < (allChapters?.length ?? 0) - 1
      ? allChapters?.[currentIndex + 1]
      : null;

  return (
    <>
    <ReadingProgress />
    <ProgressSaver chapterId={chapter.id} />

    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 border-b border-red-900/30 pb-8">
          <h1 className="text-5xl font-bold text-red-500">
            Chapter {chapter.chapter_number}
          </h1>

          <h2 className="mt-4 text-3xl text-zinc-300">
            {chapter.title}
          </h2>
        </div>

        {/* Content */}
        <article className="whitespace-pre-wrap text-lg leading-9 text-zinc-200">
          {chapter.content}
        </article>

        {/* Ad Placeholder */}
        <div className="my-16 rounded-2xl border border-red-900/20 bg-zinc-900 p-8 text-center text-zinc-500">
          Advertisement Space
        </div>

        {/* Navigation */}
                <div className="mt-16 flex items-center justify-between border-t border-red-900/30 pt-10">

          {previousChapter ? (
            <Link
              href={`/chapters/${previousChapter.slug}`}
              className="rounded-xl border border-red-900 px-6 py-3 transition hover:border-red-500"
            >
              ← Previous Chapter
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/chapters"
            className="text-zinc-400 hover:text-red-400"
          >
            All Chapters
          </Link>

          {nextChapter ? (
            <Link
              href={`/chapters/${nextChapter.slug}`}
              className="rounded-xl border border-red-900 px-6 py-3 transition hover:border-red-500"
            >
              Next Chapter →
            </Link>
          ) : (
            <div />
          )}

        </div>

        <CommentSection
          chapterId={chapter.id}
        />

      </div>
    </main>
    </>
  );
}