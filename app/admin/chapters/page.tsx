// import Link from "next/link";
// import { supabase } from "@/lib/supabase";

// export default async function AdminChapters() {
//   const { data: chapters } = await supabase
//     .from("chapters")
//     .select("*")
//     .order("chapter_number");

//   return (
//     <main className="min-h-screen bg-black p-10 text-white">
//       <div className="mb-10 flex items-center justify-between">
//         <h1 className="text-5xl font-bold text-red-500">
//           Chapters
//         </h1>

//         <Link
//           href="/admin/chapters/new"
//           className="rounded-xl bg-red-600 px-6 py-3"
//         >
//           New Chapter
//         </Link>
//       </div>

//       <div className="space-y-4">
//         {chapters?.map((chapter) => (
//           <div
//             key={chapter.id}
//             className="rounded-xl bg-zinc-900 p-6"
//           >
//             <h2 className="text-2xl font-bold">
//               Chapter {chapter.chapter_number}
//             </h2>

//             <p className="text-zinc-400">
//               {chapter.title}
//             </p>
//             <Link
//             href={`/admin/chapters/${chapter.id}`}
//             className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2"
//             >
//            Edit
//          </Link>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminChapters() {
  const { data: chapters, error } = await supabase
    .from("chapters")
    .select("*")
    .order("chapter_number", { ascending: true });

  console.log("CHAPTERS:", chapters);
  console.log("ERROR:", error);

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-5xl font-bold text-red-500">
          Chapters
        </h1>

        <Link
          href="/admin/chapters/new"
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
        >
          New Chapter
        </Link>
      </div>

      {!chapters || chapters.length === 0 ? (
        <div className="rounded-xl bg-zinc-900 p-6">
          No chapters found.
        </div>
      ) : (
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="rounded-xl border border-red-900/30 bg-zinc-900 p-6"
            >
              <h2 className="text-2xl font-bold">
                Chapter {chapter.chapter_number}
              </h2>

              <p className="mt-2 text-zinc-400">
                {chapter.title}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {chapter.slug}
              </p>

              <div className="mt-4 flex gap-3">
                <Link
                  href={`/chapters/${chapter.slug}`}
                  className="rounded-lg bg-zinc-800 px-4 py-2"
                >
                  View
                </Link>

                <Link
                  href={`/admin/chapters/${chapter.id}`}
                  className="rounded-lg bg-red-600 px-4 py-2"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}