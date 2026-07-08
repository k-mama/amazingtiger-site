"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

/**
 * The root <html lang="en"> is fixed at build time in app/layout.tsx because
 * that layout sits above the [locale] segment and never receives its params.
 * This keeps the lang attribute correct for /ko pages without middleware.
 */
export default function LocaleHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
