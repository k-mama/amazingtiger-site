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
import FeaturedStoryVideo from "./FeaturedStoryVideo";

// Five Rooms: order matches dict.rooms.items. Hrefs are structural, not
// translatable, so they live here rather than in the dictionary. Anchors
// point at real, existing homepage sections/cards; only Publishing and
// BORN RARE have dedicated routes.
const roomImages: Array<string | null> = [
  "/images/homepage/projects/emmaestro-project.webp",
  "/images/homepage/editorial/atelier-worktable.webp",
  "/images/homepage/covers/born-rare-cover.webp",
  "/images/homepage/projects/esther-cho-project.webp",
  null,
];

const roomTones: Array<{ a: string; b: string; emblem: "ring" | "line" }> = [
  { a: "var(--dg-aqua)", b: "var(--dg-periwinkle)", emblem: "ring" },
  { a: "var(--dg-rose)", b: "var(--dg-peach)", emblem: "line" },
  { a: "var(--dg-lemon)", b: "var(--dg-mint)", emblem: "ring" },
  { a: "var(--dg-lavender)", b: "var(--dg-turquoise)", emblem: "line" },
  { a: "var(--dg-peach)", b: "var(--dg-rose)", emblem: "ring" },
];

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

const founderWorkTones: Array<{ a: string; b: string; emblem: "ring" | "line" }> = [
  { a: "var(--dg-aqua)", b: "var(--dg-periwinkle)", emblem: "ring" },
  { a: "var(--dg-rose)", b: "var(--dg-peach)", emblem: "line" },
  { a: "var(--dg-lemon)", b: "var(--dg-mint)", emblem: "ring" },
  { a: "var(--dg-lavender)", b: "var(--dg-turquoise)", emblem: "line" },
];

// Real photography for the Founder page's works, matched by position. Works
// without a photographed asset yet fall back to EditorialObject.
const founderWorkImages: Array<string | null> = [
  "/images/homepage/projects/born-rare-project.webp",
  "/images/homepage/projects/emmaestro-project.webp",
  null,
  null,
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
  const homeBase = basePath === "/" ? "" : basePath;

  const roomHrefs = [
    `${homeBase}#emmaestro`,
    `${navBase}/atelier`,
    `${navBase}/projects/born-rare`,
    `${homeBase}#works`,
    `${homeBase}#kmama`,
  ];

  // Closing Doors: music / books / make-something, matching dict.closingDoors.choices order.
  const closingDoorHrefs = [`${homeBase}#emmaestro`, `${navBase}/atelier`, `${navBase}/consultation`];

  return (
    <>
      <section className="hero">
        <AmbientBackdrop
          blobs={[
            { color: "rgba(201,169,122,0.18)", size: 360, top: "-120px", left: "-90px", opacity: 0.5 },
            { color: "rgba(228,220,201,0.22)", size: 320, top: "-70px", right: "-110px", opacity: 0.5 },
            { color: "rgba(236,229,216,0.24)", size: 340, bottom: "-150px", left: "22%", opacity: 0.45 },
            { color: "rgba(201,169,122,0.14)", size: 260, bottom: "-90px", right: "8%", opacity: 0.45 },
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
              <Link href={`${homeBase}#rooms`} className="btn btn-primary">
                {dict.hero.ctaPrimary}
              </Link>
              <Link href={`${navBase}/consultation`} className="btn btn-secondary">
                {dict.hero.ctaSecondary}
              </Link>
            </div>
          </div>
          <div className="hero__cover hero__cover--photo">
            <Image
              src="/images/homepage/editorial/emma-kwon-at-work.webp"
              alt={dict.hero.eyebrow}
              fill
              priority
              sizes="(min-width: 900px) 280px, 220px"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
          </div>
        </div>
      </section>

      <section id="rooms" className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.rooms.eyebrow}</span>
            <p className="section-lead" style={{ marginBottom: 0 }}>{dict.rooms.lead}</p>
          </Reveal>
          <ol className="rooms-toc">
            {dict.rooms.items.map((room, i) => {
              const image = roomImages[i];
              const tone = roomTones[i % roomTones.length];
              return (
                <Reveal key={room.title} delay={i * 70}>
                  <li className="rooms-toc__item">
                    <Link href={roomHrefs[i]} className="rooms-toc__link">
                      <span className="rooms-toc__index">{String(i + 1).padStart(2, "0")}</span>
                      <span className="rooms-toc__media">
                        {image ? (
                          <Image
                            src={image}
                            alt={room.title}
                            fill
                            loading="lazy"
                            sizes="72px"
                            style={{ objectFit: "cover", objectPosition: "center" }}
                          />
                        ) : (
                          <EditorialObject toneA={tone.a} toneB={tone.b} emblem={tone.emblem} />
                        )}
                      </span>
                      <span className="rooms-toc__body">
                        <span className="rooms-toc__title">{room.title}</span>
                        <span className="rooms-toc__lines">
                          {room.lines.map((line, li) => (
                            <span key={li} className="rooms-toc__line">{line}</span>
                          ))}
                        </span>
                        <span className="rooms-toc__cta">{room.cta} →</span>
                      </span>
                    </Link>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section featured-story">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.featuredStory.eyebrow}</span>
            <h2 className="section-heading">{dict.featuredStory.question}</h2>
            <p className="section-lead">{dict.featuredStory.caption}</p>
          </Reveal>
          <Reveal delay={80}>
            <FeaturedStoryVideo
              posterSrc="/images/homepage/projects/born-rare-project.webp"
              posterAlt={dict.featuredStory.caption}
              playLabel={dict.featuredStory.playLabel}
            />
            <Link href={`${navBase}/projects/born-rare`} className="btn btn-secondary" style={{ marginTop: "1.25rem" }}>
              {dict.featuredStory.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="living-window" className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">{dict.livingWindow.eyebrow}</span>
            <h2 className="section-heading">{dict.livingWindow.heading}</h2>
            <p className="section-lead">{dict.livingWindow.lead}</p>
          </Reveal>
          <div className="grid-2" style={{ marginTop: "2rem" }}>
            {[0, 1].map((i) => {
              const item = dict.works.items[i];
              const image = workImages[i];
              return (
                <Reveal key={item.title} delay={i * 90}>
                  <Link href={roomHrefs[i === 0 ? 2 : 0]} className="work-card-link">
                    <article className="work-card">
                      <div className="work-card__media">
                        {image && (
                          <Image
                            src={image}
                            alt={item.title}
                            fill
                            loading="lazy"
                            sizes="(min-width: 900px) 50vw, 100vw"
                            style={{ objectFit: "cover", objectPosition: "center" }}
                          />
                        )}
                      </div>
                      <div className="work-card__body">
                        <div className="work-card__label">{item.label}</div>
                        <h3 className="work-card__title">{item.title}</h3>
                        <p style={{ margin: 0, fontSize: "0.92rem" }}>{item.description}</p>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              );
            })}
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
              const card = (
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
              );
              return (
                <Reveal key={item.title} delay={i * 100}>
                  {i === 0 ? (
                    <Link href={`${navBase}/projects/born-rare`} className="work-card-link">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
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
            </Reveal>
          </div>
        </div>

        <div className="container" style={{ marginTop: "3.5rem" }}>
          <Reveal>
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
              <span className="eyebrow">{dict.founderPage.letterHeading}</span>
              {dict.founderPage.letter.map((paragraph, i) => (
                <p key={i} className="section-lead" style={{ maxWidth: "none" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="container" style={{ marginTop: "3rem" }}>
          <Reveal>
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
              <span className="eyebrow">{dict.founderPage.bioHeading}</span>
              {dict.founderPage.bioBody.map((paragraph, i) => (
                <p key={i} className="section-lead" style={{ maxWidth: "none" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="container" style={{ marginTop: "3rem" }}>
          <Reveal>
            <h3 className="section-heading" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}>
              {dict.founderPage.worksHeading}
            </h3>
            <p className="section-lead">{dict.founderPage.worksLead}</p>
          </Reveal>
          <div className="grid-3" style={{ marginTop: "2rem" }}>
            {dict.founderPage.works.map((work, i) => {
              const tone = founderWorkTones[i % founderWorkTones.length];
              const image = founderWorkImages[i];
              const anchorId = i === 1 ? "emmaestro" : i === 2 ? "kmama" : undefined;
              return (
                <Reveal key={work.title} delay={i * 90}>
                  <article className="work-card" id={anchorId}>
                    <div className="work-card__media">
                      {image ? (
                        <Image
                          src={image}
                          alt={work.title}
                          fill
                          loading="lazy"
                          sizes="(min-width: 900px) 33vw, 100vw"
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
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="container" style={{ marginTop: "3rem" }}>
          <Reveal>
            <h3 className="section-heading" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}>
              {dict.founderPage.scopeHeading}
            </h3>
            <p className="section-lead">{dict.founderPage.scopeLead}</p>
          </Reveal>
          <div className="grid-2" style={{ marginTop: "1.5rem", alignItems: "start" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {dict.founderPage.scopePoints.slice(0, Math.ceil(dict.founderPage.scopePoints.length / 2)).map((point) => (
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
              {dict.founderPage.scopePoints.slice(Math.ceil(dict.founderPage.scopePoints.length / 2)).map((point) => (
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
        </div>

        <div className="container" style={{ marginTop: "3rem" }}>
          <Reveal>
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
              <h3 className="section-heading" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}>
                {dict.founderPage.studioHeading}
              </h3>
              {dict.founderPage.studioBody.map((paragraph, i) => (
                <p key={i} className="section-lead" style={{ maxWidth: "none" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div style={{ maxWidth: "720px", margin: "1.5rem auto 0", paddingTop: "1.5rem", borderTop: "1px solid var(--color-stone-line)" }}>
              <h4 style={{ marginBottom: "0.4rem" }}>{dict.founderPage.webHeading}</h4>
              <p className="section-lead" style={{ maxWidth: "none" }}>{dict.founderPage.webBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="panel">
        <Reveal>
          <span className="eyebrow">{dict.founderPage.forHeading}</span>
          <p style={{ maxWidth: "620px" }}>{dict.founderPage.forBody}</p>
          <Link href={`${navBase}/consultation`} className="btn btn-gold" style={{ marginTop: "1rem" }}>
            {dict.founderPage.cta}
          </Link>
        </Reveal>
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

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="stats-strip">
              <span className="stats-strip__eyebrow">{dict.stats.eyebrow}</span>
              <ul className="stats-strip__list">
                {dict.stats.items.map((item) => (
                  <li key={item} className="stats-strip__item">{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
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

      <section className="section closing-doors">
        <div className="container">
          <Reveal>
            <h2 className="section-heading">{dict.closingDoors.heading}</h2>
            <ul className="closing-doors__list">
              {dict.closingDoors.choices.map((choice, i) => (
                <li key={choice}>
                  <Link href={closingDoorHrefs[i]} className="closing-doors__choice">
                    {choice}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
