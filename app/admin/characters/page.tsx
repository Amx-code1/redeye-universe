import { supabase } from "@/lib/supabase";

export default async function AdminCharacters() {
  const { data: characters } =
    await supabase
      .from("characters")
      .select("*");

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-4xl font-bold text-red-500">
        Characters
      </h1>

      {characters?.map((character) => (
        <div
          key={character.id}
          className="mb-4 rounded-xl bg-zinc-900 p-6"
        >
          <h2 className="text-2xl">
            {character.name}
          </h2>

          <p>{character.title}</p>
        </div>
      ))}
    </main>
  );
}