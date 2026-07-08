import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: getDictionary(params.locale).atelierPage.heading };
}

export default function AtelierPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale).atelierPage;
  const navBase = `/${locale}`;

  return (
    <>
      <section className="shop-hero">
        <div className="container">
          <span className="eyebrow">{dict.eyebrow}</span>
          <h1 className="section-heading">{dict.heading}</h1>
          <p className="section-lead">{dict.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "start" }}>
            {dict.intro.map((paragraph, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="section-lead">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: "1px solid var(--color-stone-line)" }}>
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.servicesHeading}</h2>
            <p className="section-lead">{dict.servicesLead}</p>
          </Reveal>
          <div className="info-grid">
            {dict.services.map((service, i) => (
              <Reveal key={service.title} delay={(i % 3) * 70}>
                <div className="info-card">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.forHeading}</span>
            <p style={{ maxWidth: "620px" }}>{dict.forBody}</p>
            <Link href={`${navBase}/consultation`} className="btn btn-gold" style={{ marginTop: "1rem" }}>
              {dict.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <p className="status-note">{dict.note}</p>
        </div>
      </section>
    </>
  );
}
