// "use client";

// import Link from "next/link";
// import UserDropdown from "./UserDropdown";
// import { supabase } from "@/lib/supabase";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import { Menu, X, Search } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import type { User } from "@supabase/supabase-js";

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     loadUser();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (_, session) => {
//       setUser(session?.user ?? null);

//       if (session?.user) {
//         await checkAdmin(session.user.id);
//       } else {
//         setIsAdmin(false);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   async function loadUser() {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();

//     setUser(user);

//     if (user) {
//       await checkAdmin(user.id);
//     }

//     setLoading(false);
//   }

//   async function checkAdmin(userId: string) {
//     const { data } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("user_id", userId)
//       .single();

//     setProfile(data);

//     setIsAdmin(data?.role === "admin");
//   }

//   async function logout() {
//     await supabase.auth.signOut();
//     router.push("/");
//     router.refresh();
//   }

//   function closeMenu() {
//     setMenuOpen(false);
//   }

//   return (
//     <nav
//       className="
//     sticky
//     top-0
//     z-50
//     border-b
//     border-red-900/20
//     bg-black/80
//     backdrop-blur-2xl
//     shadow-[0_10px_40px_rgba(0,0,0,0.5)]
// "
//     >
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         {/* Logo */}

//         <Link
//           href="/"
//           className="relative text-3xl font-black tracking-[0.2em] text-red-500 transition hover:text-red-400"
//         >
//           <div className="flex items-center gap-3">

//             <div className="flex items-center gap-3">
//               <div
//                 className="
//       h-4
//       w-4
//       rotate-45
//       bg-gradient-to-br
//       from-red-400
//       to-red-700
//       shadow-[0_0_25px_rgba(239,68,68,0.8)]
//     "
//               />

//               <span
//                 className="
//       font-title
//       text-3xl
//       tracking-[0.2em]
//       text-transparent
//       bg-clip-text
//       bg-gradient-to-b
//       from-red-300
//       via-red-500
//       to-red-800
//       drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]
//     "
//               >
//                 RED-EYE
//               </span>
//             </div>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}

//         <div className="hidden items-center gap-5 md:flex">
//           <NavLink href="/chapters" label="Chapters" pathname={pathname} />

//           <NavLink href="/characters" label="Characters" pathname={pathname} />

//           <NavLink href="/search" label="Search" pathname={pathname} />

//           {loading ? (
//             <div className="h-10 w-24 animate-pulse rounded-xl bg-zinc-800" />
//           ) : user ? (
//             <>
//               <NavLink href="/library" label="Library" pathname={pathname} />

//               <UserDropdown
//                 avatarUrl={profile?.avatar_url}
//                 username={profile?.username}
//                 isAdmin={isAdmin}
//                 onLogout={logout}
//               />
//             </>
//           ) : (
//             <>
//               <Link
//                 href="/login"
//                 className="
//                   rounded-xl
//                   border
//                   border-zinc-700
//                   px-5
//                   py-2
//                   transition
//                   hover:border-red-500
//                 "
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/register"
//                 className="
//     rounded-2xl
//     bg-gradient-to-r
//     from-red-600
//     to-red-700
//     px-6
//     py-3
//     font-semibold
//     transition-all
//     duration-300
//     hover:scale-105
//     hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]
//   "
//               >
//                 Begin The Journey
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}

//         <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
//           {menuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}

//       {/* Mobile Menu */}

//       {/* Mobile Menu Overlay */}

//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="
//         fixed
//         inset-0
//         z-[100]
//         bg-black/95
//         backdrop-blur-xl
//         md:hidden
//       "
//           >
//             <div className="flex h-full flex-col items-center justify-center gap-5">
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="
//             absolute
//             right-6
//             top-6
//             text-zinc-400
//             hover:text-red-500
//           "
//               >
//                 <X size={32} />
//               </button>

//               <NavLink
//                 href="/chapters"
//                 label="Chapters"
//                 pathname={pathname}
//                 onClick={closeMenu}
//               />

//               <NavLink
//                 href="/characters"
//                 label="Characters"
//                 pathname={pathname}
//                 onClick={closeMenu}
//               />

//               {/* <NavLink
//                 href="/search"
//                 label="Search"
//                 pathname={pathname}
//                 onClick={closeMenu}
//               /> */}
//               <button
//                 className="
//     text-zinc-400
//     transition
//     hover:text-red-500
//   "
//               >
//                 <Search size={20} />
//               </button>

//               {user ? (
//                 <>
//                   <NavLink
//                     href="/library"
//                     label="Library"
//                     pathname={pathname}
//                     onClick={closeMenu}
//                   />

//                   <NavLink
//                     href="/profile"
//                     label="Profile"
//                     pathname={pathname}
//                     onClick={closeMenu}
//                   />

//                   {isAdmin && (
//                     <NavLink
//                       href="/admin"
//                       label="Admin"
//                       pathname={pathname}
//                       onClick={closeMenu}
//                     />
//                   )}

//                   <button
//                     onClick={logout}
//                     className="
//                 rounded-2xl
//                 bg-red-600
//                 px-8
//                 py-4
//                 font-semibold
//               "
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     href="/login"
//                     onClick={closeMenu}
//                     className="
//                 rounded-2xl
//                 border
//                 border-zinc-700
//                 px-8
//                 py-4
//               "
//                   >
//                     Login
//                   </Link>

//                   <Link
//                     href="/register"
//                     onClick={closeMenu}
//                     className="
//     rounded-2xl
//     bg-gradient-to-r
//     from-red-600
//     to-red-700
//     px-4
//     py-3
//     text-center
//     font-semibold
//   "
//                   >
//                     Begin The Journey
//                   </Link>
//                 </>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

// function NavLink({
//   href,
//   label,
//   pathname,
//   onClick,
// }: {
//   href: string;
//   label: string;
//   pathname: string;
//   onClick?: () => void;
// }) {
//   const active = pathname === href;

//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       className="
//         group
//         relative
//         font-medium
//         transition-all
//         duration-300
//       "
//     >
//       <span
//         className={
//           active ? "text-red-500" : "text-zinc-300 group-hover:text-red-400"
//         }
//       >
//         {label}
//       </span>

//       <span
//         className={`
//           absolute
//           -bottom-2
//           left-0
//           h-[2px]
//           bg-gradient-to-r
//           from-red-500
//           to-red-700
//           transition-all
//           duration-300
//           ${active ? "w-full" : "w-0 group-hover:w-full"}
//         `}
//       />
//     </Link>
//   );
// }
