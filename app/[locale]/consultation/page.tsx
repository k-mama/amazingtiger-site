import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import ConsultationForm from "@/components/ConsultationForm";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).consultationPage.heading };
}

export default function ConsultationPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale).consultationPage;

  return (
    <div className="container section" style={{ maxWidth: "640px" }}>
      <span className="eyebrow">{dict.eyebrow}</span>
      <h1 className="section-heading">{dict.heading}</h1>
      <p className="section-lead" style={{ marginBottom: "var(--space-4)" }}>{dict.lead}</p>
      <ConsultationForm dict={dict} />
    </div>
  );
}
