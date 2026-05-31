"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CharacterEditor({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    loadCharacter();
  }, []);

  async function loadCharacter() {
    const { data } = await supabase
      .from("characters")
      .select("*")
      .eq("id", params.id)
      .single();

    setCharacter(data);
  }

  async function saveCharacter() {
    const { error } = await supabase
      .from("characters")
      .update({
        name: character.name,
        title: character.title,
        description: character.description,
        faction: character.faction,
        danger_level: character.danger_level,
      })
      .eq("id", params.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Character updated");
  }

  async function deleteCharacter() {
    const confirmed = confirm(
      "Delete this character?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", params.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Character deleted");

    router.push("/admin/characters");
  }

  if (!character) {
    return (
      <main className="p-10 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold text-red-500">
        Edit Character
      </h1>

      <div className="space-y-4">

        <input
          value={character.name}
          onChange={(e) =>
            setCharacter({
              ...character,
              name: e.target.value,
            })
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={character.title}
          onChange={(e) =>
            setCharacter({
              ...character,
              title: e.target.value,
            })
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <textarea
          value={character.description}
          onChange={(e) =>
            setCharacter({
              ...character,
              description: e.target.value,
            })
          }
          className="h-48 w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={character.faction}
          onChange={(e) =>
            setCharacter({
              ...character,
              faction: e.target.value,
            })
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={character.danger_level}
          onChange={(e) =>
            setCharacter({
              ...character,
              danger_level: e.target.value,
            })
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <div className="flex gap-4">
          <button
            onClick={saveCharacter}
            className="rounded-xl bg-green-600 px-6 py-3"
          >
            Save
          </button>

          <button
            onClick={deleteCharacter}
            className="rounded-xl bg-red-600 px-6 py-3"
          >
            Delete
          </button>
        </div>

      </div>
    </main>
  );
}