import Link from "next/link";

import {
  BookOpen,
  Crown,
  Shield,
  Sparkles,
} from "lucide-react";

import {
  FaDiscord,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-red-900/20 bg-black text-white">
      {/* Background Effects */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(127,29,29,0.18),transparent_70%)]" />

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-900/20 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* Top Grid */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <h2 className="font-title bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-5xl font-black tracking-[0.2em] text-transparent">
              RED-EYE
            </h2>

            <p className="mt-5 leading-relaxed text-zinc-400">
              Enter a dark fantasy universe shaped by Agastha Crystals,
              forbidden power, rebellion and destiny.
            </p>

            {/* Socials */}

            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-zinc-900 transition hover:border-red-500 hover:text-red-400"
              >
                <FaDiscord size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-zinc-900 transition hover:border-red-500 hover:text-red-400"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-zinc-900 transition hover:border-red-500 hover:text-red-400"
              >
                <FaYoutube size={20} />
              </a>

              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-zinc-900 transition hover:border-red-500 hover:text-red-400"
              >
                <FaXTwitter size={18} />
              </a>
            </div>

            {/* Universe Stats */}

            <div className="mt-8 flex gap-3">
              <div className="rounded-xl border border-red-900/20 bg-zinc-900 p-3">
                <BookOpen className="h-5 w-5 text-red-500" />
              </div>

              <div className="rounded-xl border border-red-900/20 bg-zinc-900 p-3">
                <Crown className="h-5 w-5 text-red-500" />
              </div>

              <div className="rounded-xl border border-red-900/20 bg-zinc-900 p-3">
                <Shield className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </div>

          {/* Explore */}

          <div>
            <h3 className="mb-5 text-xl font-bold">Explore</h3>

            <div className="flex flex-col gap-3 text-zinc-400">
              <Link href="/chapters" className="hover:text-red-400">
                Chapters
              </Link>

              <Link href="/characters" className="hover:text-red-400">
                Characters
              </Link>

              <Link href="/library" className="hover:text-red-400">
                Library
              </Link>

              <Link href="/search" className="hover:text-red-400">
                Search
              </Link>
            </div>
          </div>

          {/* World */}

          <div>
            <h3 className="mb-5 text-xl font-bold">World</h3>

            <div className="flex flex-col gap-3 text-zinc-400">
              <Link href="/timeline" className="hover:text-red-400">
                Timeline
              </Link>

              <Link href="/factions" className="hover:text-red-400">
                Factions
              </Link>

              <Link href="/crystals" className="hover:text-red-400">
                Crystal System
              </Link>

              <Link href="/characters" className="hover:text-red-400">
                Legends
              </Link>
            </div>
          </div>

          {/* Resources */}

          <div>
            <h3 className="mb-5 text-xl font-bold">Resources</h3>

            <div className="flex flex-col gap-3 text-zinc-400">
              <Link href="/ebooks" className="hover:text-red-400">
                E-Books
              </Link>

              <Link href="/merch" className="hover:text-red-400">
                Merch
              </Link>

              <Link href="/privacy" className="hover:text-red-400">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-red-400">
                Terms of Service
              </Link>

              <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                <Shield className="h-4 w-4 text-green-500" />
                Secure Authentication
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}

        <div className="mt-24 rounded-[36px] border border-red-900/20 bg-zinc-950 p-10 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-red-400" />

          <h3 className="mt-4 text-4xl font-black">
            Never Miss A Chapter
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Receive updates about new chapters, character reveals,
            lore expansions and future releases.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-4 md:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-2xl border border-zinc-800 bg-black px-5 py-4 outline-none transition focus:border-red-500"
            />

            <button
              className="
              rounded-2xl
              bg-red-600
              px-8
              py-4
              font-semibold
              transition
              hover:bg-red-700
              hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]
            "
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Quote */}

        <div className="mt-20 border-t border-zinc-800 pt-12 text-center">
          <p className="mx-auto max-w-4xl text-xl italic text-zinc-500">
            "The world was not destroyed by monsters.
            It was reshaped by power."
          </p>
        </div>

        {/* Bottom */}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-sm text-zinc-500 md:flex-row">
          <div>
            © 2026 Red-Eye Universe. All Rights Reserved.
          </div>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-red-400">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-red-400">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}