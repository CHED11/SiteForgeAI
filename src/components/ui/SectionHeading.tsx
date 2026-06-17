import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../lib/motion";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "gold" | "silver";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
}: Props) {
  const eyebrowTone =
    tone === "gold" ? "text-gold" : tone === "silver" ? "text-silver" : "text-ash";
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      {eyebrow && <p className={["eyebrow mb-5", eyebrowTone].join(" ")}>{eyebrow}</p>}
      <h2 className="text-3xl font-semibold leading-tight tracking-tightest text-chalk sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-ash">{description}</p>
      )}
    </motion.div>
  );
}
