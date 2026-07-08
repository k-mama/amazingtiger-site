import type { Metadata } from "next";
import { Forum, Prata, Inter } from "next/font/google";
import "./globals.css";

// Three-tier type system:
// - Forum: an elegant classical serif for every content headline, h1-h4.
// - Prata: the two-line wordmark ("Amazing Tiger" / "Publishing"). "Amagro"
//   was requested but isn't on Google Fonts — Prata is the closest free
//   match: the same confident, moderate-contrast bracketed-serif display
//   character.
// - Inter: body copy, untouched.
const displaySerif = Forum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

const headingSans = Prata({
  subsets: ["latin"],
  weight: ["400"],
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
    <html lang="en" className={`${displaySerif.variable} ${headingSans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
