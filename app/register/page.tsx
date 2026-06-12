"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  async function register() {
    if (!email.trim()) {
      toast.error(
        "Please enter your email."
      );
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      toast.error(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(
        "Account created successfully. Check your email."
      );

      window.location.href =
        "/login";
    } catch {
      toast.error(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    const { error } =
      await supabase.auth.signInWithOAuth(
        {
          provider: "google",
          options: {
            redirectTo:
              `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
          },
        }
      );

    if (error) {
      toast.error(error.message);
    }
  }

  async function signInWithDiscord() {
    const { error } =
      await supabase.auth.signInWithOAuth(
        {
          provider: "discord",
          options: {
            redirectTo:
              `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
          },
        }
      );

    if (error) {
      toast.error(error.message);
    }
  }

  async function magicLinkSignup() {
    if (!email.trim()) {
      toast.error(
        "Enter your email first."
      );
      return;
    }

    const { error } =
      await supabase.auth.signInWithOtp(
        {
          email,
          options: {
            emailRedirectTo:
              `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
          },
        }
      );

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Magic link sent."
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_70%)] opacity-40" />

      <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[220px]" />

      {/* Card */}

      <div className="relative w-full max-w-md rounded-3xl border border-red-900/20 bg-zinc-950/90 p-8 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-5xl font-black text-transparent">
            RED-EYE
          </h1>

          <p className="mt-4 text-zinc-400">
            Create your account and
            enter the universe.
          </p>
        </div>

        {/* Email */}

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
                setEmail(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-4 pl-12 pr-4 outline-none transition focus:border-red-500"
            />
          </div>

          {/* Password */}

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
                setPassword(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-4 pl-12 pr-12 outline-none transition focus:border-red-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4"
            >
              {showPassword ? (
                <EyeOff
                  size={18}
                />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Confirm Password */}

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
              placeholder="Confirm Password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 py-4 pl-12 pr-4 outline-none transition focus:border-red-500"
            />
          </div>

          {/* Create Account */}

          <button
            onClick={register}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 font-bold transition hover:bg-red-700"
          >
            <UserPlus
              size={18}
            />

            Create Account
          </button>

          {/* Magic Link */}

          <button
            onClick={
              magicLinkSignup
            }
            disabled={loading}
            className="w-full rounded-2xl border border-red-500 py-4 font-semibold transition hover:bg-red-500/10"
          >
            Send Magic Link
          </button>
        </div>

        {/* Divider */}

        <div className="my-8 flex items-center">
          <div className="h-px flex-1 bg-zinc-800" />

          <span className="px-4 text-sm text-zinc-500">
            OR
          </span>

          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* OAuth */}

        <div className="space-y-3">
          <button
            onClick={
              signInWithGoogle
            }
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 py-4 transition hover:border-red-500"
          >
            <FcGoogle
              size={22}
            />

            Continue with Google
          </button>

          <button
            onClick={
              signInWithDiscord
            }
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 py-4 transition hover:border-[#5865F2]"
          >
            <FaDiscord
              size={20}
            />

            Continue with Discord
          </button>
        </div>

        {/* Footer */}

        <div className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-400 hover:text-red-300"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}