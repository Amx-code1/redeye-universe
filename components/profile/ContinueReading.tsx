"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ContinueReading() {
  const [chapter, setChapter] =
    useState<any>();

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("reading_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", {
        ascending: false,
      })
      .limit(1)
      .single();

    if (!data) return;

    const { data: chapterData } =
      await supabase
        .from("chapters")
        .select("*")
        .eq("id", data.chapter_id)
        .single();

    setChapter({
      ...chapterData,
      progress: data.progress,
    });
  }

  if (!chapter) return null;

  return (
    <div className="rounded-2xl bg-zinc-900 p-6">
      <h2 className="mb-4 text-2xl font-bold">
        Continue Reading
      </h2>

      <p>{chapter.title}</p>

      <p>
        {chapter.progress}% Complete
      </p>

      <Link
        href={`/chapters/${chapter.slug}`}
        className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2"
      >
        Continue
      </Link>
    </div>
  );
}