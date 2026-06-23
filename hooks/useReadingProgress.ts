
"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function useReadingProgress(
  chapterId: string
) {
  useEffect(() => {
    async function saveProgress() {
      const {
  data: { session },
} = await supabase.auth.getSession();

const user = session?.user;

      if (!user) return;

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
            user_id: user.id,
            chapter_id: chapterId,
            progress,
          },
          {
            onConflict: "user_id,chapter_id",
          }
        );

      console.log(error);
    }

    const interval = setInterval(
      saveProgress,
      5000
    );

    return () => clearInterval(interval);
  }, [chapterId]);
}