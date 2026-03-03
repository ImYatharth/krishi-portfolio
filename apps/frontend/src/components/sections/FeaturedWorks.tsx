import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren, { staggerItem } from "@/components/animations/StaggerChildren";
import StrapiImage from "@/components/ui/StrapiImage";
import type { Artwork } from "@/lib/types";

interface FeaturedWorksProps {
  artworks: Artwork[];
}

export default function FeaturedWorks({ artworks }: FeaturedWorksProps) {
  if (artworks.length === 0) return null;

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <FadeIn direction="up">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Selected Works
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Featured Works
              </h2>
            </div>
            <Link
              href="/gallery"
              className="group hidden items-center gap-2 text-sm text-text-secondary transition-colors hover:text-foreground sm:flex"
            >
              View All Works
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </FadeIn>

        {/* Artwork grid */}
        <StaggerChildren
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.1}
        >
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </StaggerChildren>

        {/* Mobile "View All" link */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mt-12 text-center sm:hidden">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-foreground"
            >
              View All Works
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ArtworkCard({ artwork }: { artwork: Artwork }) {
  const category = artwork.categories?.[0];

  return (
    <Link href={`/gallery/${artwork.slug}`} className="group block">
      <article className="stagger-item relative overflow-hidden rounded-sm bg-surface-raised">
        {/* Image container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <StrapiImage
            image={artwork.image}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Category tag */}
          {category && (
            <span className="absolute left-3 top-3 rounded-sm bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-accent backdrop-blur-sm">
              {category.name}
            </span>
          )}

          {/* Title overlay on hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <h3 className="text-base font-medium text-foreground">
              {artwork.title}
            </h3>
            {artwork.year && (
              <p className="mt-0.5 text-xs text-text-muted">{artwork.year}</p>
            )}
          </div>
        </div>

        {/* Title below image (visible by default, hidden on hover) */}
        <div className="border-t border-border px-4 py-3 transition-colors duration-300 group-hover:border-accent/20">
          <h3 className="truncate text-sm font-medium text-foreground">
            {artwork.title}
          </h3>
          {category && (
            <p className="mt-0.5 text-xs text-text-muted">{category.name}</p>
          )}
        </div>
      </article>
    </Link>
  );
}
