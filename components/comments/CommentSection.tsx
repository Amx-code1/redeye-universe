"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Comment {
  id: string;
  content: string;
  user_email: string;
  created_at: string;
}

export default function CommentSection({
  chapterId,
}: {
  chapterId: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadComments();
    loadUser();
  }, []);

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
  }

  async function addComment() {
  if (!user) {
    alert("No user found");
    return;
  }

  if (!content.trim()) {
    alert("Comment is empty");
    return;
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      chapter_id: chapterId,
      content,
      username: user.email,
      user_email: user.email,
      user_id: user.id,
    })
    .select();

  console.log("USER", user);
  console.log("CHAPTER ID", chapterId);
  console.log("DATA", data);
  console.log("ERROR", error);

  if (error) {
    alert(JSON.stringify(error, null, 2));
    return;
  }

  setContent("");
  loadComments();
}

  return (
    <div className="mt-16">
      <h2 className="mb-6 text-3xl font-bold text-red-500">
        Comments
      </h2>

      {user ? (
        <div className="mb-8">
          <textarea
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
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
        <p className="text-zinc-400">
          Login to comment.
        </p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-xl bg-zinc-900 p-4"
          >
            <p className="font-bold text-red-400">
              {comment.user_email}
            </p>

            <p className="mt-2">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}