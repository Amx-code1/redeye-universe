"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);

  async function handleSearch() {
    if (!query.trim()) return;

    const { data: characterData } = await supabase
      .from("characters")
      .select("*")
      .ilike("name", `%${query}%`);

    const { data: chapterData } = await supabase
      .from("chapters")
      .select("*")
      .ilike("title", `%${query}%`);

    setCharacters(characterData || []);
    setChapters(chapterData || []);
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Search
      </h1>

      <div className="flex gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search characters or chapters..."
          className="flex-1 rounded-xl bg-zinc-900 p-4"
        />

        <button
          onClick={handleSearch}
          className="rounded-xl bg-red-600 px-6 py-3"
        >
          Search
        </button>
      </div>

      {characters.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-3xl font-bold">
            Characters
          </h2>

          <div className="space-y-4">
            {characters.map((character) => (
              <Link
                key={character.id}
                href={`/characters/${character.id}`}
                className="block rounded-xl bg-zinc-900 p-4 hover:bg-zinc-800"
              >
                {character.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {chapters.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-3xl font-bold">
            Chapters
          </h2>

          <div className="space-y-4">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.slug}`}
                className="block rounded-xl bg-zinc-900 p-4 hover:bg-zinc-800"
              >
                {chapter.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}