"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";

export default function NewCharacterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [avatarFile, setAvatarFile] =
    useState<File | null>(null);

  const [bannerFile, setBannerFile] =
    useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    danger_level: "",
    faction: "",
    rank: "",
    status: "",
    age: "",
    power_level: "",
    quote: "",
    abilities: "",
  });

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  }

  async function uploadImage(
    file: File
  ): Promise<string> {
    const ext = file.name.split(".").pop();

    const fileName = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("character-images")
      .upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("character-images")
      .getPublicUrl(fileName);

    return publicUrl;
  }

  async function createCharacter() {
    try {
      setLoading(true);

      let avatarUrl = "";
      let bannerUrl = "";

      if (avatarFile) {
        avatarUrl = await uploadImage(
          avatarFile
        );
      }

      if (bannerFile) {
        bannerUrl = await uploadImage(
          bannerFile
        );
      }

      const slug = generateSlug(form.name);

      const { error } = await supabase
        .from("characters")
        .insert({
          ...form,
          age: form.age
            ? Number(form.age)
            : null,
          avatar_url: avatarUrl,
          banner_url: bannerUrl,
          slug,
        });

      if (error) throw error;

      toast.success(
        "Character created successfully"
      );

      router.push("/admin/characters");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/characters"
          className="mb-8 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <h1 className="mb-10 text-5xl font-bold text-red-500">
          Create Character
        </h1>

        <div className="rounded-3xl border border-red-900/20 bg-zinc-900 p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Name"
              value={form.name}
              onChange={(value) =>
                setForm({
                  ...form,
                  name: value,
                })
              }
            />

            <Input
              label="Title"
              value={form.title}
              onChange={(value) =>
                setForm({
                  ...form,
                  title: value,
                })
              }
            />

            <Input
              label="Danger Level"
              value={form.danger_level}
              onChange={(value) =>
                setForm({
                  ...form,
                  danger_level: value,
                })
              }
            />

            <Input
              label="Faction"
              value={form.faction}
              onChange={(value) =>
                setForm({
                  ...form,
                  faction: value,
                })
              }
            />

            <Input
              label="Rank"
              value={form.rank}
              onChange={(value) =>
                setForm({
                  ...form,
                  rank: value,
                })
              }
            />

            <Input
              label="Status"
              value={form.status}
              onChange={(value) =>
                setForm({
                  ...form,
                  status: value,
                })
              }
            />

            <Input
              label="Age"
              value={form.age}
              onChange={(value) =>
                setForm({
                  ...form,
                  age: value,
                })
              }
            />

            <Input
              label="Power Level"
              value={form.power_level}
              onChange={(value) =>
                setForm({
                  ...form,
                  power_level: value,
                })
              }
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block">
              Description
            </label>

            <textarea
              rows={6}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              className="w-full rounded-xl bg-black p-4 outline-none ring-1 ring-zinc-800 focus:ring-red-500"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block">
              Quote
            </label>

            <textarea
              rows={3}
              value={form.quote}
              onChange={(e) =>
                setForm({
                  ...form,
                  quote: e.target.value,
                })
              }
              className="w-full rounded-xl bg-black p-4 outline-none ring-1 ring-zinc-800 focus:ring-red-500"
            />
          </div>

          <div className="mt-6">
            <label className="mb-2 block">
              Abilities
            </label>

            <textarea
              rows={5}
              value={form.abilities}
              onChange={(e) =>
                setForm({
                  ...form,
                  abilities:
                    e.target.value,
                })
              }
              placeholder="Comma separated abilities"
              className="w-full rounded-xl bg-black p-4 outline-none ring-1 ring-zinc-800 focus:ring-red-500"
            />
          </div>

          {/* Avatar Upload */}

          <div className="mt-8">
            <label className="mb-3 block font-medium">
              Avatar Image
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-black p-4 ring-1 ring-zinc-800">
              <Upload size={18} />
              Upload Avatar

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  setAvatarFile(
                    e.target.files?.[0] ||
                      null
                  )
                }
              />
            </label>
          </div>

          {/* Banner Upload */}

          <div className="mt-6">
            <label className="mb-3 block font-medium">
              Banner Image
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-black p-4 ring-1 ring-zinc-800">
              <Upload size={18} />
              Upload Banner

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  setBannerFile(
                    e.target.files?.[0] ||
                      null
                  )
                }
              />
            </label>
          </div>

          <button
            onClick={createCharacter}
            disabled={loading}
            className="mt-10 rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-700 disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Character"}
          </button>
        </div>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl bg-black p-4 outline-none ring-1 ring-zinc-800 focus:ring-red-500"
      />
    </div>
  );
}