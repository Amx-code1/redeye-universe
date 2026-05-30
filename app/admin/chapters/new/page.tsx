"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewChapter() {
  const [chapterNumber, setChapterNumber] =
    useState("");

  const [title, setTitle] = useState("");

  const [slug, setSlug] = useState("");

  const [content, setContent] = useState("");

  async function createChapter() {
    const { error } = await supabase
      .from("chapters")
      .insert({
        chapter_number: Number(chapterNumber),
        title,
        slug,
        content,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Chapter created!");
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        New Chapter
      </h1>

      <div className="space-y-4">

        <input
          placeholder="Chapter Number"
          value={chapterNumber}
          onChange={(e) =>
            setChapterNumber(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <textarea
          rows={20}
          placeholder="Chapter Content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <button
          onClick={createChapter}
          className="rounded-xl bg-red-600 px-6 py-3"
        >
          Publish Chapter
        </button>

      </div>
    </main>
  );
}