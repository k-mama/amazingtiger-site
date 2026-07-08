import type { Locale } from "./config";
import type { Dictionary } from "./types";
import en from "./dictionaries/en";
import ko from "./dictionaries/ko";

const dictionaries: Record<Locale, Dictionary> = { en, ko };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
