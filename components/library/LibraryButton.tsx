"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function LibraryButton({
  chapterId,
}: {
  chapterId: string;
}) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    checkSaved();
  }, []);

  async function checkSaved() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("library")
      .select("id")
      .eq("user_id", user.id)
      .eq("chapter_id", chapterId)
      .maybeSingle();

    setSaved(!!data);
    setLoading(false);
  }

  async function toggleLibrary() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (saved) {
      await supabase
        .from("library")
        .delete()
        .eq("user_id", user.id)
        .eq("chapter_id", chapterId);

      setSaved(false);
    } else {
      await supabase
        .from("library")
        .insert({
          user_id: user.id,
          chapter_id: chapterId,
        });

      setSaved(true);
    }
  }

  if (loading) return null;

  return (
    <button
      onClick={toggleLibrary}
      className="rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-700"
    >
      {saved
        ? "✓ Saved"
        : "+ Save To Library"}
    </button>
  );
}