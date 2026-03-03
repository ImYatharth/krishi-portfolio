import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiImageUrl(url: string | null | undefined): string {
  if (!url) return "/placeholder.jpg";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${url}`;
}

export function formatYear(year: number | null | undefined): string {
  if (!year) return "";
  return year.toString();
}
