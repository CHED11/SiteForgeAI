import { Phone, Clock, MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { BUSINESS } from '../data/site'

const DETAILS = [
  {
    icon: Phone,
    label: 'Call Us',
    value: BUSINESS.phoneDisplay,
    href: BUSINESS.phoneHref,
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Monday – Friday',
    sub: '8am – 5pm',
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: BUSINESS.serviceArea,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="bg-warm-50 py-20 sm:py-28">
      <div className="container-content">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Talk to a Gold Coast rendering specialist"
          description="Have a question or ready to book? Reach out and we'll point you in the right direction."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {DETAILS.map(({ icon: Icon, label, value, sub, href }) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-charcoal text-beige">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xs font-semibold uppercase tracking-widest2 text-beige-dark">
                  {label}
                </h3>
                <p className="mt-2 font-display text-xl font-bold text-charcoal">
                  {value}
                </p>
                {sub && <p className="text-concrete">{sub}</p>}
              </>
            )

            return href ? (
              <a
                key={label}
                href={href}
                className="flex flex-col items-start rounded-2xl border border-charcoal/5 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                {inner}
              </a>
            ) : (
              <div
                key={label}
                className="flex flex-col items-start rounded-2xl border border-charcoal/5 bg-white p-7 shadow-card"
              >
                {inner}
              </div>
            )
          })}
        </div>

        {/* Call-to-action band */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl bg-charcoal px-8 py-9 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold text-warm-white">
              Ready to get started?
            </h3>
            <p className="mt-1 text-warm-white/70">
              Call now for a free quote — {BUSINESS.serviceArea}.
            </p>
          </div>
          <a href={BUSINESS.phoneHref} className="btn-primary shrink-0">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
