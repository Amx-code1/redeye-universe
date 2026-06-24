"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import AdminRoute from "@/components/auth/AdminRoute";
import toast from "react-hot-toast";

type Character = {
  id: string;
  name: string;
  title: string;
  description: string;
  image_url: string | null;
  danger_level: string;
  faction: string;
  avatar_url: string | null;
  rank: string;
  status: string;
  age: number | null;
  power_level: string;
  quote: string;
  abilities: string;
  slug: string;
  banner_url: string | null;
};

export default function EditCharacterPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [character, setCharacter] =
    useState<Character | null>(null);

  useEffect(() => {
    loadCharacter();
  }, []);

  async function loadCharacter() {
    const { data, error } = await supabase
      .from("characters")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      toast.error(error.message);
      router.push("/admin/characters");
      return;
    }

    setCharacter(data);
    setLoading(false);
  }

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  async function uploadImage(
    file: File,
    type: "avatar" | "banner"
  ) {
    const ext = file.name.split(".").pop();

    const fileName =
      `${crypto.randomUUID()}.${ext}`;

    const { error } =
      await supabase.storage
        .from("character-images")
        .upload(fileName, file);

    if (error) {
      toast.error(error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("character-images")
      .getPublicUrl(fileName);

    setCharacter((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        avatar_url:
          type === "avatar"
            ? publicUrl
            : prev.avatar_url,
        banner_url:
          type === "banner"
            ? publicUrl
            : prev.banner_url,
      };
    });

    toast.success(
      `${type} uploaded`
    );
  }

  async function saveCharacter() {
    if (!character) return;

    setSaving(true);

    const { error } = await supabase
      .from("characters")
      .update({
        name: character.name,
        title: character.title,
        description:
          character.description,
        image_url:
          character.image_url,
        danger_level:
          character.danger_level,
        faction:
          character.faction,
        avatar_url:
          character.avatar_url,
        rank: character.rank,
        status:
          character.status,
        age: character.age,
        power_level:
          character.power_level,
        quote:
          character.quote,
        abilities:
          character.abilities,
        slug: generateSlug(
          character.name
        ),
        banner_url:
          character.banner_url,
      })
      .eq("id", character.id);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Character updated"
    );

    router.push(
      "/admin/characters"
    );
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
    <AdminRoute>
      <main className="min-h-screen bg-black p-8 text-white">
        <div className="mx-auto max-w-6xl">

          <h1 className="mb-8 text-5xl font-bold text-red-500">
            Edit Character
          </h1>

          <div className="space-y-6 rounded-3xl border border-red-900/20 bg-zinc-900 p-8">

            <input
              value={character.name}
              onChange={(e) =>
                setCharacter({
                  ...character,
                  name:
                    e.target.value,
                })
              }
              placeholder="Name"
              className="w-full rounded-xl bg-black p-4"
            />

            <input
              value={character.title}
              onChange={(e) =>
                setCharacter({
                  ...character,
                  title:
                    e.target.value,
                })
              }
              placeholder="Title"
              className="w-full rounded-xl bg-black p-4"
            />

            <textarea
              rows={5}
              value={
                character.description
              }
              onChange={(e) =>
                setCharacter({
                  ...character,
                  description:
                    e.target.value,
                })
              }
              placeholder="Description"
              className="w-full rounded-xl bg-black p-4"
            />

            <div className="grid gap-4 md:grid-cols-2">

              <input
                value={
                  character.faction
                }
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    faction:
                      e.target
                        .value,
                  })
                }
                placeholder="Faction"
                className="rounded-xl bg-black p-4"
              />

              <input
                value={
                  character.rank
                }
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    rank:
                      e.target
                        .value,
                  })
                }
                placeholder="Rank"
                className="rounded-xl bg-black p-4"
              />

              <input
                value={
                  character.status
                }
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    status:
                      e.target
                        .value,
                  })
                }
                placeholder="Status"
                className="rounded-xl bg-black p-4"
              />

              <input
                value={
                  character.danger_level
                }
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    danger_level:
                      e.target
                        .value,
                  })
                }
                placeholder="Danger Level"
                className="rounded-xl bg-black p-4"
              />

              <input
                value={
                  character.power_level
                }
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    power_level:
                      e.target
                        .value,
                  })
                }
                placeholder="Power Level"
                className="rounded-xl bg-black p-4"
              />

              <input
                type="number"
                value={
                  character.age ?? ""
                }
                onChange={(e) =>
                  setCharacter({
                    ...character,
                    age:
                      Number(
                        e.target
                          .value
                      ) || null,
                  })
                }
                placeholder="Age"
                className="rounded-xl bg-black p-4"
              />

            </div>

            <input
              value={character.quote}
              onChange={(e) =>
                setCharacter({
                  ...character,
                  quote:
                    e.target.value,
                })
              }
              placeholder="Quote"
              className="w-full rounded-xl bg-black p-4"
            />

            <textarea
              rows={5}
              value={
                character.abilities
              }
              onChange={(e) =>
                setCharacter({
                  ...character,
                  abilities:
                    e.target.value,
                })
              }
              placeholder="Abilities"
              className="w-full rounded-xl bg-black p-4"
            />

            <div>
              <p className="mb-2 text-zinc-400">
                Slug
              </p>

              <div className="rounded-xl bg-black p-4 text-red-400">
                {generateSlug(
                  character.name
                )}
              </div>
            </div>

            {/* Avatar */}

            <div>
              <label className="mb-2 block text-zinc-400">
                Avatar
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target
                      .files?.[0];

                  if (file) {
                    uploadImage(
                      file,
                      "avatar"
                    );
                  }
                }}
                className="w-full rounded-xl bg-black p-4"
              />

              {character.avatar_url && (
                <img
                  src={
                    character.avatar_url
                  }
                  alt=""
                  className="mt-4 h-40 w-40 rounded-full object-cover"
                />
              )}
            </div>

            {/* Banner */}

            <div>
              <label className="mb-2 block text-zinc-400">
                Banner
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target
                      .files?.[0];

                  if (file) {
                    uploadImage(
                      file,
                      "banner"
                    );
                  }
                }}
                className="w-full rounded-xl bg-black p-4"
              />

              {character.banner_url && (
                <img
                  src={
                    character.banner_url
                  }
                  alt=""
                  className="mt-4 h-64 w-full rounded-2xl object-cover"
                />
              )}
            </div>

            <button
              onClick={
                saveCharacter
              }
              disabled={saving}
              className="rounded-xl bg-red-600 px-8 py-4 font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Character"}
            </button>

          </div>
        </div>
      </main>
    </AdminRoute>
  );
}