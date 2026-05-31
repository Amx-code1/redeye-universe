import { supabase } from "@/lib/supabase";

export default async function AdminCommentsPage() {
  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Comment Moderation
      </h1>

      <div className="space-y-4">
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="rounded-2xl bg-zinc-900 p-6"
          >
            <p className="font-bold text-red-400">
              {comment.username}
            </p>

            <p className="mt-2">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}