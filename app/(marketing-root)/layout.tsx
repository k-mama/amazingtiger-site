import type { Metadata } from "next";
import { locales } from "@/lib/i18n/config";
import { fontVariables } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://amazingtiger-site.pages.dev"),
  title: "Amazing Tiger Publishing — A Quiet Entrance",
  description:
    "Amazing Tiger Publishing is a refined entrance into Emma Kwon's publishing universe: books, memoirs, music, and rare voices, shaped with care.",
  alternates: {
    canonical: "/",
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, l === "en" ? "/en" : `/${l}`])),
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Amazing Tiger Publishing",
    title: "Amazing Tiger Publishing — A Quiet Entrance",
    description:
      "Amazing Tiger Publishing is a refined entrance into Emma Kwon's publishing universe: books, memoirs, music, and rare voices, shaped with care.",
    images: [{ url: "/images/homepage/editorial/emma-kwon-at-work.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazing Tiger Publishing — A Quiet Entrance",
    description:
      "Amazing Tiger Publishing is a refined entrance into Emma Kwon's publishing universe: books, memoirs, music, and rare voices, shaped with care.",
    images: ["/images/homepage/editorial/emma-kwon-at-work.webp"],
  },
};

export default function MarketingRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
