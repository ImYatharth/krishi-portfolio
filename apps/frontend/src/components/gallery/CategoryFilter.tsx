"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  function handleFilter(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/gallery?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
      {/* "All" pill — always first */}
      <button
        onClick={() => handleFilter(null)}
        className={cn(
          "shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors",
          !activeCategory
            ? "bg-accent text-background"
            : "border border-border text-text-secondary hover:text-foreground"
        )}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleFilter(category.slug)}
          className={cn(
            "shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors",
            activeCategory === category.slug
              ? "bg-accent text-background"
              : "border border-border text-text-secondary hover:text-foreground"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
