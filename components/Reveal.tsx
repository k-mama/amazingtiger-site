"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// This component never controls whether content is readable — `.reveal` in
// globals.css keeps opacity at 1 unconditionally. All this does is decide
// when to add `is-visible`, which only triggers a small translateY slide-in.
// Two guarantees keep that motion from ever getting stuck mid-slide:
//   1. A synchronous, pre-paint check (useLayoutEffect + getBoundingClientRect)
//      marks anything already in the viewport visible immediately — no
//      observer/timer round-trip for above-the-fold content.
//   2. A short fallback timer settles the slide-in even if IntersectionObserver
//      never reports an intersection (broken observer, or content never
//      scrolled into view — e.g. a full-page screenshot tool).
const REVEAL_FALLBACK_MS = 350;

export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyInView) {
      setVisible(true);
      return;
    }

    const reveal = () => setVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    const fallback = setTimeout(reveal, REVEAL_FALLBACK_MS);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
