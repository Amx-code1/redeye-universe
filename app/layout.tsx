import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://redeye-universe.vercel.app"),

  title: {
    default: "Red-Eye Universe",
    template: "%s | Red-Eye Universe",
  },

  description:
    "Explore the dark fantasy world of Red-Eye. Follow the journey through Agastha Crystals, forbidden power, rebellion, and ancient mysteries.",

  keywords: [
    "Red-Eye",
    "Dark Fantasy",
    "Fantasy Universe",
    "Web Novel",
    "Fantasy Novel",
    "Agastha Crystal",
    "Light Novel",
    "Fantasy Story",
    "Web Fiction",
  ],

  openGraph: {
    title: "Red-Eye Universe",
    description:
      "A dark fantasy universe built around Agastha Crystals, rebellion, and forbidden power.",
    url: "https://redeye-universe.vercel.app",
    siteName: "Red-Eye Universe",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Red-Eye Universe",
    description:
      "Explore the dark fantasy world of Agastha Crystals and forbidden power.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cinzel.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-black text-white antialiased">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#18181b",
              color: "#fff",
              border: "1px solid rgba(239,68,68,0.3)",
            },
          }}
        />
      </body>
    </html>
  );
}