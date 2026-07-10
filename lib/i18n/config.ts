// Active locales are the only ones wired into routing (generateStaticParams,
// the language switcher, dictionaries). This is the single source of truth
// for what actually ships.
export const activeLocales = ["en", "en-GB", "ko", "ja", "zh-TW", "zh-CN", "es", "es-CO", "pt-BR"] as const;
export type Locale = (typeof activeLocales)[number];

// Alias kept for readability at call sites (Header, Footer, LanguageSwitcher).
export const locales = activeLocales;

export const defaultLocale: Locale = "en";

// Reserved for later expansion. Not wired into routing, generateStaticParams,
// or the language switcher yet. To activate one, see the "Adding a new
// language later" section in README.md.
export const plannedLocales = ["hi", "fr", "de", "ar"] as const;

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  "en-GB": "UK",
  ko: "KR",
  ja: "JP",
  "zh-TW": "TW",
  "zh-CN": "CN",
  es: "ES",
  "es-CO": "CO",
  "pt-BR": "BR",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  "en-GB": "English (UK)",
  ko: "한국어",
  ja: "日本語",
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
  es: "Español",
  "es-CO": "Español (Colombia)",
  "pt-BR": "Português (Brasil)",
};

export function isLocale(value: string): value is Locale {
  return (activeLocales as readonly string[]).includes(value);
}
