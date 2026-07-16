import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  lead?: string;
  children?: ReactNode;
  /** Defaults to h1 — pass "h2" for a hero nested inside a larger page (e.g. a section, not the page itself). */
  as?: "h1" | "h2";
}

// The eyebrow / heading / lead triple was hand-rolled identically across
// shop, product detail, cart, checkout, and the founder/atelier pages.
// One shared component so every page's header rhythm stays in sync.
export default function PageHero({ eyebrow, heading, lead, children, as = "h1" }: PageHeroProps) {
  const Heading = as;
  return (
    <>
      <span className="eyebrow">{eyebrow}</span>
      <Heading className="section-heading">{heading}</Heading>
      {lead && <p className="section-lead">{lead}</p>}
      {children}
    </>
  );
}
