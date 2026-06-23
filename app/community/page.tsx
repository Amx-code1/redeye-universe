import Link from "next/link";
import {
  MessageSquare,
  Plus,
  TrendingUp,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default async function CommunityPage() {
  const { data: threads } = await supabase
    .from("community_threads")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  const { count: threadCount } =
    await supabase
      .from("community_threads")
      .select("*", {
        count: "exact",
        head: true,
      });

  const { count: replyCount } =
    await supabase
      .from("community_replies")
      .select("*", {
        count: "exact",
        head: true,
      });

  const categories = [
    "General",
    "Lore",
    "Characters",
    "Chapters",
    "Theories",
    "Fan Art",
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-red-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_75%)] opacity-20" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-red-500/10 bg-red-950/20 px-4 py-2 text-red-300">
                Red-Eye Community
              </div>

              <h1 className="text-5xl font-black md:text-7xl">
                Discuss The
                <span className="text-red-500">
                  {" "}
                  Universe
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-zinc-300">
                Share theories, discuss
                chapters, explore lore, and
                connect with other readers.
              </p>
            </div>

            <Link
              href="/community/new"
              className="
                inline-flex
                items-center
                gap-3
                rounded-2xl
                bg-red-600
                px-8
                py-4
                font-semibold
                transition
                hover:bg-red-700
              "
            >
              <Plus size={18} />
              Create Thread
            </Link>
          </div>

          {/* STATS */}

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <StatCard
              icon={<MessageSquare size={22} />}
              title={`${threadCount ?? 0}`}
              subtitle="Threads"
            />

            <StatCard
              icon={<TrendingUp size={22} />}
              title={`${replyCount ?? 0}`}
              subtitle="Replies"
            />

            <StatCard
              icon={<MessageSquare size={22} />}
              title="Live"
              subtitle="Community"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <div
              key={category}
              className="
                rounded-full
                border
                border-red-500/10
                bg-zinc-950/80
                px-4
                py-2
                text-sm
                text-zinc-300
              "
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      {/* THREADS */}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black">
            Latest Discussions
          </h2>
        </div>

        {threads?.length === 0 && (
          <div
            className="
              rounded-3xl
              border
              border-red-500/10
              bg-zinc-950/80
              p-10
              text-center
            "
          >
            <h3 className="text-2xl font-bold">
              No Discussions Yet
            </h3>

            <p className="mt-4 text-zinc-400">
              Be the first to create a
              thread.
            </p>

            <Link
              href="/community/new"
              className="
                mt-6
                inline-flex
                rounded-xl
                bg-red-600
                px-6
                py-3
                font-semibold
              "
            >
              Create Thread
            </Link>
          </div>
        )}

        <div className="grid gap-5">
          {threads?.map((thread) => (
            <Link
              key={thread.id}
              href={`/community/${thread.id}`}
              className="
                block
                rounded-3xl
                border
                border-red-500/10
                bg-zinc-950/80
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-red-500/40
                hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]
              "
            >
              <div className="mb-3 inline-flex rounded-full bg-red-950/20 px-3 py-1 text-xs text-red-300">
                {thread.category}
              </div>

              <h3 className="text-2xl font-bold">
                {thread.title}
              </h3>

              <p className="mt-3 line-clamp-2 text-zinc-300">
                {thread.content}
              </p>

              <div className="mt-5 text-sm text-zinc-500">
                {new Date(
                  thread.created_at
                ).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
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