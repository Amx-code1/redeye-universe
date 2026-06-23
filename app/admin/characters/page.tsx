"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ShieldAlert,
} from "lucide-react";

type Character = {
  id: string;
  name: string;
  title: string | null;
  avatar_url: string | null;
  danger_level: string | null;
  status: string | null;
  faction: string | null;
  rank: string | null;
  slug: string | null;
};

export default function AdminCharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [deleteModal, setDeleteModal] =
    useState<Character | null>(null);

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadCharacters() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("characters")
        .select(
          `
          id,
          name,
          title,
          avatar_url,
          danger_level,
          status,
          faction,
          rank,
          slug
        `
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setCharacters(data || []);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to load characters");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCharacter() {
    if (!deleteModal) return;

    try {
      const { error } = await supabase
        .from("characters")
        .delete()
        .eq("id", deleteModal.id);

      if (error) throw error;

      setCharacters((prev) =>
        prev.filter(
          (item) => item.id !== deleteModal.id
        )
      );

      toast.success("Character deleted");
      setDeleteModal(null);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  }

  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const q = search.toLowerCase();

      return (
        character.name
          ?.toLowerCase()
          .includes(q) ||
        character.title
          ?.toLowerCase()
          .includes(q) ||
        character.faction
          ?.toLowerCase()
          .includes(q)
      );
    });
  }, [characters, search]);

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-5xl font-bold text-red-500">
              Characters
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage universe characters
            </p>
          </div>

          <Link
            href="/admin/characters/new"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
          >
            <Plus size={18} />
            New Character
          </Link>
        </div>

        {/* Search */}

        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"
            size={18}
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search characters..."
            className="w-full rounded-2xl bg-zinc-900 py-4 pl-12 pr-4 outline-none ring-1 ring-zinc-800 focus:ring-red-500"
          />
        </div>

        {/* Loading */}

        {loading && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-40 animate-pulse rounded-2xl bg-zinc-900"
                />
              )
            )}
          </div>
        )}

        {/* Empty */}

        {!loading &&
          filteredCharacters.length === 0 && (
            <div className="rounded-3xl border border-red-900/30 bg-zinc-900 p-12 text-center">
              <ShieldAlert
                className="mx-auto mb-4 text-red-500"
                size={48}
              />

              <h2 className="text-xl font-bold">
                No Characters Found
              </h2>

              <p className="mt-2 text-zinc-400">
                Create your first character.
              </p>
            </div>
          )}

        {/* List */}

        {!loading &&
          filteredCharacters.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCharacters.map(
                (character) => (
                  <div
                    key={character.id}
                    className="rounded-3xl border border-red-900/20 bg-zinc-900 p-5 transition hover:border-red-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-black">
                        {character.avatar_url ? (
                          <Image
                            src={
                              character.avatar_url
                            }
                            alt={
                              character.name
                            }
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-zinc-300">
                            N/A
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h2 className="text-xl font-bold">
                          {character.name}
                        </h2>

                        <p className="text-zinc-400">
                          {character.title ||
                            "No title"}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {character.status && (
                            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                              {
                                character.status
                              }
                            </span>
                          )}

                          {character.danger_level && (
                            <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-400">
                              {
                                character.danger_level
                              }
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Link
                        href={`/admin/characters/${character.id}/edit`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3 hover:bg-zinc-700"
                      >
                        <Pencil size={16} />
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          setDeleteModal(
                            character
                          )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

        {/* Delete Modal */}

        {deleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="w-full max-w-md rounded-3xl bg-zinc-900 p-8">
              <h2 className="text-xl font-bold text-red-500">
                Delete Character
              </h2>

              <p className="mt-3 text-zinc-400">
                Are you sure you want to
                delete{" "}
                <span className="font-semibold text-white">
                  {deleteModal.name}
                </span>
                ?
              </p>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() =>
                    setDeleteModal(null)
                  }
                  className="flex-1 rounded-xl bg-zinc-800 py-3"
                >
                  Cancel
                </button>

                <button
                  onClick={deleteCharacter}
                  className="flex-1 rounded-xl bg-red-600 py-3 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}