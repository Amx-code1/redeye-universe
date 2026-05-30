import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-10 text-5xl font-bold text-red-500">
        Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2">

        <Link
          href="/admin/characters"
          className="rounded-2xl bg-zinc-900 p-8 hover:border-red-500 border border-red-900/30"
        >
          <h2 className="text-2xl font-bold">
            Manage Characters
          </h2>
          <p className="mt-2 text-zinc-400">
            Add / Edit Characters
          </p>
        </Link>

        <Link
          href="/admin/chapters"
          className="rounded-2xl bg-zinc-900 p-8 hover:border-red-500 border border-red-900/30"
        >
          <h2 className="text-2xl font-bold">
            Manage Chapters
          </h2>
          <p className="mt-2 text-zinc-400">
            Add / Edit Chapters
          </p>
        </Link>

        <Link
          href="/admin/comments"
          className="rounded-2xl bg-zinc-900 p-8 hover:border-red-500 border border-red-900/30"
        >
          <h2 className="text-2xl font-bold">
            Comments
          </h2>
          <p className="mt-2 text-zinc-400">
            Moderate Readers
          </p>
        </Link>

      </div>
    </main>
  );
}