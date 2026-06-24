"use client";

import { Bell } from "lucide-react";

export default function NotificationBell() {
  return (
    <button
      className="
        relative
        hidden
        lg:flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-zinc-800
        bg-zinc-950/70
        transition
        hover:border-red-500/40
      "
    >
      <Bell size={18} />

      <span
        className="
          absolute
          right-2
          top-2
          h-2
          w-2
          rounded-full
          bg-red-500
        "
      />
    </button>
  );
}