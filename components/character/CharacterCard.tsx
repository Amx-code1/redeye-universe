import Link from "next/link";
import { Character } from "@/types/character";

export default function CharacterCard({
  character,
}: {
  character: Character;
}) {
  return (
    <Link href={`/characters/${character.id}`}>
      <div className="group overflow-hidden rounded-3xl border border-red-900/30 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-red-500">

        {/* Character Image */}

        <div className="h-72 overflow-hidden bg-zinc-800">

          {character.avatar_url ? (
            <img
              src={character.avatar_url}
              alt={character.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-7xl">
              👤
            </div>
          )}

        </div>

        {/* Content */}

        <div className="p-6">

          <h2 className="text-2xl font-bold text-red-500">
            {character.name}
          </h2>

          <p className="mt-1 text-zinc-400">
            {character.title}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">

            <span className="rounded-full bg-red-900/30 px-3 py-1 text-sm">
              {character.rank || "Unranked"}
            </span>

            <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
              {character.faction || "Unknown"}
            </span>

          </div>

          <p className="mt-4 line-clamp-3 text-zinc-300">
            {character.description}
          </p>

          <div className="mt-6 flex items-center justify-between">

            <span className="text-red-400">
              Danger: {character.danger_level || "?"}
            </span>

            <span className="text-zinc-500">
              →
            </span>

          </div>

        </div>
      </div>
    </Link>
  );
}