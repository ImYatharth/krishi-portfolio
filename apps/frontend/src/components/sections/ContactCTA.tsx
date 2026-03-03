import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export default function ContactCTA() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn direction="up">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Get in Touch
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight tracking-tight text-foreground">
              Let&apos;s Create
              <br />
              Together
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-text-secondary">
              Have a project in mind, or simply want to connect?
              I&apos;m always open to new collaborations and creative conversations.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border border-accent bg-accent/10 px-8 py-3 text-sm tracking-wide text-accent transition-all duration-300 hover:bg-accent hover:text-background"
              >
                Start a Conversation
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 border border-border px-8 py-3 text-sm tracking-wide text-text-secondary transition-all duration-300 hover:border-text-muted hover:text-foreground"
              >
                Browse Gallery
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom border */}
      <div className="border-t border-border" />
    </section>
  );
}
