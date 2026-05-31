"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function CharacterEditor() {
  const router = useRouter();
  const params = useParams();

  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadCharacter();
    }
  }, [id]);

  async function loadCharacter() {
    setLoading(true);

    const { data, error } = await supabase
      .from("characters")
      .select("*")
      .eq("id", id)
      .single();

    console.log("ID:", id);
    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setCharacter(data);
    setLoading(false);
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
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Character updated");
  }

  async function deleteCharacter() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this character?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Character deleted");

    router.push("/admin/characters");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <div className="animate-pulse">
          Loading Character...
        </div>
      </main>
    );
  }

  if (!character) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="text-3xl font-bold text-red-500">
          Character Not Found
        </h1>
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
          value={character.name ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              name: e.target.value,
            })
          }
          placeholder="Character Name"
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={character.title ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              title: e.target.value,
            })
          }
          placeholder="Character Title"
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <textarea
          value={character.description ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              description: e.target.value,
            })
          }
          placeholder="Description"
          className="h-48 w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={character.faction ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              faction: e.target.value,
            })
          }
          placeholder="Faction"
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={character.danger_level ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              danger_level: e.target.value,
            })
          }
          placeholder="Danger Level"
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <div className="flex gap-4">

          <button
            onClick={saveCharacter}
            className="rounded-xl bg-green-600 px-6 py-3 hover:bg-green-700"
          >
            Save Character
          </button>

          <button
            onClick={deleteCharacter}
            className="rounded-xl bg-red-600 px-6 py-3 hover:bg-red-700"
          >
            Delete Character
          </button>

        </div>
      </div>
    </main>
  );
}