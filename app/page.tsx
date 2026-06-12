import Link from "next/link";

export default function LandingPage() {
  return (
    <main
      className="
      relative
      flex
      min-h-screen
      items-center
      justify-center
      overflow-hidden
      bg-black
      text-white
    "
    >
      {/* Background */}

      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_center,#7f1d1d_0%,#000000_70%)]
      "
      />

      {/* Content */}

      <div className="relative z-10 text-center">
        <h1
          className="
          font-title
          text-7xl
          font-black
          tracking-[0.4em]
          text-red-500
          md:text-9xl
        "
        >
          RED-EYE
        </h1>

        <p
          className="
          mx-auto
          mt-8
          max-w-2xl
          text-xl
          text-zinc-300
        "
        >
          Welcome to the world shaped by Agastha Crystals,
          forbidden power, rebellion, and forgotten history.
        </p>

        <Link
          href="/home"
          className="
          mt-10
          inline-flex
          rounded-2xl
          bg-red-600
          px-10
          py-5
          font-bold
          transition
          hover:scale-105
          hover:bg-red-700
        "
        >
          Enter Universe
        </Link>
      </div>
    </main>
  );
}