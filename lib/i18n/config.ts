// Active locales are the only ones wired into routing (generateStaticParams,
// the language switcher, dictionaries). This is the single source of truth
// for what actually ships.
export const activeLocales = ["en", "ko"] as const;
export type Locale = (typeof activeLocales)[number];

// Alias kept for readability at call sites (Header, Footer, LanguageSwitcher).
export const locales = activeLocales;

export const defaultLocale: Locale = "en";

// Reserved for later expansion. Not wired into routing, generateStaticParams,
// or the language switcher yet. To activate one, see the "Adding a new
// language later" section in README.md.
export const plannedLocales = ["es", "ja", "hi", "zh-TW", "fr", "de", "pt-BR", "ar"] as const;

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ko: "KR",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
};

export function isLocale(value: string): value is Locale {
  return (activeLocales as readonly string[]).includes(value);
}
