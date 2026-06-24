"use client";

import { Search, X } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function CommunitySearch({
  search,
  setSearch,
}: Props) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search discussions..."
        className="
          w-full
          rounded-3xl
          border
          border-red-500/10
          bg-zinc-950/80
          py-5
          pl-14
          pr-14
          text-white
          outline-none
          transition-all
          duration-300
          placeholder:text-zinc-500
          focus:border-red-500/50
        "
      />

      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}