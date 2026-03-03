import { Suspense } from "react";
import type { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import CategoryFilter from "@/components/gallery/CategoryFilter";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { getArtworks, getCategories } from "@/lib/queries";
import type { Artwork, Category } from "@/lib/types";

export const metadata: Metadata = {
  title: "Gallery | yourstruly.krishi",
  description:
    "Browse the full collection of digital art and illustrations by Krishi. Filter by category to explore different styles and themes.",
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;

  let artworks: Artwork[] = [];
  let categories: Category[] = [];

  try {
    const [artworksRes, categoriesRes] = await Promise.all([
      getArtworks({ category: params.category }),
      getCategories(),
    ]);
    artworks = artworksRes.data ?? [];
    categories = categoriesRes.data ?? [];
  } catch {
    // Strapi unavailable — fall back to empty arrays
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Page header */}
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Gallery
        </h1>
        <p className="mt-3 max-w-lg text-text-secondary">
          A curated collection of digital illustrations, concept art, and visual
          experiments.
        </p>
      </FadeIn>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="mt-10">
          <Suspense fallback={null}>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>
      )}

      {/* Masonry grid */}
      <div className="mt-10">
        <MasonryGrid artworks={artworks} />
      </div>
    </section>
  );
}
