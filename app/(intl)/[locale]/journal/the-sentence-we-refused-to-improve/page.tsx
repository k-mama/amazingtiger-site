import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/seo";
import Reveal from "@/components/Reveal";
import AmbientBackdrop from "@/components/AmbientBackdrop";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale).journalLetterOnePage;
  return {
    title: dict.title,
    alternates: localeAlternates(params.locale, "/journal/the-sentence-we-refused-to-improve"),
  };
}

export default function AtelierLetterOnePage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const fullDict = getDictionary(locale);
  const dict = fullDict.journalLetterOnePage;
  const navBase = `/${locale}`;

  return (
    <>
      <section className="shop-hero">
        <AmbientBackdrop
          blobs={[
            { color: "rgba(228,220,201,0.22)", size: 360, top: "-110px", left: "-60px" },
            { color: "rgba(201,169,122,0.16)", size: 300, bottom: "-120px", right: "8%" },
          ]}
        />
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={navBase}>{fullDict.nav.home}</Link>
            <span className="breadcrumb__sep">/</span>
            <Link href={`${navBase}/atelier`}>{fullDict.nav.atelier}</Link>
            <span className="breadcrumb__sep">/</span>
            <span className="breadcrumb__current">{dict.breadcrumbCurrent}</span>
          </nav>

          <Reveal>
            <span className="eyebrow">{dict.kicker}</span>
            <span className="eyebrow" style={{ display: "block", marginTop: "-0.6rem", opacity: 0.7 }}>
              {dict.letterLabel}
            </span>
            <h1 className="section-heading">{dict.title}</h1>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            {dict.body.map((paragraph, i) => (
              <Reveal key={i} delay={Math.min(i * 25, 400)}>
                <p className="section-lead" style={{ maxWidth: "none" }}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <Reveal>
          <p style={{ maxWidth: "580px", fontStyle: "italic", margin: "0 auto" }}>{dict.readerQuestion}</p>
        </Reveal>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
              <p style={{ margin: 0, color: "var(--color-ink-soft)" }}>{dict.nextLabel}</p>
              <p className="section-heading" style={{ fontSize: "1.3rem", margin: "0.4rem 0 1.75rem" }}>
                {dict.nextTitle}
              </p>
              <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", justifyContent: "center" }}>
                <Link href={`${navBase}/projects/born-rare`} className="btn btn-gold">
                  {dict.caseStudyCta}
                </Link>
                <Link href={`${navBase}/atelier`} className="btn btn-secondary">
                  {dict.backToAtelier}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
