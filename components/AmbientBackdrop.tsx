interface Blob {
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
}

interface AmbientBackdropProps {
  blobs: Blob[];
}

/**
 * Decorative, aria-hidden pastel glow layer used behind hero/section content.
 * Pure CSS (blurred radial gradients) — no images, no canvas, no JS animation.
 */
export default function AmbientBackdrop({ blobs }: AmbientBackdropProps) {
  return (
    <div className="ambient-backdrop" aria-hidden="true">
      {blobs.map((blob, i) => (
        <span
          key={i}
          className="ambient-blob"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            opacity: blob.opacity ?? 0.6,
            background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
