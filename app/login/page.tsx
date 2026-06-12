"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  MessageSquare,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function signInWithPassword() {
    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Welcome back.");

      window.location.href = "/profile";
    } catch {
      toast.error("Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function signInWithMagicLink() {
    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo:
              `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
          },
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(
        "Magic link sent. Check your inbox."
      );
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
        },
      });

    if (error) {
      toast.error(error.message);
    }
  }

  async function signInWithDiscord() {
    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo:
            `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
        },
      });

    if (error) {
      toast.error(error.message);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_70%)] opacity-40" />

      <div className="relative w-full max-w-md rounded-3xl border border-red-900/20 bg-zinc-950/90 p-8 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-5xl font-black text-transparent">
            RED-EYE
          </h1>

          <p className="mt-4 text-zinc-400">
            Enter the universe.
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-4 text-zinc-500"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-4 pl-12 pr-4 outline-none transition focus:border-red-500"
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-4 text-zinc-500"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-4 pl-12 pr-12 outline-none transition focus:border-red-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <button
            onClick={signInWithPassword}
            disabled={loading}
            className="w-full rounded-2xl bg-red-600 py-4 font-bold transition hover:bg-red-700"
          >
            Login
          </button>

          <button
            onClick={signInWithMagicLink}
            disabled={loading}
            className="w-full rounded-2xl border border-red-500 py-4 font-semibold transition hover:bg-red-500/10"
          >
            Send Magic Link
          </button>
        </div>

        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="px-4 text-sm text-zinc-500">
            OR
          </span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="space-y-3">
          <button
            onClick={signInWithGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 py-4 transition hover:border-red-500"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <button
            onClick={signInWithDiscord}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 py-4 transition hover:border-[#5865F2]"
          >
            <FaDiscord size={20} />
            Continue with Discord
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-zinc-500">
          No account?{" "}
          <Link
            href="/register"
            className="text-red-400 hover:text-red-300"
          >
            Create one
          </Link>
        </div>
      </div>
    </main>
  );
}