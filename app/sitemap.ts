import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { getAllProducts } from "@/lib/shop/products";

const SITE_URL = "https://amazingtiger-site.pages.dev";

// Only public, indexable marketing/catalogue pages — private or
// transactional routes (cart, checkout, login, signup, dashboard, admin)
// are excluded here and marked noindex in their own page metadata.
const staticPaths = [
  "",
  "/atelier",
  "/consultation",
  "/shop",
  "/projects/born-rare",
  "/journal/the-sentence-we-refused-to-improve",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const productPaths = getAllProducts().map((product) => `/shop/${product.slug}`);
  const paths = [...staticPaths, ...productPaths];

  const urls: MetadataRoute.Sitemap = [];
  for (const path of paths) {
    for (const locale of locales) {
      const url = locale === "en" && path === "" ? `${SITE_URL}/` : `${SITE_URL}/${locale}${path}`;
      urls.push({ url });
    }
  }
  return urls;
}
