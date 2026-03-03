export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface Artwork {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string | null;
  image: StrapiImage;
  additionalImages: StrapiImage[];
  categories: Category[];
  medium: string | null;
  dimensions: string | null;
  year: number | null;
  isFeatured: boolean;
  sortOrder: number;
  tags: string[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
}

export interface SocialLink {
  id: number;
  platform: "instagram" | "twitter" | "behance" | "artstation" | "deviantart" | "youtube" | "tiktok" | "linkedin" | "website";
  url: string;
  label: string | null;
}

export interface About {
  id: number;
  documentId: string;
  headline: string;
  bio: string;
  shortBio: string;
  profileImage: StrapiImage;
  additionalImages: StrapiImage[];
  socialLinks: SocialLink[];
  skills: string[] | null;
}

export interface Homepage {
  id: number;
  documentId: string;
  heroTitle: string;
  heroSubtitle: string | null;
  heroImage: StrapiImage | null;
  featuredArtworks: Artwork[];
  aboutPreviewText: string | null;
  ctaText: string | null;
  ctaLink: string | null;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
  inquiryType: "commission" | "collaboration" | "print-purchase" | "general";
}
