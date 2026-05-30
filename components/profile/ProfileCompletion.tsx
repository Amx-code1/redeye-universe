"use client";

type Props = {
  avatar_url?: string | null;
  bio?: string | null;
  age?: number | null;
  gender?: string | null;
};

export default function ProfileCompletion({
  avatar_url,
  bio,
  age,
  gender,
}: Props) {
  let score = 0;

  if (avatar_url) score += 25;
  if (bio) score += 25;
  if (age) score += 25;
  if (gender) score += 25;

  return (
    <div className="rounded-2xl bg-zinc-900 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Profile Completion
        </h2>

        <span className="text-red-500 font-bold">
          {score}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full bg-red-500 transition-all"
          style={{
            width: `${score}%`,
          }}
        />
      </div>

      <div className="mt-4 space-y-2 text-zinc-400">

        {!avatar_url && <p>• Add avatar</p>}
        {!bio && <p>• Add bio</p>}
        {!age && <p>• Add age</p>}
        {!gender && <p>• Add gender</p>}

        {score === 100 && (
          <p className="text-green-400">
            Profile Complete ✓
          </p>
        )}
      </div>
    </div>
  );
}