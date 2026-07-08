"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n/config";

function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length) || "";
    }
  }
  return pathname === "/" ? "" : pathname;
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const subpath = stripLocalePrefix(pathname);

  const hrefFor = (target: Locale) => {
    if (target === "en") {
      return subpath === "" ? "/" : `/en${subpath}`;
    }
    return `/ko${subpath}`;
  };

  return (
    <nav className="lang-switch" aria-label="Language">
      {locales.map((l, i) => (
        <span key={l} className="lang-switch__item">
          {i > 0 && <span className="lang-switch__divider">/</span>}
          <Link
            href={hrefFor(l)}
            className={`lang-switch__link ${l === locale ? "is-active" : ""}`}
            aria-current={l === locale ? "true" : undefined}
          >
            {localeLabels[l]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
