interface Props {
  chaptersRead: number;
  comments: number;
}

export default function ReaderStats({
  chaptersRead,
  comments,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">

      <div className="rounded-2xl bg-zinc-900 p-6">
        <p className="text-zinc-400">
          Chapters Read
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {chaptersRead}
        </h2>
      </div>

      <div className="rounded-2xl bg-zinc-900 p-6">
        <p className="text-zinc-400">
          Comments
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {comments}
        </h2>
      </div>

    </div>
  );
}