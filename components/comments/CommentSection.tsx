"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;

  profiles: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
}

export default function CommentSection({ chapterId }: { chapterId: string }) {
  const [comments, setComments] =
  useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const { user, loading: authLoading } = useAuth();
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadComments();
  }, [chapterId]);

  if (authLoading) {
    return;
  }

  if (!user) {
    toast.error("Please login first");
    return;
  }

  async function loadComments() {
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
    *,
    profiles (
      username,
      full_name,
      avatar_url
    )
  `,
      )
      .eq("chapter_id", chapterId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setComments(data || []);
    setCommentCount(data?.length || 0);
  }

  async function addComment() {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("user_id", user.id)
        .single();

      const { error } = await supabase.from("comments").insert({
        chapter_id: chapterId,
        content,
        username: profile?.username || "Reader",
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setContent("");

      await loadComments();

      toast.success("Comment posted");
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-16">
      <h2 className="mb-6 text-3xl font-bold text-red-500">
        Comments
        <span className="ml-2 text-zinc-400">({commentCount})</span>
      </h2>

      {user ? (
        <div className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            rows={4}
            className="w-full rounded-xl bg-zinc-900 p-4 text-white outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={addComment}
            disabled={loading}
            className="mt-4 rounded-xl bg-red-600 px-6 py-3 transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      ) : (
        <div className="mb-8 rounded-xl bg-zinc-900 p-6">
          <p className="text-zinc-400">Login to join the discussion.</p>
        </div>
      )}

      {comments.length === 0 ? (
        <div className="rounded-xl bg-zinc-900 p-6 text-center">
          <p className="text-zinc-400">Be the first person to comment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-xl bg-zinc-900 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                  {comment.profiles?.username?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-bold text-red-400">
                    @{comment.profiles?.username || "reader"}
                  </p>

                  <p className="text-xs text-zinc-300">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-zinc-200">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
