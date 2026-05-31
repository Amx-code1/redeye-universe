"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async () => {
        checkUser();
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function logout() {
    await supabase.auth.signOut();

    setUser(null);

    window.location.href = "/";
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link
          href="/"
          className="text-2xl font-bold text-red-500"
        >
          RED-EYE
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/chapters"
            className="hover:text-red-400"
          >
            Chapters
          </Link>

          <Link
            href="/characters"
            className="hover:text-red-400"
          >
            Characters
          </Link>

          <Link
            href="/library"
            className="hover:text-red-400"
          >
            Library
          </Link>

          {user ? (
            <>
              <Link
                href="/profile"
                className="hover:text-red-400"
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}