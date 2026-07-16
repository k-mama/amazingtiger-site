import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import NoBreakText from "./NoBreakText";
import HybridScrollStory from "./HybridScrollStory";

interface FounderStoryProps {
  dict: Dictionary;
  basePath: string;
}

export default function FounderStory({ dict, basePath }: FounderStoryProps) {
  const navBase = basePath === "/" ? "/en" : basePath;
  const { founder, founderPage } = dict;
  const works = founderPage.works.slice(0, 3);

  const panels = [
    <div className="founder-story__grid" key="portrait">
      <div className="founder-portrait founder-story__portrait">
        <Image
          src="/images/homepage/editorial/emma-kwon-at-work.webp"
          alt={`${founder.name} — ${founder.role}`}
          fill
          loading="lazy"
          sizes="(min-width: 900px) 40vw, 90vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div>
        <span className="eyebrow">{founder.eyebrow}</span>
        <h2 className="section-heading">
          <NoBreakText text={founder.heading} />
        </h2>
        <p style={{ marginTop: "1.5rem", fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>
          <NoBreakText text={founder.name} />
          <br />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-bronze)" }}>
            {founder.role}
          </span>
        </p>
      </div>
    </div>,

    <blockquote className="founder-story__quote" key="letter">
      <p>{founderPage.letter[0]}</p>
      {founderPage.letter[1] && <p>{founderPage.letter[1]}</p>}
    </blockquote>,

    <div key="voice" style={{ maxWidth: "560px", margin: "0 auto" }}>
      <span className="eyebrow">{founderPage.bioHeading}</span>
      {founder.body.map((paragraph, i) => (
        <p key={i} className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>
          {paragraph}
        </p>
      ))}
    </div>,

    <div key="works" style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
      <span className="eyebrow">{founderPage.worksHeading}</span>
      <h3 className="section-heading" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", margin: "0 auto" }}>
        {founderPage.worksLead}
      </h3>
      <ul style={{ listStyle: "none", margin: "1.5rem 0 0", padding: 0, textAlign: "left" }}>
        {works.map((work) => (
          <li
            key={work.title}
            style={{
              padding: "1rem 0",
              borderTop: "1px solid rgba(26,23,18,0.14)",
            }}
          >
            <div className="work-card__label">{work.category}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginTop: "0.2rem" }}>
              {work.title}
            </div>
            <p style={{ margin: "0.3rem 0 0", fontSize: "0.88rem", color: "var(--color-ink-soft)" }}>
              {work.detail}
            </p>
          </li>
        ))}
      </ul>
    </div>,

    <div key="close" style={{ maxWidth: "560px", margin: "0 auto" }}>
      <span className="eyebrow">{founderPage.forHeading}</span>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{founderPage.forBody}</p>
      <Link href={`${navBase}/founder`} className="btn btn-secondary" style={{ marginTop: "1.5rem" }}>
        {founder.cta}
      </Link>
    </div>,
  ];

  return <HybridScrollStory id="founder" ariaLabel={founder.heading} panels={panels} />;
}
