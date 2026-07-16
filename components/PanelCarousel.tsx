"use client";

import { useState, type ReactNode } from "react";

interface PanelCarouselProps {
  id: string;
  ariaLabel: string;
  panels: ReactNode[];
}

const chevronProps = {
  viewBox: "0 0 24 24",
  width: 18,
  height: 18,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

// A plain, click-driven carousel — left/right chevrons (and dots) advance
// the active panel with a simple transform transition. No scroll hijacking:
// the section sits in normal document flow at a fixed height, so page
// scroll, trackpads, and screen readers behave exactly as everywhere else.
export default function PanelCarousel({ id, ariaLabel, panels }: PanelCarouselProps) {
  const [index, setIndex] = useState(0);
  const canGoPrev = index > 0;
  const canGoNext = index < panels.length - 1;

  return (
    <section id={id} aria-label={ariaLabel} className="panel-carousel">
      <div className="panel-carousel__viewport">
        <div
          className="panel-carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {panels.map((panel, i) => (
            <div className="panel-carousel__panel" key={i} inert={i !== index ? true : undefined}>
              {panel}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="panel-carousel__arrow panel-carousel__arrow--prev"
          aria-label="Previous"
          disabled={!canGoPrev}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          <svg {...chevronProps}>
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          className="panel-carousel__arrow panel-carousel__arrow--next"
          aria-label="Next"
          disabled={!canGoNext}
          onClick={() => setIndex((i) => Math.min(panels.length - 1, i + 1))}
        >
          <svg {...chevronProps}>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="panel-carousel__dots">
        {panels.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`panel-carousel__dot ${i === index ? "is-active" : ""}`}
            aria-label={`Go to panel ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
