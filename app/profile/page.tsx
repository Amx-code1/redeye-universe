"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

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

    if (!data) {
      window.location.href =
        "/profile/setup";
      return;
    }

    setProfile(data);
  }

  if (!profile)
    return (
      <main className="p-10 text-white bg-black">
        Loading...
      </main>
    );

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Profile
      </h1>

      <div className="rounded-2xl bg-zinc-900 p-8">
        <p>Name: {profile.full_name}</p>

        <p>
          Username: {profile.username}
        </p>

        <p>Age: {profile.age}</p>

        <p>Gender: {profile.gender}</p>

        <p>
          Joined:
          {" "}
          {new Date(
            profile.created_at
          ).toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}