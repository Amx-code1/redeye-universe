"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import {
  Users,
  BookOpen,
  MessageSquare,
  Library,
  Crown,
  ArrowRight,
  Shield,
  Activity,
  Sparkles,
} from "lucide-react";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    chapters: 0,
    comments: 0,
    library: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const [
        { count: users },
        { count: chapters },
        { count: comments },
        { count: library },
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("chapters")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("comments")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("library")
          .select("*", {
            count: "exact",
            head: true,
          }),
      ]);

      setStats({
        users: users || 0,
        chapters: chapters || 0,
        comments: comments || 0,
        library: library || 0,
      });
    } finally {
      setLoading(false);
    }
  }

  const adminCards = [
    {
      title: "Manage Characters",
      description:
        "Create, edit and organize universe characters.",
      href: "/admin/characters",
      icon: Users,
    },
    {
      title: "Manage Chapters",
      description:
        "Write and publish story chapters.",
      href: "/admin/chapters",
      icon: BookOpen,
    },
    {
      title: "Moderate Comments",
      description:
        "Review reader discussions and reports.",
      href: "/admin/comments",
      icon: MessageSquare,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-red-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_75%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-900/20 bg-zinc-900/70 px-4 py-2 text-red-400">
            <Shield size={16} />
            Administrator Access
          </div>

          <h1 className="mt-8 bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
            ADMIN
          </h1>

          <p className="mt-4 max-w-2xl text-zinc-400">
            Control and manage the entire
            Red-Eye Universe from a single
            dashboard.
          </p>
        </div>
      </section>

      {/* LOADING */}

      {loading ? (
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-3xl bg-zinc-900"
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* STATS */}

          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={Users}
                title="Users"
                value={stats.users}
              />

              <StatCard
                icon={BookOpen}
                title="Chapters"
                value={stats.chapters}
              />

              <StatCard
                icon={MessageSquare}
                title="Comments"
                value={stats.comments}
              />

              <StatCard
                icon={Library}
                title="Library Saves"
                value={stats.library}
              />
            </div>
          </section>

          {/* QUICK ACTIONS */}

          <section className="mx-auto max-w-7xl px-6 pb-16">
            <div className="mb-10">
              <h2 className="text-4xl font-black text-red-500">
                Quick Actions
              </h2>

              <p className="mt-2 text-zinc-400">
                Manage content and community.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {adminCards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group rounded-3xl border border-red-900/20 bg-zinc-900 p-8 transition hover:-translate-y-2 hover:border-red-500"
                  >
                    <Icon
                      size={40}
                      className="mb-6 text-red-500"
                    />

                    <h3 className="text-xl font-bold">
                      {card.title}
                    </h3>

                    <p className="mt-4 text-zinc-400">
                      {card.description}
                    </p>

                    <div className="mt-8 flex items-center gap-2 text-red-400">
                      Open

                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ACTIVITY */}

          <section className="mx-auto max-w-7xl px-6 pb-20">
            <div className="rounded-3xl border border-red-900/20 bg-zinc-900 p-8">
              <div className="mb-6 flex items-center gap-3">
                <Activity className="text-red-500" />

                <h2 className="text-3xl font-bold">
                  Activity Overview
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <ActivityCard
                  icon={Sparkles}
                  title="Universe Status"
                  value="Online"
                />

                <ActivityCard
                  icon={Crown}
                  title="Admin Role"
                  value="Owner"
                />

                <ActivityCard
                  icon={Shield}
                  title="Security"
                  value="Protected"
                />
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-red-900/20 bg-zinc-900 p-8">
      <Icon
        size={36}
        className="mb-4 text-red-500"
      />

      <div className="text-sm uppercase tracking-widest text-zinc-300">
        {title}
      </div>

      <div className="mt-2 text-4xl font-black text-red-500">
        {value}
      </div>
    </div>
  );
}

function ActivityCard({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-black p-6">
      <Icon
        size={28}
        className="mb-4 text-red-500"
      />

      <div className="text-sm uppercase tracking-widest text-zinc-300">
        {title}
      </div>

      <div className="mt-2 text-xl font-bold">
        {value}
      </div>
    </div>
  );
}