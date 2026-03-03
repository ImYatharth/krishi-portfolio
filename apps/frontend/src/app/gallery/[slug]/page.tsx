import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArtworkBySlug, getAllArtworkSlugs } from "@/lib/queries";
import { getStrapiImageUrl, formatYear } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllArtworkSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const artwork = await getArtworkBySlug(slug);
    if (!artwork) return { title: "Artwork Not Found" };

    return {
      title: `${artwork.title} | yourstruly.krishi`,
      description: artwork.description?.slice(0, 160) || `${artwork.title} — digital artwork by Krishi`,
      openGraph: {
        title: artwork.title,
        description: artwork.description?.slice(0, 160) || `${artwork.title} — digital artwork by Krishi`,
        images: artwork.image
          ? [{ url: getStrapiImageUrl(artwork.image.url), width: artwork.image.width, height: artwork.image.height }]
          : [],
      },
    };
  } catch {
    return { title: "Artwork | yourstruly.krishi" };
  }
}

export default async function ArtworkDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let artwork;
  try {
    artwork = await getArtworkBySlug(slug);
  } catch {
    artwork = null;
  }

  if (!artwork) {
    notFound();
  }

  const imageUrl = getStrapiImageUrl(artwork.image?.url);

  return (
    <article className="min-h-screen">
      {/* Back link */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <FadeIn>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>
        </FadeIn>
      </div>

      {/* Main Image */}
      <FadeIn className="mx-auto mt-8 max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-lg bg-surface-raised">
          <Image
            src={imageUrl}
            alt={artwork.image?.alternativeText || artwork.title}
            width={artwork.image?.width || 1200}
            height={artwork.image?.height || 800}
            className="h-auto w-full object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
            priority
          />
        </div>
      </FadeIn>

      {/* Artwork Info */}
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-12">
        {/* Title */}
        <FadeIn delay={0.1}>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {artwork.title}
          </h1>
        </FadeIn>

        {/* Categories */}
        {artwork.categories && artwork.categories.length > 0 && (
          <FadeIn delay={0.15}>
            <div className="mt-4 flex flex-wrap gap-2">
              {artwork.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/gallery?category=${cat.slug}`}
                  className="rounded-full border border-accent/30 px-3 py-1 text-xs tracking-wide text-accent transition-colors hover:border-accent hover:bg-accent/10"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Metadata Grid */}
        <FadeIn delay={0.2}>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
            {artwork.year && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Year</p>
                <p className="mt-1 text-sm text-foreground">{formatYear(artwork.year)}</p>
              </div>
            )}
            {artwork.medium && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Medium</p>
                <p className="mt-1 text-sm text-foreground">{artwork.medium}</p>
              </div>
            )}
            {artwork.dimensions && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Dimensions</p>
                <p className="mt-1 text-sm text-foreground">{artwork.dimensions}</p>
              </div>
            )}
            {artwork.tags && artwork.tags.length > 0 && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Tags</p>
                <p className="mt-1 text-sm text-text-secondary">{artwork.tags.join(", ")}</p>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Description */}
        {artwork.description && (
          <FadeIn delay={0.25}>
            <div className="mt-10 border-t border-border pt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">About this work</p>
              <div
                className="prose prose-invert mt-4 max-w-none text-text-secondary prose-p:text-text-secondary prose-strong:text-foreground prose-a:text-accent"
                dangerouslySetInnerHTML={{ __html: artwork.description }}
              />
            </div>
          </FadeIn>
        )}

        {/* Additional Images */}
        {artwork.additionalImages && artwork.additionalImages.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="mt-10 border-t border-border pt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                Process & Details
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {artwork.additionalImages.map((img) => (
                  <div
                    key={img.id}
                    className="group relative overflow-hidden rounded-lg bg-surface-raised"
                  >
                    <Image
                      src={getStrapiImageUrl(img.url)}
                      alt={img.alternativeText || `${artwork.title} detail`}
                      width={img.width}
                      height={img.height}
                      className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </article>
  );
}
