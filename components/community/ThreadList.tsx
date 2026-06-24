"use client";

import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase/client";

import ThreadCard from "./ThreadCard";

type Thread = {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
};

export default function ThreadList({
  search,
  selectedCategory,
}: {
  search: string;
  selectedCategory: string;
}) {
  const [threads, setThreads] = useState<Thread[]>([]);

  const [loading, setLoading] = useState(true);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: threads.length,
    };

    threads.forEach((thread) => {
      counts[thread.category] = (counts[thread.category] || 0) + 1;
    });

    return counts;
  }, [threads]);

  useEffect(() => {
    loadThreads();

    const interval = setInterval(loadThreads, 15000);

    const channel = supabase
      .channel("community-threads")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "community_threads",
        },
        () => {
          loadThreads();
        },
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadThreads() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("community_threads")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(error);
        return;
      }

      setThreads(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredThreads = useMemo(() => {
    return threads.filter((thread) => {
      const categoryMatch =
        selectedCategory === "All" || thread.category === selectedCategory;

      const searchMatch =
        thread.title.toLowerCase().includes(search.toLowerCase()) ||
        thread.content.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [threads, search, selectedCategory]);

  if (loading) {
    return (
      <div className="grid gap-5">
        <div className="h-48 animate-pulse rounded-3xl bg-zinc-900" />
        <div className="h-48 animate-pulse rounded-3xl bg-zinc-900" />
        <div className="h-48 animate-pulse rounded-3xl bg-zinc-900" />
      </div>
    );
  }

  if (!loading && filteredThreads.length === 0) {
    return (
      <div className="rounded-3xl border border-red-500/10 bg-zinc-950/80 p-10 text-center">
        <h3 className="text-2xl font-bold">No Discussions Found</h3>

        <p className="mt-4 text-zinc-400">
          Try a different category or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {filteredThreads.map((thread) => (
        <ThreadCard key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
