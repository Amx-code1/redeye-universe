import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Red-Eye Universe",
  description:
    "Privacy Policy for Red-Eye Universe.",
};

export default function PrivacyPage() {
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
            PRIVACY POLICY
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
            We respect your privacy and are committed to protecting
            your information while you explore the world of Red-Eye.
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
              Introduction
            </h2>

            <p className="leading-8 text-zinc-300">
              Welcome to Red-Eye Universe. This Privacy Policy
              explains how we collect, use, and protect information
              when you use our website, create an account, save
              reading progress, participate in discussions, or engage
              with community features.
            </p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              Information We Collect
            </h2>

            <ul className="space-y-4 text-zinc-300">
              <li>• Email address associated with your account</li>
              <li>• Reading progress and library activity</li>
              <li>• Comments and community interactions</li>
              <li>• Device and browser information</li>
              <li>• Anonymous analytics information</li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              How We Use Information
            </h2>

            <ul className="space-y-4 text-zinc-300">
              <li>
                • Maintain your account and reading progress
              </li>

              <li>
                • Improve platform performance and user experience
              </li>

              <li>
                • Prevent spam, abuse, and unauthorized access
              </li>

              <li>
                • Develop future features and content
              </li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              Community Content
            </h2>

            <p className="leading-8 text-zinc-300">
              Comments and other content submitted by users may be
              publicly visible. Users remain responsible for content
              they choose to publish through community features.
            </p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              Data Security
            </h2>

            <p className="leading-8 text-zinc-300">
              We use trusted infrastructure providers and modern
              security practices to help protect user information.
              However, no online service can guarantee complete
              security.
            </p>
          </div>

          <div className="rounded-[32px] border border-red-900/20 bg-zinc-950/80 p-10 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-black text-red-500">
              Contact Us
            </h2>

            <p className="leading-8 text-zinc-300">
              If you have questions regarding this Privacy Policy,
              please contact us through the Contact page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}