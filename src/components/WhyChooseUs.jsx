import { Award, ShieldCheck, Clock, ThumbsUp, MapPin, Wallet } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { CallButton } from './ActionButtons'

const REASONS = [
  {
    icon: Award,
    title: '35+ Years Experience',
    description:
      'Three and a half decades of rendering know-how on every Gold Coast substrate and style.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Guaranteed',
    description:
      'Premium materials and proven systems backed by workmanship we stand behind.',
  },
  {
    icon: Clock,
    title: 'On-Time, Every Time',
    description:
      'Reliable scheduling and clear communication so your project stays on track.',
  },
  {
    icon: MapPin,
    title: 'Gold Coast Local',
    description:
      'Born and based on the Coast — we know the climate, the councils and the look.',
  },
  {
    icon: Wallet,
    title: 'Transparent Pricing',
    description:
      'Detailed written quotes with no hidden costs and no surprises at the end.',
  },
  {
    icon: ThumbsUp,
    title: 'Trusted Workmanship',
    description:
      'A reputation built on referrals, repeat clients and finishes that last.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-charcoal py-20 sm:py-28">
      <div className="container-content">
        <SectionHeading
          variant="light"
          eyebrow="Why Choose Us"
          title="The rendering team the Gold Coast trusts"
          description="When you hire Render'N'co you get a seasoned crew that treats your property like their own — from the first quote to the final coat."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-charcoal p-8 transition-colors duration-300 hover:bg-charcoal-700"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-beige/15 text-beige">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-warm-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-white/70">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <CallButton variant="light" />
        </div>
      </div>
    </section>
  )
}
