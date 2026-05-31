"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";

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

    return () => subscription.unsubscribe();
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
    window.location.href = "/";
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-red-900/20 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <Link
          href="/"
          className="text-3xl font-black tracking-widest text-red-500 transition hover:text-red-400"
        >
          RED-EYE
        </Link>

        {/* Desktop */}

        <div className="hidden items-center gap-8 md:flex">

          <Link href="/chapters" className="hover:text-red-400">
            Chapters
          </Link>

          <Link href="/characters" className="hover:text-red-400">
            Characters
          </Link>

          <Link href="/search" className="hover:text-red-400">
            Search
          </Link>

          <button className="text-zinc-400 hover:text-red-400">
            <Search size={18} />
          </button>

          {user ? (
            <>
              <Link href="/library" className="hover:text-red-400">
                Library
              </Link>

              <Link href="/profile" className="hover:text-red-400">
                Profile
              </Link>

              {isAdmin && (
                <Link href="/admin" className="hover:text-red-400">
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="rounded-xl bg-red-600 px-5 py-2 font-semibold transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-zinc-700 px-5 py-2 hover:border-red-500"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-red-600 px-5 py-2 font-semibold hover:bg-red-700"
              >
                Join The Universe
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="border-t border-red-900/20 bg-black/95 p-6 backdrop-blur-xl md:hidden">

          <div className="flex flex-col gap-4">

            <Link href="/chapters">Chapters</Link>

            <Link href="/characters">Characters</Link>

            <Link href="/search">Search</Link>

            {user ? (
              <>
                <Link href="/library">Library</Link>

                <Link href="/profile">Profile</Link>

                {isAdmin && (
                  <Link href="/admin">
                    Admin
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="rounded-xl bg-red-600 px-4 py-3 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl border border-zinc-700 px-4 py-3"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-red-600 px-4 py-3"
                >
                  Join The Universe
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}