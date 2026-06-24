"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import {
  Search,
  BookOpen,
  Users,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [characters, setCharacters] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);

  useEffect(() => {
    const q = searchParams.get("q");

    if (q) {
      setQuery(q);
      performSearch(q);
    }
  }, [searchParams]);

  async function performSearch(searchTerm?: string) {
    const value = searchTerm || query;

    if (!value.trim()) return;

    try {
      setLoading(true);

      const [characterResult, chapterResult] =
        await Promise.all([
          supabase
            .from("characters")
            .select("*")
            .or(
              `name.ilike.%${value}%,title.ilike.%${value}%`,
            )
            .limit(20),

          supabase
            .from("chapters")
            .select("*")
            .or(
              `title.ilike.%${value}%,content.ilike.%${value}%`,
            )
            .limit(20),
        ]);

      if (characterResult.error) {
        toast.error(
          characterResult.error.message,
        );
      }

      if (chapterResult.error) {
        toast.error(
          chapterResult.error.message,
        );
      }

      setCharacters(
        characterResult.data || [],
      );

      setChapters(
        chapterResult.data || [],
      );
    } catch {
      toast.error(
        "Search failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  const noResults =
    query &&
    !loading &&
    characters.length === 0 &&
    chapters.length === 0;

  const suggestions = [
    "Sunny",
    "Agastha",
    "Eleven Crux",
    "Crystal Wars",
    "Viktor",
    "Red-Eye",
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}

      <section className="relative overflow-hidden border-b border-red-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_75%)]" />

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[180px]" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-900/30 bg-zinc-900/60 px-4 py-2 text-red-400">
            <Sparkles size={16} />
            Search The Universe
          </div>

          <h1 className="bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
            SEARCH
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400">
            Discover characters,
            chapters, powers, factions,
            mysteries, and hidden lore
            from the Red-Eye Universe.
          </p>

          {/* Search Box */}

          <div className="mt-12 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300"
              />

              <input
                value={query}
                onChange={(e) =>
                  setQuery(
                    e.target.value,
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter"
                  ) {
                    performSearch();
                  }
                }}
                placeholder="Search characters, chapters, lore..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-red-900/20
                  bg-zinc-900
                  py-5
                  pl-14
                  pr-5
                  outline-none
                  transition
                  focus:border-red-500
                "
              />
            </div>

            <button
              onClick={() =>
                performSearch()
              }
              disabled={loading}
              className="
                rounded-2xl
                bg-red-600
                px-8
                py-5
                font-semibold
                transition-all
                hover:bg-red-700
              "
            >
              {loading ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                "Search"
              )}
            </button>
          </div>

          {/* Suggestions */}

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {suggestions.map(
              (item) => (
                <button
                  key={item}
                  onClick={() => {
                    setQuery(item);
                    performSearch(
                      item,
                    );
                  }}
                  className="
                    rounded-full
                    border
                    border-red-900/20
                    bg-zinc-900
                    px-4
                    py-2
                    text-sm
                    text-zinc-400
                    transition
                    hover:border-red-500
                    hover:text-red-400
                  "
                >
                  {item}
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Loading */}

      {loading && (
        <div className="py-20 text-center">
          <Loader2 className="mx-auto animate-spin text-red-500" />
        </div>
      )}

      {/* Empty State */}

      {noResults && (
        <section className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-3xl border border-red-900/20 bg-zinc-900 p-12 text-center">
            <Search
              size={60}
              className="mx-auto text-red-500"
            />

            <h2 className="mt-6 text-4xl font-bold">
              No Results Found
            </h2>

            <p className="mt-4 text-zinc-400">
              Try searching for a
              different chapter,
              character, or keyword.
            </p>
          </div>
        </section>
      )}

      {/* Results */}

      <section className="mx-auto max-w-7xl px-6 py-16">
        {/* Characters */}

        {characters.length > 0 && (
          <div className="mb-20">
            <div className="mb-8 flex items-center gap-3">
              <Users className="text-red-500" />

              <h2 className="text-4xl font-black">
                Characters
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {characters.map(
                (character) => (
                  <Link
                    key={
                      character.id
                    }
                    href={`/characters/${character.id}`}
                  >
                    <div className="group overflow-hidden rounded-3xl border border-red-900/20 bg-zinc-900 transition-all hover:-translate-y-2 hover:border-red-500">
                      <div className="relative h-64">
                        {character.avatar_url ? (
                          <Image
                            src={
                              character.avatar_url
                            }
                            alt={
                              character.name
                            }
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-b from-red-950 to-black">
                            <Users
                              size={
                                70
                              }
                              className="text-red-500"
                            />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-red-500">
                          {
                            character.name
                          }
                        </h3>

                        <p className="mt-2 text-zinc-400">
                          {
                            character.title
                          }
                        </p>

                        <div className="mt-6 flex items-center gap-2 text-red-400">
                          View Profile

                          <ArrowRight
                            size={
                              18
                            }
                            className="transition group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        )}

        {/* Chapters */}

        {chapters.length > 0 && (
          <div>
            <div className="mb-8 flex items-center gap-3">
              <BookOpen className="text-red-500" />

              <h2 className="text-4xl font-black">
                Chapters
              </h2>
            </div>

            <div className="grid gap-6">
              {chapters.map(
                (chapter) => (
                  <Link
                    key={chapter.id}
                    href={`/chapters/${chapter.slug}`}
                  >
                    <div className="group rounded-3xl border border-red-900/20 bg-zinc-900 p-8 transition-all hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                      <div className="mb-4 inline-flex rounded-full bg-red-950/30 px-4 py-2 text-sm text-red-400">
                        Chapter{" "}
                        {chapter.chapter_number}
                      </div>

                      <h3 className="text-3xl font-bold">
                        {
                          chapter.title
                        }
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
                ),
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}