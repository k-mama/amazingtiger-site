import type { ReactNode } from "react";

interface DreamGlassIconProps {
  tone: string;
  children: ReactNode;
}

/** A small colourful glass tile that hosts one abstract service glyph. */
export default function DreamGlassIcon({ tone, children }: DreamGlassIconProps) {
  return (
    <div className="dg-icon-tile" style={{ ["--tile-tone" as string]: tone }}>
      {children}
    </div>
  );
}

const glyphProps = {
  viewBox: "0 0 24 24",
  width: 22,
  height: 22,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.35,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/**
 * Twelve abstract marks — not literal pictograms — built from the same
 * vocabulary as the AmazingTigerGlobeMark (rings, thin lines, arcs, dots)
 * so the Atelier service tiles read as one custom family, not a stock
 * icon set.
 */
export const AtelierGlyphs = {
  Memoirs: () => (
    <svg {...glyphProps}>
      <path d="M8 6C5 8 5 16 8 18" />
      <path d="M16 6c3 2 3 10 0 12" />
    </svg>
  ),
  FounderStories: () => (
    <svg {...glyphProps}>
      <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 9.3v5" />
      <path d="M8 17c1.5-1.3 6.5-1.3 8 0" />
    </svg>
  ),
  BrandBooks: () => (
    <svg {...glyphProps}>
      <rect x="8" y="8" width="8" height="8" rx="1.6" transform="rotate(45 12 12)" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  ArtistBooks: () => (
    <svg {...glyphProps}>
      <path d="M6.5 17c2.7-5.6 5.6-8.7 10-11" />
      <circle cx="17" cy="6" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  ChildrensBooks: () => (
    <svg {...glyphProps}>
      <path d="M12 8c0 2.4.9 3.3 3.3 3.3-2.4 0-3.3.9-3.3 3.3 0-2.4-.9-3.3-3.3-3.3C11.1 11.3 12 10.4 12 8z" />
      <path d="M12 4.3v1.4M12 18.3v1.4M4.3 12h1.4M18.3 12h1.4" opacity="0.6" />
    </svg>
  ),
  AiAssisted: () => (
    <svg {...glyphProps}>
      <circle cx="7.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
      <path d="M7.5 14.5C9.5 10 14.5 10 16.5 14.5" opacity="0.55" />
    </svg>
  ),
  Multilingual: () => (
    <svg {...glyphProps}>
      <circle cx="9.6" cy="12" r="5" />
      <circle cx="14.4" cy="12" r="5" />
    </svg>
  ),
  KdpPackages: () => (
    <svg {...glyphProps}>
      <path d="M8.5 6H6v12h2.5" />
      <path d="M15.5 6H18v12h-2.5" />
    </svg>
  ),
  AuthorWebsites: () => (
    <svg {...glyphProps}>
      <circle cx="12" cy="12" r="6" />
      <path d="M12 6v12" opacity="0.7" />
      <path d="M6.4 9.6h11.2" opacity="0.45" />
    </svg>
  ),
  LaunchAssets: () => (
    <svg {...glyphProps}>
      <path d="M7 17 17 7" />
      <circle cx="17" cy="7" r="1.4" fill="currentColor" stroke="none" />
      <path d="M7 17v-4.3M7 17h4.3" opacity="0.55" />
    </svg>
  ),
  DesignSystems: () => (
    <svg {...glyphProps}>
      <circle cx="8" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="8" cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="15" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  PrivateConsultation: () => (
    <svg {...glyphProps}>
      <path d="M9 8.5c-1.8 1.3-1.8 5.7 0 7" />
      <path d="M14 8.5c-1.8 1.3-1.8 5.7 0 7" />
    </svg>
  ),
};

export type AtelierGlyphKey = keyof typeof AtelierGlyphs;

/** The 12 AtelierGlyphs values, in dictionary/service order. */
export const atelierGlyphList = Object.values(AtelierGlyphs);

/** Pastel cycle used to tint icon tiles, cards, and object marks. */
export const dreamGlassTones = [
  "var(--dg-aqua)",
  "var(--dg-rose)",
  "var(--dg-lemon)",
  "var(--dg-lavender)",
  "var(--dg-peach)",
  "var(--dg-periwinkle)",
  "var(--dg-mint)",
  "var(--dg-turquoise)",
];
