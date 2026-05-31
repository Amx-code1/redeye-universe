export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-5xl font-bold text-red-500">
        Privacy Policy
      </h1>

      <div className="max-w-4xl space-y-6 text-zinc-300">
        <p>
          We respect your privacy and only store the
          information necessary to provide our services.
        </p>

        <p>
          We do not sell user data to third parties.
        </p>

        <p>
          Authentication is securely handled through
          Supabase.
        </p>
      </div>
    </main>
  );
}