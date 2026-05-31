"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";



export default function NewCharacter() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  async function createCharacter() {
    const { error } =
      await supabase
        .from("characters")
        .insert({
          name,
          title,
          description: "",
          danger_level: "",
          faction: "",
        });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Character created");
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold text-red-500">
        Add Character
      </h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="mb-4 block w-full rounded-xl bg-zinc-900 p-4"
      />

      <input
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="mb-4 block w-full rounded-xl bg-zinc-900 p-4"
      />

      <button
        onClick={createCharacter}
        className="rounded-xl bg-red-600 px-6 py-3"
      >
        Create Character
      </button>
    </main>
  );
}