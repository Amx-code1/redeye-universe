import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-black p-10">
      <Skeleton className="mb-6 h-14 w-48" />

      <Skeleton className="mb-10 h-10 w-80" />

      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-11/12" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-10/12" />
      </div>
    </main>
  );
}