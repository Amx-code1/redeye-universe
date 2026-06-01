import Link from "next/link";
import {
  BookOpen,
  Users,
  Shield,
  Flame,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-red-900/20 bg-black">

      {/* Background Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,29,29,0.15),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        {/* Top Section */}

        <div className="grid gap-12 md:grid-cols-4">

          {/* Brand */}

          <div>

            <h2 className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-4xl font-black text-transparent">
              RED-EYE
            </h2>

            <p className="mt-5 text-zinc-400">
              Enter a dark fantasy universe shaped by
              Agastha Crystals, ancient powers,
              rebellion, sacrifice, and destiny.
            </p>

            <div className="mt-6 flex gap-3">

              <div className="rounded-xl border border-red-900/30 bg-zinc-900 p-3">
                <Flame className="h-5 w-5 text-red-500" />
              </div>

              <div className="rounded-xl border border-red-900/30 bg-zinc-900 p-3">
                <BookOpen className="h-5 w-5 text-red-500" />
              </div>

              <div className="rounded-xl border border-red-900/30 bg-zinc-900 p-3">
                <Users className="h-5 w-5 text-red-500" />
              </div>

            </div>

          </div>

          {/* Universe */}

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              Universe
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">

              <Link
                href="/chapters"
                className="transition hover:text-red-400"
              >
                Chapters
              </Link>

              <Link
                href="/characters"
                className="transition hover:text-red-400"
              >
                Characters
              </Link>

              <Link
                href="/library"
                className="transition hover:text-red-400"
              >
                Library
              </Link>

              <Link
                href="/search"
                className="transition hover:text-red-400"
              >
                Search
              </Link>

            </div>

          </div>

          {/* Lore */}

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              World
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">

              <Link
                href="/characters"
                className="transition hover:text-red-400"
              >
                Factions
              </Link>

              <Link
                href="/characters"
                className="transition hover:text-red-400"
              >
                Warriors
              </Link>

              <Link
                href="/characters"
                className="transition hover:text-red-400"
              >
                Agastha Crystals
              </Link>

            </div>

          </div>

          {/* Legal */}

          <div>

            <h3 className="mb-5 text-xl font-bold text-white">
              Legal
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">

              <Link
                href="/privacy"
                className="transition hover:text-red-400"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition hover:text-red-400"
              >
                Terms of Service
              </Link>

              <div className="mt-3 flex items-center gap-2 text-sm">

                <Shield className="h-4 w-4 text-green-500" />

                <span>
                  Secure Authentication
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Universe Quote */}

        <div className="mt-16 border-t border-zinc-800 pt-12 text-center">

          <p className="mx-auto max-w-3xl text-lg italic text-zinc-500">
            "When the Agastha Crystal awakens,
            kingdoms kneel and history burns."
          </p>

        </div>

        {/* Bottom */}

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-sm text-zinc-500 md:flex-row">

          <div>
            © 2026 Red-Eye Universe. All Rights Reserved.
          </div>

          <div className="flex gap-6">

            <Link
              href="/privacy"
              className="hover:text-red-400"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="hover:text-red-400"
            >
              Terms
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}