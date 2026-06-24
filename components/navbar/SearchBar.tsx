"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <button
      className="
        hidden
        lg:flex
        items-center
        gap-3
        w-64
        rounded-xl
        border
        border-zinc-800
        bg-zinc-950/70
        px-4
        py-2.5
        text-zinc-400
        transition
        hover:border-red-500/40
      "
    >
      <Search size={16} />

      <span>Search universe...</span>

      <kbd
        className="
          ml-auto
          rounded
          bg-zinc-800
          px-2
          py-1
          text-xs
        "
      >
        Ctrl K
      </kbd>
    </button>
  );
}