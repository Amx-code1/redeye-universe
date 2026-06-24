"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function EditThreadPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadThread();
  }, []);

  async function loadThread() {
    try {
      const { data, error } = await supabase
        .from("community_threads")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load thread");
      router.push("/community");
    } finally {
      setLoading(false);
    }
  }

  async function updateThread() {
    try {
      setSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login first");
        return;
      }

      const { data: thread } = await supabase
        .from("community_threads")
        .select("user_id")
        .eq("id", id)
        .single();

      if (!thread) {
        toast.error("Thread not found");
        return;
      }

      if (thread.user_id !== user.id) {
        toast.error("Unauthorized");
        return;
      }

      const { error } = await supabase
        .from("community_threads")
        .update({
          title,
          content,
          category,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("Thread updated");

      router.push(`/community/${id}`);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update thread");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-8 text-5xl font-black text-red-500">Edit Thread</h1>

        <div className="space-y-5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Thread title"
            className="
              w-full
              rounded-2xl
              border
              border-red-500/10
              bg-zinc-950
              p-4
              outline-none
              focus:border-red-500
            "
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-red-500/10
              bg-zinc-950
              p-4
            "
          >
            <option>General</option>
            <option>Lore</option>
            <option>Characters</option>
            <option>Chapters</option>
            <option>Theories</option>
            <option>Fan Art</option>
          </select>

          <textarea
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-red-500/10
              bg-zinc-950
              p-4
              outline-none
              focus:border-red-500
            "
          />

          <button
            onClick={updateThread}
            disabled={saving}
            className="
              rounded-2xl
              bg-red-600
              px-8
              py-4
              font-semibold
              transition
              hover:bg-red-700
            "
          >
            {saving ? "Saving..." : "Update Thread"}
          </button>
        </div>
      </div>
    </main>
  );
}
