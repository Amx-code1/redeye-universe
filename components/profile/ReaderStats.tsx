export default function ReaderStats({
  chaptersRead,
  comments,
}: {
  chaptersRead: number;
  comments: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">

      <div className="rounded-xl bg-zinc-900 p-6">
        <h3 className="text-4xl font-bold">
          {chaptersRead}
        </h3>

        <p>Chapters Read</p>
      </div>

      <div className="rounded-xl bg-zinc-900 p-6">
        <h3 className="text-4xl font-bold">
          {comments}
        </h3>

        <p>Comments Posted</p>
      </div>

    </div>
  );
}