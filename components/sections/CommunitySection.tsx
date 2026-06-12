"use client";

import { motion } from "framer-motion";
import {
  FaDiscord,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import {
  MessageSquare,
  ShoppingBag,
  BookOpen,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function CommunitySection() {
  return (
    <section className="relative overflow-hidden py-36">

      {/* Background */}

      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,transparent_70%)] opacity-20" />

      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-red-900/20 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-20 text-center">

          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-red-500/20
            bg-red-950/20
            px-4
            py-2
            text-sm
            tracking-widest
            text-red-400
          "
          >
            <Sparkles size={14} />
            JOIN THE COMMUNITY
          </div>

          <h2
            className="
            mt-6
            text-5xl
            font-black
            text-white
            md:text-7xl
          "
          >
            Become Part Of The Story
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-zinc-400">
            Follow development updates, discuss theories, collect merchandise,
            read future releases and help shape the future of the Red-Eye Universe.
          </p>

        </div>

        {/* Community Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          <CommunityCard
            icon={<MessageSquare size={28} />}
            title="Discord Community"
            description="Join readers, discuss chapters, theories and future lore."
            href="#"
          />

          <CommunityCard
            icon={<FaInstagram size={28} />}
            title="Instagram"
            description="Behind-the-scenes content, art reveals and updates."
            href="#"
          />

          <CommunityCard
            icon={<FaYoutube size={28} />}
            title="YouTube"
            description="Lore breakdowns, trailers and universe showcases."
            href="#"
          />

          <CommunityCard
            icon={<ShoppingBag size={28} />}
            title="Official Merch"
            description="Posters, hoodies, crystal collections and future releases."
            href="/merch"
          />

          <CommunityCard
            icon={<BookOpen size={28} />}
            title="E-Books"
            description="Read premium editions and downloadable releases."
            href="/ebooks"
          />

          <CommunityCard
            icon={<Users size={28} />}
            title="Community Hub"
            description="Explore fan creations, comments and world discussions."
            href="/community"
          />

        </div>

        {/* Newsletter */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
          mt-24
          rounded-[40px]
          border
          border-red-900/20
          bg-zinc-950
          p-10
          text-center
        "
        >

          <h3 className="text-4xl font-black text-white">
            Never Miss A Chapter
          </h3>

          <p className="mt-4 text-zinc-400">
            Receive notifications for new chapters, character reveals,
            lore updates and future releases.
          </p>

          <div
            className="
            mx-auto
            mt-8
            flex
            max-w-xl
            flex-col
            gap-4
            md:flex-row
          "
          >

            <input
              type="email"
              placeholder="Enter your email"
              className="
              flex-1
              rounded-2xl
              border
              border-zinc-800
              bg-black
              px-6
              py-4
              outline-none
              focus:border-red-500
            "
            />

            <button
              className="
              rounded-2xl
              bg-red-600
              px-8
              py-4
              font-semibold
              transition
              hover:bg-red-700
            "
            >
              Subscribe
            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

function CommunityCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a href={href}>
      <div
        className="
        group
        rounded-[30px]
        border
        border-red-900/20
        bg-zinc-950
        p-8
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-red-500/40
        hover:shadow-[0_0_60px_rgba(239,68,68,0.15)]
      "
      >

        <div
          className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-black
          border
          border-red-900/20
          text-red-400
        "
        >
          {icon}
        </div>

        <h3 className="mt-6 text-2xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-3 text-zinc-400">
          {description}
        </p>

        <div
          className="
          mt-6
          flex
          items-center
          gap-2
          text-red-400
          transition
          group-hover:translate-x-1
        "
        >
          Explore
          <ArrowRight size={16} />
        </div>

      </div>
    </a>
  );
}