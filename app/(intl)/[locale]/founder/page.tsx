import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { localeAlternates } from "@/lib/i18n/seo";
import HybridScrollStory from "@/components/HybridScrollStory";
import EditorialObject from "@/components/EditorialObject";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return {
    title: getDictionary(params.locale).founderPage.heading,
    alternates: localeAlternates(params.locale, "/founder"),
  };
}

const workTones: Array<{ a: string; b: string; emblem: "ring" | "line" }> = [
  { a: "var(--dg-aqua)", b: "var(--dg-periwinkle)", emblem: "ring" },
  { a: "var(--dg-rose)", b: "var(--dg-peach)", emblem: "line" },
  { a: "var(--dg-lemon)", b: "var(--dg-mint)", emblem: "ring" },
  { a: "var(--dg-lavender)", b: "var(--dg-turquoise)", emblem: "line" },
];

// Real photography for works where it exists, matched by position. Works
// without a photographed asset yet fall back to EditorialObject rather than
// a fabricated image.
const workImages: Array<string | null> = [
  "/images/homepage/projects/born-rare-project.webp",
  "/images/homepage/projects/emmaestro-project.webp",
  null,
  null,
];

export default function FounderPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = getDictionary(locale).founderPage;
  const navBase = `/${locale}`;

  const panels = [
    <div key="intro" style={{ maxWidth: "620px" }}>
      <span className="eyebrow">{dict.eyebrow}</span>
      <h1 className="section-heading">{dict.heading}</h1>
    </div>,

    <div className="founder-story__grid" key="letter">
      <div className="founder-portrait founder-story__portrait">
        <Image
          src="/images/homepage/editorial/emma-kwon-at-work.webp"
          alt={dict.letterHeading}
          fill
          loading="lazy"
          sizes="(min-width: 900px) 40vw, 90vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div style={{ textAlign: "left" }}>
        <span className="eyebrow">{dict.letterHeading}</span>
        {dict.letter.map((paragraph, i) => (
          <p key={i} className="section-lead" style={{ maxWidth: "460px" }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>,

    <div key="bio" style={{ maxWidth: "620px" }}>
      <span className="eyebrow">{dict.bioHeading}</span>
      {dict.bioBody.map((paragraph, i) => (
        <p key={i} className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>
          {paragraph}
        </p>
      ))}
    </div>,

    <div key="works" style={{ width: "100%", maxWidth: "960px" }}>
      <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", margin: "0 auto" }}>
        {dict.worksHeading}
      </h2>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{dict.worksLead}</p>
      <div className="grid-2" style={{ marginTop: "2rem", textAlign: "left" }}>
        {dict.works.map((work, i) => {
          const tone = workTones[i % workTones.length];
          const image = workImages[i];
          return (
            <article className="work-card" key={work.title}>
              <div className="work-card__media">
                {image ? (
                  <Image
                    src={image}
                    alt={work.title}
                    fill
                    loading="lazy"
                    sizes="(min-width: 900px) 25vw, 100vw"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                ) : (
                  <EditorialObject toneA={tone.a} toneB={tone.b} emblem={tone.emblem} />
                )}
              </div>
              <div className="work-card__body">
                <div className="work-card__label">{work.category}</div>
                <h3 className="work-card__title">{work.title}</h3>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>{work.detail}</p>
                <p style={{ margin: "0.6rem 0 0", fontSize: "0.8rem", color: "var(--color-bronze)" }}>
                  {work.roles}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>,

    <div key="scope" style={{ width: "100%", maxWidth: "760px" }}>
      <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", margin: "0 auto" }}>
        {dict.scopeHeading}
      </h2>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{dict.scopeLead}</p>
      <div className="grid-2" style={{ marginTop: "1.5rem", textAlign: "left" }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {dict.scopePoints.slice(0, Math.ceil(dict.scopePoints.length / 2)).map((point) => (
            <li
              key={point}
              style={{
                padding: "0.9rem 0",
                borderTop: "1px solid var(--color-stone-line)",
                color: "var(--color-ink-soft)",
                fontSize: "0.95rem",
              }}
            >
              {point}
            </li>
          ))}
        </ul>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {dict.scopePoints.slice(Math.ceil(dict.scopePoints.length / 2)).map((point) => (
            <li
              key={point}
              style={{
                padding: "0.9rem 0",
                borderTop: "1px solid var(--color-stone-line)",
                color: "var(--color-ink-soft)",
                fontSize: "0.95rem",
              }}
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>,

    <div key="studio" style={{ maxWidth: "680px" }}>
      <h2 className="section-heading" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", margin: "0 auto" }}>
        {dict.studioHeading}
      </h2>
      {dict.studioBody.map((paragraph, i) => (
        <p key={i} className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>
          {paragraph}
        </p>
      ))}
      <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-stone-line)" }}>
        <h3 style={{ marginBottom: "0.4rem" }}>{dict.webHeading}</h3>
        <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{dict.webBody}</p>
      </div>
    </div>,
  ];

  return (
    <>
      <HybridScrollStory id="founder-page" ariaLabel={dict.heading} panels={panels} />

      <section className="panel">
        <span className="eyebrow">{dict.forHeading}</span>
        <p style={{ maxWidth: "620px" }}>{dict.forBody}</p>
        <Link href={`${navBase}/consultation`} className="btn btn-gold" style={{ marginTop: "1rem" }}>
          {dict.cta}
        </Link>
      </section>
    </>
  );
}
