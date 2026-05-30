"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ReadingHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    async function loadHistory() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("reading_progress")
        .select(`
          *,
          chapters (
            title,
            slug
          )
        `)
        .eq("user_id", user.id)
        .order("updated_at", {
          ascending: false,
        });

      setHistory(data || []);
    }

    loadHistory();
  }, []);

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Reading History
      </h1>

      <div className="space-y-4">

        {history.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-zinc-900 p-6"
          >
            <h2 className="text-xl font-bold">
              {item.chapters?.title}
            </h2>

            <p className="mt-2 text-zinc-400">
              Progress: {item.progress}%
            </p>
          </div>
        ))}

      </div>
    </main>
  );
}