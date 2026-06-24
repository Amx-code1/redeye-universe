"use client";

import Link from "next/link";
import Image from "next/image";
import { LogOut, Settings, BookOpen, User } from "lucide-react";

type Profile = {
  username: string | null;
  avatar_url: string | null;
  role: string | null;
};

interface Props {
  profile: Profile | null;
  logout: () => Promise<void>;
}

export default function ProfileDropdown({
  profile,
  logout,
}: Props) {
  return (
    <div className="group relative">
      <button
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-zinc-800
          bg-zinc-950/70
          px-3
          py-2
          transition
          hover:border-red-500/40
        "
      >
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt="avatar"
            width={38}
            height={38}
            className="rounded-full object-cover"
          />
        ) : (
          <div
            className="
              h-10
              w-10
              rounded-full
              bg-gradient-to-br
              from-red-500
              to-red-800
            "
          />
        )}

        <div className="text-left">
          <p className="text-sm font-semibold">
            {profile?.username || "Reader"}
          </p>

          <p className="text-xs text-zinc-400">
            {profile?.role || "Member"}
          </p>
        </div>
      </button>

      {/* Dropdown */}

      <div
        className="
          invisible
          absolute
          right-0
          top-full
          mt-3
          w-64
          rounded-2xl
          border
          border-red-500/10
          bg-zinc-950/95
          p-2
          opacity-0
          backdrop-blur-xl
          transition-all
          group-hover:visible
          group-hover:opacity-100
        "
      >
        <Link
          href="/profile"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            hover:bg-red-500/10
          "
        >
          <User size={18} />
          Profile
        </Link>

        <Link
          href="/library"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            hover:bg-red-500/10
          "
        >
          <BookOpen size={18} />
          Library
        </Link>

        <Link
          href="/settings"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            hover:bg-red-500/10
          "
        >
          <Settings size={18} />
          Settings
        </Link>

        {profile?.role === "admin" && (
          <Link
            href="/admin"
            className="
              flex
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-red-400
              hover:bg-red-500/10
            "
          >
            Admin Panel
          </Link>
        )}

        <button
          onClick={logout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-left
            text-red-400
            hover:bg-red-500/10
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}