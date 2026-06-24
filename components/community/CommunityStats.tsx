"use client";

import { useEffect, useState } from "react";
import { MessageSquare, TrendingUp } from "lucide-react";

import { supabase } from "@/lib/supabase/client";

export default function CommunityStats() {
  const [threadCount, setThreadCount] = useState(0);
  const [replyCount, setReplyCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();

    const channel = supabase
      .channel("community-stats")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "community_threads",
        },
        () => loadStats()
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "community_replies",
        },
        () => loadStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadStats() {
    try {
      setLoading(true);

      const [{ count: threads }, { count: replies }] =
        await Promise.all([
          supabase
            .from("community_threads")
            .select("*", {
              count: "exact",
              head: true,
            }),

          supabase
            .from("community_replies")
            .select("*", {
              count: "exact",
              head: true,
            }),
        ]);

      setThreadCount(threads ?? 0);
      setReplyCount(replies ?? 0);
    } catch (error) {
      console.error("Stats Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      <StatCard
        icon={<MessageSquare size={22} />}
        title={loading ? "..." : threadCount.toString()}
        subtitle="Threads"
      />

      <StatCard
        icon={<TrendingUp size={22} />}
        title={loading ? "..." : replyCount.toString()}
        subtitle="Replies"
      />

      <StatCard
        icon={<MessageSquare size={22} />}
        title="Live"
        subtitle="Community"
      />
    </div>
  );
}

function StatCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-red-500/10
        bg-zinc-950/80
        p-7
        backdrop-blur-xl
      "
    >
      <div className="mb-4 text-red-400">
        {icon}
      </div>

      <div className="text-4xl font-black text-white">
        {title}
      </div>

      <div className="mt-2 text-zinc-300">
        {subtitle}
      </div>
    </div>
  );
}