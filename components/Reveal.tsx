"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Progressive enhancement only: content is visible by default (see the
// `.reveal` base rule in globals.css, scoped to `@media (scripting: enabled)`
// so it never applies without JS at all). Below-the-fold elements still get
// the scroll-reveal treatment, but two guarantees keep them from ever being
// stuck invisible while holding their layout space:
//   1. A synchronous, pre-paint check (useLayoutEffect + getBoundingClientRect)
//      marks anything already in the viewport visible immediately — no
//      observer/timer round-trip, so above-the-fold content never flashes.
//   2. A short fallback timer forces visibility if IntersectionObserver never
//      reports an intersection (broken observer, or content never scrolled
//      into view — e.g. a full-page screenshot tool).
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
