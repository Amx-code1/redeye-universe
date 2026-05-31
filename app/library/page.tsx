"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Skeleton from "@/components/ui/Skeleton";

export default function LibraryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLibrary();
  }, []);

  async function loadLibrary() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("library")
        .select(
          `
    id,
    chapter_id,
    created_at,
    chapters!library_chapter_id_fkey (
      id,
      title,
      slug
    )
  `,
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("LIBRARY ERROR:", error);

        setError(error.message);
        return;
      }

      console.log("LIBRARY DATA:", data);

      setItems(data || []);
    } catch (err: any) {
      console.error(err);

      setError("Failed to load library.");
    } finally {
      setLoading(false);
    }
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
          <h2 className="mb-2 text-2xl font-bold text-red-500">
            Error Loading Library
          </h2>

          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="mb-8 text-6xl font-bold text-red-500">My Library</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-zinc-900 p-8">
            <h2 className="text-2xl font-bold">Your Library Is Empty</h2>

            <p className="mt-2 text-zinc-400">
              Save chapters to access them later.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => {
              if (!item.chapters) return null;

              return (
                <Link
                  key={item.id}
                  href={`/chapters/${item.chapters.slug}`}
                  className="block rounded-2xl bg-zinc-900 p-6 transition hover:bg-zinc-800"
                >
                  <h2 className="text-2xl font-bold">{item.chapters.title}</h2>

                  <p className="mt-2 text-sm text-zinc-400">
                    Continue Reading →
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
