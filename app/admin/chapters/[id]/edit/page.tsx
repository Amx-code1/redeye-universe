"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import AdminRoute from "@/components/auth/AdminRoute";
import toast from "react-hot-toast";

type Chapter = {
  id: string;
  chapter_number: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
};

export default function EditChapterPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [chapter, setChapter] =
    useState<Chapter | null>(null);

  useEffect(() => {
    loadChapter();
  }, []);

  async function loadChapter() {
    const { data, error } =
      await supabase
        .from("chapters")
        .select("*")
        .eq("id", params.id)
        .single();

    if (error) {
      toast.error(error.message);
      router.push(
        "/admin/chapters"
      );
      return;
    }

    setChapter(data);
    setLoading(false);
  }

  function generateSlug(
    text: string
  ) {
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

    setChapter((prev) =>
      prev
        ? {
            ...prev,
            cover_image:
              publicUrl,
          }
        : prev
    );

    toast.success(
      "Cover updated"
    );
  }

  async function saveChapter() {
    if (!chapter) return;

    setSaving(true);

    const { error } =
      await supabase
        .from("chapters")
        .update({
          chapter_number:
            chapter.chapter_number,
          title:
            chapter.title,
          slug:
            generateSlug(
              chapter.title
            ),
          content:
            chapter.content,
          cover_image:
            chapter.cover_image,
        })
        .eq("id", chapter.id);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Chapter updated"
    );

    router.push(
      "/admin/chapters"
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        Loading...
      </main>
    );
  }

  if (!chapter) {
    return null;
  }

  return (
    <AdminRoute>
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="mx-auto max-w-5xl">

          <h1 className="mb-8 text-5xl font-bold text-red-500">
            Edit Chapter
          </h1>

          <div className="space-y-6 rounded-3xl border border-red-900/20 bg-zinc-900 p-8">

            {/* Number */}

            <div>
              <label className="mb-2 block text-zinc-400">
                Chapter Number
              </label>

              <input
                type="number"
                value={
                  chapter.chapter_number
                }
                onChange={(e) =>
                  setChapter({
                    ...chapter,
                    chapter_number:
                      Number(
                        e.target
                          .value
                      ),
                  })
                }
                className="w-full rounded-xl bg-black p-4"
              />
            </div>

            {/* Title */}

            <div>
              <label className="mb-2 block text-zinc-400">
                Title
              </label>

              <input
                value={
                  chapter.title
                }
                onChange={(e) =>
                  setChapter({
                    ...chapter,
                    title:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl bg-black p-4"
              />
            </div>

            {/* Slug */}

            <div>
              <label className="mb-2 block text-zinc-400">
                Slug
              </label>

              <div className="rounded-xl bg-black p-4 text-red-400">
                {generateSlug(
                  chapter.title
                )}
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

              {chapter.cover_image && (
                <img
                  src={
                    chapter.cover_image
                  }
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
                value={
                  chapter.content
                }
                onChange={(e) =>
                  setChapter({
                    ...chapter,
                    content:
                      e.target
                        .value,
                  })
                }
                className="w-full rounded-xl bg-black p-4"
              />
            </div>

            {/* Save */}

            <button
              onClick={
                saveChapter
              }
              disabled={saving}
              className="rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>
        </div>
      </main>
    </AdminRoute>
  );
}