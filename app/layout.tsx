import type { Metadata } from "next";
import { Forum, Jost, Inter } from "next/font/google";
import "./globals.css";

// Three-tier type system:
// - Forum: an elegant classical serif for every content headline, h1-h4.
// - Jost: the two-line wordmark ("Amazing Tiger" / "Publishing"). "Athena"
//   (Jade Brand Studio) was requested again but is still a paid font with
//   no licensed file available — Jost remains the closest free match:
//   tall, geometric, single-story "a", Futura-style proportions.
// - Inter: body copy, untouched.
const displaySerif = Forum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
  display: "swap",
});

const headingSans = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
