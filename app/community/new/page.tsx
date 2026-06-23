"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import { supabase } from "@/lib/supabase";

const categories = [
  "General",
  "Lore",
  "Characters",
  "Chapters",
  "Theories",
  "Fan Art",
];

export default function NewThreadPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("Please login first.");
        router.push("/login");
        return;
      }

      if (title.trim().length < 5) {
        toast.error(
          "Title must be at least 5 characters."
        );
        return;
      }

      if (content.trim().length < 20) {
        toast.error(
          "Content must be at least 20 characters."
        );
        return;
      }

      const { error } = await supabase
        .from("community_threads")
        .insert({
          user_id: user.id,
          title: title.trim(),
          category,
          content: content.trim(),
        });

      if (error) throw error;

      toast.success("Thread created successfully!");

      router.push("/community");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to create thread. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_75%)] opacity-20" />

      <div className="relative mx-auto max-w-4xl px-6 py-24">
        {/* Back Button */}

        <Link
          href="/community"
          className="
            mb-8
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-500/10
            bg-zinc-950/80
            px-4
            py-2
            text-zinc-300
            transition
            hover:border-red-500/40
            hover:text-red-400
          "
        >
          <ArrowLeft size={16} />
          Back To Community
        </Link>

        {/* Header */}

        <div className="mb-10">
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-red-500/10
              bg-red-950/20
              px-4
              py-2
              text-red-300
            "
          >
            <MessageSquarePlus size={16} />
            New Discussion
          </div>

          <h1 className="text-5xl font-black text-white md:text-6xl">
            Create Thread
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-300">
            Share theories, discuss chapters,
            debate characters, and explore the
            mysteries of the Red-Eye Universe.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="
            rounded-[32px]
            border
            border-red-500/10
            bg-zinc-950/80
            p-8
            backdrop-blur-xl
          "
        >
          {/* Title */}

          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Thread Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Example: Is Viktor Still Alive?"
              className="
                w-full
                rounded-2xl
                border
                border-red-500/10
                bg-black/50
                px-5
                py-4
                text-white
                outline-none
                transition
                placeholder:text-zinc-500
                focus:border-red-500
              "
              required
            />
          </div>

          {/* Category */}

          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                border-red-500/10
                bg-black/50
                px-5
                py-4
                text-white
                outline-none
                focus:border-red-500
              "
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}

          <div className="mb-8">
            <label className="mb-3 block text-sm font-medium text-zinc-300">
              Discussion Content
            </label>

            <textarea
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              rows={12}
              placeholder="Share your thoughts..."
              className="
                w-full
                rounded-2xl
                border
                border-red-500/10
                bg-black/50
                px-5
                py-4
                text-white
                outline-none
                transition
                placeholder:text-zinc-500
                focus:border-red-500
              "
              required
            />
          </div>

          {/* Actions */}

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="
                rounded-2xl
                bg-red-600
                px-8
                py-4
                font-semibold
                transition
                hover:bg-red-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "Creating Thread..."
                : "Create Thread"}
            </button>

            <Link
              href="/community"
              className="
                rounded-2xl
                border
                border-red-500/10
                px-8
                py-4
                text-center
                font-semibold
                transition
                hover:border-red-500/40
              "
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}