"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AvatarUpload from "@/components/profile/AvatarUpload";

export default function EditProfilePage() {
  const [profile, setProfile] =
    useState<any>(null);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    setProfile(data);
  }

  async function saveProfile() {
    try {
      setSaving(true);

      const { error } =
        await supabase
          .from("profiles")
          .update({
            full_name:
              profile.full_name,
            username:
              profile.username,
            bio: profile.bio,
            avatar_url:
              profile.avatar_url,
          })
          .eq("id", profile.id);

      if (error) throw error;

      alert("Profile Updated");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (!profile) return null;

  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Edit Profile
      </h1>

      <div className="space-y-4">

        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt=""
            className="h-32 w-32 rounded-full object-cover"
          />
        )}

        <AvatarUpload
          userId={profile.user_id}
          onUploaded={(url) =>
            setProfile({
              ...profile,
              avatar_url: url,
            })
          }
        />

        <input
          value={profile.full_name}
          onChange={(e) =>
            setProfile({
              ...profile,
              full_name:
                e.target.value,
            })
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <input
          value={profile.username}
          onChange={(e) =>
            setProfile({
              ...profile,
              username:
                e.target.value,
            })
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <textarea
          rows={5}
          value={profile.bio ?? ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              bio: e.target.value,
            })
          }
          className="w-full rounded-xl bg-zinc-900 p-4"
        />

        <button
          onClick={saveProfile}
          disabled={saving}
          className="rounded-xl bg-red-600 px-6 py-3"
        >
          {saving
            ? "Saving..."
            : "Save Profile"}
        </button>

      </div>
    </main>
  );
}