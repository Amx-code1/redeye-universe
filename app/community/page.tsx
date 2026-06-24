"use client";

import { useState } from "react";

import CommunityHero from "@/components/community/CommunityHero";
import CommunityStats from "@/components/community/CommunityStats";
import CategoryFilter from "@/components/community/CategoryFilter";
import CommunitySearch from "@/components/community/CommunitySearch";
import ThreadList from "@/components/community/ThreadList";

export default function CommunityPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {},
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <CommunityHero />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="space-y-8">
          {/* Stats */}
          <CommunityStats />

          {/* Search */}
          <CommunitySearch search={search} setSearch={setSearch} />

          {/* Category Filters */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            counts={categoryCounts}
          />

          {/* Threads */}
          <ThreadList search={search} selectedCategory={selectedCategory} />
        </div>
      </section>
    </main>
  );
}
