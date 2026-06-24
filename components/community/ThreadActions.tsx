"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import toast from "react-hot-toast";

export default function ThreadActions({
  threadId,
  ownerId,
  currentUserId,
  isAdmin,
}: {
  threadId: string;
  ownerId: string;
  currentUserId?: string;
  isAdmin?: boolean;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const canManage =
    currentUserId === ownerId || isAdmin;

  if (!canManage) return null;

  async function deleteThread() {
    const confirmed = window.confirm(
      "Delete this thread permanently?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const { error } = await supabase
        .from("community_threads")
        .delete()
        .eq("id", threadId);

      if (error) throw error;

      toast.success("Thread deleted");

      router.push("/community");
      router.refresh();
    } catch (err) {
      console.error(err);

      toast.error("Failed to delete thread");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 flex gap-3">
      <button
        onClick={() =>
          router.push(
            `/community/${threadId}/edit`
          )
        }
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-red-500/20
          px-4
          py-2
          hover:border-red-500
        "
      >
        <Pencil size={16} />
        Edit
      </button>

      <button
        disabled={loading}
        onClick={deleteThread}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-red-600
          px-4
          py-2
          hover:bg-red-700
        "
      >
        <Trash2 size={16} />
        Delete
      </button>
    </div>
  );
}