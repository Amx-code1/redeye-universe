import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Red-Eye Universe",
    template: "%s | Red-Eye Universe",
  },

  description:
    "Explore the dark fantasy world of Red-Eye. Follow the journey through Agastha Crystals, forbidden power, rebellion, and ancient mysteries.",

  keywords: [
    "Red-Eye",
    "Dark Fantasy",
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
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <Toaster position="top-right" />

        {children}
        <Footer />
      </body>
    </html>
  );
}
