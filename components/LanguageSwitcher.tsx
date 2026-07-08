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

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <ellipse cx="12" cy="12" rx="3.4" ry="8" />
      <line x1="4.3" y1="8.4" x2="19.7" y2="8.4" />
      <line x1="4.3" y1="15.6" x2="19.7" y2="15.6" />
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
        <GlobeIcon />
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
