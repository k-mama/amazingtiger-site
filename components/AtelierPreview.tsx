import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import Reveal from "./Reveal";

interface AtelierPreviewProps {
  dict: Dictionary;
  basePath: string;
}

export default function AtelierPreview({ dict, basePath }: AtelierPreviewProps) {
  const navBase = basePath === "/" ? "/en" : basePath;
  const highlights = dict.atelierPage.services.slice(0, 4);

  return (
    <section id="atelier" className="section" style={{ borderTop: "1px solid var(--color-stone-line)" }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: "start" }}>
          <Reveal>
            <span className="eyebrow">{dict.atelierPreview.eyebrow}</span>
            <h2 className="section-heading">{dict.atelierPreview.heading}</h2>
            <p className="section-lead">{dict.atelierPreview.lead}</p>
            <Link href={`${navBase}/atelier`} className="btn btn-secondary" style={{ marginTop: "0.5rem" }}>
              {dict.atelierPreview.cta}
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {highlights.map((service) => (
                <li
                  key={service.title}
                  style={{ padding: "0.9rem 0", borderTop: "1px solid var(--color-stone-line)" }}
                >
                  <strong
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      display: "block",
                      marginBottom: "0.2rem",
                      color: "var(--color-ink)",
                    }}
                  >
                    {service.title}
                  </strong>
                  <span style={{ fontSize: "0.88rem", color: "var(--color-ink-soft)" }}>{service.description}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
