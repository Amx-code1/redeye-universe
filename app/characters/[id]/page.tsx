import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Crown,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";

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
    <main className="min-h-screen bg-black text-white">

      {/* Hero Banner */}

      <section className="relative overflow-hidden border-b border-red-900/20">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_70%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">

          <div className="grid gap-12 lg:grid-cols-[400px_1fr]">

            {/* Portrait */}

            <div className="relative">

              {character.avatar_url ? (
                <img
                  src={character.avatar_url}
                  alt={character.name}
                  className="
                    h-[500px]
                    w-full
                    rounded-3xl
                    object-cover
                    border
                    border-red-900/30
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-[500px]
                    items-center
                    justify-center
                    rounded-3xl
                    bg-zinc-900
                    text-9xl
                  "
                >
                  👤
                </div>
              )}

            </div>

            {/* Character Info */}

            <div className="flex flex-col justify-center">

              <div className="mb-4 flex flex-wrap gap-3">

                {character.rank && (
                  <span className="flex items-center gap-2 rounded-full bg-yellow-950/50 px-4 py-2">
                    <Crown size={16} />
                    {character.rank}
                  </span>
                )}

                {character.status && (
                  <span className="rounded-full bg-green-950/50 px-4 py-2">
                    {character.status}
                  </span>
                )}

              </div>

              <h1 className="text-6xl font-black text-red-500 md:text-7xl">
                {character.name}
              </h1>

              <p className="mt-4 text-2xl text-zinc-400">
                {character.title}
              </p>

              {character.quote && (
                <blockquote className="mt-8 border-l-4 border-red-500 pl-6 text-xl italic text-zinc-300">
                  "{character.quote}"
                </blockquote>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-6 md:grid-cols-4">

          <StatCard
            icon={<Users size={20} />}
            label="Faction"
            value={character.faction || "Unknown"}
          />

          <StatCard
            icon={<ShieldAlert size={20} />}
            label="Danger Level"
            value={character.danger_level || "Unknown"}
          />

          <StatCard
            icon={<Sparkles size={20} />}
            label="Power Level"
            value={character.power_level || "Unknown"}
          />

          <StatCard
            icon={<Crown size={20} />}
            label="Age"
            value={character.age || "Unknown"}
          />

        </div>

      </section>

      {/* Biography */}

      <section className="mx-auto max-w-7xl px-6">

        <div className="rounded-3xl border border-red-900/20 bg-zinc-900 p-10">

          <h2 className="mb-6 text-4xl font-bold text-red-500">
            Biography
          </h2>

          <p className="whitespace-pre-wrap leading-8 text-zinc-300">
            {character.description}
          </p>

        </div>

      </section>

      {/* Abilities */}

      {character.abilities && (
        <section className="mx-auto max-w-7xl px-6 py-16">

          <div className="rounded-3xl border border-red-900/20 bg-zinc-900 p-10">

            <h2 className="mb-6 text-4xl font-bold text-red-500">
              Abilities
            </h2>

            <p className="leading-8 text-zinc-300">
              {character.abilities}
            </p>

          </div>

        </section>
      )}

    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-red-900/20 bg-zinc-900 p-6">

      <div className="mb-4 text-red-500">
        {icon}
      </div>

      <div className="text-sm uppercase tracking-widest text-zinc-500">
        {label}
      </div>

      <div className="mt-2 text-2xl font-bold">
        {value}
      </div>

    </div>
  );
}