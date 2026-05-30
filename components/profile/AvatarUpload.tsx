"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  userId: string;
  onUploaded: (url: string) => void;
}

export default function AvatarUpload({
  userId,
  onUploaded,
}: Props) {
  const [uploading, setUploading] =
    useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      if (
        ![
          "image/png",
          "image/jpeg",
          "image/webp",
        ].includes(file.type)
      ) {
        alert(
          "Only PNG, JPG and WEBP allowed"
        );
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Max size 5MB");
        return;
      }

      setUploading(true);

      const fileName =
        `${userId}-${Date.now()}`;

      const { error } =
        await supabase.storage
          .from("avatars")
          .upload(fileName, file, {
            upsert: true,
          });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      onUploaded(publicUrl);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      {uploading && (
        <p className="mt-2 text-sm text-zinc-400">
          Uploading...
        </p>
      )}
    </div>
  );
}