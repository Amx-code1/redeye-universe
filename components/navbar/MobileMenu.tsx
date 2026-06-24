"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Profile = {
  username: string | null;
  avatar_url: string | null;
  role: string | null;
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  user: any;
  profile: Profile | null;
  logout: () => Promise<void>;
}

export default function MobileMenu({
  open,
  onClose,
  user,
  profile,
  logout,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 250,
            }}
            className="
              fixed
              right-0
              top-0
              z-[999]
              h-screen
              w-[320px]
              border-l
              border-red-500/10
              bg-black
              p-6
              overflow-y-auto
            "
          >
            {/* Logo */}

            <div className="mb-10">
              <h2
                className="
                  text-2xl
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
              </h2>

              <p className="mt-2 text-xs text-zinc-400">
                DARK FANTASY UNIVERSE
              </p>
            </div>

            {/* Profile */}

            {user && (
              <div
                className="
                  mb-8
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-zinc-950/70
                  p-4
                "
              >
                <div className="flex items-center gap-3">
                  {profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt="avatar"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div
                      className="
                        h-12
                        w-12
                        rounded-full
                        bg-gradient-to-br
                        from-red-500
                        to-red-800
                      "
                    />
                  )}

                  <div>
                    <p className="font-semibold">
                      {profile?.username || "Reader"}
                    </p>

                    <p className="text-sm text-zinc-400">
                      {profile?.role || "Member"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}

            <div className="space-y-2">
              <MobileLink href="/" onClose={onClose}>
                Universe
              </MobileLink>

              <MobileLink
                href="/chapters"
                onClose={onClose}
              >
                Chapters
              </MobileLink>

              <MobileLink
                href="/characters"
                onClose={onClose}
              >
                Characters
              </MobileLink>

              <MobileLink
                href="/community"
                onClose={onClose}
              >
                Community
              </MobileLink>

              <MobileLink
                href="/search"
                onClose={onClose}
              >
                Search
              </MobileLink>
            </div>

            {/* User Section */}

            {user ? (
              <>
                <div className="my-8 border-t border-zinc-800" />

                <div className="space-y-2">
                  <MobileLink
                    href="/profile"
                    onClose={onClose}
                  >
                    Profile
                  </MobileLink>

                  <MobileLink
                    href="/library"
                    onClose={onClose}
                  >
                    Library
                  </MobileLink>

                  <MobileLink
                    href="/profile/history"
                    onClose={onClose}
                  >
                    History
                  </MobileLink>

                  <MobileLink
                    href="/settings"
                    onClose={onClose}
                  >
                    Settings
                  </MobileLink>

                  {profile?.role === "admin" && (
                    <MobileLink
                      href="/admin"
                      onClose={onClose}
                    >
                      Admin Panel
                    </MobileLink>
                  )}

                  <button
                    onClick={async () => {
                      await logout();
                      onClose();
                    }}
                    className="
                      w-full
                      rounded-xl
                      bg-red-600
                      px-4
                      py-3
                      text-left
                      font-medium
                      transition
                      hover:bg-red-700
                    "
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="my-8 border-t border-zinc-800" />

                <div className="space-y-2">
                  <MobileLink
                    href="/login"
                    onClose={onClose}
                  >
                    Login
                  </MobileLink>

                  <MobileLink
                    href="/register"
                    onClose={onClose}
                  >
                    Begin Journey
                  </MobileLink>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileLink({
  href,
  children,
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="
        block
        rounded-xl
        border
        border-transparent
        px-4
        py-3
        text-zinc-300
        transition
        hover:border-red-500/20
        hover:bg-red-500/10
        hover:text-white
      "
    >
      {children}
    </Link>
  );
}