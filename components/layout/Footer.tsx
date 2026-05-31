import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-red-900/30 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-3">

          <div>
            <h2 className="text-3xl font-black text-red-500">
              RED-EYE
            </h2>

            <p className="mt-4 text-zinc-400">
              Explore the dark fantasy world of Agastha Crystals,
              rebellion, ancient powers, and legendary warriors.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">
              Universe
            </h3>

            <div className="flex flex-col gap-2 text-zinc-400">
              <Link href="/chapters">Chapters</Link>
              <Link href="/characters">Characters</Link>
              <Link href="/library">Library</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold">
              Legal
            </h3>

            <div className="flex flex-col gap-2 text-zinc-400">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-zinc-500">
          © 2026 Red-Eye Universe. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}