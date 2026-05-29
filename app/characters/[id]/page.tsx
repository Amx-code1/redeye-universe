import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: character } = await supabase
    .from("characters")
    .select("*")
    .eq("id", id)
    .single();

  if (!character) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="text-6xl font-bold text-red-500">
        {character.name}
      </h1>

      <p className="mt-4 text-2xl text-zinc-400">
        {character.title}
      </p>

      <div className="mt-10 max-w-3xl">
        {character.description}
      </div>

      <div className="mt-6">
        Faction: {character.faction}
      </div>

      <div className="mt-2 text-red-400">
        Danger Level: {character.danger_level}
      </div>
    </main>
  );
}