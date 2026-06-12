"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AvatarUpload from "@/components/profile/AvatarUpload";
import toast from "react-hot-toast";
import {
  User,
  ImageIcon,
  Save,
  Calendar,
  VenusAndMars,
  FileText,
} from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  username: string | null;
  full_name: string | null;
  age: number | null;
  gender: string | null;
  avatar_url: string | null;
  bio: string | null;
  banner_url: string | null;
}

export default function EditProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        toast.error(error.message);
        return;
      }

      setProfile(data);
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function handleAvatarUpload(file: File) {
    if (!profile) return;

    try {
      const fileExt = file.name.split(".").pop();

      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (error) {
        toast.error(error.message);
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

      toast.success("Avatar uploaded");
    } catch {
      toast.error("Avatar upload failed");
    }
  }

  async function handleBannerUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!profile) return;

    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadingBanner(true);

      const fileExt = file.name.split(".").pop();

      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("banners")
        .upload(fileName, file);

      if (error) {
        toast.error(error.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("banners")
        .getPublicUrl(fileName);

      setProfile({
        ...profile,
        banner_url: publicUrl,
      });

      toast.success("Banner uploaded");
    } catch {
      toast.error("Banner upload failed");
    } finally {
      setUploadingBanner(false);
    }
  }

  async function saveProfile() {
    if (!profile) return;

    if (!profile.username?.trim()) {
      toast.error("Username is required");
      return;
    }

    if (!profile.full_name?.trim()) {
      toast.error("Full name is required");
      return;
    }

    try {
      setSaving(true);

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
        .eq("id", profile.id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Profile not found
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
      profile.banner_url,
      profile.bio,
    ].filter(Boolean).length * 14.28;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <h1 className="mb-8 text-5xl font-black text-red-500">
            Edit Profile
          </h1>

          <div className="overflow-hidden rounded-3xl border border-red-900/30 bg-zinc-900">
            {/* Banner */}

            <div
              className="relative h-64 bg-cover bg-center"
              style={{
                backgroundImage: profile.banner_url
                  ? `url(${profile.banner_url})`
                  : undefined,
              }}
            >
              <div className="absolute inset-0 bg-black/50" />

              <div className="absolute bottom-5 right-5">
                <label className="cursor-pointer rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-700">
                  {uploadingBanner
                    ? "Uploading..."
                    : "Upload Banner"}

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                  />
                </label>
              </div>
            </div>

            <div className="p-8">
              {/* Avatar */}

              <div className="mb-10">
                <AvatarUpload
                  avatarUrl={profile.avatar_url || ""}
                  onChange={handleAvatarUpload}
                />
              </div>

              {/* Completion */}

              <div className="mb-10">
                <h3 className="mb-3 text-lg font-semibold">
                  Profile Completion
                </h3>

                <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full bg-red-500 transition-all"
                    style={{
                      width: `${completion}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-sm text-zinc-400">
                  {Math.round(completion)}% Completed
                </p>
              </div>

              {/* Form */}

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-zinc-400">
                    <User size={16} />
                    Full Name
                  </label>

                  <input
                    value={profile.full_name || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        full_name: e.target.value,
                      })
                    }
                    className="w-full rounded-xl bg-black p-4 ring-1 ring-zinc-800 outline-none focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-zinc-400">
                    <User size={16} />
                    Username
                  </label>

                  <input
                    value={profile.username || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        username: e.target.value,
                      })
                    }
                    className="w-full rounded-xl bg-black p-4 ring-1 ring-zinc-800 outline-none focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-zinc-400">
                    <Calendar size={16} />
                    Age
                  </label>

                  <input
                    type="number"
                    value={profile.age || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        age: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl bg-black p-4 ring-1 ring-zinc-800 outline-none focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-zinc-400">
                    <VenusAndMars size={16} />
                    Gender
                  </label>

                  <select
                    value={profile.gender || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        gender: e.target.value,
                      })
                    }
                    className="w-full rounded-xl bg-black p-4 ring-1 ring-zinc-800 outline-none focus:ring-red-500"
                  >
                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-2 flex items-center gap-2 text-zinc-400">
                  <ImageIcon size={16} />
                  Banner URL
                </label>

                <input
                  value={profile.banner_url || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      banner_url: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-black p-4 ring-1 ring-zinc-800 outline-none focus:ring-red-500"
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 flex items-center gap-2 text-zinc-400">
                  <FileText size={16} />
                  Biography
                </label>

                <textarea
                  rows={6}
                  maxLength={500}
                  value={profile.bio || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bio: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-black p-4 ring-1 ring-zinc-800 outline-none focus:ring-red-500"
                />

                <div className="mt-2 text-right text-sm text-zinc-500">
                  {(profile.bio || "").length}/500
                </div>
              </div>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="mt-10 flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold transition hover:bg-red-700 disabled:opacity-50"
              >
                <Save size={18} />

                {saving
                  ? "Saving..."
                  : "Save Profile"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}