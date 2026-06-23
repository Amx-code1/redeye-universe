"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import ProfileCompletion from "@/components/profile/ProfileCompletion";
import ReaderStats from "@/components/profile/ReaderStats";
import ContinueReading from "@/components/profile/ContinueReading";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Skeleton from "@/components/ui/Skeleton";

import {
  User,
  BookOpen,
  MessageCircle,
  Bookmark,
  Trophy,
  PenSquare,
  Sparkles,
  Crown,
} from "lucide-react";

type Profile = {
  user_id: string;
  full_name: string;
  username: string;
  bio?: string;
  avatar_url?: string;
  age?: number;
  gender?: string;
  created_at: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  const [commentsCount, setCommentsCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const [progressData, setProgressData] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!profileData) {
      const username = user.email?.split("@")[0] || "user";

      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert({
          user_id: user.id,
          username,
          role: "user",
        })
        .select()
        .single();

      if (createError || !newProfile) {
        setError("Failed to create profile.");
        return;
      }

      setProfile(newProfile);
    } else {
      setProfile(profileData);
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
        <div className="rounded-3xl border border-red-500/30 bg-zinc-950 p-10">
          <h2 className="text-3xl font-black text-red-500">Error</h2>

          <p className="mt-4 text-zinc-400">{error}</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-black p-10">
        <Skeleton className="mb-8 h-80 w-full" />

        <Skeleton className="mb-8 h-40 w-full" />

        <Skeleton className="mb-8 h-40 w-full" />

        <Skeleton className="h-40 w-full" />
      </main>
    );
  }

  const latestReading = progressData.length > 0 ? progressData[0] : null;

  const completedChapters = progressData.filter((p) => p.progress >= 90).length;

  const rank =
    completedChapters >= 25
      ? "Crimson Sovereign"
      : completedChapters >= 10
        ? "Crystal Bearer"
        : completedChapters >= 3
          ? "Awakened Reader"
          : "Wanderer";

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        {/* HERO */}

        <section className="relative overflow-hidden border-b border-red-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_75%)] opacity-40" />

          <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[220px]" />

          <div className="relative mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
              {/* AVATAR */}

              <div className="flex justify-center lg:block">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="
                      h-52
                      w-52
                      rounded-full
                      border-4
                      border-red-500/40
                      object-cover
                      shadow-[0_0_50px_rgba(239,68,68,0.3)]
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-52
                      w-52
                      items-center
                      justify-center
                      rounded-full
                      border-4
                      border-red-500/40
                      bg-zinc-900
                    "
                  >
                    <User size={80} />
                  </div>
                )}
              </div>

              {/* INFO */}

              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-950/20 px-4 py-2 text-sm text-red-400">
                  <Crown size={14} />
                  {rank}
                </div>

                <h1 className="bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
                  {profile.full_name}
                </h1>

                <p className="mt-2 text-xl text-zinc-400">
                  @{profile.username}
                </p>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
                  {profile.bio || "No biography added yet."}
                </p>

                <div className="mt-8 flex flex-wrap gap-4 text-zinc-300">
                  <span>Age: {profile.age || "Unknown"}</span>

                  <span>Gender: {profile.gender || "Unknown"}</span>

                  <span>
                    Joined {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-8">
                  <Link
                    href="/profile/edit"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-2xl
                      bg-gradient-to-r
                      from-red-600
                      to-red-700
                      px-6
                      py-4
                      font-semibold
                      transition
                      hover:scale-105
                    "
                  >
                    <PenSquare size={18} />
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK STATS */}

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-4">
            <PremiumStatCard
              icon={<MessageCircle />}
              title="Comments"
              value={commentsCount}
            />

            <PremiumStatCard
              icon={<Bookmark />}
              title="Saved"
              value={savedCount}
            />

            <PremiumStatCard
              icon={<BookOpen />}
              title="Reading"
              value={progressData.length}
            />

            <PremiumStatCard
              icon={<Trophy />}
              title="Completed"
              value={completedChapters}
            />
          </div>
        </section>

        {/* MAIN DASHBOARD */}

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            {/* LEFT */}

            <div className="space-y-8">
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
                <div className="rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8">
                  <h2 className="text-xl font-bold">Continue Reading</h2>

                  <p className="mt-3 text-zinc-300">
                    Start reading your first chapter to track progress.
                  </p>
                </div>
              )}

              <ReaderStats
                chaptersRead={completedChapters}
                commentsCount={commentsCount}
                progressCount={progressData.length}
                savedCount={savedCount}
              />
            </div>

            {/* RIGHT */}

            <div className="space-y-8">
              <div className="rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8">
                <div className="mb-6 flex items-center gap-3">
                  <Sparkles className="text-red-500" />

                  <h2 className="text-xl font-bold">Achievements</h2>
                </div>

                <div className="space-y-4">
                  <Achievement
                    title="First Steps"
                    unlocked={progressData.length > 0}
                  />

                  <Achievement
                    title="Commentator"
                    unlocked={commentsCount > 0}
                  />

                  <Achievement title="Collector" unlocked={savedCount > 5} />

                  <Achievement
                    title="Veteran Reader"
                    unlocked={completedChapters >= 10}
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8">
                <h2 className="mb-6 text-xl font-bold">Quick Access</h2>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/profile/history"
                    className="
                      rounded-xl
                      bg-zinc-900
                      px-5
                      py-4
                      transition
                      hover:bg-zinc-800
                    "
                  >
                    Reading History
                  </Link>

                  <Link
                    href="/library"
                    className="
                      rounded-xl
                      bg-zinc-900
                      px-5
                      py-4
                      transition
                      hover:bg-zinc-800
                    "
                  >
                    My Library
                  </Link>

                  <Link
                    href="/chapters"
                    className="
                      rounded-xl
                      bg-zinc-900
                      px-5
                      py-4
                      transition
                      hover:bg-zinc-800
                    "
                  >
                    Explore Chapters
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}

function PremiumStatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-red-900/20 bg-zinc-950/80 p-8 backdrop-blur-xl">
      <div className="mb-4 text-red-500">{icon}</div>

      <div className="text-sm uppercase tracking-wider text-zinc-300">
        {title}
      </div>

      <div className="mt-2 text-4xl font-black">{value}</div>
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
        p-4
        ${
          unlocked
            ? "border-red-500/40 bg-red-950/20"
            : "border-zinc-800 bg-zinc-900"
        }
      `}
    >
      <div className="font-semibold">{title}</div>

      <div className="mt-2 text-sm text-zinc-400">
        {unlocked ? "Unlocked" : "Locked"}
      </div>
    </div>
  );
}
