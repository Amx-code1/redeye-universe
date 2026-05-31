"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";


export default function LoginPage() {
  const [email, setEmail] = useState("");

  const signIn = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo:
        "https://redeye-universe.vercel.app/profile",
    },
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("Check your email for the login link.");
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-2xl border border-red-900/30 bg-zinc-900 p-8">
        <h1 className="mb-6 text-4xl font-bold text-red-500">
          Login to Red-Eye
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl bg-zinc-800 p-4 outline-none"
        />

        <button
          onClick={signIn}
          className="mt-6 w-full rounded-xl bg-red-600 p-4 font-semibold hover:bg-red-700"
        >
          Continue
        </button>
      </div>
    </main>
  );
}