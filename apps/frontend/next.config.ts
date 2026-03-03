import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      ...((() => {
        const strapiUrl =
          process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_PUBLIC_URL;
        if (strapiUrl && !strapiUrl.includes("localhost")) {
          try {
            const url = new URL(strapiUrl);
            return [
              {
                protocol: url.protocol.replace(":", "") as "http" | "https",
                hostname: url.hostname,
                pathname: "/uploads/**",
              },
            ];
          } catch {
            return [];
          }
        }
        return [];
      })()),
    ],
  },
};

export default nextConfig;
