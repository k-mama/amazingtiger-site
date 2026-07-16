import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import Reveal from "./Reveal";
import DreamGlassIcon, { atelierGlyphList, dreamGlassTones } from "./DreamGlassIcon";

interface AtelierPreviewProps {
  dict: Dictionary;
  basePath: string;
}

export default function AtelierPreview({ dict, basePath }: AtelierPreviewProps) {
  const navBase = basePath === "/" ? "/en" : basePath;
  const highlights = dict.atelierPage.services.slice(0, 6);

  return (
    <section id="atelier" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{dict.atelierPreview.eyebrow}</span>
          <h2 className="section-heading">{dict.atelierPreview.heading}</h2>
          <p className="section-lead">{dict.atelierPreview.lead}</p>
        </Reveal>

        <div className="grid-3" style={{ marginTop: "2.5rem" }}>
          {highlights.map((service, i) => {
            const Glyph = atelierGlyphList[i % atelierGlyphList.length];
            const tone = dreamGlassTones[i % dreamGlassTones.length];
            return (
              <Reveal key={service.title} delay={i * 70}>
                <div className="info-card" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <DreamGlassIcon tone={tone}>
                    <Glyph />
                  </DreamGlassIcon>
                  <div>
                    <h3 style={{ marginBottom: "0.3rem" }}>{service.title}</h3>
                    <p style={{ margin: 0, fontSize: "0.88rem" }}>{service.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <Link href={`${navBase}/atelier`} className="btn btn-secondary" style={{ marginTop: "2.25rem" }}>
            {dict.atelierPreview.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
