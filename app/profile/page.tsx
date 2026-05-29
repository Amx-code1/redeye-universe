"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [email, setEmail] = useState("Loading...");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setEmail(user.email || "");
      } else {
        setEmail("Not logged in");
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("AUTH EVENT", _event);

        if (session?.user) {
          setEmail(session.user.email || "");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Profile
      </h1>

      <div className="rounded-2xl bg-zinc-900 p-8">
        <p className="text-xl">
          Logged in as: {email}
        </p>
      </div>
    </main>
  );
}