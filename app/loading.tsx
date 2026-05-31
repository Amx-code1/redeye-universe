import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Red-Eye Universe",
    template: "%s | Red-Eye Universe",
  },

  description:
    "Dark Fantasy Web Novel. Explore Agastha Crystals, forbidden powers and the world of Red-Eye.",

  keywords: [
    "web novel",
    "dark fantasy",
    "red eye",
    "agastha crystal",
    "light novel",
    "fantasy story",
  ],

  openGraph: {
    title: "Red-Eye Universe",
    description:
      "Dark Fantasy Web Novel Universe",
    type: "website",
  },
};

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />

        <p className="mt-6 text-white">
          Loading Red-Eye Universe...
        </p>
      </div>
    </main>
  );
}