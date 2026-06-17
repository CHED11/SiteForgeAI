import { AnimatePresence, motion } from "framer-motion";
import { COUNTDOWN_CONFIG } from "../config/countdown";
import { useCountdown } from "../hooks/useCountdown";
import { EASE_LUX, fadeUp, viewportOnce } from "../lib/motion";

function Unit({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-charcoal-800/60 sm:h-24 sm:w-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            initial={{ y: "60%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-60%", opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_LUX }}
            className="text-3xl font-semibold tabular-nums tracking-tight text-chalk sm:text-4xl"
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-[0.62rem] uppercase tracking-ultra text-ash">{label}</span>
    </div>
  );
}

export default function CountdownTimer() {
  const { days, hours, minutes, seconds, isLive } = useCountdown(
    COUNTDOWN_CONFIG.releaseDate
  );

  return (
    <section id="next-release" className="relative overflow-hidden bg-charcoal py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-spotlight opacity-50" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-lux relative flex flex-col items-center text-center"
      >
        <p className="eyebrow mb-5 text-gold">{COUNTDOWN_CONFIG.heading}</p>
        <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tightest text-chalk sm:text-3xl lg:text-4xl">
          {COUNTDOWN_CONFIG.subheading}
        </h2>

        <div className="mt-14">
          {isLive ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE_LUX }}
              className="rounded-2xl border border-gold/30 bg-gold/[0.06] px-10 py-7"
            >
              <span className="text-2xl font-semibold tracking-tightest text-gold-sheen sm:text-3xl">
                {COUNTDOWN_CONFIG.liveLabel}
              </span>
            </motion.div>
          ) : (
            <div className="flex items-start gap-3 sm:gap-5">
              <Unit value={days} label="Days" />
              <Separator />
              <Unit value={hours} label="Hours" />
              <Separator />
              <Unit value={minutes} label="Minutes" />
              <Separator />
              <Unit value={seconds} label="Seconds" />
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function Separator() {
  return (
    <span className="self-center pb-7 text-2xl font-light text-white/15 sm:text-3xl">:</span>
  );
}
