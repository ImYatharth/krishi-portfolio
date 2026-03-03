import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Globe, Youtube, Linkedin } from "lucide-react";
import { getAbout } from "@/lib/queries";
import { getStrapiImageUrl } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import type { Metadata } from "next";
import type { SocialLink, StrapiImage } from "@/lib/types";

export const metadata: Metadata = {
  title: "About | yourstruly.krishi",
  description: "Learn more about Krishi — a digital artist and illustrator exploring the boundaries of visual storytelling.",
};

const fallbackAbout: {
  headline: string;
  bio: string;
  shortBio: string;
  profileImage: StrapiImage | null;
  additionalImages: StrapiImage[];
  socialLinks: SocialLink[];
  skills: string[];
} = {
  headline: "The Artist Behind the Work",
  bio: "A passionate digital artist exploring the intersection of technology and traditional art forms. Through vibrant illustrations and atmospheric compositions, I aim to create pieces that evoke emotion and tell stories without words.",
  shortBio: "Digital artist & illustrator based in India, creating atmospheric and evocative artwork.",
  profileImage: null,
  additionalImages: [],
  socialLinks: [
    { id: 1, platform: "instagram", url: "https://instagram.com/yourstruly.krishi", label: "Instagram" },
  ],
  skills: ["Digital Painting", "Illustration", "Concept Art", "Character Design", "Visual Storytelling"],
};

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  website: <Globe className="h-5 w-5" />,
};

export default async function AboutPage() {
  let about = fallbackAbout;

  try {
    const res = await getAbout();
    if (res?.data) {
      about = {
        headline: res.data.headline || fallbackAbout.headline,
        bio: res.data.bio || fallbackAbout.bio,
        shortBio: res.data.shortBio || fallbackAbout.shortBio,
        profileImage: res.data.profileImage || null,
        additionalImages: res.data.additionalImages || [],
        socialLinks: res.data.socialLinks?.length ? res.data.socialLinks : fallbackAbout.socialLinks,
        skills: res.data.skills?.length ? res.data.skills : fallbackAbout.skills,
      };
    }
  } catch {
    // Use fallback
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-24">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">About</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {about.headline}
          </h1>
        </FadeIn>
      </section>

      {/* Content Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Profile Image / Placeholder */}
          <FadeIn direction="left" className="lg:col-span-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface-raised">
              {about.profileImage ? (
                <Image
                  src={getStrapiImageUrl(about.profileImage.url)}
                  alt={about.profileImage.alternativeText || "Artist portrait"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <span className="font-mono text-8xl font-bold text-accent/20">K</span>
                    <p className="mt-4 text-xs text-text-muted">Artist Portrait</p>
                  </div>
                </div>
              )}
              {/* Decorative corner */}
              <div className="absolute right-4 top-4 h-12 w-12 border-r-2 border-t-2 border-accent/20" />
              <div className="absolute bottom-4 left-4 h-12 w-12 border-b-2 border-l-2 border-accent/20" />
            </div>
          </FadeIn>

          {/* Bio Content */}
          <div className="lg:col-span-3">
            <FadeIn delay={0.15}>
              <p className="text-lg leading-relaxed text-text-secondary sm:text-xl">
                {about.shortBio}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div
                className="prose prose-invert mt-8 max-w-none text-text-secondary prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-accent"
                dangerouslySetInnerHTML={{ __html: about.bio }}
              />
            </FadeIn>

            {/* Skills */}
            {about.skills && about.skills.length > 0 && (
              <FadeIn delay={0.25}>
                <div className="mt-12">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    Skills & Tools
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {about.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border px-4 py-1.5 text-sm text-text-secondary transition-colors hover:border-accent/40 hover:text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Social Links */}
            <FadeIn delay={0.3}>
              <div className="mt-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                  Find me online
                </p>
                <div className="mt-4 flex gap-4">
                  {about.socialLinks.map((link: SocialLink) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-text-secondary transition-all hover:border-accent hover:text-accent"
                      aria-label={link.label || link.platform}
                    >
                      {platformIcons[link.platform] || <Globe className="h-5 w-5" />}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.35}>
              <div className="mt-16 border-t border-border pt-10">
                <p className="text-lg text-foreground">
                  Interested in working together?
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-accent transition-colors hover:text-accent-light"
                >
                  Get in touch
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
