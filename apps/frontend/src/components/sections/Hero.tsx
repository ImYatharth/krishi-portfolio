"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import RevealText from "@/components/animations/RevealText";
import FadeIn from "@/components/animations/FadeIn";
import StrapiImage from "@/components/ui/StrapiImage";
import type { StrapiImage as StrapiImageType } from "@/lib/types";

interface HeroProps {
  title: string;
  subtitle: string | null;
  heroImage: StrapiImageType | null;
  ctaText: string | null;
  ctaLink: string | null;
}

export default function Hero({
  title,
  subtitle,
  heroImage,
  ctaText,
  ctaLink,
}: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image layer */}
      {heroImage && (
        <div className="absolute inset-0 z-0">
          <StrapiImage
            image={heroImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient overlay on top of the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
      )}

      {/* Subtle radial gradient background (always present) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(200,162,110,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* Hero Title */}
        <RevealText
          text={title}
          as="h1"
          className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] text-foreground"
        />

        {/* Subtitle */}
        {subtitle && (
          <FadeIn delay={0.4} direction="up">
            <p className="mx-auto mt-6 max-w-xl text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-text-secondary">
              {subtitle}
            </p>
          </FadeIn>
        )}

        {/* CTA Button */}
        {ctaText && ctaLink && (
          <FadeIn delay={0.7} direction="up">
            <Link
              href={ctaLink}
              className="group mt-10 inline-flex items-center gap-2 border border-accent/40 px-8 py-3 text-sm tracking-wide text-accent transition-all duration-300 hover:border-accent hover:bg-accent/10"
            >
              {ctaText}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </FadeIn>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <FadeIn delay={1.2} direction="up">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
              Scroll
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-text-muted"
            >
              <path
                d="M8 3v10M4 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
