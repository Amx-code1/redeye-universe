"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    const admin = await isAdmin();

    if (!admin) {
      redirect("/");
    }
    const { data } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setComments(data || []);
  }

  async function deleteComment(id: string) {
    const confirmed = window.confirm("Delete this comment?");

    if (!confirmed) return;

    const { error } = await supabase.from("comments").delete().eq("id", id);

    console.log("DELETE ERROR:", error);
    console.log("COMMENT ID:", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Comment deleted");

    loadComments();
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Comment Moderation
      </h1>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-2xl bg-zinc-900 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-red-400">{comment.username}</p>

                <p className="mt-3">{comment.content}</p>
              </div>

              <button
                onClick={() => deleteComment(comment.id)}
                className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
