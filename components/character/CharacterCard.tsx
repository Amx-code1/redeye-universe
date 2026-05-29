import { Character } from "@/types/character";

export default function CharacterCard({
  character,
}: {
  character: Character;
}) {
  return (
    <div className="rounded-3xl border border-red-900/30 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold text-red-500">
        {character.name}
      </h2>

      <p className="mt-2 text-zinc-400">
        {character.title}
      </p>

      <p className="mt-4">
        {character.description}
      </p>

      <div className="mt-4 text-red-400">
        Danger: {character.danger_level}
      </div>
    </div>
  );
}