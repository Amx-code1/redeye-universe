import Link from "next/link";
import { Character } from "@/types/character";
import {
  Crown,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export default function CharacterCard({
  character,
}: {
  character: Character;
}) {
  return (
    <Link href={`/characters/${character.id}`}>
      <div className="group relative overflow-hidden rounded-3xl border border-red-900/30 bg-zinc-900 transition-all duration-500 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.15)]">

        {/* Glow */}

        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* Image */}

        <div className="relative h-80 overflow-hidden">

          {character.avatar_url ? (
            <img
              src={character.avatar_url}
              alt={character.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-b from-red-950/20 to-black text-8xl">
              👤
            </div>
          )}

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Rank */}

          {character.rank && (
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 backdrop-blur">
              <Crown size={14} className="text-yellow-400" />

              <span className="text-xs font-semibold">
                {character.rank}
              </span>
            </div>
          )}

        </div>

        {/* Content */}

        <div className="p-6">

          <h2 className="text-3xl font-black text-red-500">
            {character.name}
          </h2>

          <p className="mt-2 text-zinc-400">
            {character.title}
          </p>

          {/* Faction + Status */}

          <div className="mt-5 flex flex-wrap gap-2">

            {character.faction && (
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm">
                {character.faction}
              </span>
            )}

            {character.status && (
              <span className="rounded-full bg-green-950/50 px-3 py-1 text-sm text-green-300">
                {character.status}
              </span>
            )}

          </div>

          {/* Description */}

          <p className="mt-5 line-clamp-3 text-zinc-300">
            {character.description}
          </p>

          {/* Stats */}

          <div className="mt-6 grid grid-cols-2 gap-3">

            <div className="rounded-xl bg-zinc-800 p-3">

              <div className="flex items-center gap-2 text-red-400">
                <ShieldAlert size={16} />
                Danger
              </div>

              <div className="mt-1 font-bold">
                {character.danger_level || "Unknown"}
              </div>

            </div>

            <div className="rounded-xl bg-zinc-800 p-3">

              <div className="flex items-center gap-2 text-red-400">
                <Sparkles size={16} />
                Power
              </div>

              <div className="mt-1 font-bold">
                {character.power_level || "?"}
              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">

            <span className="text-zinc-400">
              View Character
            </span>

            <span className="text-xl text-red-500 transition group-hover:translate-x-1">
              →
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
}