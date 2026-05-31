// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import {
//   Crown,
//   ShieldAlert,
//   Sparkles,
// } from "lucide-react";

// const characters = [
//   {
//     name: "Viktor",
//     role: "Leader of the Rebellion",
//     danger: "Extreme",
//     icon: Crown,
//   },
//   {
//     name: "The First Witch",
//     role: "Ancient Power",
//     danger: "Unknown",
//     icon: Sparkles,
//   },
//   {
//     name: "Aether",
//     role: "Crystal Bearer",
//     danger: "High",
//     icon: ShieldAlert,
//   },
// ];

// export default function FeaturedCharacters() {
//   return (
//     <section className="relative overflow-hidden bg-black py-32 text-white">

//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_70%)] opacity-30" />

//       <div className="relative mx-auto max-w-7xl px-6">

//         <div className="mb-16 text-center">

//           <h2 className="text-5xl font-black text-red-500">
//             Featured Characters
//           </h2>

//           <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
//             Legends, monsters, rulers and rebels.
//             Every soul in Red-Eye leaves a scar upon history.
//           </p>

//         </div>

//         <div className="grid gap-8 md:grid-cols-3">

//           {characters.map((character, index) => {
//             const Icon = character.icon;

//             return (
//               <motion.div
//                 key={character.name}
//                 initial={{
//                   opacity: 0,
//                   y: 40,
//                 }}
//                 whileInView={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 viewport={{
//                   once: true,
//                 }}
//                 transition={{
//                   delay: index * 0.2,
//                 }}
//                 className="group relative overflow-hidden rounded-3xl border border-red-900/30 bg-zinc-900/80 backdrop-blur"
//               >

//                 {/* Glow */}

//                 <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

//                 {/* Portrait */}

//                 <div className="relative flex h-72 items-center justify-center overflow-hidden">

//                   <div className="absolute h-56 w-56 rounded-full bg-red-600/20 blur-3xl transition group-hover:scale-125" />

//                   <Icon className="relative z-10 h-24 w-24 text-red-500" />

//                 </div>

//                 {/* Content */}

//                 <div className="p-6">

//                   <h3 className="text-3xl font-bold">
//                     {character.name}
//                   </h3>

//                   <p className="mt-2 text-zinc-400">
//                     {character.role}
//                   </p>

//                   <div className="mt-6 flex items-center justify-between">

//                     <span className="rounded-full bg-red-950 px-4 py-2 text-sm text-red-300">
//                       Danger: {character.danger}
//                     </span>

//                     <Link
//                       href="/characters"
//                       className="text-red-400 hover:text-red-300"
//                     >
//                       View →
//                     </Link>

//                   </div>

//                 </div>

//               </motion.div>
//             );
//           })}

//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Character } from "@/types/character";

export default function FeaturedCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    loadCharacters();
  }, []);

  async function loadCharacters() {
    const { data } = await supabase
      .from("characters")
      .select("*")
      .limit(3);

    setCharacters(data || []);
  }

  return (
    <section className="relative overflow-hidden bg-black py-32 text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_70%)] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <h2 className="text-5xl font-black text-red-500">
            Featured Characters
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Meet the legends shaping the future of the Red-Eye Universe.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.15,
              }}
            >
              <Link href={`/characters/${character.id}`}>

                <div className="group overflow-hidden rounded-3xl border border-red-900/30 bg-zinc-900 transition-all hover:-translate-y-2 hover:border-red-500">

                  {/* Character Image */}

                  <div className="relative h-80 overflow-hidden">

                    {character.avatar_url ? (
                      <Image
                        src={character.avatar_url}
                        alt={character.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-b from-red-900/20 to-black">
                        <span className="text-6xl text-red-500">
                          ?
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  </div>

                  {/* Content */}

                  <div className="p-6">

                    <div className="mb-3 flex flex-wrap gap-2">

                      {character.rank && (
                        <span className="rounded-full bg-red-950 px-3 py-1 text-xs text-red-300">
                          {character.rank}
                        </span>
                      )}

                      {character.faction && (
                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs">
                          {character.faction}
                        </span>
                      )}

                    </div>

                    <h3 className="text-3xl font-bold">
                      {character.name}
                    </h3>

                    <p className="mt-2 text-zinc-400">
                      {character.title}
                    </p>

                    <div className="mt-4 inline-block rounded-full bg-red-950 px-3 py-1 text-sm text-red-300">
                      Danger: {character.danger_level}
                    </div>

                    {character.quote && (
                      <p className="mt-4 italic text-zinc-500">
                        "{character.quote}"
                      </p>
                    )}

                  </div>

                </div>

              </Link>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}