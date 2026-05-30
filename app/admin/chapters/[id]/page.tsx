"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function EditChapterPage() {
  const params = useParams();
  const id = params.id as string;

  const [chapterNumber, setChapterNumber] =
    useState("");

  const [title, setTitle] = useState("");

  const [slug, setSlug] = useState("");

  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadChapter() {
      const { data } = await supabase
        .from("chapters")
        .select("*")
        .eq("id", id)
        .single();

      if (!data) return;

      setChapterNumber(
        data.chapter_number.toString()
      );

      setTitle(data.title);
      setSlug(data.slug);
      setContent(data.content);
    }

    loadChapter();
  }, [id]);

  async function updateChapter() {
    const { error } = await supabase
      .from("chapters")
      .update({
        chapter_number:
          Number(chapterNumber),
        title,
        slug,
        content,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Chapter updated!");
  }

  async function deleteChapter() {
    const confirmed = confirm(
      "Delete this chapter?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("chapters")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Chapter deleted!");

    window.location.href =
      "/admin/chapters";
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Edit Chapter
      </h1>

      <div className="space-y-4">

        <input
          value={chapterNumber}
          onChange={(e) =>
            setChapterNumber(
              e.target.value
            )
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <textarea
          rows={20}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <div className="flex gap-4">

          <button
            onClick={updateChapter}
            className="rounded-xl bg-red-600 px-6 py-3"
          >
            Save Changes
          </button>

          <button
            onClick={deleteChapter}
            className="rounded-xl bg-zinc-700 px-6 py-3"
          >
            Delete Chapter
          </button>

        </div>
      </div>
    </main>
  );
}