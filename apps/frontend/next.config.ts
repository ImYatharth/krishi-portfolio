import type { NextConfig } from "next";

function strapiImagePatterns() {
  const patterns: NextConfig["images"] extends { remotePatterns?: infer R } ? NonNullable<R> : never = [
    {
      protocol: "http" as const,
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**",
    },
  ];

  // Production Strapi URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_PUBLIC_URL;
  if (strapiUrl && !strapiUrl.includes("localhost")) {
    try {
      const url = new URL(strapiUrl);
      patterns.push({
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        pathname: "/uploads/**",
      });
    } catch {
      // Invalid URL, skip
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: strapiImagePatterns(),
  },
};

export default nextConfig;
