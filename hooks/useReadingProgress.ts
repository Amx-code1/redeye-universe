"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export default function useReadingProgress(
  chapterId: string
) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (!chapterId) return;
    const userId = user.id;

    async function saveProgress() {
      try {
        const progress = Math.floor(
          (window.scrollY /
            (document.body.scrollHeight -
              window.innerHeight)) *
            100
        );

        const { error } = await supabase
          .from("reading_progress")
          .upsert(
            {
              user_id: userId,
              chapter_id: chapterId,
              progress,
            },
            {
              onConflict:
                "user_id,chapter_id",
            }
          );

        if (error) {
          console.error(
            "[READING_PROGRESS]",
            error
          );
        }
      } catch (err) {
        console.error(
          "[READING_PROGRESS]",
          err
        );
      }
    }

    const interval = setInterval(
      saveProgress,
      5000
    );

    return () => clearInterval(interval);
  }, [
    chapterId,
    user,
    loading,
  ]);
}