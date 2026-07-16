import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import Reveal from "./Reveal";
import ShopPreview from "./ShopPreview";
import AtelierPreview from "./AtelierPreview";
import AmbientBackdrop from "./AmbientBackdrop";
import EditorialObject from "./EditorialObject";
import NoBreakText from "./NoBreakText";

interface HomeContentProps {
  locale: Locale;
  dict: Dictionary;
  basePath: string;
}

const workTones: Array<{ a: string; b: string; emblem: "ring" | "line" }> = [
  { a: "var(--dg-aqua)", b: "var(--dg-periwinkle)", emblem: "ring" },
  { a: "var(--dg-rose)", b: "var(--dg-peach)", emblem: "line" },
  { a: "var(--dg-lemon)", b: "var(--dg-mint)", emblem: "ring" },
];

// Real photography for the three Selected Works cards, matched by position —
// the underlying dict.works.items copy is unchanged in every locale.
const workImages = [
  "/images/homepage/projects/born-rare-project.webp",
  "/images/homepage/projects/emmaestro-project.webp",
  "/images/homepage/projects/esther-cho-project.webp",
];

// Status tags for the same three cards, by position — null means no tag.
const workStatusKeys: Array<keyof Dictionary["homeStatusLabels"] | null> = [
  "published",
  null,
  "forthcoming",
];

export default function HomeContent({ dict, basePath, locale }: HomeContentProps) {
  const navBase = basePath === "/" ? "/en" : basePath;

  return (
    <>
      <section className="hero">
        <AmbientBackdrop
          blobs={[
            { color: "rgba(201,169,122,0.22)", size: 420, top: "-120px", left: "-80px" },
            { color: "rgba(228,220,201,0.28)", size: 360, top: "-60px", right: "-100px" },
            { color: "rgba(236,229,216,0.3)", size: 380, bottom: "-160px", left: "20%" },
            { color: "rgba(201,169,122,0.16)", size: 300, bottom: "-100px", right: "10%" },
          ]}
        />
        <div className="container hero__layout">
          <div className="hero__inner">
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-mark" />
              <span className="eyebrow" style={{ marginBottom: 0 }}>{dict.hero.eyebrow}</span>
            </div>
            <h1>{dict.hero.headline}</h1>
            <p className="hero__sub">
              <NoBreakText text={dict.hero.subhead} />
            </p>
            <div className="hero__actions">
              <Link href={`${basePath === "/" ? "" : basePath}#philosophy`} className="btn btn-primary">
                {dict.hero.ctaPrimary}
              </Link>
              <Link href={`${navBase}/consultation`} className="btn btn-secondary">
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>
          <div className="hero__cover">
            <Image
              src="/images/homepage/covers/born-rare-cover.webp"
              alt="BORN RARE — Emma Kwon's published memoir"
              fill
              priority
              sizes="(min-width: 900px) 280px, 220px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      <section id="philosophy" className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.philosophy.eyebrow}</span>
            <h2 className="section-heading">{dict.philosophy.heading}</h2>
          </Reveal>
          <Reveal delay={60}>
            <div className="philosophy-image">
              <Image
                src="/images/homepage/editorial/atelier-worktable.webp"
                alt={dict.philosophy.heading}
                fill
                loading="lazy"
                sizes="(min-width: 900px) 760px, 100vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </Reveal>
          <div className="grid-2" style={{ marginTop: "2.5rem", alignItems: "start" }}>
            {dict.philosophy.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className="section-lead">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.works.eyebrow}</span>
            <h2 className="section-heading">{dict.works.heading}</h2>
            <p className="section-lead">{dict.works.lead}</p>
          </Reveal>
          <div className="grid-3" style={{ marginTop: "2.5rem" }}>
            {dict.works.items.map((item, i) => {
              const tone = workTones[i % workTones.length];
              const image = workImages[i];
              const statusKey = workStatusKeys[i];
              return (
                <Reveal key={item.title} delay={i * 100}>
                  <article className="work-card">
                    <div className="work-card__media">
                      {image ? (
                        <Image
                          src={image}
                          alt={item.title}
                          fill
                          loading="lazy"
                          sizes="(min-width: 900px) 33vw, 100vw"
                          style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                      ) : (
                        <EditorialObject toneA={tone.a} toneB={tone.b} emblem={tone.emblem} />
                      )}
                      {statusKey && (
                        <span className="product-card__badge">{dict.homeStatusLabels[statusKey]}</span>
                      )}
                      {i === 0 && (
                        <div className="work-card__cover-inset">
                          <Image
                            src="/images/homepage/covers/born-rare-cover.webp"
                            alt="BORN RARE — Emma Kwon"
                            width={90}
                            height={134}
                          />
                        </div>
                      )}
                    </div>
                    <div className="work-card__body">
                      <div className="work-card__label">{item.label}</div>
                      <h3 className="work-card__title">{item.title}</h3>
                      <p style={{ margin: 0, fontSize: "0.92rem" }}>{item.description}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="house" className="panel">
        <Reveal>
          <span className="eyebrow">{dict.house.eyebrow}</span>
          <h2 className="section-heading">{dict.house.heading}</h2>
        </Reveal>
        <div className="grid-2" style={{ marginTop: "2.5rem", alignItems: "start" }}>
          <Reveal>
            <div>
              {dict.house.body.map((paragraph, i) => (
                <p key={i}>
                  <NoBreakText text={paragraph} />
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {dict.house.points.map((point) => (
                <li
                  key={point}
                  style={{
                    padding: "0.9rem 0",
                    borderTop: "1px solid rgba(26,23,18,0.14)",
                    color: "var(--color-ink-soft)",
                    fontSize: "0.95rem",
                  }}
                >
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <AtelierPreview dict={dict} basePath={basePath} />

      <ShopPreview dict={dict} basePath={basePath} locale={locale} />

      <section id="founder" className="section">
        <div className="container">
          <div className="grid-2">
            <Reveal>
              <div className="founder-portrait">
                <Image
                  src="/images/homepage/editorial/emma-kwon-at-work.webp"
                  alt={`${dict.founder.name} — ${dict.founder.role}`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 900px) 50vw, 100vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <span className="eyebrow">{dict.founder.eyebrow}</span>
              <h2 className="section-heading">
                <NoBreakText text={dict.founder.heading} />
              </h2>
              {dict.founder.body.map((paragraph, i) => (
                <p key={i} className="section-lead" style={{ maxWidth: "520px" }}>
                  {paragraph}
                </p>
              ))}
              <p style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>
                <NoBreakText text={dict.founder.name} />
                <br />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-bronze)" }}>
                  {dict.founder.role}
                </span>
              </p>
              <Link href={`${navBase}/founder`} className="btn btn-secondary" style={{ marginTop: "1.25rem" }}>
                {dict.founder.cta}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="studio-notes" className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.studioNotes.eyebrow}</span>
            <h2 className="section-heading">{dict.studioNotes.heading}</h2>
            <p className="section-lead">{dict.studioNotes.lead}</p>
          </Reveal>
          <div style={{ marginTop: "2rem" }}>
            {dict.studioNotes.notes.map((note, i) => (
              <Reveal key={note.title} delay={i * 80}>
                <div className="note-card">
                  <div className="note-card__date">{note.date}</div>
                  <h3 className="note-card__title">{note.title}</h3>
                  <p style={{ margin: 0, maxWidth: "620px" }}>{note.excerpt}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="membership" className="section-tight">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <Reveal>
              <span className="eyebrow">{dict.membership.eyebrow}</span>
              <h2 className="section-heading">{dict.membership.heading}</h2>
              <p className="section-lead">{dict.membership.body}</p>
              <ul style={{ listStyle: "none", margin: "1.2rem 0 1.5rem", padding: 0 }}>
                {dict.membership.perks.map((perk) => (
                  <li
                    key={perk}
                    style={{
                      padding: "0.6rem 0",
                      borderTop: "1px solid var(--color-stone-line)",
                      fontSize: "0.9rem",
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    {perk}
                  </li>
                ))}
              </ul>
              <Link href={`${navBase}/signup`} className="btn btn-gold">
                {dict.membership.cta}
              </Link>
            </Reveal>
            <Reveal delay={100}>
              <span className="eyebrow">{dict.consultationInvite.eyebrow}</span>
              <h2 className="section-heading">{dict.consultationInvite.heading}</h2>
              <p className="section-lead">{dict.consultationInvite.body}</p>
              <Link href={`${navBase}/consultation`} className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
                {dict.consultationInvite.cta}
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
