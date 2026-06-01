"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Users,
  ArrowRight,
} from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [characters, setCharacters] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);

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

    setLoading(false);
  }

  const noResults =
    query &&
    !loading &&
    characters.length === 0 &&
    chapters.length === 0;

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}

      <section className="relative overflow-hidden border-b border-red-900/20">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_70%)]" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-900/30 bg-zinc-900/50 px-4 py-2 text-red-400">
            <Search size={16} />
            Search The Universe
          </div>

          <h1 className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
            SEARCH
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Discover characters, chapters, mysteries,
            factions, and hidden stories from the
            Red-Eye Universe.
          </p>

          {/* Search Box */}

          <div className="mt-12 flex flex-col gap-4 md:flex-row">

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search characters or chapters..."
              className="
                flex-1
                rounded-2xl
                border
                border-red-900/20
                bg-zinc-900
                p-5
                outline-none
                transition
                focus:border-red-500
              "
            />

            <button
              onClick={handleSearch}
              className="
                rounded-2xl
                bg-red-600
                px-8
                py-5
                font-semibold
                transition-all
                hover:scale-105
                hover:bg-red-700
              "
            >
              Search
            </button>

          </div>

        </div>

      </section>

      {/* Loading */}

      {loading && (
        <div className="py-20 text-center text-zinc-400">
          Searching...
        </div>
      )}

      {/* No Results */}

      {noResults && (
        <div className="mx-auto max-w-4xl px-6 py-16">

          <div className="rounded-3xl bg-zinc-900 p-10 text-center">

            <h2 className="text-3xl font-bold text-red-500">
              No Results Found
            </h2>

            <p className="mt-4 text-zinc-400">
              Try searching for another character
              or chapter.
            </p>

          </div>

        </div>
      )}

      {/* Results */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* Characters */}

        {characters.length > 0 && (
          <div className="mb-16">

            <div className="mb-8 flex items-center gap-3">

              <Users className="text-red-500" />

              <h2 className="text-4xl font-bold">
                Characters
              </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {characters.map((character) => (
                <Link
                  key={character.id}
                  href={`/characters/${character.id}`}
                >
                  <div
                    className="
                      group
                      rounded-3xl
                      border
                      border-red-900/20
                      bg-zinc-900
                      p-6
                      transition-all
                      hover:-translate-y-1
                      hover:border-red-500
                    "
                  >
                    <h3 className="text-2xl font-bold text-red-500">
                      {character.name}
                    </h3>

                    <p className="mt-2 text-zinc-400">
                      {character.title}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-red-400">

                      View Profile

                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />

                    </div>

                  </div>
                </Link>
              ))}

            </div>

          </div>
        )}

        {/* Chapters */}

        {chapters.length > 0 && (
          <div>

            <div className="mb-8 flex items-center gap-3">

              <BookOpen className="text-red-500" />

              <h2 className="text-4xl font-bold">
                Chapters
              </h2>

            </div>

            <div className="grid gap-6">

              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/chapters/${chapter.slug}`}
                >
                  <div
                    className="
                      group
                      rounded-3xl
                      border
                      border-red-900/20
                      bg-zinc-900
                      p-8
                      transition-all
                      hover:border-red-500
                    "
                  >
                    <h3 className="text-2xl font-bold">
                      {chapter.title}
                    </h3>

                    <div className="mt-6 flex items-center gap-2 text-red-400">

                      Read Chapter

                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />

                    </div>

                  </div>
                </Link>
              ))}

            </div>

          </div>
        )}

      </section>

    </main>
  );
}