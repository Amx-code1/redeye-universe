"use client";

import { supabase } from "@/lib/supabase";

export default function AvatarUpload({
  userId,
  onUpload,
}: {
  userId: string;
  onUpload: (url: string) => void;
}) {
  async function uploadAvatar(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileName = `${userId}-${Date.now()}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        upsert: true,
      });

    if (error) {
      alert(error.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    onUpload(publicUrl);
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={uploadAvatar}
    />
  );
}