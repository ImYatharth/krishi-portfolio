import { fetchStrapi } from "./strapi";
import type { Artwork, Category, About, Homepage, ContactSubmission } from "./types";

export async function getHomepage() {
  return fetchStrapi<Homepage>("/homepage", {
    "populate": "*",
  }, { tags: ["homepage"] });
}

export async function getArtworks(params?: {
  category?: string;
  page?: number;
  pageSize?: number;
  featured?: boolean;
}) {
  const queryParams: Record<string, string> = {
    "populate": "*",
    "sort": "sortOrder:asc,createdAt:desc",
    "pagination[page]": String(params?.page || 1),
    "pagination[pageSize]": String(params?.pageSize || 24),
  };

  if (params?.category) {
    queryParams["filters[categories][slug][$eq]"] = params.category;
  }
  if (params?.featured) {
    queryParams["filters[isFeatured][$eq]"] = "true";
  }

  return fetchStrapi<Artwork[]>("/artworks", queryParams, { tags: ["artworks"] });
}

export async function getArtworkBySlug(slug: string) {
  const res = await fetchStrapi<Artwork[]>("/artworks", {
    "filters[slug][$eq]": slug,
    "populate": "*",
  }, { tags: [`artwork-${slug}`] });
  return res.data?.[0] ?? null;
}

export async function getCategories() {
  return fetchStrapi<Category[]>("/categories", {
    "sort": "sortOrder:asc",
  }, { tags: ["categories"], revalidate: 300 });
}

export async function getAbout() {
  return fetchStrapi<About>("/about", {
    "populate": "*",
  }, { tags: ["about"], revalidate: 300 });
}

export async function getAllArtworkSlugs() {
  const res = await fetchStrapi<Artwork[]>("/artworks", {
    "fields[0]": "slug",
    "pagination[pageSize]": "100",
  }, { tags: ["artworks"] });
  return res.data.map((a) => a.slug);
}

export async function submitContactForm(data: ContactSubmission) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error("Submission failed");
  return res.json();
}
