import type { Locale } from "./config";
import type { Dictionary } from "./types";
import en from "./dictionaries/en";
import enGB from "./dictionaries/en-GB";
import ko from "./dictionaries/ko";
import ja from "./dictionaries/ja";
import zhTW from "./dictionaries/zh-TW";
import zhCN from "./dictionaries/zh-CN";
import es from "./dictionaries/es";
import esCO from "./dictionaries/es-CO";
import ptBR from "./dictionaries/pt-BR";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  "en-GB": enGB,
  ko,
  ja,
  "zh-TW": zhTW,
  "zh-CN": zhCN,
  es,
  "es-CO": esCO,
  "pt-BR": ptBR,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
