interface WordmarkLogoProps {
  /** Unique per render site (Header vs. MobileMenu) to avoid duplicate SVG gradient ids in the same document. */
  idSuffix: string;
}

/**
 * The header logotype, rendered as hollow (fill: none) SVG text with a
 * gradient stroke — matches the requested outlined, multi-colour wordmark
 * treatment. `textLength` + `lengthAdjust` pin the text to an exact width
 * regardless of font metrics, so there's no risk of it clipping or leaving
 * an odd gap no matter how the browser measures the underlying font.
 */
export default function WordmarkLogo({ idSuffix }: WordmarkLogoProps) {
  const gradientId = `wordmark-gradient-${idSuffix}`;

  return (
    <svg
      viewBox="0 0 272 22"
      className="wordmark__svg"
      role="img"
      aria-label="Amazing Tiger Publishing"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--dg-turquoise)" />
          <stop offset="55%" stopColor="var(--dg-mint)" />
          <stop offset="100%" stopColor="var(--dg-lemon)" />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="16"
        textLength="270"
        lengthAdjust="spacingAndGlyphs"
        className="wordmark__text"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
      >
        AMAZING TIGER PUBLISHING
      </text>
    </svg>
  );
}
