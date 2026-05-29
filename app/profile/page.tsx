"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [email, setEmail] = useState("Loading...");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function loadUser() {
      console.log("PROFILE PAGE LOADED");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      console.log("SESSION:", session);
      console.log("SESSION ERROR:", sessionError);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("USER:", user);
      console.log("USER ERROR:", userError);

      if (user) {
        setEmail(user.email || "No email");
        setUserId(user.id);
      } else {
        setEmail("Not logged in");
      }
    }

    loadUser();
  }, []);

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Profile
      </h1>

      <div className="max-w-2xl rounded-2xl border border-red-900/30 bg-zinc-900 p-8">
        <h2 className="mb-4 text-2xl font-semibold">
          Account Information
        </h2>

        <p className="mb-2">
          <span className="font-bold text-red-400">
            Email:
          </span>{" "}
          {email}
        </p>

        <p>
          <span className="font-bold text-red-400">
            User ID:
          </span>{" "}
          {userId || "Not available"}
        </p>
      </div>
    </main>
  );
}