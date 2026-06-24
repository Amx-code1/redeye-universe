"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import AdminRoute from "@/components/auth/AdminRoute";
import toast from "react-hot-toast";

type Chapter = {
  id: string;
  chapter_number: number;
  title: string;
  slug: string;
  created_at: string;
  cover_image: string | null;
};

export default function AdminChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [filtered, setFiltered] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadChapters();
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();

    setFiltered(
      chapters.filter(
        (chapter) =>
          chapter.title
            .toLowerCase()
            .includes(query) ||
          chapter.slug
            .toLowerCase()
            .includes(query)
      )
    );
  }, [search, chapters]);

  async function loadChapters() {
    setLoading(true);

    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .order("chapter_number", {
        ascending: true,
      });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setChapters(data || []);
    setFiltered(data || []);
    setLoading(false);
  }

  async function deleteChapter(
    id: string
  ) {
    const confirmed = confirm(
      "Delete this chapter?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("chapters")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setChapters((prev) =>
      prev.filter(
        (chapter) => chapter.id !== id
      )
    );

    toast.success("Chapter deleted");
  }

  return (
    <AdminRoute>
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="mx-auto max-w-7xl">

          {/* Header */}

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h1 className="text-5xl font-bold text-red-500">
                Chapters
              </h1>

              <p className="mt-2 text-zinc-400">
                Manage your story chapters
              </p>
            </div>

            <Link
              href="/admin/chapters/new"
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
            >
              + New Chapter
            </Link>
          </div>

          {/* Search */}

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search chapters..."
            className="mb-6 w-full rounded-xl bg-zinc-900 p-4"
          />

          {/* Content */}

          {loading ? (
            <div className="rounded-2xl bg-zinc-900 p-8">
              Loading chapters...
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl bg-zinc-900 p-8">
              No chapters found.
            </div>
          ) : (
            <div className="space-y-4">

              {filtered.map((chapter) => (
                <div
                  key={chapter.id}
                  className="rounded-2xl border border-red-900/20 bg-zinc-900 p-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>
                      <p className="text-sm text-red-400">
                        Chapter {chapter.chapter_number}
                      </p>

                      <h2 className="text-xl font-bold">
                        {chapter.title}
                      </h2>

                      <p className="text-zinc-300">
                        {chapter.slug}
                      </p>
                    </div>

                    <div className="flex gap-3">

                      <Link
                        href={`/admin/chapters/${chapter.id}/edit`}
                        className="rounded-xl border border-blue-500 px-4 py-2 hover:bg-blue-950"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteChapter(
                            chapter.id
                          )
                        }
                        className="rounded-xl border border-red-500 px-4 py-2 hover:bg-red-950"
                      >
                        Delete
                      </button>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </main>
    </AdminRoute>
  );
}