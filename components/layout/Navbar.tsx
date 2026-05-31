"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          await checkAdmin(session.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      await checkAdmin(user.id);
    }
  }

  async function checkAdmin(userId: string) {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", userId)
      .single();

    setIsAdmin(data?.role === "admin");
  }

  async function logout() {
    await supabase.auth.signOut();

    setUser(null);
    setIsAdmin(false);

    window.location.href = "/";
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">

        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-bold text-red-500"
        >
          RED-EYE
        </Link>

        {/* Desktop Menu */}

        <div className="hidden items-center gap-6 md:flex">

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
            href="/search"
            className="hover:text-red-400"
          >
            Search
          </Link>

          {user ? (
            <>
              <Link
                href="/library"
                className="hover:text-red-400"
              >
                Library
              </Link>

              <Link
                href="/profile"
                className="hover:text-red-400"
              >
                Profile
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="hover:text-red-400"
                >
                  Admin
                </Link>
              )}

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

          <Link
            href="/chapters"
            onClick={() => setMenuOpen(false)}
          >
            Chapters
          </Link>

          <Link
            href="/characters"
            onClick={() => setMenuOpen(false)}
          >
            Characters
          </Link>

          <Link
            href="/search"
            onClick={() => setMenuOpen(false)}
          >
            Search
          </Link>

          {user ? (
            <>
              <Link
                href="/library"
                onClick={() => setMenuOpen(false)}
              >
                Library
              </Link>

              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}

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
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-red-600 px-4 py-2"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}