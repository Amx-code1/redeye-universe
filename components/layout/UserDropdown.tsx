"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface UserDropdownProps {
  avatarUrl?: string;
  username?: string;
  isAdmin?: boolean;
  onLogout: () => void;
}

export default function UserDropdown({
  avatarUrl,
  username,
  isAdmin,
  onLogout,
}: UserDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-zinc-800
          bg-black/40
          px-3
          py-2
          transition
          hover:border-red-500/40
        "
      >
        <Image
          src={avatarUrl || "/default-avatar.png"}
          alt="Avatar"
          width={40}
          height={40}
          className="
            h-10
            w-10
            rounded-full
            border
            border-red-500
            object-cover
          "
        />

        <span className="text-sm text-zinc-200">
          {username || "User"}
        </span>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-56
            overflow-hidden
            rounded-2xl
            border
            border-red-900/20
            bg-zinc-950
            shadow-[0_0_40px_rgba(239,68,68,0.15)]
          "
        >
          <Link
            href="/profile"
            className="block px-5 py-3 hover:bg-zinc-900"
          >
            Profile
          </Link>

          <Link
            href="/library"
            className="block px-5 py-3 hover:bg-zinc-900"
          >
            Library
          </Link>

          <Link
            href="/settings"
            className="block px-5 py-3 hover:bg-zinc-900"
          >
            Settings
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="block px-5 py-3 hover:bg-zinc-900"
            >
              Admin Panel
            </Link>
          )}

          <button
            onClick={onLogout}
            className="
              w-full
              px-5
              py-3
              text-left
              text-red-400
              hover:bg-zinc-900
            "
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}