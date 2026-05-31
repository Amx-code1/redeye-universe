"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Skeleton from "@/components/ui/Skeleton";
import toast from "react-hot-toast";

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
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: libraryData, error: libraryError } =
        await supabase
          .from("library")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

      if (libraryError) {
        setError(libraryError.message);
        setLoading(false);
        return;
      }

      if (!libraryData?.length) {
        setItems([]);
        setLoading(false);
        return;
      }

      const chapterIds = libraryData.map(
        (item) => item.chapter_id
      );

      const { data: chapters, error: chapterError } =
        await supabase
          .from("chapters")
          .select("id,title,slug")
          .in("id", chapterIds);

      if (chapterError) {
        setError(chapterError.message);
        setLoading(false);
        return;
      }

      const merged = libraryData.map((item) => ({
        ...item,
        chapter: chapters?.find(
          (chapter) => chapter.id === item.chapter_id
        ),
      }));

      setItems(merged);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load library");
      toast.error("Failed to load library");
    } finally {
      setLoading(false);
    }
  }

  async function removeFromLibrary(id: string) {
    const { error } = await supabase
      .from("library")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

    toast.success("Removed from library");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10">
        <Skeleton className="mb-8 h-20 w-80" />

        <div className="space-y-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <div className="rounded-2xl border border-red-500 bg-zinc-900 p-8">
          {error}
        </div>
      </main>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="mb-8 text-6xl font-bold text-red-500">
          My Library
        </h1>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-zinc-900 p-8">
            <h2 className="text-2xl font-bold">
              Your Library Is Empty
            </h2>

            <p className="mt-2 text-zinc-400">
              Save chapters to access them later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl bg-zinc-900 p-6"
              >
                <Link
                  href={`/chapters/${item.chapter?.slug}`}
                  className="flex-1"
                >
                  <h2 className="text-2xl font-bold">
                    {item.chapter?.title ??
                      "Unknown Chapter"}
                  </h2>
                </Link>

                <button
                  onClick={() =>
                    removeFromLibrary(item.id)
                  }
                  className="rounded-xl bg-red-600 px-4 py-2 hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}