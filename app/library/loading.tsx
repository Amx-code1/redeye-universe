export default function Loading() {
  return (
    <div className="min-h-screen bg-black p-10">
      <div className="h-14 w-64 animate-pulse rounded bg-zinc-800" />

      <div className="mt-8 space-y-4">
        <div className="h-28 animate-pulse rounded-2xl bg-zinc-900" />
        <div className="h-28 animate-pulse rounded-2xl bg-zinc-900" />
      </div>
    </div>
  );
}