"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function loadUser() {
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
    <nav
      className={`
        fixed
        top-0
        left-0
        right-0
        z-[999]
        transition-all
        duration-500
        ${
          scrolled
            ? "bg-black/70 backdrop-blur-2xl"
            : "bg-transparent"
        }
      `}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}

        <Link href="/" className="group flex items-center gap-4">
          <motion.div
            animate={{
              rotate: [45, 90, 45],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              h-10
              w-10
              rotate-45
              rounded-xl
              bg-gradient-to-br
              from-red-300
              via-red-500
              to-red-800
              shadow-[0_0_30px_rgba(239,68,68,0.8)]
            "
          />

          <div>
            <div
              className="
              font-title
              text-2xl
              font-black
              tracking-[0.35em]
              text-transparent
              bg-clip-text
              bg-gradient-to-b
              from-red-300
              via-red-500
              to-red-800
            "
            >
              RED-EYE
            </div>

            <div
              className="
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-zinc-500
            "
            >
              DARK FANTASY UNIVERSE
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV */}

        <div
          className="
          hidden
          md:flex
          items-center
          gap-8
          rounded-full
          border
          border-red-500/10
          bg-zinc-950/70
          px-8
          py-3
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(0,0,0,0.5)]
        "
        >
          <NavLink href="/" label="Universe" pathname={pathname} />

          <NavLink
            href="/chapters"
            label="Chapters"
            pathname={pathname}
          />

          <NavLink
            href="/characters"
            label="Characters"
            pathname={pathname}
          />

          <NavLink
            href="/community"
            label="Community"
            pathname={pathname}
          />
        </div>

        {/* RIGHT SIDE */}

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/search"
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-zinc-800
            transition
            hover:border-red-500/50
          "
          >
            <Search size={18} />
          </Link>

          {user ? (
            <>
              <Link
                href="/profile"
                className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-zinc-800
                px-3
                py-2
                transition
                hover:border-red-500/50
              "
              >
                <div
                  className="
                  h-8
                  w-8
                  rounded-full
                  bg-gradient-to-br
                  from-red-500
                  to-red-800
                "
                />

                <span className="text-sm">
                  Profile
                </span>
              </Link>

              <Link
                href="/library"
                className="
                rounded-xl
                bg-gradient-to-r
                from-red-600
                via-red-500
                to-red-700
                px-5
                py-2.5
                font-semibold
                transition
                hover:scale-105
                hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]
              "
              >
                Library
              </Link>

              <button
                onClick={logout}
                className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-zinc-800
                px-4
                py-2.5
                transition
                hover:border-red-500/50
              "
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="
                text-zinc-300
                transition
                hover:text-red-400
              "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                rounded-2xl
                bg-gradient-to-r
                from-red-600
                via-red-500
                to-red-700
                px-6
                py-3
                font-bold
                transition-all
                hover:scale-105
                hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]
              "
              >
                Begin The Journey
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            className="
            md:hidden
            border-t
            border-red-500/10
            bg-black/90
            backdrop-blur-3xl
          "
          >
            <div className="flex flex-col gap-5 p-6">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Universe
              </Link>

              <Link href="/chapters" onClick={() => setMenuOpen(false)}>
                Chapters
              </Link>

              <Link href="/characters" onClick={() => setMenuOpen(false)}>
                Characters
              </Link>

              <Link href="/community" onClick={() => setMenuOpen(false)}>
                Community
              </Link>

              <Link href="/search" onClick={() => setMenuOpen(false)}>
                Search
              </Link>

              {!user ? (
                <>
                  <Link href="/login">Login</Link>

                  <Link href="/register">
                    Begin The Journey
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profile">
                    Profile
                  </Link>

                  <Link href="/library">
                    Library
                  </Link>

                  <button
                    onClick={logout}
                    className="text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM GLOW LINE */}

      <div
        className="
        absolute
        inset-x-0
        bottom-0
        h-px
        bg-gradient-to-r
        from-transparent
        via-red-500/20
        to-transparent
      "
      />
    </nav>
  );
}

function NavLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className="
      group
      relative
      text-sm
      uppercase
      tracking-[0.2em]
    "
    >
      <span
        className={
          active
            ? "text-red-300 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]"
            : "text-zinc-300 group-hover:text-red-400"
        }
      >
        {label}
      </span>

      <span
        className={`
        absolute
        -bottom-2
        left-0
        h-[2px]
        bg-gradient-to-r
        from-red-500
        to-red-700
        transition-all
        duration-300
        ${
          active
            ? "w-full"
            : "w-0 group-hover:w-full"
        }
      `}
      />
    </Link>
  );
}