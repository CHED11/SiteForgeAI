import { Star, MapPin } from 'lucide-react'
import { BUSINESS } from '../data/site'
import { CallButton, QuoteButton } from './ActionButtons'

const HERO_IMG =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=75'

const STATS = [
  { value: '35+', label: 'Years Experience' },
  { value: '1000+', label: 'Projects Rendered' },
  { value: '100%', label: 'Gold Coast Local' },
]

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-charcoal">
      {/* Background image + gradient overlays for contrast */}
      <img
        src={HERO_IMG}
        alt="Freshly rendered modern Gold Coast home"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fetchpriority="high"
        decoding="async"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/90 via-transparent to-charcoal/30"
        aria-hidden="true"
      />

      <div className="container-content relative flex min-h-[100svh] flex-col justify-center pb-16 pt-28 sm:pt-32">
        <div className="max-w-3xl animate-fade-up">
          <span className="eyebrow text-beige-light">
            <span className="h-px w-6 bg-beige" aria-hidden="true" />
            {BUSINESS.tagline}
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] text-warm-white sm:text-5xl lg:text-6xl">
            Gold Coast Rendering Specialists With Over{' '}
            <span className="text-beige">35 Years Experience</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-warm-white/80">
            Professional rendering, acrylic render, texture coatings, renovations
            and repairs across the Gold Coast.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CallButton label={`Call Now — ${BUSINESS.phoneDisplay}`} variant="light" />
            <QuoteButton />
          </div>

          {/* Trust strip */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-warm-white/75">
            <span className="inline-flex items-center gap-2">
              <span className="flex" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-beige text-beige" />
                ))}
              </span>
              Trusted by Gold Coast homeowners
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-beige" aria-hidden="true" />
              {BUSINESS.location}
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-bold text-beige sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-warm-white/65 sm:text-sm">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
