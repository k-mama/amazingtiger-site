"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollStoryState {
  /** 0 at the first panel, 1 once the last panel has fully arrived. */
  progress: number;
  activeIndex: number;
  /** false on narrow viewports or reduced-motion — render the plain click-only carousel instead. */
  isPinned: boolean;
}

interface ScrollStoryControls extends ScrollStoryState {
  /** Smooth-scrolls the real page to the position where this panel is active. */
  scrollToPanel: (index: number) => void;
}

// Same technique Apple's own product pages use: no wheel/touch hijacking,
// just a tall native-scroll track with a `position: sticky` stage inside it.
// Progress is read from (and, via scrollToPanel, written back to) the
// page's real scroll position — one source of truth, so the chevron/dot
// controls and free scrolling never disagree with each other.
export function useScrollStory(panelCount: number): [React.RefObject<HTMLElement>, ScrollStoryControls] {
  const trackRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<ScrollStoryState>({ progress: 0, activeIndex: 0, isPinned: true });
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    const media = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = reducedMotion.matches;

    const evaluatePinned = () => !media.matches && !reducedMotion.matches;

    let pinned = evaluatePinned();
    let ticking = false;

    const measure = () => {
      ticking = false;
      if (!pinned) return;
      const rect = node.getBoundingClientRect();
      const trackHeight = rect.height - window.innerHeight;
      const raw = trackHeight > 0 ? -rect.top / trackHeight : 0;
      const progress = Math.min(1, Math.max(0, raw));
      const activeIndex = Math.min(panelCount - 1, Math.round(progress * (panelCount - 1)));
      setState({ progress, activeIndex, isPinned: true });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onScroll);
            measure();
          } else {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
          }
        });
      },
      { rootMargin: "20% 0px" }
    );
    observer.observe(node);

    const onModeChange = () => {
      pinned = evaluatePinned();
      reducedMotionRef.current = reducedMotion.matches;
      setState({ progress: 0, activeIndex: 0, isPinned: pinned });
    };
    media.addEventListener("change", onModeChange);
    reducedMotion.addEventListener("change", onModeChange);
    setState({ progress: 0, activeIndex: 0, isPinned: pinned });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onModeChange);
      reducedMotion.removeEventListener("change", onModeChange);
    };
  }, [panelCount]);

  const scrollToPanel = useCallback(
    (index: number) => {
      const node = trackRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const trackAbsoluteTop = window.scrollY + rect.top;
      const trackHeight = rect.height - window.innerHeight;
      const targetProgress = panelCount > 1 ? index / (panelCount - 1) : 0;
      const targetScrollY = trackAbsoluteTop + targetProgress * Math.max(0, trackHeight);
      window.scrollTo({ top: targetScrollY, behavior: reducedMotionRef.current ? "auto" : "smooth" });
    },
    [panelCount]
  );

  return [trackRef, { ...state, scrollToPanel }];
}
