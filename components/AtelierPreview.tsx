import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import PanelCarousel from "./PanelCarousel";
import DreamGlassIcon, { atelierGlyphList, dreamGlassTones } from "./DreamGlassIcon";

interface AtelierPreviewProps {
  dict: Dictionary;
  basePath: string;
}

export default function AtelierPreview({ dict, basePath }: AtelierPreviewProps) {
  const navBase = basePath === "/" ? "/en" : basePath;
  const { atelierPreview, atelierPage } = dict;
  const highlights = atelierPage.services.slice(0, 6);
  const steps = atelierPage.process.steps.slice(0, 4);

  const panels = [
    <div key="intro" style={{ maxWidth: "620px", margin: "0 auto" }}>
      <span className="eyebrow">{atelierPreview.eyebrow}</span>
      <h2 className="section-heading" style={{ margin: "0 auto" }}>{atelierPreview.heading}</h2>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{atelierPreview.lead}</p>
    </div>,

    <div key="services" style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      <span className="eyebrow">{atelierPage.servicesHeading}</span>
      <h3 className="section-heading" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", margin: "0 auto" }}>
        {atelierPage.servicesLead}
      </h3>
      <div className="grid-3" style={{ marginTop: "2rem", textAlign: "left" }}>
        {highlights.map((service, i) => {
          const Glyph = atelierGlyphList[i % atelierGlyphList.length];
          const tone = dreamGlassTones[i % dreamGlassTones.length];
          return (
            <div className="info-card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }} key={service.title}>
              <DreamGlassIcon tone={tone}>
                <Glyph />
              </DreamGlassIcon>
              <div>
                <h3 style={{ marginBottom: "0.3rem" }}>{service.title}</h3>
                <p style={{ margin: 0, fontSize: "0.88rem" }}>{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>,

    <div key="process" style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
      <span className="eyebrow">{atelierPage.process.heading}</span>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{atelierPage.process.lead}</p>
      <ol className="atelier-story__steps" style={{ textAlign: "left" }}>
        {steps.map((step, i) => (
          <li key={step.title}>
            <span className="atelier-story__step-index">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>{step.title}</div>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.88rem", color: "var(--color-ink-soft)" }}>
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>,

    <div key="craft" style={{ width: "100%", maxWidth: "640px", margin: "0 auto" }}>
      <span className="eyebrow">{atelierPage.craft.heading}</span>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{atelierPage.craft.lead}</p>
      <ul style={{ listStyle: "none", margin: "1.5rem 0 0", padding: 0, textAlign: "left" }}>
        {atelierPage.craft.points.map((point) => (
          <li
            key={point.title}
            style={{ padding: "0.9rem 0", borderTop: "1px solid rgba(26,23,18,0.14)" }}
          >
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1rem" }}>{point.title}</div>
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.88rem", color: "var(--color-ink-soft)" }}>
              {point.description}
            </p>
          </li>
        ))}
      </ul>
    </div>,

    <div key="close" style={{ maxWidth: "560px", margin: "0 auto" }}>
      <span className="eyebrow">{atelierPage.founderBridge.eyebrow}</span>
      <p className="section-lead" style={{ maxWidth: "none", margin: "0 auto" }}>{atelierPage.founderBridge.body}</p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.5rem", justifyContent: "center" }}>
        <Link href={`${navBase}/atelier`} className="btn btn-secondary">
          {atelierPreview.cta}
        </Link>
        <Link href={`${navBase}/founder`} className="btn btn-primary">
          {atelierPage.founderBridge.cta}
        </Link>
      </div>
    </div>,
  ];

  return <PanelCarousel id="atelier" ariaLabel={atelierPreview.heading} panels={panels} />;
}
