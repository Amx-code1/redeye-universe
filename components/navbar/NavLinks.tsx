"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Universe",
    href: "/",
  },
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
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center gap-2">
      {links.map((link) => {
        const active =
          pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className="relative"
          >
            {active && (
              <motion.div
                layoutId="nav-pill"
                className="
                  absolute
                  inset-0
                  rounded-xl
                  bg-red-600
                "
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            )}

            <span
              className={`
                relative
                z-10
                block
                px-5
                py-3
                text-sm
                font-medium

                ${
                  active
                    ? "text-white"
                    : "text-zinc-300"
                }
              `}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}