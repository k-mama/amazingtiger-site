"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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
 * A small house mark, not a stock globe icon: an outer seal circle, one
 * tilted meridian, two asymmetric latitude arcs, and a single quiet
 * off-axis trace (a route line / spine curve) ending in a champagne
 * coordinate dot. Reads as "globe" at a glance, but the diagonal trace
 * and dot are what make it Amazing Tiger's, not a UI kit's.
 */
function AmazingTigerGlobeMark() {
  return (
    <svg
      viewBox="0 0 28 28"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="10" vectorEffect="non-scaling-stroke" />
      <ellipse
        cx="14"
        cy="14"
        rx="3.6"
        ry="10"
        transform="rotate(-6 14 14)"
        vectorEffect="non-scaling-stroke"
      />
      <path d="M7.2 10 Q14 8.1 20.8 10" vectorEffect="non-scaling-stroke" />
      <path d="M8 18.6 Q14 20.1 20 18.6" vectorEffect="non-scaling-stroke" />
      <path
        d="M6.5 19.5 C9.6 14.4 14.8 9.8 19.6 8.3"
        opacity="0.6"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="23" cy="6.6" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const subpath = stripLocalePrefix(pathname);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const hrefFor = (target: Locale) => {
    if (target === "en") {
      return subpath === "" ? "/" : `/en${subpath}`;
    }
    return `/ko${subpath}`;
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
