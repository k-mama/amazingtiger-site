import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import ConsultationForm from "@/components/ConsultationForm";
import AmbientBackdrop from "@/components/AmbientBackdrop";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).consultationPage.heading };
}

export default function ConsultationPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale).consultationPage;

  return (
    <div className="section" style={{ position: "relative", overflow: "hidden" }}>
      <AmbientBackdrop
        blobs={[
          { color: "rgba(228,218,247,0.7)", size: 340, top: "-100px", left: "8%" },
          { color: "rgba(251,240,195,0.6)", size: 300, top: "-60px", right: "6%" },
        ]}
      />
      <div className="container" style={{ position: "relative", maxWidth: "640px" }}>
        <span className="eyebrow">{dict.eyebrow}</span>
        <h1 className="section-heading">{dict.heading}</h1>
        <p className="section-lead" style={{ marginBottom: "var(--space-4)" }}>{dict.lead}</p>
        <div className="glass-panel glass-panel--solid" style={{ padding: "var(--space-4)" }}>
          <ConsultationForm dict={dict} />
        </div>
      </div>
    </div>
  );
}
