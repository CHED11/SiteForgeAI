import SectionHeading from './SectionHeading'
import { QuoteButton } from './ActionButtons'
import { SERVICES } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="bg-warm-50 py-20 sm:py-28">
      <div className="container-content">
        <SectionHeading
          eyebrow="What We Do"
          title="Rendering services done properly"
          description="A complete range of rendering and coating solutions for homes, renovations and commercial projects across the Gold Coast."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group flex h-full flex-col rounded-2xl border border-charcoal/5 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-beige/40 hover:shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-warm-100 text-charcoal transition-colors duration-300 group-hover:bg-charcoal group-hover:text-beige">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-charcoal">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-concrete">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-concrete">
            Not sure which finish suits your property? We'll guide you through it.
          </p>
          <QuoteButton label="Get Your Free Quote" />
        </div>
      </div>
    </section>
  )
}
