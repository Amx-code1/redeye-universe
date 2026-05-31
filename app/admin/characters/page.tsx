import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function AdminCharacters() {
  const { data: characters } = await supabase
    .from("characters")
    .select("*")
    .order("name");

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-red-500">
          Characters
        </h1>

        <Link
          href="/admin/characters/new"
          className="rounded-xl bg-red-600 px-6 py-3"
        >
          + Add Character
        </Link>
      </div>

      {characters?.length === 0 && (
        <div className="rounded-xl bg-zinc-900 p-8">
          No characters found.
        </div>
      )}

      <div className="space-y-4">
        {characters?.map((character) => (
          <div
            key={character.id}
            className="flex items-center justify-between rounded-xl bg-zinc-900 p-6"
          >
            <div>
              <h2 className="text-2xl font-bold">
                {character.name}
              </h2>

              <p className="text-zinc-400">
                {character.title}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/admin/characters/${character.id}`}
                className="rounded-lg bg-zinc-700 px-4 py-2"
              >
                Edit
              </Link>

              <Link
                href={`/admin/characters/${character.id}`}
                className="rounded-lg bg-red-700 px-4 py-2"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}