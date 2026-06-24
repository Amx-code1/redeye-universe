"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { ArrowLeft, Upload } from "lucide-react";

type Character = {
  id: string;
  name: string;
  title: string;
  description: string;
  danger_level: string;
  faction: string;
  rank: string;
  status: string;
  age: number | null;
  power_level: string;
  quote: string;
  abilities: string;
  avatar_url: string;
  banner_url: string;
  slug: string;
};

export default function EditCharacterPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [avatarFile, setAvatarFile] =
    useState<File | null>(null);

  const [bannerFile, setBannerFile] =
    useState<File | null>(null);

  const [character, setCharacter] =
    useState<Character | null>(null);

  useEffect(() => {
    loadCharacter();
  }, []);

  async function loadCharacter() {
    try {
      const { data, error } = await supabase
        .from("characters")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) throw error;

      setCharacter(data);
    } catch (error: any) {
      console.error(error);
      toast.error("Character not found");
      router.push("/admin/characters");
    } finally {
      setLoading(false);
    }
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

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-");
  }

  async function saveCharacter() {
    if (!character) return;

    try {
      setSaving(true);

      let avatarUrl =
        character.avatar_url || "";

      let bannerUrl =
        character.banner_url || "";

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

      const { error } = await supabase
        .from("characters")
        .update({
          ...character,
          avatar_url: avatarUrl,
          banner_url: bannerUrl,
          slug: generateSlug(
            character.name
          ),
        })
        .eq("id", character.id);

      if (error) throw error;

      toast.success(
        "Character updated"
      );

      router.push(
        "/admin/characters"
      );
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        Loading...
      </main>
    );
  }

  if (!character) {
    return null;
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
          Edit Character
        </h1>

        <div className="rounded-3xl border border-red-900/20 bg-zinc-900 p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="Name"
              value={character.name || ""}
              onChange={(value) =>
                setCharacter({
                  ...character,
                  name: value,
                })
              }
            />

            <Input
              label="Title"
              value={
                character.title || ""
              }
              onChange={(value) =>
                setCharacter({
                  ...character,
                  title: value,
                })
              }
            />

            <Input
              label="Danger Level"
              value={
                character.danger_level ||
                ""
              }
              onChange={(value) =>
                setCharacter({
                  ...character,
                  danger_level:
                    value,
                })
              }
            />

            <Input
              label="Faction"
              value={
                character.faction ||
                ""
              }
              onChange={(value) =>
                setCharacter({
                  ...character,
                  faction: value,
                })
              }
            />

            <Input
              label="Rank"
              value={
                character.rank || ""
              }
              onChange={(value) =>
                setCharacter({
                  ...character,
                  rank: value,
                })
              }
            />

            <Input
              label="Status"
              value={
                character.status ||
                ""
              }
              onChange={(value) =>
                setCharacter({
                  ...character,
                  status: value,
                })
              }
            />

            <Input
              label="Age"
              value={
                character.age
                  ?.toString() || ""
              }
              onChange={(value) =>
                setCharacter({
                  ...character,
                  age:
                    Number(value) ||
                    null,
                })
              }
            />

            <Input
              label="Power Level"
              value={
                character.power_level ||
                ""
              }
              onChange={(value) =>
                setCharacter({
                  ...character,
                  power_level:
                    value,
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
              value={
                character.description ||
                ""
              }
              onChange={(e) =>
                setCharacter({
                  ...character,
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
              value={
                character.quote || ""
              }
              onChange={(e) =>
                setCharacter({
                  ...character,
                  quote:
                    e.target.value,
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
              value={
                character.abilities ||
                ""
              }
              onChange={(e) =>
                setCharacter({
                  ...character,
                  abilities:
                    e.target.value,
                })
              }
              className="w-full rounded-xl bg-black p-4 outline-none ring-1 ring-zinc-800 focus:ring-red-500"
            />
          </div>

          <div className="mt-8">
            <label className="mb-3 block">
              Replace Avatar
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-black p-4 ring-1 ring-zinc-800">
              <Upload size={18} />
              Upload Avatar

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setAvatarFile(
                    e.target
                      .files?.[0] ||
                      null
                  )
                }
              />
            </label>
          </div>

          <div className="mt-6">
            <label className="mb-3 block">
              Replace Banner
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-black p-4 ring-1 ring-zinc-800">
              <Upload size={18} />
              Upload Banner

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setBannerFile(
                    e.target
                      .files?.[0] ||
                      null
                  )
                }
              />
            </label>
          </div>

          <button
            onClick={saveCharacter}
            disabled={saving}
            className="mt-10 rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-700 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
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
  onChange: (
    value: string
  ) => void;
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