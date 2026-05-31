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
      window.location.href = "/profile/setup";
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
      <main className="min-h-screen bg-black p-10 text-white">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-5xl font-bold text-red-500">Profile</h1>

          <Link
            href="/profile/edit"
            className="rounded-xl bg-red-600 px-5 py-3"
          >
            Edit Profile
          </Link>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl bg-zinc-900 p-8">
          <div className="mb-6 flex items-center gap-6">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="h-28 w-28 rounded-full border-4 border-red-500 object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-red-500 bg-zinc-800 text-4xl">
                👤
              </div>
            )}

            <div>
              <h2 className="text-3xl font-bold">{profile.full_name}</h2>

              <p className="text-zinc-400">@{profile.username}</p>
            </div>
          </div>

          <div className="space-y-2 text-lg">
            <p>Age: {profile.age}</p>
            <p>Gender: {profile.gender}</p>

            <p>Joined {new Date(profile.created_at).toLocaleDateString()}</p>

            {profile.bio && <p className="mt-4 text-zinc-300">{profile.bio}</p>}
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {/* Profile Completion */}
          <ProfileCompletion
            avatar_url={profile.avatar_url}
            bio={profile.bio}
            age={profile.age}
            gender={profile.gender}
          />

          {/* Continue Reading */}
          {latestReading ? (
            <ContinueReading
              chapterTitle={latestReading.chapters?.title}
              chapterSlug={latestReading.chapters?.slug}
              progress={latestReading.progress}
            />
          ) : (
            <div className="rounded-2xl bg-zinc-900 p-6">
              <h2 className="text-2xl font-bold">Continue Reading</h2>

              <p className="mt-3 text-zinc-400">
                Start reading a chapter to see progress here.
              </p>
            </div>
          )}

          {/* Reader Stats */}
          <ReaderStats
            chaptersRead={progressData.filter((p) => p.progress >= 90).length}
            commentsCount={commentsCount}
            progressCount={progressData.length}
            savedCount={savedCount}
          />

          {/* Navigation */}
          <div className="flex gap-4">
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
      </main>
    </ProtectedRoute>
  );
}
