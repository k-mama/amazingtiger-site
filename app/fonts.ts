import { Forum, Bodoni_Moda, Manrope, Inter } from "next/font/google";

// Four-tier type system, shared by both root layouts ((marketing-root) and
// (intl)/[locale]) so next/font's font loaders are only ever called once:
// - Forum: an elegant classical serif for every content headline, h1-h4.
// - Bodoni Moda: the wordmark's "Amazing Tiger" line. Cormorant Garamond
//   read as a classic literary archive rather than a cinematic, editorial,
//   modern-luxury mark — Bodoni Moda's high-contrast, fashion-editorial
//   strokes are the deliberate replacement (medium weight, not the thin
//   optical cut, so it stays confident rather than delicate).
// - Manrope: the wordmark's "PUBLISHING" line — a quiet, geometric,
//   supporting-cast sans, medium weight, wide tracking, uppercase.
// - Inter: body copy and main navigation, untouched.
export const displaySerif = Forum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

export const wordmarkSerif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-wordmark-serif",
  display: "swap",
});

export const wordmarkSans = Manrope({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-wordmark-sans",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = `${displaySerif.variable} ${wordmarkSerif.variable} ${wordmarkSans.variable} ${inter.variable}`;
