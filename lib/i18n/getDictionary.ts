import type { Locale } from "./config";
import type { Dictionary } from "./types";
import en from "./dictionaries/en";
import ko from "./dictionaries/ko";
import es from "./dictionaries/es";
import esCO from "./dictionaries/es-CO";
import ptBR from "./dictionaries/pt-BR";
import ja from "./dictionaries/ja";
import zhTW from "./dictionaries/zh-TW";
import zhCN from "./dictionaries/zh-CN";
import enGB from "./dictionaries/en-GB";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ko,
  es,
  "es-CO": esCO,
  "pt-BR": ptBR,
  ja,
  "zh-TW": zhTW,
  "zh-CN": zhCN,
  "en-GB": enGB,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
