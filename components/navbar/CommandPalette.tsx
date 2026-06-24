"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const commands = [
  {
    label: "Chapters",
    href: "/chapters",
  },
  {
    label: "Characters",
    href: "/characters",
  },
  {
    label: "Community",
    href: "/community",
  },
  {
    label: "Library",
    href: "/library",
  },
  {
    label: "Profile",
    href: "/profile",
  },
];

export default function CommandPalette() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();

        setOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  const filtered = commands.filter(
    (item) =>
      item.label
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="
              fixed
              inset-0
              z-[2000]
              bg-black/70
              backdrop-blur-sm
            "
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -20,
            }}
            className="
              fixed
              left-1/2
              top-24
              z-[2001]
              w-full
              max-w-2xl
              -translate-x-1/2
              rounded-3xl
              border
              border-red-500/10
              bg-zinc-950
              shadow-[0_0_50px_rgba(239,68,68,0.15)]
            "
          >
            <div className="flex items-center gap-3 border-b border-zinc-800 p-5">
              <Search size={18} />

              <input
                autoFocus
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Search Red-Eye..."
                className="
                  flex-1
                  bg-transparent
                  outline-none
                "
              />
            </div>

            <div className="max-h-[400px] overflow-y-auto p-2">
              {filtered.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    rounded-xl
                    px-4
                    py-3
                    text-left
                    transition
                    hover:bg-red-500/10
                  "
                >
                  {item.label}
                </button>
              ))}

              {filtered.length === 0 && (
                <div className="p-4 text-zinc-500">
                  No results found.
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}