"use client";

import useReadingProgress from "@/hooks/useReadingProgress";

export default function ProgressSaver({
  chapterId,
}: {
  chapterId: string;
}) {
  useReadingProgress(chapterId);

  return null;
}