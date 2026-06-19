import { CheckCircle2 } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { CallButton } from './ActionButtons'
import { BUSINESS } from '../data/site'

const ABOUT_IMG =
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=75'

const HIGHLIGHTS = [
  'Master renderers with three decades on the tools',
  'Premium-grade acrylic and texture systems',
  'Meticulous prep, clean sites and on-time delivery',
  'Fully detailed, no-obligation written quotes',
]

export default function About() {
  return (
    <section id="about" className="bg-warm-white py-20 sm:py-28">
      <div className="container-content grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image with floating experience badge */}
        <div className="relative order-last lg:order-first">
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <img
              src={ABOUT_IMG}
              alt="Render'N'co tradesman applying a smooth render finish"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 rounded-2xl bg-charcoal px-7 py-5 text-warm-white shadow-soft sm:right-6">
            <span className="block font-display text-4xl font-bold text-beige">
              {BUSINESS.experienceYears}
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-warm-white/70">
              Years of Experience
            </span>
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Render'N'co"
            title="Craftsmanship built over 35 years on the Gold Coast"
            description="Render'N'co is a family-run rendering business with deep roots on the Gold Coast. For over three and a half decades we've been transforming homes and commercial properties with hard-wearing, beautifully finished render."
          />

          <p className="mt-5 text-base leading-relaxed text-concrete">
            From new builds and full renovations to remedial repairs and feature
            walls, every job gets the same attention to detail — careful surface
            preparation, the right system for the substrate, and a flawless final
            coat. We take pride in tidy sites, honest advice and finishes that
            still look sharp years down the track.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-beige-dark"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <CallButton />
          </div>
        </div>
      </div>
    </section>
  )
}
