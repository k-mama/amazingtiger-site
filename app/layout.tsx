import type { Metadata } from "next";
import { Source_Serif_4, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

// Three-tier type system:
// - Source Serif 4: an elegant modern serif for every content headline,
//   h1-h4. Replaces Forum — Forum's eccentric classical proportions read
//   as mismatched next to Inter's neutral body text. Source Serif 4 is
//   built by the same team as Inter's sibling (Source Sans) specifically
//   to pair with a grotesque sans body, so it resolves that clash.
// - Space Grotesk: a geometric sans with a distinct, currently-trending
//   global-brand character — used only for the header wordmark/logotype.
// - Inter: body copy, untouched — it was never flagged as inelegant.
const displaySerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const headingSans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
