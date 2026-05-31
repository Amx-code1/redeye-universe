"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function NewCharacter() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [faction, setFaction] = useState("");
  const [dangerLevel, setDangerLevel] = useState("");

  async function createCharacter() {
    if (!name.trim()) {
      toast.error("Name required");
      return;
    }

    const { error } = await supabase.from("characters").insert({
      name,
      title,
      description,
      faction,
      danger_level: dangerLevel,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Character created");

    router.push("/admin/characters");
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold text-red-500">Add Character</h1>

      <div className="space-y-4">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-48 w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          placeholder="Faction"
          value={faction}
          onChange={(e) => setFaction(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          placeholder="Danger Level"
          value={dangerLevel}
          onChange={(e) => setDangerLevel(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <button
          onClick={createCharacter}
          className="rounded-xl bg-red-600 px-6 py-3"
        >
          Create Character
        </button>
      </div>
    </main>
  );
}
