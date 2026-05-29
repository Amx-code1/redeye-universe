export default function LatestChapters() {
  const chapters = [
    "Chapter 1 - Awakening",
    "Chapter 2 - The Crystal",
    "Chapter 3 - Rebellion",
  ];

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-4xl font-bold text-red-500">
          Latest Chapters
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {chapters.map((chapter) => (
            <div
              key={chapter}
              className="rounded-2xl border border-red-900/30 bg-zinc-900 p-6 transition hover:border-red-500"
            >
              <h3 className="text-xl font-semibold">
                {chapter}
              </h3>

              <button className="mt-6 text-red-400">
                Read →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}