"use client";

import Link from "next/link";

type Thread = {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  reply_count?: number;
};

export default function ThreadCard({ thread }: { thread: Thread }) {
  return (
    <Link
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

      <h3 className="text-2xl font-bold">{thread.title}</h3>

      <p className="mt-3 line-clamp-2 text-zinc-300">{thread.content}</p>

      <div className="mt-5 flex items-center justify-between text-sm text-zinc-500">
        <span>💬 {thread.reply_count ?? 0} Replies</span>

        <span>{new Date(thread.created_at).toLocaleDateString()}</span>
      </div>
    </Link>
  );
}
