"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import AvatarUpload from "@/components/profile/AvatarUpload";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

type Profile = {
  id: string;
  user_id: string;
  username: string | null;
  full_name: string | null;
  age: number | null;
  gender: string | null;
  avatar_url: string | null;
  bio: string | null;
  banner_url: string | null;
};

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    loadProfile(user.id);
  }, [user, authLoading]);

  async function loadProfile(userId: string) {
    try {
      

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function handleAvatarUpload(file: File) {
    if (!profile) return;

    try {
      const ext = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (error) {
        toast.error(error.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      setProfile({
        ...profile,
        avatar_url: publicUrl,
      });

      toast.success("Avatar uploaded");
    } catch {
      toast.error("Avatar upload failed");
    }
  }

  async function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file || !profile) return;

    try {
      const ext = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("banners")
        .upload(fileName, file);

      if (error) {
        toast.error(error.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("banners").getPublicUrl(fileName);

      setProfile({
        ...profile,
        banner_url: publicUrl,
      });

      toast.success("Banner uploaded");
    } catch {
      toast.error("Banner upload failed");
    }
  }

  async function saveProfile() {
    if (!profile) return;

    setSaving(true);

    try {
     
      if (!user) {
        toast.error("Not authenticated");
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          username: profile.username,
          age: profile.age,
          gender: profile.gender,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          banner_url: profile.banner_url,
        })
        .eq("user_id", user.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  async function resetPassword() {
    

    if (!user?.email) {
      toast.error("Email not found");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password reset email sent");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">Loading...</main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        Profile not found.
      </main>
    );
  }

  const completion =
    [
      profile.full_name,
      profile.username,
      profile.age,
      profile.gender,
      profile.avatar_url,
      profile.bio,
      profile.banner_url,
    ].filter(Boolean).length * 14.28;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        {/* Banner */}

        <div className="relative h-72 w-full overflow-hidden border-b border-red-900/30">
          {profile.banner_url ? (
            <img
              src={profile.banner_url}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-red-950 via-black to-black" />
          )}

          <label className="absolute bottom-4 right-4 cursor-pointer rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700">
            Upload Banner
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleBannerUpload}
            />
          </label>
        </div>

        <div className="mx-auto max-w-5xl p-8">
          <h1 className="mb-8 text-5xl font-bold text-red-500">Settings</h1>

          <AvatarUpload
            avatarUrl={profile.avatar_url || ""}
            onChange={handleAvatarUpload}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <input
              value={profile.full_name ?? ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  full_name: e.target.value,
                })
              }
              placeholder="Full Name"
              className="rounded-xl bg-zinc-900 p-4"
            />

            <input
              value={profile.username ?? ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  username: e.target.value,
                })
              }
              placeholder="Username"
              className="rounded-xl bg-zinc-900 p-4"
            />

            <input
              type="number"
              value={profile.age ?? ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  age: Number(e.target.value) || null,
                })
              }
              placeholder="Age"
              className="rounded-xl bg-zinc-900 p-4"
            />

            <select
              value={profile.gender ?? ""}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  gender: e.target.value,
                })
              }
              className="rounded-xl bg-zinc-900 p-4"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

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
            className="mt-6 w-full rounded-xl bg-zinc-900 p-4"
          />

          <div className="mt-2 text-right text-zinc-300">
            {(profile.bio ?? "").length}/250
          </div>

          <div className="mt-8 rounded-2xl bg-zinc-900 p-6">
            <h3 className="mb-4 text-xl font-semibold">Profile Completion</h3>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-red-500"
                style={{
                  width: `${completion}%`,
                }}
              />
            </div>

            <p className="mt-3 text-zinc-400">
              {Math.round(completion)}% Complete
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={resetPassword}
              className="rounded-xl border border-red-500 px-8 py-4 hover:bg-red-950"
            >
              Reset Password
            </button>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
