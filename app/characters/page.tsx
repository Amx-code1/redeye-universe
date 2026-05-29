import { supabase } from "@/lib/supabase";
import CharacterCard from "@/components/character/CharacterCard";

export default async function CharactersPage() {
  const { data: characters } = await supabase
    .from("characters")
    .select("*");

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-10 text-5xl font-bold text-red-500">
        Characters
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {characters?.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
          />
        ))}
      </div>
    </main>
  );
}