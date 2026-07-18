"use client";

import { useState } from "react";
import Image from "next/image";

interface FeaturedStoryVideoProps {
  posterSrc: string;
  posterAlt: string;
  playLabel: string;
}

export default function FeaturedStoryVideo({ posterSrc, posterAlt, playLabel }: FeaturedStoryVideoProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="featured-story__frame">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="featured-story__video"
          src="/videos/born_rare_ad_1.mp4"
          poster={posterSrc}
          controls
          autoPlay
          playsInline
        />
      </div>
    );
  }

  return (
    <div className="featured-story__frame">
      <button type="button" className="featured-story__poster" onClick={() => setPlaying(true)} aria-label={playLabel}>
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          sizes="(min-width: 900px) 760px, 100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <span className="featured-story__play" aria-hidden="true">
          <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
            <path d="M1 1.5V24.5L20.5 13L1 1.5Z" fill="currentColor" />
          </svg>
        </span>
      </button>
    </div>
  );
}
