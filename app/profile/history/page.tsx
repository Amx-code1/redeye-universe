"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import {
  History,
  BookOpen,
  ArrowRight,
  Clock3,
  Trophy,
  Sparkles,
} from "lucide-react";

type ReadingHistoryItem = {
  id: string;
  progress: number;
  updated_at: string;
  chapter_id: string;
  chapters?: {
    title: string;
    slug: string;
    chapter_number: number;
  };
};

export default function ReadingHistoryPage() {
  const [history, setHistory] = useState<
    ReadingHistoryItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("reading_progress")
        .select(`
          *,
          chapters (
            title,
            slug,
            chapter_number
          )
        `)
        .eq("user_id", user.id)
        .order("updated_at", {
          ascending: false,
        });

      setHistory(
        (data as ReadingHistoryItem[]) ||
          [],
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const completed =
    history.filter(
      (item) => item.progress >= 90,
    ).length;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        {/* Hero */}

        <section className="relative overflow-hidden border-b border-red-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_75%)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-900/20 bg-zinc-900/80 px-4 py-2 text-red-400">
              <History size={16} />
              Reading Journey
            </div>

            <h1 className="mt-8 bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
              HISTORY
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-zinc-400">
              Track your progress through
              the Red-Eye Universe.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <StatCard
                title="Entries"
                value={history.length}
              />

              <StatCard
                title="Completed"
                value={completed}
              />

              <StatCard
                title="Completion Rate"
                value={
                  history.length
                    ? `${Math.round(
                        (completed /
                          history.length) *
                          100,
                      )}%`
                    : "0%"
                }
              />
            </div>
          </div>
        </section>

        {/* Loading */}

        {loading && (
          <section className="mx-auto max-w-7xl px-6 py-20">
            <div className="animate-pulse space-y-4">
              <div className="h-32 rounded-3xl bg-zinc-900" />
              <div className="h-32 rounded-3xl bg-zinc-900" />
              <div className="h-32 rounded-3xl bg-zinc-900" />
            </div>
          </section>
        )}

        {/* Empty */}

        {!loading &&
          history.length === 0 && (
            <section className="mx-auto max-w-4xl px-6 py-20">
              <div className="rounded-3xl border border-red-900/20 bg-zinc-900 p-12 text-center">
                <Sparkles
                  size={64}
                  className="mx-auto text-red-500"
                />

                <h2 className="mt-6 text-4xl font-black">
                  No Reading History
                </h2>

                <p className="mt-4 text-zinc-400">
                  Start reading chapters
                  and your journey will
                  appear here.
                </p>

                <Link
                  href="/chapters"
                  className="mt-8 inline-flex rounded-2xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
                >
                  Browse Chapters
                </Link>
              </div>
            </section>
          )}

        {/* History */}

        {!loading &&
          history.length > 0 && (
            <section className="mx-auto max-w-7xl px-6 py-16">
              <div className="space-y-6">
                {history.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-red-900/20 bg-zinc-900 p-8"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <div className="mb-3 inline-flex rounded-full bg-red-950/30 px-3 py-1 text-sm text-red-400">
                            Chapter{" "}
                            {item.chapters
                              ?.chapter_number ??
                              "?"}
                          </div>

                          <h2 className="text-3xl font-bold">
                            {item.chapters
                              ?.title ??
                              "Unknown Chapter"}
                          </h2>

                          <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
                            <div className="flex items-center gap-2">
                              <Clock3
                                size={16}
                              />

                              {new Date(
                                item.updated_at,
                              ).toLocaleDateString()}
                            </div>

                            <div className="flex items-center gap-2">
                              <Trophy
                                size={16}
                              />

                              {item.progress >=
                              90
                                ? "Completed"
                                : "In Progress"}
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/chapters/${item.chapters?.slug}`}
                          className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
                        >
                          Continue Reading

                          <ArrowRight
                            size={18}
                          />
                        </Link>
                      </div>

                      <div className="mt-6">
                        <div className="mb-2 flex justify-between text-sm text-zinc-400">
                          <span>
                            Progress
                          </span>

                          <span>
                            {
                              item.progress
                            }
                            %
                          </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                          <div
                            className="h-full bg-gradient-to-r from-red-500 to-red-700"
                            style={{
                              width: `${item.progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
          )}
      </main>
    </ProtectedRoute>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-red-900/20 bg-zinc-900 p-6">
      <div className="text-sm uppercase tracking-widest text-zinc-500">
        {title}
      </div>

      <div className="mt-2 text-3xl font-black text-red-500">
        {value}
      </div>
    </div>
  );
}





































































































































































// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { supabase } from "@/lib/supabase";
// import ProtectedRoute from "@/components/auth/ProtectedRoute";
// import Skeleton from "@/components/ui/Skeleton";

// import {
//   BookOpen,
//   Clock3,
//   ArrowRight,
//   History,
//   Trophy,
// } from "lucide-react";

// export default function ReadingHistoryPage() {
//   const [history, setHistory] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadHistory();
//   }, []);

//   async function loadHistory() {
//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (!user) {
//         setLoading(false);
//         return;
//       }

//       const { data } = await supabase
//         .from("reading_progress")
//         .select(`
//           *,
//           chapters (
//             id,
//             title,
//             slug,
//             chapter_number
//           )
//         `)
//         .eq("user_id", user.id)
//         .order("updated_at", {
//           ascending: false,
//         })
//         .limit(100);

//       setHistory(data || []);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return (
//       <main className="min-h-screen bg-black p-10">
//         <Skeleton className="mb-8 h-32 w-full" />
//         <Skeleton className="mb-4 h-28 w-full" />
//         <Skeleton className="mb-4 h-28 w-full" />
//         <Skeleton className="h-28 w-full" />
//       </main>
//     );
//   }

//   const completed = history.filter(
//     (item) => item.progress >= 90,
//   ).length;

//   return (
//     <ProtectedRoute>
//       <main className="min-h-screen bg-black text-white">
//         {/* Hero */}

//         <section className="relative overflow-hidden border-b border-red-900/20">
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#991b1b_0%,#000000_75%)]" />

//           <div className="relative mx-auto max-w-7xl px-6 py-20">
//             <div className="inline-flex items-center gap-2 rounded-full border border-red-900/20 bg-zinc-900/70 px-4 py-2 text-red-400">
//               <History size={16} />
//               Reading Activity
//             </div>

//             <h1 className="mt-8 bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
//               HISTORY
//             </h1>

//             <p className="mt-4 max-w-2xl text-zinc-400">
//               Track your journey through the
//               Red-Eye Universe.
//             </p>

//             <div className="mt-10 grid gap-4 md:grid-cols-3">
//               <StatCard
//                 title="Total Chapters"
//                 value={history.length}
//               />

//               <StatCard
//                 title="Completed"
//                 value={completed}
//               />

//               <StatCard
//                 title="Completion Rate"
//                 value={
//                   history.length
//                     ? `${Math.round(
//                         (completed /
//                           history.length) *
//                           100,
//                       )}%`
//                     : "0%"
//                 }
//               />
//             </div>
//           </div>
//         </section>

//         {/* Empty */}

//         {history.length === 0 ? (
//           <section className="mx-auto max-w-4xl px-6 py-20">
//             <div className="rounded-3xl border border-red-900/20 bg-zinc-900 p-12 text-center">
//               <BookOpen
//                 size={60}
//                 className="mx-auto text-red-500"
//               />

//               <h2 className="mt-6 text-3xl font-bold">
//                 No Reading History
//               </h2>

//               <p className="mt-4 text-zinc-400">
//                 Start reading chapters and
//                 your history will appear here.
//               </p>

//               <Link
//                 href="/chapters"
//                 className="mt-8 inline-flex rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
//               >
//                 Browse Chapters
//               </Link>
//             </div>
//           </section>
//         ) : (
//           <section className="mx-auto max-w-7xl px-6 py-16">
//             <div className="space-y-6">
//               {history.map((item) => (
//                 <div
//                   key={item.id}
//                   className="rounded-3xl border border-red-900/20 bg-zinc-900 p-8"
//                 >
//                   <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
//                     <div>
//                       <div className="mb-3 inline-flex rounded-full bg-red-950/30 px-3 py-1 text-sm text-red-400">
//                         Chapter{" "}
//                         {item.chapters
//                           ?.chapter_number ?? "?"}
//                       </div>

//                       <h2 className="text-2xl font-bold">
//                         {item.chapters?.title}
//                       </h2>

//                       <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
//                         <div className="flex items-center gap-2">
//                           <Clock3 size={16} />
//                           Last Read:{" "}
//                           {new Date(
//                             item.updated_at,
//                           ).toLocaleDateString()}
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <Trophy size={16} />
//                           {item.progress >= 90
//                             ? "Completed"
//                             : "In Progress"}
//                         </div>
//                       </div>
//                     </div>

//                     <Link
//                       href={`/chapters/${item.chapters?.slug}`}
//                       className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
//                     >
//                       Continue Reading
//                       <ArrowRight size={18} />
//                     </Link>
//                   </div>

//                   <div className="mt-6">
//                     <div className="mb-2 flex justify-between text-sm text-zinc-400">
//                       <span>Progress</span>

//                       <span>
//                         {item.progress}%
//                       </span>
//                     </div>

//                     <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
//                       <div
//                         className="h-full bg-gradient-to-r from-red-500 to-red-700"
//                         style={{
//                           width: `${item.progress}%`,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//       </main>
//     </ProtectedRoute>
//   );
// }

// function StatCard({
//   title,
//   value,
// }: {
//   title: string;
//   value: string | number;
// }) {
//   return (
//     <div className="rounded-2xl border border-red-900/20 bg-zinc-900 p-6">
//       <div className="text-sm uppercase tracking-widest text-zinc-500">
//         {title}
//       </div>

//       <div className="mt-2 text-3xl font-black text-red-500">
//         {value}
//       </div>
//     </div>
//   );
// }