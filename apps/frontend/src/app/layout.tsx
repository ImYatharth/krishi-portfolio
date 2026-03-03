import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "yourstruly.krishi | Digital Art & Illustration",
  description:
    "Portfolio of Krishi — a digital artist and illustrator specializing in dark, atmospheric artwork. Explore a curated collection of illustrations, concept art, and visual storytelling.",
  keywords: [
    "digital art",
    "illustration",
    "dark art",
    "portfolio",
    "concept art",
    "krishi",
    "digital illustration",
    "visual art",
  ],
  authors: [{ name: "Krishi" }],
  creator: "Krishi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourstruly-krishi.com",
    siteName: "yourstruly.krishi",
    title: "yourstruly.krishi | Digital Art & Illustration",
    description:
      "Portfolio of Krishi — a digital artist and illustrator specializing in dark, atmospheric artwork.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "yourstruly.krishi — Digital Art Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "yourstruly.krishi | Digital Art & Illustration",
    description:
      "Portfolio of Krishi — a digital artist and illustrator specializing in dark, atmospheric artwork.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-[#0A0A0A] font-sans antialiased`}
      >
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
