"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase/client";

export default function LibraryButton({
  chapterId,
}: {
  chapterId: string;
}) {
  const { user, loading: authLoading } = useAuth();

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    checkSaved(user.id);
  }, [user, authLoading, chapterId]);

  async function checkSaved(userId: string) {
    try {
      const { data, error } = await supabase
        .from("library")
        .select("id")
        .eq("user_id", userId)
        .eq("chapter_id", chapterId)
        .maybeSingle();

      if (error) {
        console.error(error);
        return;
      }

      setSaved(!!data);
    } finally {
      setLoading(false);
    }
  }

  async function toggleLibrary() {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      if (saved) {
        const { error } = await supabase
          .from("library")
          .delete()
          .eq("user_id", user.id)
          .eq("chapter_id", chapterId);

        if (error) throw error;

        setSaved(false);
      } else {
        const { error } = await supabase
          .from("library")
          .insert({
            user_id: user.id,
            chapter_id: chapterId,
          });

        if (error) throw error;

        setSaved(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return null;

  return (
    <button
      onClick={toggleLibrary}
      className="
        rounded-xl
        bg-red-600
        px-5
        py-3
        font-semibold
        transition
        hover:bg-red-700
      "
    >
      {saved
        ? "✓ Saved"
        : "+ Save To Library"}
    </button>
  );
}