import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";

// Rounded, friendly display face — replaces the earlier literary serif to
// match the site's shift toward a warmer, more playful (but still
// restrained) colourful identity. Capped at 600 so headings stay composed
// rather than tipping into a bubbly, childish register.
const headingFont = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
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
    <html lang="en" className={`${headingFont.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
