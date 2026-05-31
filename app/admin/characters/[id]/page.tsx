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
  const [saving, setSaving] = useState(false);

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

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setCharacter(data);
    setLoading(false);
  }

  async function saveCharacter() {
    setSaving(true);

    const { error } = await supabase
      .from("characters")
      .update({
        name: character.name,
        title: character.title,
        description: character.description,
        faction: character.faction,
        danger_level: character.danger_level,

        avatar_url: character.avatar_url,
        rank: character.rank,
        status: character.status,
        age: character.age,
        power_level: character.power_level,
        quote: character.quote,
        abilities: character.abilities,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Character updated");
  }

  async function deleteCharacter() {
    const confirmed = window.confirm(
      "Delete this character permanently?"
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
        <div className="animate-pulse text-xl">
          Loading Character...
        </div>
      </main>
    );
  }

  if (!character) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="text-4xl font-bold text-red-500">
          Character Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
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
          placeholder="Name"
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
          placeholder="Title"
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
          placeholder="Biography"
          className="h-40 w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={character.avatar_url ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              avatar_url: e.target.value,
            })
          }
          placeholder="Avatar URL"
          className="w-full rounded-xl bg-zinc-900 p-4"
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

        <input
          value={character.rank ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              rank: e.target.value,
            })
          }
          placeholder="Rank"
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={character.status ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              status: e.target.value,
            })
          }
          placeholder="Status"
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          type="number"
          value={character.age ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              age: e.target.value,
            })
          }
          placeholder="Age"
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={character.power_level ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              power_level: e.target.value,
            })
          }
          placeholder="Power Level"
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <textarea
          value={character.quote ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              quote: e.target.value,
            })
          }
          placeholder="Character Quote"
          className="h-28 w-full rounded-xl bg-zinc-900 p-4"
        />

        <textarea
          value={character.abilities ?? ""}
          onChange={(e) =>
            setCharacter({
              ...character,
              abilities: e.target.value,
            })
          }
          placeholder="Abilities"
          className="h-40 w-full rounded-xl bg-zinc-900 p-4"
        />

        <div className="flex gap-4 pt-4">

          <button
            onClick={saveCharacter}
            disabled={saving}
            className="rounded-xl bg-green-600 px-6 py-3 hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Character"}
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