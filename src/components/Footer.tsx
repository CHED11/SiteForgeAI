import { Link } from "react-router-dom";
import { SITE } from "../config/site";
import { useTransition } from "../context/TransitionContext";

export default function Footer() {
  const { enterCollection } = useTransition();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.07] bg-ink py-16">
      <div className="container-lux">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link to="/" className="text-lg font-semibold tracking-tightest text-chalk">
              CarCentral<span className="text-gold">Co</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ash">{SITE.tagline}</p>
            <p className="mt-6 text-sm text-ash">
              <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-chalk">
                {SITE.email}
              </a>
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Collections</h4>
            <ul className="space-y-3 text-sm text-ash">
              <li>
                <button
                  onClick={() => enterCollection("/collections/premium", "premium")}
                  className="transition-colors hover:text-chalk"
                >
                  Premium Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => enterCollection("/collections/performance", "performance")}
                  className="transition-colors hover:text-chalk"
                >
                  Performance Collection
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-ash">
              <li>
                <Link to="/#next-release" className="transition-colors hover:text-chalk">
                  Next Release
                </Link>
              </li>
              <li>
                <Link to="/#about" className="transition-colors hover:text-chalk">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-ash sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.brand}. All rights reserved.
          </p>
          <p className="tracking-wide">Collector-grade automotive artwork.</p>
        </div>
      </div>
    </footer>
  );
}
