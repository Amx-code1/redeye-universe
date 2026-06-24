"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import AdminRoute from "@/components/auth/AdminRoute";
import toast from "react-hot-toast";

export default function NewChapterPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [chapterNumber, setChapterNumber] =
    useState("");

  const [title, setTitle] = useState("");

  const [content, setContent] =
    useState("");

  const [coverImage, setCoverImage] =
    useState("");

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  async function uploadCover(
    file: File
  ) {
    const ext =
      file.name.split(".").pop();

    const fileName =
      `${crypto.randomUUID()}.${ext}`;

    const { error } =
      await supabase.storage
        .from("chapter-covers")
        .upload(fileName, file);

    if (error) {
      toast.error(error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("chapter-covers")
      .getPublicUrl(fileName);

    setCoverImage(publicUrl);

    toast.success(
      "Cover uploaded"
    );
  }

  async function createChapter() {
    if (
      !chapterNumber ||
      !title ||
      !content
    ) {
      toast.error(
        "Fill all required fields"
      );
      return;
    }

    setSaving(true);

    const slug =
      generateSlug(title);

    const { error } =
      await supabase
        .from("chapters")
        .insert({
          chapter_number:
            Number(chapterNumber),
          title,
          slug,
          content,
          cover_image:
            coverImage || null,
        });

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Chapter created"
    );

    router.push(
      "/admin/chapters"
    );
  }

  return (
    <AdminRoute>
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="mx-auto max-w-5xl">

          <h1 className="mb-8 text-5xl font-bold text-red-500">
            New Chapter
          </h1>

          <div className="space-y-6 rounded-3xl border border-red-900/20 bg-zinc-900 p-8">

            {/* Chapter Number */}

            <div>
              <label className="mb-2 block text-zinc-400">
                Chapter Number
              </label>

              <input
                type="number"
                value={chapterNumber}
                onChange={(e) =>
                  setChapterNumber(
                    e.target.value
                  )
                }
                className="w-full rounded-xl bg-black p-4"
                placeholder="1"
              />
            </div>

            {/* Title */}

            <div>
              <label className="mb-2 block text-zinc-400">
                Title
              </label>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full rounded-xl bg-black p-4"
                placeholder="Chapter Title"
              />
            </div>

            {/* Slug Preview */}

            <div>
              <label className="mb-2 block text-zinc-400">
                Slug
              </label>

              <div className="rounded-xl bg-black p-4 text-red-400">
                {generateSlug(title) ||
                  "chapter-slug"}
              </div>
            </div>

            {/* Cover */}

            <div>
              <label className="mb-2 block text-zinc-400">
                Cover Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target
                      .files?.[0];

                  if (file) {
                    uploadCover(
                      file
                    );
                  }
                }}
                className="w-full rounded-xl bg-black p-4"
              />

              {coverImage && (
                <img
                  src={coverImage}
                  alt=""
                  className="mt-4 h-64 w-full rounded-2xl object-cover"
                />
              )}
            </div>

            {/* Content */}

            <div>
              <label className="mb-2 block text-zinc-400">
                Content
              </label>

              <textarea
                rows={20}
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                className="w-full rounded-xl bg-black p-4"
                placeholder="Write chapter..."
              />
            </div>

            {/* Save */}

            <button
              onClick={
                createChapter
              }
              disabled={saving}
              className="rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {saving
                ? "Creating..."
                : "Create Chapter"}
            </button>

          </div>
        </div>
      </main>
    </AdminRoute>
  );
}