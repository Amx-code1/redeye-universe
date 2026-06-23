"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";

export default function ReplyForm({
  threadId,
}: {
  threadId: string;
}) {
  const router = useRouter();

  const [content, setContent] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleReply(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error(
          "Please login first."
        );
        return;
      }

      const { error } = await supabase
        .from("community_replies")
        .insert({
          thread_id: threadId,
          user_id: user.id,
          content,
        });

      if (error) throw error;

      toast.success(
        "Reply posted successfully."
      );

      setContent("");

      router.refresh();
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to post reply."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleReply}
      className="
        rounded-[32px]
        border
        border-red-500/10
        bg-zinc-950/80
        p-8
      "
    >
      <h3 className="mb-4 text-2xl font-bold">
        Add Reply
      </h3>

      <textarea
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        rows={6}
        required
        placeholder="Share your thoughts..."
        className="
          w-full
          rounded-2xl
          border
          border-red-500/10
          bg-black/50
          p-4
          outline-none
          focus:border-red-500
        "
      />

      <button
        disabled={loading}
        className="
          mt-4
          rounded-xl
          bg-red-600
          px-6
          py-3
          font-semibold
          transition
          hover:bg-red-700
        "
      >
        {loading
          ? "Posting..."
          : "Post Reply"}
      </button>
    </form>
  );
}