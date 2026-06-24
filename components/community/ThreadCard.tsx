"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageSquare, Edit3, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import toast from "react-hot-toast";

type Thread = {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  user_id: string;
  author?: string;
  reply_count?: number;
};

type Props = {
  thread: Thread;
  currentUserId?: string;
  onDelete?: (id: string) => void;
};

export default function ThreadCard({
  thread,
  currentUserId,
  onDelete,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  const isOwner =
    currentUserId &&
    currentUserId === thread.user_id;

  async function deleteThread(
    e: React.MouseEvent
  ) {
    e.preventDefault();

    const confirmed = window.confirm(
      "Delete this thread?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const { error } = await supabase
        .from("community_threads")
        .delete()
        .eq("id", thread.id);

      if (error) throw error;

      toast.success("Thread deleted");

      onDelete?.(thread.id);
    } catch (err) {
      console.error(err);

      toast.error("Failed to delete thread");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Link
      href={`/community/${thread.id}`}
      className="
        group
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
      {/* TOP */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex rounded-full bg-red-950/20 px-3 py-1 text-xs text-red-300">
            {thread.category}
          </div>

          <h3 className="text-2xl font-bold transition group-hover:text-red-400">
            {thread.title}
          </h3>
        </div>

        {isOwner && (
          <div
            className="flex gap-2"
            onClick={(e) =>
              e.preventDefault()
            }
          >
            <Link
              href={`/community/edit/${thread.id}`}
              className="
                rounded-lg
                border
                border-zinc-700
                p-2
                transition
                hover:border-red-500
              "
            >
              <Edit3 size={16} />
            </Link>

            <button
              onClick={deleteThread}
              disabled={deleting}
              className="
                rounded-lg
                border
                border-zinc-700
                p-2
                transition
                hover:border-red-500
                hover:text-red-500
              "
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      {/* CONTENT */}

      <p className="mt-3 line-clamp-3 text-zinc-300">
        {thread.content}
      </p>

      {/* FOOTER */}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-4">
          <span className="text-zinc-400">
            @{thread.author || "reader"}
          </span>

          <div className="flex items-center gap-1 text-zinc-500">
            <MessageSquare size={14} />

            {thread.reply_count ?? 0}
          </div>
        </div>

        <span className="text-zinc-500">
          {new Date(
            thread.created_at
          ).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}