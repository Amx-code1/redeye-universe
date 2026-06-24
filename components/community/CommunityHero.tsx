import Link from "next/link";
import { Plus } from "lucide-react";

export default function CommunityHero() {
  return (
    <section className="relative overflow-hidden border-b border-red-500/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_75%)] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-red-500/10 bg-red-950/20 px-4 py-2 text-red-300">
              Red-Eye Community
            </div>

            <h1 className="text-5xl font-black md:text-7xl">
              Discuss The
              <span className="text-red-500">
                {" "}
                Universe
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-zinc-300">
              Share theories, discuss chapters,
              explore lore, and connect with
              other readers.
            </p>
          </div>

          <Link
            href="/community/new"
            className="
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-red-600
              px-8
              py-4
              font-semibold
              transition
              hover:bg-red-700
            "
          >
            <Plus size={18} />
            Create Thread
          </Link>
        </div>
      </div>
    </section>
  );
}