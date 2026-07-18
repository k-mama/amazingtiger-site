import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/seo";
import Reveal from "@/components/Reveal";
import AmbientBackdrop from "@/components/AmbientBackdrop";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const dict = getDictionary(params.locale).projectBornRarePage;
  return {
    title: `${dict.title} — ${dict.kicker}`,
    alternates: localeAlternates(params.locale, "/projects/born-rare"),
  };
}

export default function BornRareProjectPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const fullDict = getDictionary(locale);
  const dict = fullDict.projectBornRarePage;
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
              {dict.kickerSecondary}
            </span>
            <h1 className="section-heading">{dict.title}</h1>
            <p className="section-lead">{dict.tagline}</p>
          </Reveal>

          <Reveal delay={70}>
            <div style={{ maxWidth: "620px", marginTop: "1.5rem" }}>
              {dict.heroLines.map((line, i) => (
                <p key={i} className="section-lead" style={{ maxWidth: "none" }}>
                  {line}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="hero__cover" style={{ maxWidth: "200px", marginTop: "2rem" }}>
              <Image
                src="/images/homepage/covers/born-rare-cover.webp"
                alt="BORN RARE — Emma Kwon's memoir, originally published; a newly reimagined literary edition in development"
                width={200}
                height={300}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="section-lead" style={{ marginTop: "1.75rem" }}>{dict.supporting}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.infoHeading}</h2>
          </Reveal>
          <div className="grid-2" style={{ marginTop: "2rem", alignItems: "start" }}>
            <Reveal>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {dict.info.map((item) => (
                  <li
                    key={item.label}
                    style={{
                      padding: "0.9rem 0",
                      borderTop: "1px solid var(--color-stone-line)",
                      fontSize: "0.95rem",
                    }}
                  >
                    <div className="work-card__label">{item.label}</div>
                    <div style={{ color: "var(--color-ink-soft)", marginTop: "0.25rem" }}>{item.value}</div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={90}>
              <div>
                <div className="work-card__label">{dict.scopeLabel}</div>
                <ul style={{ listStyle: "none", margin: "0.75rem 0 0", padding: 0 }}>
                  {dict.scopeItems.map((item) => (
                    <li
                      key={item}
                      style={{
                        padding: "0.7rem 0",
                        borderTop: "1px solid var(--color-stone-line)",
                        color: "var(--color-ink-soft)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.briefHeading}</h2>
            <div style={{ maxWidth: "680px" }}>
              {dict.briefBody.map((p, i) => (
                <p key={i} className="section-lead" style={{ maxWidth: "none" }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.questionHeading}</h2>
            <div style={{ maxWidth: "680px" }}>
              {dict.questionLines.map((line, i) => (
                <p key={i} className="section-lead" style={{ maxWidth: "none", fontStyle: "italic" }}>
                  {line}
                </p>
              ))}
              {dict.questionBody.map((p, i) => (
                <p key={i} className="section-lead" style={{ maxWidth: "none" }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="panel">
        <Reveal>
          <h2 className="section-heading">{dict.northStarHeading}</h2>
          <div style={{ maxWidth: "560px" }}>
            {dict.northStarLines.map((line, i) => (
              <p key={i} style={{ maxWidth: "none" }}>
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.architectureHeading}</h2>
          </Reveal>
          <div className="craft-grid">
            {dict.architectureItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="craft-card">
                  <h3 className="craft-card__title">{item.title}</h3>
                  <p className="craft-card__desc">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.sceneHeading}</h2>
            {dict.sceneIntro.map((p, i) => (
              <p key={i} className="section-lead">
                {p}
              </p>
            ))}
          </Reveal>
          <div className="grid-2" style={{ marginTop: "1.5rem" }}>
            {dict.sceneObjects.map((obj, i) => (
              <Reveal key={obj.object} delay={i * 70}>
                <div style={{ padding: "0.9rem 0", borderTop: "1px solid var(--color-stone-line)" }}>
                  <strong>{obj.object}</strong>
                  <p style={{ margin: "0.35rem 0 0", color: "var(--color-ink-soft)" }}>{obj.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.voiceHeading}</h2>
            <div style={{ maxWidth: "680px" }}>
              {dict.voiceBody.map((p, i) => (
                <p key={i} className="section-lead" style={{ maxWidth: "none" }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div style={{ marginTop: "1.75rem" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>{dict.principlesHeading}</h3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                {dict.principles.map((point) => (
                  <li
                    key={point}
                    style={{
                      border: "1px solid var(--color-stone-line)",
                      borderRadius: "999px",
                      padding: "0.4rem 0.9rem",
                      fontSize: "0.88rem",
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.worldHeading}</h2>
          </Reveal>
          <div className="craft-grid">
            {dict.worldItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="craft-card">
                  <h3 className="craft-card__title">{item.title}</h3>
                  <p className="craft-card__desc">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.notDoingHeading}</h2>
            <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0, maxWidth: "620px" }}>
              {dict.notDoingItems.map((item) => (
                <li
                  key={item}
                  style={{
                    padding: "0.8rem 0",
                    borderTop: "1px solid var(--color-stone-line)",
                    color: "var(--color-ink-soft)",
                    fontSize: "0.95rem",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.stageHeading}</h2>
            <div style={{ maxWidth: "680px" }}>
              {dict.stageBody.map((p, i) => (
                <p key={i} className="section-lead" style={{ maxWidth: "none" }}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="panel">
        <Reveal>
          <div style={{ maxWidth: "560px" }}>
            {dict.closingLines.map((line, i) => (
              <p key={i} style={{ maxWidth: "none" }}>
                {line}
              </p>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap", marginTop: "1rem" }}>
            <Link href={`${navBase}/consultation`} className="btn btn-gold">
              {dict.cta}
            </Link>
            <Link href={`${navBase}/journal/the-sentence-we-refused-to-improve`} className="btn btn-secondary">
              {dict.journalCta}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
