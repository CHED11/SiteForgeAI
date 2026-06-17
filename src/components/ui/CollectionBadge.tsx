import type { CollectionId } from "../../config/products";

interface Props {
  collection: CollectionId;
  label: string;
  className?: string;
}

/**
 * Small overline badge that subtly differentiates the two collections:
 * Premium leans gold, Performance leans cold silver.
 */
export default function CollectionBadge({ collection, label, className }: Props) {
  const tone =
    collection === "premium"
      ? "border-gold/30 text-gold"
      : "border-silver/25 text-silver";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.62rem] font-medium uppercase tracking-ultra",
        tone,
        className ?? "",
      ].join(" ")}
    >
      {label}
    </span>
  );
}
