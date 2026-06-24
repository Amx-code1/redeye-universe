"use client";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (
    category: string
  ) => void;
  counts?: Record<string, number>;
};

const categories = [
  "All",
  "General",
  "Lore",
  "Characters",
  "Chapters",
  "Theories",
  "Fan Art",
];

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  counts = {},
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`
            rounded-full
            px-5
            py-3
            text-sm
            font-medium
            transition-all
            duration-300

            ${
              selectedCategory === category
                ? `
                  bg-red-600
                  text-white
                  shadow-[0_0_20px_rgba(239,68,68,0.35)]
                `
                : `
                  border
                  border-red-500/10
                  bg-zinc-950/80
                  text-zinc-300
                  hover:border-red-500/40
                  hover:text-white
                `
            }
          `}
        >
          {category}
          <span className="ml-2 opacity-70">
            ({counts[category] ?? 0})
          </span>
        </button>
      ))}
    </div>
  );
}