"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Skeleton from "@/components/ui/Skeleton";
import toast from "react-hot-toast";

import { BookOpen, Trash2, Library, Sparkles, ArrowRight } from "lucide-react";

export default function LibraryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLibrary();
  }, []);

  async function loadLibrary() {
    try {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;

      if (!user) {
        return;
      }

      const { data: libraryData, error } = await supabase
        .from("library")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        setError(error.message);
        return;
      }

      if (!libraryData?.length) {
        setItems([]);
        return;
      }

      const chapterIds = libraryData.map((item) => item.chapter_id);

      const { data: chapters } = await supabase
        .from("chapters")
        .select("id,title,slug,chapter_number")
        .in("id", chapterIds);

      const merged = libraryData.map((item) => ({
        ...item,
        chapter: chapters?.find((chapter) => chapter.id === item.chapter_id),
      }));

      setItems(merged);
    } catch {
      toast.error("Failed to load library.");
    } finally {
      setLoading(false);
    }
  }

  async function removeFromLibrary(id: string) {
    const { error } = await supabase.from("library").delete().eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setItems((prev) => prev.filter((item) => item.id !== id));

    toast.success("Removed from library.");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10">
        <Skeleton className="mb-10 h-40 w-full" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="rounded-3xl border border-red-500/20 bg-zinc-950 p-8">
          {error}
        </div>
      </main>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        {/* HERO */}

        <section className="relative overflow-hidden border-b border-red-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_75%)] opacity-40" />

          <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[220px]" />

          <div className="relative mx-auto max-w-7xl px-6 py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-950/20 px-4 py-2 text-red-400">
              <Library size={16} />
              Personal Collection
            </div>

            <h1 className="mt-8 bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
              MY LIBRARY
            </h1>

            <p className="mt-6 max-w-3xl text-xl text-zinc-400">
              Your saved chapters and collected stories from the Red-Eye
              Universe.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="rounded-2xl border border-red-900/20 bg-zinc-950/80 px-6 py-4">
                <div className="text-sm text-zinc-300">Saved Chapters</div>

                <div className="mt-2 text-3xl font-black">{items.length}</div>
              </div>

              <div className="rounded-2xl border border-red-900/20 bg-zinc-950/80 px-6 py-4">
                <div className="text-sm text-zinc-300">Collection Status</div>

                <div className="mt-2 text-3xl font-black text-red-500">
                  Active
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMPTY */}

        {items.length === 0 ? (
          <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
            <Sparkles size={80} className="mb-8 text-red-500" />

            <h2 className="text-4xl font-black">Your Library Is Empty</h2>

            <p className="mt-4 max-w-xl text-zinc-300">
              Save chapters while reading and build your own collection.
            </p>

            <Link
              href="/chapters"
              className="mt-8 rounded-2xl bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700"
            >
              Explore Chapters
            </Link>
          </section>
        ) : (
          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="
                    group
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-red-900/20
                    bg-zinc-950/80
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-red-500/40
                  "
                >
                  {/* Cover */}

                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-red-950 via-black to-zinc-950">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,transparent_70%)] opacity-60" />

                    <BookOpen
                      size={70}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500"
                    />
                  </div>

                  {/* Content */}

                  <div className="p-6">
                    <div className="mb-3 inline-flex rounded-full bg-red-950/30 px-3 py-1 text-sm text-red-400">
                      Chapter {item.chapter?.chapter_number ?? "?"}
                    </div>

                    <h2 className="text-xl font-bold">
                      {item.chapter?.title ?? "Unknown Chapter"}
                    </h2>

                    <div className="mt-8 flex gap-3">
                      <Link
                        href={`/chapters/${item.chapter?.slug}`}
                        className="
                          flex
                          flex-1
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-red-600
                          px-4
                          py-3
                          font-semibold
                          transition
                          hover:bg-red-700
                        "
                      >
                        Read
                        <ArrowRight size={16} />
                      </Link>

                      <button
                        onClick={() => removeFromLibrary(item.id)}
                        className="
                          rounded-xl
                          border
                          border-red-900/30
                          px-4
                          transition
                          hover:border-red-500
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </ProtectedRoute>
  );
}
