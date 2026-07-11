import { Fragment } from "react";

// Proper names and brand phrases that must never split across a line wrap,
// regardless of locale — Korean syllable breaks, English word wraps, etc.
const PROTECTED_PHRASES = ["Emma Kwon", "EMMAESTRO", "Amazing Tiger Publishing"];

const splitPattern = new RegExp(`(${PROTECTED_PHRASES.join("|")})`, "g");

export default function NoBreakText({ text }: { text: string }) {
  const parts = text.split(splitPattern);

  return (
    <>
      {parts.map((part, i) =>
        PROTECTED_PHRASES.includes(part) ? (
          <span key={i} className="no-break">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
