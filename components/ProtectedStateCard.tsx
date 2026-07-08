import Link from "next/link";

interface ProtectedStateCardProps {
  badge?: string;
  heading?: string;
  lead: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/** Centered Dream Glass card for auth-gated states (checking / signed out /
 * not authorized) on the dashboard and admin pages — matches the auth-card
 * layout used by login/signup instead of the page-width heading pattern. */
export default function ProtectedStateCard({ badge, heading, lead, ctaLabel, ctaHref }: ProtectedStateCardProps) {
  return (
    <div className="container">
      <div className="protected-card">
        {badge && <span className="protected-badge">{badge}</span>}
        {heading && <h1>{heading}</h1>}
        <p className="section-lead">{lead}</p>
        {ctaLabel && ctaHref && (
          <Link href={ctaHref} className="btn btn-primary">
            {ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
