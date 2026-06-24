import { notFound } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  MessageSquare,
} from "lucide-react";

import { supabase } from "@/lib/supabase/client";

import ReplyForm from "@/components/community/ReplyForm";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: thread } = await supabase
    .from("community_threads")
    .select("*")
    .eq("id", id)
    .single();

  if (!thread) {
    notFound();
  }

  const { data: replies } = await supabase
    .from("community_replies")
    .select("*")
    .eq("thread_id", id)
    .order("created_at", {
      ascending: true,
    });

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <Link
          href="/community"
          className="
            mb-8
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-500/10
            bg-zinc-950/80
            px-4
            py-2
            text-zinc-300
            transition
            hover:border-red-500/40
          "
        >
          <ArrowLeft size={16} />
          Back To Community
        </Link>

        {/* THREAD */}

        <div
          className="
            rounded-[32px]
            border
            border-red-500/10
            bg-zinc-950/80
            p-8
            backdrop-blur-xl
          "
        >
          <div className="mb-4 inline-flex rounded-full bg-red-950/20 px-3 py-1 text-sm text-red-300">
            {thread.category}
          </div>

          <h1 className="text-4xl font-black md:text-5xl">
            {thread.title}
          </h1>

          <div className="mt-4 text-zinc-500">
            {new Date(
              thread.created_at
            ).toLocaleString()}
          </div>

          <div className="mt-8 whitespace-pre-wrap text-lg leading-8 text-zinc-200">
            {thread.content}
          </div>
        </div>

        {/* REPLIES */}

        <div className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <MessageSquare />
            <h2 className="text-3xl font-black">
              Replies
            </h2>
          </div>

          <div className="space-y-5">
            {replies?.map((reply) => (
              <div
                key={reply.id}
                className="
                  rounded-2xl
                  border
                  border-red-500/10
                  bg-zinc-950/80
                  p-5
                "
              >
                <div className="text-zinc-300">
                  {reply.content}
                </div>

                <div className="mt-3 text-xs text-zinc-500">
                  {new Date(
                    reply.created_at
                  ).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REPLY FORM */}

        <div className="mt-12">
          <ReplyForm
            threadId={thread.id}
          />
        </div>
      </div>
    </main>
  );
}