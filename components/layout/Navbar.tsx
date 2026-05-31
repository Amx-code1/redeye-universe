"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

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
    window.location.href = "/";
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-red-500">
          RED-EYE
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/chapters" className="hover:text-red-400">
            Chapters
          </Link>

          <Link href="/characters" className="hover:text-red-400">
            Characters
          </Link>

          {user ? (
            <>
              <Link href="/library" className="hover:text-red-400">
                Library
              </Link>

              <Link href="/profile" className="hover:text-red-400">
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
            <>
              <Link
                href="/login"
                className="rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
              >
                Login
              </Link>

              <Link
                href="/login"
                className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-white md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-zinc-800 bg-black p-4 md:hidden">
          <Link href="/chapters" onClick={() => setMenuOpen(false)}>
            Chapters
          </Link>

          <Link href="/characters" onClick={() => setMenuOpen(false)}>
            Characters
          </Link>

          {user ? (
            <>
              <Link href="/library" onClick={() => setMenuOpen(false)}>
                Library
              </Link>

              <Link href="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>

              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-4 py-2 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-zinc-800 px-4 py-2"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-red-600 px-4 py-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
