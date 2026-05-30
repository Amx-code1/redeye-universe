import Link from "next/link";

type Props = {
  chapterTitle: string;
  chapterSlug: string;
  progress: number;
};

export default function ContinueReading({
  chapterTitle,
  chapterSlug,
  progress,
}: Props) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-6">

      <h2 className="mb-4 text-2xl font-bold">
        Continue Reading
      </h2>

      <h3 className="text-xl text-white">
        {chapterTitle}
      </h3>

      <p className="mt-2 text-zinc-400">
        {progress}% completed
      </p>

      <div className="mt-4 h-3 rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-red-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <Link
        href={`/chapters/${chapterSlug}`}
        className="mt-6 inline-block rounded-xl bg-red-600 px-5 py-3"
      >
        Continue →
      </Link>
    </div>
  );
}