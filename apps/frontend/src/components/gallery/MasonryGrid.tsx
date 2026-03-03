import StaggerChildren from "@/components/animations/StaggerChildren";
import ArtworkCard from "@/components/gallery/ArtworkCard";
import type { Artwork } from "@/lib/types";

interface MasonryGridProps {
  artworks: Artwork[];
}

export default function MasonryGrid({ artworks }: MasonryGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg text-text-secondary">No artworks found.</p>
        <p className="mt-2 text-sm text-text-muted">
          Try selecting a different category or check back later.
        </p>
      </div>
    );
  }

  return (
    <StaggerChildren
      className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
    >
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </StaggerChildren>
  );
}
