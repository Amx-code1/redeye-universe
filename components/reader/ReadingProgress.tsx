"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        docHeight > 0
          ? (scrollTop / docHeight) * 100
          : 0;

      setProgress(percentage);
    };

    window.addEventListener("scroll", updateProgress);

    return () =>
      window.removeEventListener(
        "scroll",
        updateProgress
      );
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-zinc-900">
      <div
        className="h-full bg-red-500 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}