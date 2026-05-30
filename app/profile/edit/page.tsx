"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AvatarUpload from "@/components/profile/AvatarUpload";

export default function EditProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);

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

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    setProfile(data);
  }

  async function handleAvatarUpload(
  file: File
) {
  const fileExt =
    file.name.split(".").pop();

  const fileName =
    `${crypto.randomUUID()}.${fileExt}`;

  const { error } =
    await supabase.storage
      .from("avatars")
      .upload(fileName, file);

  if (error) {
    alert(error.message);
    return;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  setProfile({
    ...profile,
    avatar_url: publicUrl,
  });
}

  async function save() {
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        username: profile.username,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
      })
      .eq("id", profile.id);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile Updated");
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-10 text-5xl font-bold text-red-500">
          Edit Profile
        </h1>

        <div className="rounded-3xl border border-red-900/30 bg-zinc-900 p-8">

          {/* Avatar Section */}

          <div className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">
              Profile Picture
            </h2>

            <p className="mb-5 text-zinc-400">
              Upload an avatar that readers will see.
            </p>

            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="mb-5 h-32 w-32 rounded-full border-4 border-red-500 object-cover"
              />
            )}

            <AvatarUpload
            avatarUrl={profile.avatar_url || ""}
            onChange={handleAvatarUpload}
            />
          </div>

          {/* Full Name */}

          <div className="mb-6">
            <label className="mb-2 block text-zinc-400">
              Full Name
            </label>

            <input
              value={profile.full_name ?? ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  full_name: e.target.value,
                })
              }
              placeholder="Enter your full name"
              className="w-full rounded-xl bg-black p-4 outline-none ring-1 ring-zinc-800 focus:ring-red-500"
            />
          </div>

          {/* Username */}

          <div className="mb-6">
            <label className="mb-2 block text-zinc-400">
              Username
            </label>

            <input
              value={profile.username ?? ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  username: e.target.value,
                })
              }
              placeholder="Choose a username"
              className="w-full rounded-xl bg-black p-4 outline-none ring-1 ring-zinc-800 focus:ring-red-500"
            />
          </div>

          {/* Bio */}

          <div className="mb-8">
            <label className="mb-2 block text-zinc-400">
              Bio
            </label>

            <textarea
              value={profile.bio ?? ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
              rows={6}
              maxLength={250}
              placeholder="Tell readers about yourself..."
              className="w-full rounded-xl bg-black p-4 outline-none ring-1 ring-zinc-800 focus:ring-red-500"
            />

            <div className="mt-2 text-right text-sm text-zinc-500">
              {(profile.bio ?? "").length}/250
            </div>
          </div>

          {/* Completion Preview */}

          <div className="mb-8 rounded-2xl bg-black p-5">
            <h3 className="mb-3 text-lg font-semibold">
              Profile Completion
            </h3>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-red-500"
                style={{
                  width: `${
                    [
                      profile.full_name,
                      profile.username,
                      profile.bio,
                      profile.avatar_url,
                    ].filter(Boolean).length * 25
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Save Button */}

          <button
            onClick={save}
            disabled={saving}
            className="rounded-xl bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save Profile"}
          </button>

        </div>
      </div>
    </main>
  );
}