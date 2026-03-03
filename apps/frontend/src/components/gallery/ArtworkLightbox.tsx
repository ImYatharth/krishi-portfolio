"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import StrapiImage from "@/components/ui/StrapiImage";
import type { Artwork } from "@/lib/types";

interface ArtworkLightboxProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtworkLightbox({
  artwork,
  isOpen,
  onClose,
}: ArtworkLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-full p-2 text-text-secondary transition-colors hover:text-foreground"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Content container — stop propagation so clicking inside doesn't close */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[90vh] max-w-5xl flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative max-h-[75vh] overflow-hidden rounded-lg">
              <StrapiImage
                image={artwork.image}
                alt={artwork.title}
                width={artwork.image?.width}
                height={artwork.image?.height}
                className="max-h-[75vh] w-auto object-contain"
                sizes="90vw"
                priority
              />
            </div>

            {/* Metadata */}
            <div className="w-full text-center">
              <h2 className="text-lg font-medium text-foreground">
                {artwork.title}
              </h2>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-text-secondary">
                {artwork.categories?.[0]?.name && (
                  <span>{artwork.categories[0].name}</span>
                )}
                {artwork.medium && (
                  <>
                    <span className="text-text-muted">/</span>
                    <span>{artwork.medium}</span>
                  </>
                )}
                {artwork.year && (
                  <>
                    <span className="text-text-muted">/</span>
                    <span>{artwork.year}</span>
                  </>
                )}
                {artwork.dimensions && (
                  <>
                    <span className="text-text-muted">/</span>
                    <span>{artwork.dimensions}</span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
