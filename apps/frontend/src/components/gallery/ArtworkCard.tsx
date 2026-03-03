"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StrapiImage from "@/components/ui/StrapiImage";
import { staggerItem } from "@/components/animations/StaggerChildren";
import type { Artwork } from "@/lib/types";

interface ArtworkCardProps {
  artwork: Artwork;
  onClick?: (artwork: Artwork) => void;
}

export default function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  const categoryName = artwork.categories?.[0]?.name;

  return (
    <motion.div
      variants={staggerItem}
      className="group mb-4 break-inside-avoid"
    >
      <Link
        href={`/gallery/${artwork.slug}`}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick(artwork);
          }
        }}
        className="relative block overflow-hidden rounded-lg bg-surface-raised"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          {artwork.image ? (
            <StrapiImage
              image={artwork.image}
              alt={artwork.title}
              width={artwork.image?.width}
              height={artwork.image?.height}
              className="h-auto w-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex aspect-[3/4] w-full items-center justify-center bg-surface-raised">
              <div className="text-center px-4">
                <span className="text-5xl font-bold text-accent/30">
                  {artwork.title.charAt(0)}
                </span>
                <p className="mt-3 text-sm font-medium text-text-secondary">
                  {artwork.title}
                </p>
                {artwork.medium && (
                  <p className="mt-1 text-xs text-text-muted">{artwork.medium}</p>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Gradient overlay on hover (only for cards with images) */}
        {artwork.image && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <h3 className="text-sm font-medium text-foreground">
                {artwork.title}
              </h3>
              {categoryName && (
                <p className="mt-1 text-xs text-text-secondary">{categoryName}</p>
              )}
            </div>
          </>
        )}
      </Link>
    </motion.div>
  );
}
