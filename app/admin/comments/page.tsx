"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminRoute from "@/components/auth/AdminRoute";
import toast from "react-hot-toast";

type Comment = {
  id: string;
  chapter_id: string;
  username: string;
  content: string;
  created_at: string;
  user_id: string;
  user_email: string;
  likes: number;
  is_hidden: boolean;
};

export default function AdminCommentsPage() {
  const [comments, setComments] =
    useState<Comment[]>([]);

  const [filtered, setFiltered] =
    useState<Comment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadComments();
  }, []);

  useEffect(() => {
    const q =
      search.toLowerCase();

    setFiltered(
      comments.filter(
        (comment) =>
          comment.username
            ?.toLowerCase()
            .includes(q) ||
          comment.content
            ?.toLowerCase()
            .includes(q) ||
          comment.user_email
            ?.toLowerCase()
            .includes(q)
      )
    );
  }, [search, comments]);

  async function loadComments() {
    const { data, error } =
      await supabase
        .from("comments")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      toast.error(error.message);
      return;
    }

    setComments(data || []);
    setFiltered(data || []);
    setLoading(false);
  }

  async function toggleHidden(
    comment: Comment
  ) {
    const { error } =
      await supabase
        .from("comments")
        .update({
          is_hidden:
            !comment.is_hidden,
        })
        .eq("id", comment.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setComments((prev) =>
      prev.map((item) =>
        item.id === comment.id
          ? {
              ...item,
              is_hidden:
                !item.is_hidden,
            }
          : item
      )
    );

    toast.success(
      comment.is_hidden
        ? "Comment restored"
        : "Comment hidden"
    );
  }

  const hiddenCount =
    comments.filter(
      (c) => c.is_hidden
    ).length;

  return (
    <AdminRoute>
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="mx-auto max-w-7xl">

          <h1 className="mb-2 text-5xl font-bold text-red-500">
            Comments
          </h1>

          <p className="mb-8 text-zinc-400">
            Community moderation
          </p>

          <div className="mb-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-zinc-900 p-6">
              <p className="text-zinc-400">
                Total Comments
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {comments.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-6">
              <p className="text-zinc-400">
                Visible
              </p>

              <h2 className="mt-2 text-4xl font-bold text-green-400">
                {
                  comments.length -
                  hiddenCount
                }
              </h2>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-6">
              <p className="text-zinc-400">
                Hidden
              </p>

              <h2 className="mt-2 text-4xl font-bold text-red-400">
                {hiddenCount}
              </h2>
            </div>

          </div>

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search comments..."
            className="mb-6 w-full rounded-xl bg-zinc-900 p-4"
          />

          {loading ? (
            <div className="rounded-2xl bg-zinc-900 p-8">
              Loading...
            </div>
          ) : (
            <div className="space-y-4">

              {filtered.map(
                (comment) => (
                  <div
                    key={comment.id}
                    className="rounded-2xl border border-red-900/20 bg-zinc-900 p-5"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-4">

                      <span className="font-bold text-red-400">
                        {
                          comment.username
                        }
                      </span>

                      <span className="text-zinc-300">
                        {
                          comment.user_email
                        }
                      </span>

                      <span className="text-zinc-300">
                        ❤️{" "}
                        {
                          comment.likes
                        }
                      </span>

                    </div>

                    <p className="mb-4 whitespace-pre-wrap text-zinc-300">
                      {
                        comment.content
                      }
                    </p>

                    <div className="flex gap-3">

                      <button
                        onClick={() =>
                          toggleHidden(
                            comment
                          )
                        }
                        className={`rounded-xl px-4 py-2 ${
                          comment.is_hidden
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {comment.is_hidden
                          ? "Unhide"
                          : "Hide"}
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>
      </main>
    </AdminRoute>
  );
}