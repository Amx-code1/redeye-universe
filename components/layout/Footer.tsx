import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 p-8 text-zinc-400 md:flex-row md:justify-between">

        <p>© 2026 Red-Eye Universe</p>

        <div className="flex gap-6">

          <Link href="/privacy">
            Privacy
          </Link>

          <Link href="/terms">
            Terms
          </Link>

          <a
            href="https://discord.com"
            target="_blank"
          >
            Discord
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
          >
            Instagram
          </a>

        </div>

      </div>
    </footer>
  );
}