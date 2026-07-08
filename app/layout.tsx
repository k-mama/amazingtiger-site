import type { Metadata } from "next";
import { Forum, Jost, Inter } from "next/font/google";
import "./globals.css";

// Three-tier type system:
// - Forum: an elegant classical serif (matches the "Adios / Forum" request)
//   used for every content headline, h1-h4.
// - Jost: the free stand-in for "Athena" (geometric, Futura-style) — kept
//   only for the header wordmark/logotype as a distinct mark.
// - Inter: body copy, untouched — it was never flagged as inelegant.
const forum = Forum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

const headingSans = Jost({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-wordmark",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amazingtiger-site.pages.dev"),
  title: "Amazing Tiger Publishing — A Quiet Entrance",
  description:
    "Amazing Tiger Publishing is a refined entrance into Emma Kwon's publishing universe: books, memoirs, music, and rare voices, shaped with care.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ko: "/ko",
      "x-default": "/",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${forum.variable} ${headingSans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
