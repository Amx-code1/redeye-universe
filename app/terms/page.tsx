import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Red-Eye Universe",
  description:
    "Terms of Service for Red-Eye Universe.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO */}

      <section className="relative overflow-hidden border-b border-red-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_75%)] opacity-40" />

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[200px]" />

        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="inline-flex rounded-full border border-red-500/20 bg-red-950/20 px-4 py-2 text-sm tracking-[0.25em] text-red-400">
            LEGAL
          </div>

          <h1 className="mt-6 bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
            TERMS OF SERVICE
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            Rules and conditions governing the use of Red-Eye Universe.
          </p>

          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-zinc-300">
            Last Updated • June 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="space-y-12">
          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              Acceptance of Terms
            </h2>

            <p className="leading-8 text-zinc-300">
              By accessing or using Red-Eye Universe, you agree to
              comply with these Terms of Service and all applicable
              laws and regulations.
            </p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              User Accounts
            </h2>

            <p className="leading-8 text-zinc-300">
              Users are responsible for maintaining the security of
              their accounts and any activity that occurs under them.
            </p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              Community Guidelines
            </h2>

            <ul className="space-y-4 text-zinc-300">
              <li>• No harassment or abuse</li>
              <li>• No spam or malicious content</li>
              <li>• No impersonation of other users</li>
              <li>• Respect other community members</li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              Intellectual Property
            </h2>

            <p className="leading-8 text-zinc-300">
              All original content, artwork, stories, characters,
              worldbuilding, branding, and related assets belonging
              to Red-Eye Universe are protected by applicable
              intellectual property laws.
            </p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              Account Suspension
            </h2>

            <p className="leading-8 text-zinc-300">
              We reserve the right to remove content, restrict
              access, or suspend accounts that violate these terms.
            </p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              Contact
            </h2>

            <p className="leading-8 text-zinc-300">
              Questions regarding these Terms may be submitted
              through the Contact page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}