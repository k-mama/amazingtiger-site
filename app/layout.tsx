import type { Metadata } from "next";
import { Forum, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

// Three-tier type system:
// - Forum: an elegant classical serif for every content headline, h1-h4.
// - Cormorant Garamond: the entire wordmark, both the "Amazing Tiger" line
//   and the "PUBLISHING" line. Pairing a serif headline with a separate
//   sans-serif subtitle (Jost) read as two unrelated logos stacked together
//   and made consistent sizing hard to judge — a single refined Garamond
//   revival across both lines, differentiated only by size, weight, and
//   tracking, is the classic literary-press colophon pattern (name above,
//   small tracked caps subtitle below) and reads as one coherent mark.
// - Inter: body copy, untouched.
const displaySerif = Forum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

const wordmarkSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-wordmark-serif",
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
    <html
      lang="en"
      className={`${displaySerif.variable} ${wordmarkSerif.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
