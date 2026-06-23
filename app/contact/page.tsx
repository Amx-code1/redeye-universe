import type { Metadata } from "next";
import {
  Mail,
  Bug,
  Briefcase,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Red-Eye Universe",
  description:
    "Contact the Red-Eye Universe team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-red-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_75%)] opacity-40" />

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[200px]" />

        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="inline-flex rounded-full border border-red-500/20 bg-red-950/20 px-4 py-2 text-sm tracking-[0.25em] text-red-400">
            CONTACT
          </div>

          <h1 className="mt-6 bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
            GET IN TOUCH
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Questions, feedback, business inquiries, or bug reports —
            we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT OPTIONS */}

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <Mail className="mb-5 text-red-500" size={36} />

            <h2 className="mb-4 text-xl font-black">
              General Support
            </h2>

            <p className="mb-4 text-zinc-400">
              Questions about the universe, chapters, or your account.
            </p>

            <p className="font-semibold">
              support@redeyeuniverse.com
            </p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <Bug className="mb-5 text-red-500" size={36} />

            <h2 className="mb-4 text-xl font-black">
              Bug Reports
            </h2>

            <p className="mb-4 text-zinc-400">
              Found a problem? Let us know.
            </p>

            <p className="font-semibold">
              bugs@redeyeuniverse.com
            </p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <Briefcase className="mb-5 text-red-500" size={36} />

            <h2 className="mb-4 text-xl font-black">
              Business Inquiries
            </h2>

            <p className="mb-4 text-zinc-400">
              Partnerships, sponsorships, and collaborations.
            </p>

            <p className="font-semibold">
              business@redeyeuniverse.com
            </p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <MessageSquare
              className="mb-5 text-red-500"
              size={36}
            />

            <h2 className="mb-4 text-xl font-black">
              Community
            </h2>

            <p className="mb-4 text-zinc-400">
              Feedback, ideas, and community discussions.
            </p>

            <p className="font-semibold">
              community@redeyeuniverse.com
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}