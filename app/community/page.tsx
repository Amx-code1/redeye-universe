"use client";

import Link from "next/link";
import {
  Users,
  MessageSquare,
  BookOpen,
  Sparkles,
  ArrowRight,
  Flame,
  Shield,
  Crown,
  Heart,
} from "lucide-react";

export default function CommunityPage() {
  const stats = [
    {
      icon: Users,
      value: "1,000+",
      label: "Readers",
    },
    {
      icon: BookOpen,
      value: "50+",
      label: "Chapters",
    },
    {
      icon: MessageSquare,
      value: "500+",
      label: "Comments",
    },
    {
      icon: Flame,
      value: "Daily",
      label: "Updates",
    },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: "Discuss Chapters",
      description:
        "Share theories, discuss plot twists, and debate character decisions.",
    },
    {
      icon: Crown,
      title: "Character Rankings",
      description:
        "Vote for your favorite warriors and compare power levels.",
    },
    {
      icon: Shield,
      title: "Lore Exploration",
      description:
        "Dive deep into factions, Agastha Crystals, and hidden history.",
    },
    {
      icon: Heart,
      title: "Support The Universe",
      description:
        "Help Red-Eye grow through feedback and community participation.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-red-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_75%)]" />

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[180px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-900/20 bg-zinc-900/80 px-4 py-2 text-red-400">
            <Sparkles size={16} />
            Red-Eye Community
          </div>

          <h1 className="mt-8 bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
            COMMUNITY
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-zinc-400">
            Join readers, theorists, and explorers
            uncovering the secrets of the Agastha
            Crystals and the Red-Eye Universe.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 md:flex-row">
            <a
              href="#"
              className="rounded-2xl bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700"
            >
              Join Discord
            </a>

            <Link
              href="/chapters"
              className="rounded-2xl border border-red-500 px-8 py-4 font-semibold transition hover:bg-red-500/10"
            >
              Start Reading
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-3xl border border-red-900/20 bg-zinc-900 p-8 text-center"
              >
                <Icon
                  size={40}
                  className="mx-auto mb-4 text-red-500"
                />

                <div className="text-4xl font-black text-red-500">
                  {item.value}
                </div>

                <div className="mt-2 text-zinc-400">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-black text-red-500">
            Community Features
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Everything needed to connect with
            fellow readers and explore the world.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-red-900/20 bg-zinc-900 p-8 transition hover:border-red-500"
              >
                <Icon
                  size={42}
                  className="mb-5 text-red-500"
                />

                <h3 className="text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-zinc-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}

      <section className="border-t border-red-900/20 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-5xl font-black text-red-500">
            Become Part Of The Story
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Follow updates, discuss theories,
            discover hidden lore, and grow with
            the Red-Eye Universe.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 md:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700"
            >
              Join Now
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/characters"
              className="rounded-2xl border border-red-500 px-8 py-4 font-semibold transition hover:bg-red-500/10"
            >
              Explore Characters
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}