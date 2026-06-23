"use client";

type Props = {
  chaptersRead: number;
  commentsCount: number;
  progressCount: number;
  savedCount: number;
};

export default function ReaderStats({
  chaptersRead,
  commentsCount,
  progressCount,
  savedCount,
}: Props) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-bold">Reader Stats</h2>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl bg-black p-4 text-center">
          <p className="text-3xl font-bold text-red-500">{chaptersRead}</p>

          <p className="text-zinc-400">Chapters Read</p>
        </div>

        <div className="rounded-xl bg-black p-4 text-center">
          <p className="text-3xl font-bold text-red-500">{commentsCount}</p>

          <p className="text-zinc-400">Comments</p>
        </div>

        <div className="rounded-xl bg-black p-4 text-center">
          <p className="text-3xl font-bold text-red-500">{progressCount}</p>

          <p className="text-zinc-400">Active Reads</p>
        </div>
        <div className="rounded-xl bg-black p-4 text-center">
          <p className="text-3xl font-bold text-red-500">{savedCount}</p>

          <p className="text-zinc-400">Saved Chapters</p>
        </div>
      </div>
    </div>
  );
}
