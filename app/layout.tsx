import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter/wght.css";
import { site } from "@/src/config/site";
import "./globals.css";

const title = `${site.profile.name} | Links`;
const { description, siteUrl } = site.seo;
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;
const images = metadataBase
  ? [{ url: "/images/social-preview.png", width: 1200, height: 630, alt: `${site.profile.name} · ${site.profile.bio}` }]
  : undefined;

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  openGraph: { type: "website", title, description, url: metadataBase, images },
  twitter: { card: images ? "summary_large_image" : "summary", title, description, images },
};

export const viewport: Viewport = { themeColor: "#F5F2EC", colorScheme: "light", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
