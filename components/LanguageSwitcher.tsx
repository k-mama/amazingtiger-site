"use client";

import Link from "next/link";
import { Suspense, useEffect, useId, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

function stripLocalePrefix(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(`/${locale}`.length) || "";
    }
  }
  return pathname === "/" ? "" : pathname;
}

/**
 * A small house mark, not a stock globe icon: a glossy champagne-gold
 * sphere (radial gradient + specular highlight, matching the site's
 * "Dream Glass" material) with a tilted meridian, two asymmetric latitude
 * arcs, and a single quiet off-axis trace etched into the surface, ending
 * in a coordinate dot just past the rim.
 */
function AmazingTigerGlobeMark() {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 28 28" width="27" height="27" aria-hidden="true">
      <defs>
        <radialGradient id={gradientId} cx="33%" cy="27%" r="78%">
          <stop offset="0%" style={{ stopColor: "var(--dg-gold-bright)" }} />
          <stop offset="58%" style={{ stopColor: "var(--color-gold)" }} />
          <stop offset="100%" style={{ stopColor: "var(--color-bronze)" }} />
        </radialGradient>
      </defs>

      <circle cx="14" cy="14" r="10" fill={`url(#${gradientId})`} />

      <g fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="14" cy="14" rx="3.6" ry="10" transform="rotate(-6 14 14)" />
        <path d="M7.2 10 Q14 8.1 20.8 10" />
        <path d="M8 18.6 Q14 20.1 20 18.6" />
        <path d="M6.5 19.5 C9.6 14.4 14.8 9.8 19.6 8.3" opacity="0.55" />
      </g>

      <ellipse
        cx="10.3"
        cy="8.8"
        rx="3.6"
        ry="2.1"
        fill="rgba(255,255,255,0.65)"
        transform="rotate(-20 10.3 8.8)"
      />

      <circle cx="23" cy="6.6" r="1.35" fill="var(--color-gold)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.6" />
    </svg>
  );
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <Suspense fallback={<LanguageSwitcherView locale={locale} query="" />}>
      <LanguageSwitcherWithQuery locale={locale} />
    </Suspense>
  );
}

// Isolated behind Suspense: useSearchParams() forces a client-side-only
// render for anything below it during static export unless it sits under a
// Suspense boundary — the fallback above keeps the switcher itself in the
// static HTML (just without query-string preservation) for crawlers and
// pre-hydration paint.
function LanguageSwitcherWithQuery({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  return <LanguageSwitcherView locale={locale} query={searchParams?.toString() ?? ""} />;
}

function LanguageSwitcherView({ locale, query }: { locale: Locale; query: string }) {
  const pathname = usePathname() || "/";
  const subpath = stripLocalePrefix(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const hrefFor = (target: Locale) => {
    const path = target === "en" ? (subpath === "" ? "/" : `/en${subpath}`) : `/${target}${subpath}`;
    return query ? `${path}?${query}` : path;
  };

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lang-switch" ref={rootRef}>
      <button
        type="button"
        className="lang-switch__trigger"
        aria-label="Change language"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <AmazingTigerGlobeMark />
      </button>
      {open && (
        <div className="lang-switch__menu" role="menu">
          {locales.map((l) => (
            <Link
              key={l}
              href={hrefFor(l)}
              role="menuitem"
              lang={l}
              className={`lang-switch__option ${l === locale ? "is-active" : ""}`}
              aria-current={l === locale ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {localeNames[l]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
