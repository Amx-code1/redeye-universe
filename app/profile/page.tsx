"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  useEffect(() => {
    async function test() {
      const { data: sessionData } =
        await supabase.auth.getSession();

      const { data: userData } =
        await supabase.auth.getUser();

      console.log("SESSION", sessionData);
      console.log("USER", userData);
    }

    test();
  }, []);

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="text-5xl font-bold text-red-500">
        Profile
      </h1>
      <p className="mt-6">
        Open browser console (F12)
      </p>
    </main>
  );
}