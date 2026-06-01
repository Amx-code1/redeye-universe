"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

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

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`transition duration-300 ${
        pathname === href
          ? "text-red-500"
          : "text-zinc-300 hover:text-red-400"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-red-900/20 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <Link
          href="/"
          className="relative text-3xl font-black tracking-[0.2em] text-red-500 transition hover:text-red-400"
        >
          RED-EYE

          <span
            className="
              absolute
              -inset-2
              -z-10
              rounded-full
              bg-red-600/20
              blur-xl
            "
          />
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden items-center gap-8 md:flex">

          {navLink("/chapters", "Chapters")}
          {navLink("/characters", "Characters")}
          {navLink("/search", "Search")}

          <Link
            href="/search"
            className="text-zinc-400 transition hover:text-red-400"
          >
            <Search size={18} />
          </Link>

          {user ? (
            <>
              {navLink("/library", "Library")}
              {navLink("/profile", "Profile")}

              {isAdmin && navLink("/admin", "Admin")}

              <button
                onClick={logout}
                className="
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2
                  font-semibold
                  transition-all
                  hover:scale-105
                  hover:bg-red-700
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="
                  rounded-xl
                  border
                  border-zinc-700
                  px-5
                  py-2
                  transition
                  hover:border-red-500
                "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2
                  font-semibold
                  transition-all
                  hover:scale-105
                  hover:bg-red-700
                "
              >
                Begin The Journey
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}

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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              border-t
              border-red-900/20
              bg-black/95
              p-6
              backdrop-blur-xl
              md:hidden
            "
          >
            <div className="flex flex-col gap-4">

              {navLink("/chapters", "Chapters")}
              {navLink("/characters", "Characters")}
              {navLink("/search", "Search")}

              {user ? (
                <>
                  {navLink("/library", "Library")}
                  {navLink("/profile", "Profile")}

                  {isAdmin && navLink("/admin", "Admin")}

                  <button
                    onClick={logout}
                    className="
                      rounded-xl
                      bg-red-600
                      px-4
                      py-3
                      text-left
                    "
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="
                      rounded-xl
                      border
                      border-zinc-700
                      px-4
                      py-3
                    "
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="
                      rounded-xl
                      bg-red-600
                      px-4
                      py-3
                    "
                  >
                    Begin The Journey
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}