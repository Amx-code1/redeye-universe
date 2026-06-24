"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ProfileDropdown from "@/components/navbar/ProfileDropdown";
import NavLinks from "@/components/navbar/NavLinks";
import SearchBar from "@/components/navbar/SearchBar";
import NotificationBell from "@/components/navbar/NotificationBell";
import MobileMenu from "@/components/navbar/MobileMenu";

export default function Navbar() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  type Profile = {
    username: string | null;
    avatar_url: string | null;
    role: string | null;
  };

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url, role")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setProfile(data);
    }

    loadProfile();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function logout() {
    try {
      await supabase.auth.signOut();

      setProfile(null);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  if (loading) {
    return null;
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
        ? "bg-black/80 backdrop-blur-2xl border-b border-red-500/10"
        : "bg-black/20 backdrop-blur-sm"
    }
  `}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6">
        {/* LOGO */}

        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            animate={{
              rotate: [45, 90, 45],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              h-8
              w-8
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
              text-lg md:text-xl
              font-black
              tracking-[0.2em]
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
hidden
sm:block
text-[10px]
uppercase
tracking-[0.2em]
text-zinc-300
"
            >
              DARK FANTASY UNIVERSE
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV */}

        <NavLinks />

        {/* RIGHT SIDE */}

        <div className="hidden items-center gap-3 lg:flex">
          <SearchBar />

          <NotificationBell />

          {user ? (
            <ProfileDropdown profile={profile} logout={logout} />
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
          rounded-xl
          bg-gradient-to-r
          from-red-600
          via-red-500
          to-red-700
          px-5
          py-3
          font-semibold
          transition-all
          hover:scale-105
        "
              >
                Begin Journey
              </Link>
            </>
          )}
        </div>
        {/* MOBILE BUTTON */}

        <button
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        profile={profile}
        logout={logout}
      />

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
