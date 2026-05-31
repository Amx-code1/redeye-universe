import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const { data: character } = await supabase
    .from("characters")
    .select("name,title")
    .eq("id", id)
    .single();

  return {
    title: character?.name || "Character",
    description:
      character?.title ||
      "Character profile from Red-Eye Universe",
  };
}

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
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="grid gap-10 md:grid-cols-[300px_1fr]">

          {/* Character Portrait */}

          <div className="flex items-center justify-center rounded-3xl border border-red-900/30 bg-zinc-900 p-8">

            {character.image_url ? (
              <img
                src={character.image_url}
                alt={character.name}
                className="h-72 w-72 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-72 w-72 items-center justify-center rounded-2xl bg-zinc-800 text-8xl">
                👤
              </div>
            )}

          </div>

          {/* Character Info */}

          <div>

            <h1 className="text-6xl font-bold text-red-500">
              {character.name}
            </h1>

            <p className="mt-4 text-2xl text-zinc-400">
              {character.title}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">

              <InfoCard
                label="Faction"
                value={character.faction || "Unknown"}
              />

              <InfoCard
                label="Danger Level"
                value={
                  character.danger_level || "Unknown"
                }
              />

              <InfoCard
                label="Status"
                value={
                  character.status || "Active"
                }
              />

              <InfoCard
                label="Rank"
                value={
                  character.rank || "Unranked"
                }
              />

            </div>

          </div>

        </div>

        {/* Biography */}

        <section className="mt-16 rounded-3xl bg-zinc-900 p-8">

          <h2 className="mb-6 text-3xl font-bold text-red-500">
            Biography
          </h2>

          <p className="whitespace-pre-wrap leading-8 text-zinc-300">
            {character.description}
          </p>

        </section>

      </div>
    </main>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-5">
      <p className="text-sm uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}