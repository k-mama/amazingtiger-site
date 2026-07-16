"use client";

import type { ReactNode } from "react";
import PanelCarousel from "./PanelCarousel";
import { useScrollStory } from "./useScrollStory";

interface HybridScrollStoryProps {
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

// Desktop: the section pins in the viewport and pans through panels as the
// page scrolls (Apple product-page style) — but the chevron/dot controls
// stay, and now drive the *real* scroll position via scrollToPanel, so
// free scrolling and clicking never disagree with each other. Below 768px
// or under prefers-reduced-motion, this renders the plain click-only
// PanelCarousel unchanged — the behavior already shipped and approved.
export default function HybridScrollStory({ id, ariaLabel, panels }: HybridScrollStoryProps) {
  const [trackRef, { progress, activeIndex, isPinned, scrollToPanel }] = useScrollStory(panels.length);

  if (!isPinned) {
    return <PanelCarousel id={id} ariaLabel={ariaLabel} panels={panels} />;
  }

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < panels.length - 1;

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      ref={trackRef}
      className="scroll-story"
      style={{ height: `${panels.length * 100}vh` }}
    >
      <div className="scroll-story__stage">
        <div
          className="scroll-story__track"
          style={{ transform: `translateX(-${progress * (panels.length - 1) * 100}vw)` }}
        >
          {panels.map((panel, i) => (
            <div className="scroll-story__panel" key={i} inert={i !== activeIndex ? true : undefined}>
              {panel}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="panel-carousel__arrow panel-carousel__arrow--prev"
          aria-label="Previous"
          disabled={!canGoPrev}
          onClick={() => scrollToPanel(Math.max(0, activeIndex - 1))}
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
          onClick={() => scrollToPanel(Math.min(panels.length - 1, activeIndex + 1))}
        >
          <svg {...chevronProps}>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="scroll-story__dots">
          {panels.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`scroll-story__dot ${i === activeIndex ? "is-active" : ""}`}
              aria-label={`Go to panel ${i + 1}`}
              aria-current={i === activeIndex}
              onClick={() => scrollToPanel(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
