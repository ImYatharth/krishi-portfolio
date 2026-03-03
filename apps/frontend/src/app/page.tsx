import { getHomepage } from "@/lib/queries";
import type { Homepage } from "@/lib/types";
import Hero from "@/components/sections/Hero";
import FeaturedWorks from "@/components/sections/FeaturedWorks";
import AboutPreview from "@/components/sections/AboutPreview";
import ContactCTA from "@/components/sections/ContactCTA";

const fallbackHomepage: Omit<Homepage, "id" | "documentId"> = {
  heroTitle: "yourstruly.krishi",
  heroSubtitle: "Digital Art & Illustration",
  heroImage: null,
  featuredArtworks: [],
  aboutPreviewText:
    "A digital artist exploring the boundaries of illustration and visual storytelling.",
  ctaText: "Explore Gallery",
  ctaLink: "/gallery",
};

async function getPageData() {
  try {
    const res = await getHomepage();
    return res.data;
  } catch {
    return null;
  }
}

export default async function Home() {
  const data = await getPageData();

  const heroTitle = data?.heroTitle || fallbackHomepage.heroTitle;
  const heroSubtitle = data?.heroSubtitle ?? fallbackHomepage.heroSubtitle;
  const heroImage = data?.heroImage ?? fallbackHomepage.heroImage;
  const featuredArtworks =
    data?.featuredArtworks ?? fallbackHomepage.featuredArtworks;
  const aboutPreviewText =
    data?.aboutPreviewText ?? fallbackHomepage.aboutPreviewText;
  const ctaText = data?.ctaText ?? fallbackHomepage.ctaText;
  const ctaLink = data?.ctaLink ?? fallbackHomepage.ctaLink;

  return (
    <>
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        heroImage={heroImage}
        ctaText={ctaText}
        ctaLink={ctaLink}
      />

      <FeaturedWorks artworks={featuredArtworks} />

      {aboutPreviewText && <AboutPreview text={aboutPreviewText} />}

      <ContactCTA />
    </>
  );
}
