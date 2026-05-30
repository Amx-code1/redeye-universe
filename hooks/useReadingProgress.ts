"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function useReadingProgress(
  chapterId: string
) {
  useEffect(() => {
    async function saveProgress() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const progress = Math.floor(
        (window.scrollY /
          (document.body.scrollHeight -
            window.innerHeight)) *
          100
      );

      await supabase
        .from("reading_progress")
        .upsert({
          user_id: user.id,
          chapter_id: chapterId,
          progress,
        });
    }

    const interval = setInterval(
      saveProgress,
      5000
    );

    return () => clearInterval(interval);
  }, [chapterId]);
}