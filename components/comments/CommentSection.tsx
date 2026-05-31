"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface Comment {
  id: string;
  content: string;
  user_email: string;
  created_at: string;
}

export default function CommentSection({ chapterId }: { chapterId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState<any>(null);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    loadComments();
    loadUser();
  }, [chapterId]);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function loadComments() {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("chapter_id", chapterId)
      .order("created_at", {
        ascending: false,
      });

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

    const { error } = await supabase.from("comments").insert({
      chapter_id: chapterId,
      content,
      username: user.email,
      user_email: user.email,
      user_id: user.id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    setContent("");

    await loadComments();

    toast.success("Comment posted");
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
            className="w-full rounded-xl bg-zinc-900 p-4 text-white"
          />

          <button
            onClick={addComment}
            className="mt-4 rounded-xl bg-red-600 px-6 py-3"
          >
            Post Comment
          </button>
        </div>
      ) : (
        <p className="text-zinc-400">Login to comment.</p>
      )}

      {comments.length === 0 && (
        <div className="rounded-xl bg-zinc-900 p-6 text-center">
          <p className="text-zinc-400">Be the first person to comment.</p>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-xl bg-zinc-900 p-4">
            <p className="font-bold text-red-400">{comment.user_email}</p>

            <p className="mt-2">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
