"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/");
  }
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
    const [
      { count: users },
      { count: chapters },
      { count: comments },
      { count: library },
    ] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),

      supabase.from("chapters").select("*", { count: "exact", head: true }),

      supabase.from("comments").select("*", { count: "exact", head: true }),

      supabase.from("library").select("*", { count: "exact", head: true }),
    ]);

    setStats({
      users: users || 0,
      chapters: chapters || 0,
      comments: comments || 0,
      library: library || 0,
    });
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-10 text-5xl font-bold text-red-500">Admin Dashboard</h1>

      {/* Stats */}

      <div className="mb-10 grid gap-6 md:grid-cols-4">
        <StatCard title="Users" value={stats.users} />
        <StatCard title="Chapters" value={stats.chapters} />
        <StatCard title="Comments" value={stats.comments} />
        <StatCard title="Library Saves" value={stats.library} />
      </div>

      {/* Admin Navigation */}

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/characters"
          className="rounded-2xl border border-red-900/30 bg-zinc-900 p-8 hover:border-red-500"
        >
          <h2 className="text-2xl font-bold">Manage Characters</h2>

          <p className="mt-2 text-zinc-400">Add / Edit Characters</p>
        </Link>

        <Link
          href="/admin/chapters"
          className="rounded-2xl border border-red-900/30 bg-zinc-900 p-8 hover:border-red-500"
        >
          <h2 className="text-2xl font-bold">Manage Chapters</h2>

          <p className="mt-2 text-zinc-400">Add / Edit Chapters</p>
        </Link>

        <Link
          href="/admin/comments"
          className="rounded-2xl border border-red-900/30 bg-zinc-900 p-8 hover:border-red-500"
        >
          <h2 className="text-2xl font-bold">Comments</h2>

          <p className="mt-2 text-zinc-400">Moderate Readers</p>
        </Link>
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-6">
      <h3 className="text-zinc-400">{title}</h3>

      <p className="mt-2 text-4xl font-bold text-red-500">{value}</p>
    </div>
  );
}
