import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).admin.heading };
}

export default function AdminPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale).admin;

  return (
    <div className="container protected-page">
      <span className="protected-badge">Admin Only</span>
      <h1>{dict.heading}</h1>
      <p className="section-lead">{dict.lead}</p>
      <div className="info-grid">
        {dict.sections.map((section) => (
          <div key={section.title} className="info-card">
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </div>
        ))}
      </div>
      <p className="status-note" style={{ marginTop: "var(--space-4)" }}>{dict.note}</p>
    </div>
  );
}
