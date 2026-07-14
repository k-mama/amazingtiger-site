import type { Metadata } from "next";
import { locales, type Locale } from "./config";

/**
 * Per-page canonical + hreflang alternates. `suffix` is the path after the
 * locale segment — "" for a locale's home page, "/founder", "/shop/some-slug",
 * etc. Every page's own generateMetadata must pass its real suffix here;
 * without it, Next.js silently inherits the layout's locale-root alternates
 * for every sub-page, which tells search engines every page is a duplicate
 * of the locale homepage.
 */
export function localeAlternates(locale: Locale, suffix = ""): Metadata["alternates"] {
  const pathFor = (l: Locale) => (l === "en" && suffix === "" ? "/" : `/${l}${suffix}`);

  const languages: Record<string, string> = { "x-default": pathFor("en") };
  for (const l of locales) languages[l] = pathFor(l);

  return {
    canonical: pathFor(locale),
    languages,
  };
}

/** Applied to private/transactional pages that should never be indexed. */
export const noIndex: Metadata["robots"] = {
  index: false,
  follow: false,
};
