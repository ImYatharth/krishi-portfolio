import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

interface AboutPreviewProps {
  text: string;
}

export default function AboutPreview({ text }: AboutPreviewProps) {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Text column */}
          <div className="flex flex-col justify-center">
            <FadeIn direction="up">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                About the Artist
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                The Story Behind
                <br />
                the Work
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-text-secondary">
                {text}
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-light"
              >
                Learn More
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </FadeIn>
          </div>

          {/* Image placeholder column */}
          <FadeIn direction="right" delay={0.2}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-raised lg:aspect-[3/4]">
              {/* Decorative placeholder with subtle pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(200,162,110,0.03) 0%, transparent 50%, rgba(200,162,110,0.05) 100%)",
                  }}
                />
                <div className="relative text-center">
                  <div className="mb-3 font-mono text-6xl text-text-muted/20">
                    K
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted/30">
                    Artist Portrait
                  </p>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute left-4 top-4 h-8 w-8 border-l border-t border-accent/20" />
              <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-accent/20" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
