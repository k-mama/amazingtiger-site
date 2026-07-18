import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/seo";
import Reveal from "@/components/Reveal";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import DreamGlassIcon, { atelierGlyphList, dreamGlassTones } from "@/components/DreamGlassIcon";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return {
    title: getDictionary(params.locale).atelierPage.heading,
    alternates: localeAlternates(params.locale, "/atelier"),
  };
}

export default function AtelierPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale).atelierPage;
  const navBase = `/${locale}`;

  return (
    <>
      <section className="shop-hero">
        <AmbientBackdrop
          blobs={[
            { color: "rgba(228,220,201,0.24)", size: 380, top: "-120px", right: "-60px" },
            { color: "rgba(201,169,122,0.18)", size: 320, bottom: "-140px", left: "6%" },
          ]}
        />
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

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.servicesHeading}</h2>
            <p className="section-lead">{dict.servicesLead}</p>
          </Reveal>
          <div className="info-grid">
            {dict.services.map((service, i) => {
              const Glyph = atelierGlyphList[i % atelierGlyphList.length];
              const tone = dreamGlassTones[i % dreamGlassTones.length];
              return (
                <Reveal key={service.title} delay={(i % 3) * 70}>
                  <div className="info-card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <DreamGlassIcon tone={tone}>
                      <Glyph />
                    </DreamGlassIcon>
                    <div>
                      <h3 style={{ marginBottom: "0.3rem" }}>{service.title}</h3>
                      <p style={{ margin: 0 }}>{service.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.process.heading}</h2>
            <p className="section-lead">{dict.process.lead}</p>
          </Reveal>
          <div className="process-timeline">
            {dict.process.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 70}>
                <div className="process-step">
                  <div className="process-step__rail">
                    <span className="process-step__index">{i + 1}</span>
                    {i < dict.process.steps.length - 1 && <span className="process-step__connector" />}
                  </div>
                  <div className="process-step__body">
                    <h3 className="process-step__title">{step.title}</h3>
                    <p className="process-step__desc">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.craft.heading}</h2>
            <p className="section-lead">{dict.craft.lead}</p>
          </Reveal>
          <div className="craft-grid">
            {dict.craft.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 70}>
                <div className="craft-card">
                  <h3 className="craft-card__title">{point.title}</h3>
                  <p className="craft-card__desc">{point.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div style={{ borderTop: "1px solid var(--color-stone-line)", paddingTop: "1.75rem" }}>
              <span className="eyebrow">{dict.founderBridge.eyebrow}</span>
              <p className="section-lead" style={{ maxWidth: "620px" }}>{dict.founderBridge.body}</p>
              <Link href={`${navBase}#founder`} className="btn btn-secondary" style={{ marginTop: "0.75rem" }}>
                {dict.founderBridge.cta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div style={{ borderTop: "1px solid var(--color-stone-line)", paddingTop: "1.75rem" }}>
              <span className="eyebrow">{dict.caseStudy.eyebrow}</span>
              <h3 className="section-heading" style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}>
                {dict.caseStudy.heading}
              </h3>
              <p className="section-lead" style={{ maxWidth: "620px" }}>{dict.caseStudy.body}</p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
                <Link href={`${navBase}/projects/born-rare`} className="btn btn-secondary">
                  {dict.caseStudy.viewProjectCta}
                </Link>
                <Link href={`${navBase}/journal/the-sentence-we-refused-to-improve`} className="btn btn-link">
                  {dict.caseStudy.readLetterCta}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="panel">
        <Reveal>
          <span className="eyebrow">{dict.forHeading}</span>
          <p style={{ maxWidth: "620px" }}>{dict.forBody}</p>
          <Link href={`${navBase}/consultation`} className="btn btn-gold" style={{ marginTop: "1rem" }}>
            {dict.cta}
          </Link>
        </Reveal>
      </section>

      {dict.note ? (
        <section className="section-tight">
          <div className="container">
            <p className="status-note">{dict.note}</p>
          </div>
        </section>
      ) : null}
    </>
  );
}
