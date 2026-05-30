"use client";

import { useRef } from "react";

export default function AvatarUpload({
  avatarUrl,
  onChange,
}: {
  avatarUrl: string;
  onChange: (file: File) => void;
}) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  return (
    <div className="mb-8">

      <p className="mb-3 text-zinc-400">
        Profile Picture
      </p>

      <div className="flex items-center gap-6">

        <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-red-500">

          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-zinc-800 text-3xl">
              👤
            </div>
          )}

        </div>

        <button
          type="button"
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="rounded-xl bg-red-600 px-5 py-3 hover:bg-red-700"
        >
          Upload Avatar
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (file) {
              onChange(file);
            }
          }}
        />

      </div>
    </div>
  );
}