import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

import {
  Crown,
  ShieldAlert,
  Sparkles,
  Users,
  Quote,
  Swords,
  Shield,
  Flame,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const { data: character } = await supabase
    .from("characters")
    .select("id,name,slug,avatar_url,title")
    .eq("id", id)
    .single();

  return {
    title: character
      ? `${character.name} | Red-Eye Universe`
      : "Character | Red-Eye Universe",
    description: `${character?.name} - ${character?.title}. Explore lore, abilities, faction, and powers in the Red-Eye Universe.`,
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

  const { data: relatedCharacters } = await supabase
  .from("characters")
  .select("id,name,slug,avatar_url,title")
  .neq("id", character.id)
  .limit(3);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-red-900/20">
        {character.banner_url && (
          <>
            <img
              src={character.banner_url}
              alt={character.name}
              className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          opacity-25
        "
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_75%)] opacity-40" />

        <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[220px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <Link
            href="/characters"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-900/20
              bg-zinc-950/70
              px-4
              py-2
              text-zinc-400
              transition
              hover:border-red-500/30
              hover:text-red-400
            "
          >
            <ArrowLeft size={16} />
            Back To Characters
          </Link>

          <div className="grid gap-16 lg:grid-cols-[420px_1fr]">
            {/* CHARACTER IMAGE */}

            <div className="relative">
              <div className="absolute -inset-4 rounded-[36px] bg-red-600/10 blur-3xl" />

              {character.avatar_url ? (
                <img
                  src={character.avatar_url}
                  alt={character.name}
                  className="
                    relative
                    h-[420px]
                    md:h-[650px]
                    w-full
                    rounded-[36px]
                    border
                    border-red-900/20
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    relative
                    flex
                    h-[650px]
                    items-center
                    justify-center
                    rounded-[36px]
                    border
                    border-red-900/20
                    bg-zinc-950
                    text-[120px]
                  "
                >
                  👤
                </div>
              )}
            </div>

            {/* CHARACTER INFO */}

            <div className="flex flex-col justify-center">
              <div className="mb-5 flex flex-wrap gap-3">
                {character.rank && (
                  <div className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-950/20 px-5 py-2">
                    <Crown size={16} />
                    {character.rank}
                  </div>
                )}

                {character.status && (
                  <div className="rounded-full border border-green-500/20 bg-green-950/20 px-5 py-2">
                    {character.status}
                  </div>
                )}
              </div>

              <div className="text-sm uppercase tracking-[0.2em] text-red-400">
                Red-Eye Character Archive
              </div>

              <h1 className="mt-4 bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-5xl md:text-7xl xl:text-8xl font-black text-transparent ">
                {character.name}
              </h1>

              <p className="mt-5 text-xl text-zinc-400">{character.title}</p>

              {character.quote && (
                <div className="mt-10 rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
                  <Quote className="mb-4 text-red-500" />

                  <p className="text-xl italic leading-relaxed text-zinc-300">
                    "{character.quote}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CHARACTER STATS */}

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Users size={22} />}
            title="Faction"
            value={character.faction || "Unknown"}
          />

          <StatCard
            icon={<ShieldAlert size={22} />}
            title="Danger Level"
            value={character.danger_level || "Unknown"}
          />

          <StatCard
            icon={<Sparkles size={22} />}
            title="Power Level"
            value={character.power_level || "Unknown"}
          />

          <StatCard
            icon={<Crown size={22} />}
            title="Age"
            value={String(character.age || "Unknown")}
          />
        </div>
      </section>

      {/* LORE SECTION */}

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3 text-red-500">
              <Swords size={20} />
              <span className="font-semibold">Combat Class</span>
            </div>

            <p className="text-zinc-300">{character.rank || "Unknown"}</p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3 text-red-500">
              <Shield size={20} />
              <span className="font-semibold">Affiliation</span>
            </div>

            <p className="text-zinc-300">{character.faction || "Unknown"}</p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3 text-red-500">
              <Flame size={20} />
              <span className="font-semibold">Threat Level</span>
            </div>

            <p className="text-zinc-300">
              {character.danger_level || "Unknown"}
            </p>
          </div>
        </div>
      </section>

      {/* BIOGRAPHY */}

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
          <h2 className="mb-8 text-4xl font-black text-red-500">Biography</h2>

          <p className="whitespace-pre-wrap text-lg leading-9 text-zinc-300">
            {character.description || "No biography has been recorded yet."}
          </p>
        </div>
      </section>

      {/* ABILITIES */}

      {character.abilities && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-8 text-4xl font-black text-red-500">
              Abilities & Powers
            </h2>

            <p className="whitespace-pre-wrap text-lg leading-9 text-zinc-300">
              {character.abilities}
            </p>
          </div>
        </section>
      )}
      {relatedCharacters && relatedCharacters.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <h2 className="mb-10 text-4xl font-black text-red-500">
            Related Characters
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedCharacters.map((related) => (
              <Link
                key={related.id}
                href={`/characters/${related.slug}`}
                className="
              overflow-hidden
              rounded-[28px]
              border
              border-red-900/20
              bg-zinc-950/80
              transition
              hover:border-red-500/40
            "
              >
                {related.avatar_url ? (
                  <img
                    src={related.avatar_url}
                    alt={related.name}
                    className="
                  h-72
                  w-full
                  object-cover
                "
                  />
                ) : (
                  <div
                    className="
                  flex
                  h-72
                  items-center
                  justify-center
                  bg-zinc-900
                  text-6xl
                "
                  >
                    👤
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold">{related.name}</h3>

                  <p className="mt-2 text-zinc-300">{related.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[28px] border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
      <div className="mb-4 text-red-500">{icon}</div>

      <div className="text-xs uppercase tracking-[0.25em] text-zinc-300">
        {title}
      </div>

      <div className="mt-3 text-xl font-bold">{value}</div>
    </div>
  );
}
