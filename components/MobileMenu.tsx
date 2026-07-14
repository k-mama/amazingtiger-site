"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import AuthNavLink from "./AuthNavLink";
import LanguageSwitcher from "./LanguageSwitcher";
import WordmarkLogo from "./WordmarkLogo";
import { useDialogFocus } from "./useDialogFocus";

interface MobileMenuProps {
  locale: Locale;
  dict: Dictionary;
  basePath: string;
}

export default function MobileMenu({ locale, dict, basePath }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const navBase = basePath === "/" ? "/en" : basePath;
  const anchor = (id: string) => `${basePath === "/" ? "" : basePath}#${id}`;

  useDialogFocus(open, panelRef);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const links = [
    { label: dict.nav.home, href: basePath },
    { label: dict.nav.house, href: anchor("house") },
    { label: dict.nav.founder, href: `${navBase}/founder` },
    { label: dict.nav.atelier, href: `${navBase}/atelier` },
    { label: dict.nav.shop, href: `${navBase}/shop` },
    { label: dict.nav.membership, href: anchor("membership") },
    { label: dict.nav.consultation, href: `${navBase}/consultation` },
  ];

  return (
    <>
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <span className="mobile-menu-toggle-line" />
        Menu
      </button>

      {open &&
        createPortal(
          // Portalled to <body> because `.site-header` uses backdrop-filter,
          // which establishes a new containing block for descendant
          // position:fixed elements — without the portal this panel would
          // be clipped to the header's own small box instead of the screen.
          <div className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Site menu" ref={panelRef}>
            <div className="mobile-menu-panel__inner">
              <div className="mobile-menu-panel__header">
                <span className="wordmark">
                  <WordmarkLogo />
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <LanguageSwitcher locale={locale} />
                  <button
                    type="button"
                    className="mobile-menu-panel__close"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
              </div>

              <ul className="mobile-menu-panel__links">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} onClick={() => setOpen(false)}>
                      {link.label}
                      <span className="mobile-menu-panel__dot" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mobile-menu-panel__foot">
                <AuthNavLink
                  navBase={navBase}
                  loginLabel={dict.nav.login}
                  dashboardLabel={dict.nav.dashboard}
                  className="site-nav__login"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
