import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/seo";
import Reveal from "@/components/Reveal";
import HybridScrollStory from "@/components/HybridScrollStory";
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

  const panels = [
    <div key="intro" style={{ maxWidth: "680px" }}>
      <span className="eyebrow">{dict.eyebrow}</span>
      <h1 className="section-heading">{dict.heading}</h1>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{dict.lead}</p>
      <div style={{ marginTop: "1.5rem", textAlign: "left" }}>
        {dict.intro.map((paragraph, i) => (
          <p key={i} className="section-lead" style={{ maxWidth: "none" }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>,

    <div key="services" style={{ width: "100%", maxWidth: "1000px" }}>
      <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", margin: "0 auto" }}>
        {dict.servicesHeading}
      </h2>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{dict.servicesLead}</p>
      <div className="info-grid" style={{ textAlign: "left" }}>
        {dict.services.map((service, i) => {
          const Glyph = atelierGlyphList[i % atelierGlyphList.length];
          const tone = dreamGlassTones[i % dreamGlassTones.length];
          return (
            <div className="info-card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }} key={service.title}>
              <DreamGlassIcon tone={tone}>
                <Glyph />
              </DreamGlassIcon>
              <div>
                <h3 style={{ marginBottom: "0.3rem" }}>{service.title}</h3>
                <p style={{ margin: 0 }}>{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>,

    <div key="process" style={{ width: "100%", maxWidth: "760px" }}>
      <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", margin: "0 auto" }}>
        {dict.process.heading}
      </h2>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{dict.process.lead}</p>
      <div className="process-timeline" style={{ textAlign: "left" }}>
        {dict.process.steps.map((step, i) => (
          <div className="process-step" key={step.title}>
            <div className="process-step__rail">
              <span className="process-step__index">{i + 1}</span>
              {i < dict.process.steps.length - 1 && <span className="process-step__connector" />}
            </div>
            <div className="process-step__body">
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>,

    <div key="craft" style={{ width: "100%", maxWidth: "760px" }}>
      <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", margin: "0 auto" }}>
        {dict.craft.heading}
      </h2>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{dict.craft.lead}</p>
      <div className="craft-grid" style={{ textAlign: "left" }}>
        {dict.craft.points.map((point) => (
          <div className="craft-card" key={point.title}>
            <h3 className="craft-card__title">{point.title}</h3>
            <p className="craft-card__desc">{point.description}</p>
          </div>
        ))}
      </div>
    </div>,
  ];

  return (
    <>
      <HybridScrollStory id="atelier-page" ariaLabel={dict.heading} panels={panels} />

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div style={{ borderTop: "1px solid var(--color-stone-line)", paddingTop: "1.75rem" }}>
              <span className="eyebrow">{dict.founderBridge.eyebrow}</span>
              <p className="section-lead" style={{ maxWidth: "620px" }}>{dict.founderBridge.body}</p>
              <Link href={`${navBase}/founder`} className="btn btn-secondary" style={{ marginTop: "0.75rem" }}>
                {dict.founderBridge.cta}
              </Link>
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
