import Link from "next/link";
import { MessageSquare } from "lucide-react";

interface Props {
  thread: {
    id: string;
    title: string;
    category: string;
    created_at: string;
  };
}

export default function ThreadCard({
  thread,
}: Props) {
  return (
    <Link
      href={`/community/${thread.id}`}
      className="
      block
      rounded-3xl
      border
      border-red-500/10
      bg-zinc-950/80
      p-6
      backdrop-blur-xl
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-red-500/40
      hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]
    "
    >
      <div className="mb-4 inline-flex rounded-full bg-red-950/30 px-3 py-1 text-xs text-red-300">
        {thread.category}
      </div>

      <h3 className="text-xl font-bold text-white">
        {thread.title}
      </h3>

      <div className="mt-4 flex items-center gap-2 text-zinc-400">
        <MessageSquare size={16} />
        Discussion
      </div>
    </Link>
  );
}