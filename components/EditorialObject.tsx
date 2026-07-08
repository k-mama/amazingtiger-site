interface EditorialObjectProps {
  toneA: string;
  toneB: string;
  emblem?: "ring" | "line" | "none";
}

/**
 * An abstract, language-free "book cover" / collectible object mark: a
 * two-tone gradient with a soft glass sweep and a small emblem. Used in
 * place of placeholder images so nothing here depends on a font rendering
 * any particular script (the earlier placehold.co approach broke on
 * Hangul). All real title/description text lives in surrounding HTML.
 */
export default function EditorialObject({ toneA, toneB, emblem = "ring" }: EditorialObjectProps) {
  return (
    <div
      className="editorial-object"
      style={{ width: "100%", height: "100%", ["--eo-tone-a" as string]: toneA, ["--eo-tone-b" as string]: toneB }}
    >
      {emblem !== "none" && (
        <div
          className="editorial-object__emblem"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {emblem === "ring" && <span className="editorial-object__ring" />}
          {emblem === "line" && <span className="editorial-object__line" />}
        </div>
      )}
    </div>
  );
}
