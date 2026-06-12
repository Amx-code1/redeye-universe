import { supabase } from "@/lib/supabase";
import CharacterCard from "@/components/character/CharacterCard";
import type { Metadata } from "next";
import { Users, Crown, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Characters | Red-Eye Universe",
  description:
    "Explore warriors, rulers, rebels, and legends of the Red-Eye Universe.",
};

export default async function CharactersPage() {
  const { data: characters, error } = await supabase
    .from("characters")
    .select("*")
    .order("name", { ascending: true });

  const safeCharacters = characters ?? [];

  const totalCharacters = safeCharacters.length;

  const legendaryCharacters = safeCharacters.filter(
    (character) =>
      character.rank?.toLowerCase().includes("legend") ||
      character.rank?.toLowerCase().includes("crux")
  ).length;

  const dangerousCharacters = safeCharacters.filter(
    (character) =>
      character.danger_level?.toLowerCase() === "extreme"
  ).length;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}

      <section className="relative overflow-hidden border-b border-red-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_70%)] opacity-30" />

        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-32">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex rounded-full border border-red-500/20 bg-red-950/20 px-4 py-2 text-sm tracking-[0.25em] text-red-400">
              RED-EYE UNIVERSE
            </div>

            <h1 className="bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
              CHARACTERS
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400 md:text-xl">
              Every kingdom fears them. Every faction hunts them. Explore the
              warriors, rulers, rebels, and monsters who shape the fate of the
              Red-Eye Universe.
            </p>
          </div>

          {/* Stats */}

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
              <Users className="mb-4 h-8 w-8 text-red-500" />

              <div className="text-4xl font-black">
                {totalCharacters}
              </div>

              <p className="mt-2 text-zinc-500">
                Total Characters
              </p>
            </div>

            <div className="rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
              <Crown className="mb-4 h-8 w-8 text-red-500" />

              <div className="text-4xl font-black">
                {legendaryCharacters}
              </div>

              <p className="mt-2 text-zinc-500">
                Legendary Warriors
              </p>
            </div>

            <div className="rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
              <ShieldAlert className="mb-4 h-8 w-8 text-red-500" />

              <div className="text-4xl font-black">
                {dangerousCharacters}
              </div>

              <p className="mt-2 text-zinc-500">
                Extreme Threats
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Character Grid */}

      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-4xl font-black">
                Character Archive
              </h2>

              <p className="mt-3 text-zinc-500">
                Discover every known individual in the Red-Eye Universe.
              </p>
            </div>

            <div className="rounded-full border border-red-900/20 bg-zinc-950 px-5 py-3 text-sm text-zinc-500">
              {totalCharacters} Characters Loaded
            </div>
          </div>

          {error ? (
            <div className="rounded-3xl border border-red-900/20 bg-zinc-950 p-16 text-center">
              <h3 className="text-3xl font-bold text-red-500">
                Failed to Load Characters
              </h3>

              <p className="mt-4 text-zinc-500">
                An error occurred while loading character data.
              </p>
            </div>
          ) : safeCharacters.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {safeCharacters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-red-900/20 bg-zinc-950 p-16 text-center">
              <h3 className="text-3xl font-bold text-red-500">
                No Characters Found
              </h3>

              <p className="mt-4 text-zinc-500">
                Add characters from the admin panel to populate the archive.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}