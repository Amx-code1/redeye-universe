import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ChaptersPage() {
  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .order("chapter_number", { ascending: true });

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-10 text-5xl font-bold text-red-500">
        Chapters
      </h1>

      <div className="space-y-6">
        {chapters?.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/chapters/${chapter.slug}`}
          >
            <div className="rounded-2xl border border-red-900/30 bg-zinc-900 p-6 transition hover:border-red-500">
              <h2 className="text-2xl font-bold">
                Chapter {chapter.chapter_number}
              </h2>

              <p className="mt-2 text-zinc-400">
                {chapter.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}