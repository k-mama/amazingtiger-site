"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Progressive enhancement only: content is visible by default (see the
// `.reveal` base rule in globals.css, scoped to `@media (scripting: enabled)`
// so it never applies without JS at all). This timeout is the fallback for
// browsers where JS is enabled but IntersectionObserver never reports an
// intersection — it guarantees the fade-in resolves instead of leaving the
// element permanently at opacity: 0 while still holding its layout space.
const REVEAL_FALLBACK_MS = 1200;

export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

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
