"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Skeleton from "@/components/ui/Skeleton";

export default function ReadingHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("reading_progress")
        .select(
          `
          *,
          chapters (
            title,
            slug
          )
        `,
        )
        .eq("user_id", user.id)
        .order("updated_at", {
          ascending: false,
        })
        .limit(50);

      setHistory(data || []);
      setLoading(false);
    }

    loadHistory();
  }, []);

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

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="mb-8 text-5xl font-bold text-red-500">
          Reading History
        </h1>

        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="rounded-2xl bg-zinc-900 p-8">
              <h2 className="text-2xl font-bold">No Reading History</h2>

              <p className="mt-2 text-zinc-400">
                Start reading chapters and your history will appear here.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="rounded-xl bg-zinc-900 p-6">
                <h2 className="text-xl font-bold">{item.chapters?.title}</h2>

                <p className="mt-2 text-zinc-400">Progress: {item.progress}%</p>
              </div>
            ))
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
