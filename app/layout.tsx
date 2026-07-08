import type { Metadata } from "next";
import { Forum, Bodoni_Moda, Manrope, Inter } from "next/font/google";
import "./globals.css";

// Four-tier type system:
// - Forum: an elegant classical serif for every content headline, h1-h4.
// - Bodoni Moda: the wordmark's "Amazing Tiger" line. Cormorant Garamond
//   read as a classic literary archive rather than a cinematic, editorial,
//   modern-luxury mark — Bodoni Moda's high-contrast, fashion-editorial
//   strokes are the deliberate replacement (medium weight, not the thin
//   optical cut, so it stays confident rather than delicate).
// - Manrope: the wordmark's "PUBLISHING" line — a quiet, geometric,
//   supporting-cast sans, medium weight, wide tracking, uppercase.
// - Inter: body copy and main navigation, untouched.
const displaySerif = Forum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

const wordmarkSerif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-wordmark-serif",
  display: "swap",
});

const wordmarkSans = Manrope({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-wordmark-sans",
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
      className={`${displaySerif.variable} ${wordmarkSerif.variable} ${wordmarkSans.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
