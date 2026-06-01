"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

import ProfileCompletion from "@/components/profile/ProfileCompletion";
import ReaderStats from "@/components/profile/ReaderStats";
import ContinueReading from "@/components/profile/ContinueReading";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Skeleton from "@/components/ui/Skeleton";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  const [commentsCount, setCommentsCount] = useState(0);

  const [progressData, setProgressData] = useState<any[]>([]);
  const [savedCount, setSavedCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!profileData) {
      setError("Profile not found.");
      return;
    }

    setProfile(profileData);

    const { data: comments } = await supabase
      .from("comments")
      .select("id")
      .eq("user_id", user.id);

    setCommentsCount(comments?.length || 0);

    const { count } = await supabase
      .from("library")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    setSavedCount(count || 0);

    const { data: progress } = await supabase
      .from("reading_progress")
      .select(
        `
        *,
        chapters (
          title,
          slug
        )
      `,
      )
      .eq("user_id", user.id)
      .order("updated_at", {
        ascending: false,
      });

    setProgressData(progress || []);
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="rounded-2xl border border-red-500 bg-zinc-900 p-8">
          <h2 className="text-2xl font-bold text-red-500">Error</h2>

          <p className="mt-4 text-zinc-300">{error}</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-black p-10">
        <Skeleton className="mb-8 h-16 w-72" />

        <Skeleton className="mb-8 h-80 w-full" />

        <Skeleton className="mb-8 h-40 w-full" />

        <Skeleton className="h-40 w-full" />
      </main>
    );
  }

  const latestReading = progressData.length > 0 ? progressData[0] : null;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* Hero Profile */}

          <section className="relative overflow-hidden rounded-3xl border border-red-900/20 bg-zinc-900 p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#991b1b_0%,transparent_70%)] opacity-30" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-8">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="h-36 w-36 rounded-full border-4 border-red-500 object-cover"
                  />
                ) : (
                  <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-red-500 bg-zinc-800 text-6xl">
                    👤
                  </div>
                )}

                <div>
                  <div className="mb-3 inline-flex rounded-full bg-red-950/50 px-4 py-2 text-sm text-red-400">
                    Crystal Bearer
                  </div>

                  <h1 className="text-5xl font-black text-red-500">
                    {profile.full_name}
                  </h1>

                  <p className="mt-2 text-zinc-400">@{profile.username}</p>

                  <p className="mt-4 max-w-xl text-zinc-300">
                    {profile.bio || "No biography added yet."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
                    <span>Age: {profile.age || "Unknown"}</span>
                    <span>Gender: {profile.gender || "Unknown"}</span>
                    <span>
                      Joined {new Date(profile.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/profile/edit"
                className="
                rounded-2xl
                bg-red-600
                px-6
                py-4
                font-semibold
                transition
                hover:bg-red-700
              "
              >
                Edit Profile
              </Link>
            </div>
          </section>

          {/* Stats */}

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            <StatCard title="Comments" value={commentsCount} />

            <StatCard title="Saved" value={savedCount} />

            <StatCard title="Progress" value={progressData.length} />

            <StatCard
              title="Completed"
              value={progressData.filter((p) => p.progress >= 90).length}
            />
          </div>

          {/* Existing Components */}

          <div className="mt-8 space-y-8">
            <ProfileCompletion
              avatar_url={profile.avatar_url}
              bio={profile.bio}
              age={profile.age}
              gender={profile.gender}
            />

            {latestReading ? (
              <ContinueReading
                chapterTitle={
                  latestReading.chapters?.title || "Unknown Chapter"
                }
                chapterSlug={latestReading.chapters?.slug || ""}
                progress={latestReading.progress}
              />
            ) : (
              <div className="rounded-2xl bg-zinc-900 p-6">
                <h2 className="text-2xl font-bold">Continue Reading</h2>

                <p className="mt-2 text-zinc-400">
                  Start reading a chapter to see progress here.
                </p>
              </div>
            )}

            <ReaderStats
              chaptersRead={progressData.filter((p) => p.progress >= 90).length}
              commentsCount={commentsCount}
              progressCount={progressData.length}
              savedCount={savedCount}
            />

            {/* Achievements */}

            <div className="rounded-3xl bg-zinc-900 p-8">
              <h2 className="mb-6 text-3xl font-bold text-red-500">
                Achievements
              </h2>

              <div className="grid gap-4 md:grid-cols-3">
                <Achievement
                  title="First Steps"
                  unlocked={progressData.length > 0}
                />

                <Achievement title="Commentator" unlocked={commentsCount > 0} />

                <Achievement title="Collector" unlocked={savedCount > 5} />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/profile/history"
                className="rounded-xl bg-zinc-800 px-5 py-3 hover:bg-zinc-700"
              >
                Reading History
              </Link>

              <Link
                href="/library"
                className="rounded-xl bg-zinc-800 px-5 py-3 hover:bg-zinc-700"
              >
                My Library
              </Link>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl bg-zinc-900 p-6">
      <p className="text-zinc-400">
        {title}
      </p>

      <p className="mt-2 text-4xl font-bold text-red-500">
        {value}
      </p>
    </div>
  );
}

function Achievement({
  title,
  unlocked,
}: {
  title: string;
  unlocked: boolean;
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        p-5
        ${
          unlocked
            ? "border-red-500 bg-red-950/20"
            : "border-zinc-800 bg-zinc-900"
        }
      `}
    >
      <div className="font-bold">
        {title}
      </div>

      <div className="mt-2 text-sm text-zinc-400">
        {unlocked ? "Unlocked" : "Locked"}
      </div>
    </div>
  );
}