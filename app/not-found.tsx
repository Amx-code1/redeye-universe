import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-8xl font-bold text-red-500">
        404
      </h1>

      <p className="mt-4 text-xl text-zinc-400">
        The page you're looking for has vanished into the fog.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-red-600 px-6 py-3"
      >
        Return Home
      </Link>
    </main>
  );
}