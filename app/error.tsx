"use client";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-5xl font-black text-red-500">
          Something Went Wrong
        </h1>

        <p className="mt-4 text-zinc-300">
          An unexpected error occurred.
        </p>

        <button
          onClick={() => reset()}
          className="mt-8 rounded-xl bg-red-600 px-6 py-3 hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}