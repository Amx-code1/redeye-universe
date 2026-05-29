export default function FeaturedCharacters() {
  const characters = [
    {
      name: "Viktor",
      role: "Leader of the Rebellion",
      danger: "Extreme",
    },
    {
      name: "The First Witch",
      role: "Ancient Power",
      danger: "Unknown",
    },
    {
      name: "Aether",
      role: "Crystal Bearer",
      danger: "High",
    },
  ];

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-4xl font-bold text-red-500">
          Featured Characters
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {characters.map((character) => (
            <div
              key={character.name}
              className="group rounded-3xl border border-red-900/30 bg-zinc-900 p-6 transition-all hover:-translate-y-2 hover:border-red-500"
            >
              <div className="mb-4 h-48 rounded-2xl bg-gradient-to-b from-red-900/20 to-black" />

              <h3 className="text-2xl font-bold">
                {character.name}
              </h3>

              <p className="mt-2 text-zinc-400">
                {character.role}
              </p>

              <div className="mt-4 inline-block rounded-full bg-red-950 px-3 py-1 text-sm text-red-300">
                Danger: {character.danger}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}