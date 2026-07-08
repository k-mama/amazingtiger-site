import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import Reveal from "@/components/Reveal";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import DreamGlassIcon, { atelierGlyphList, dreamGlassTones } from "@/components/DreamGlassIcon";

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
        <AmbientBackdrop
          blobs={[
            { color: "rgba(228,218,247,0.85)", size: 380, top: "-120px", right: "-60px" },
            { color: "rgba(252,220,199,0.7)", size: 320, bottom: "-140px", left: "6%" },
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

      <section className="panel">
        <Reveal>
          <span className="eyebrow">{dict.forHeading}</span>
          <p style={{ maxWidth: "620px" }}>{dict.forBody}</p>
          <Link href={`${navBase}/consultation`} className="btn btn-gold" style={{ marginTop: "1rem" }}>
            {dict.cta}
          </Link>
        </Reveal>
      </section>

      <section className="section-tight">
        <div className="container">
          <p className="status-note">{dict.note}</p>
        </div>
      </section>
    </>
  );
}
