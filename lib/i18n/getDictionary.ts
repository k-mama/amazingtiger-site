import type { Locale } from "./config";
import type { Dictionary } from "./types";
import en from "./dictionaries/en";
import ko from "./dictionaries/ko";
import es from "./dictionaries/es";
import esCO from "./dictionaries/es-CO";
import ptBR from "./dictionaries/pt-BR";

const dictionaries: Record<Locale, Dictionary> = { en, ko, es, "es-CO": esCO, "pt-BR": ptBR };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
