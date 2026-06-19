import { PhoneCall, ClipboardList, PaintRoller, Sparkles } from 'lucide-react'
import SectionHeading from './SectionHeading'

const STEPS = [
  {
    icon: PhoneCall,
    step: '01',
    title: 'Get In Touch',
    description:
      'Call us or send an enquiry. Tell us about your property and what you need rendered.',
  },
  {
    icon: ClipboardList,
    step: '02',
    title: 'Free On-Site Quote',
    description:
      'We assess the job, recommend the right system and provide a clear, detailed written quote.',
  },
  {
    icon: PaintRoller,
    step: '03',
    title: 'Expert Application',
    description:
      'Our crew preps, renders and coats with precision — keeping the site clean throughout.',
  },
  {
    icon: Sparkles,
    step: '04',
    title: 'Flawless Finish',
    description:
      'We walk you through the completed work to make sure every detail meets our standard.',
  },
]

export default function Process() {
  return (
    <section id="process" className="bg-warm-50 py-20 sm:py-28">
      <div className="container-content">
        <SectionHeading
          eyebrow="How It Works"
          title="A simple, four-step process"
          description="From first call to final coat, we keep things straightforward and stress-free."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, step, title, description }, i) => (
            <div key={step} className="relative">
              {/* Connector line between steps on desktop */}
              {i < STEPS.length - 1 && (
                <span
                  className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] bg-beige/40 lg:block"
                  aria-hidden="true"
                />
              )}
              <div className="flex flex-col items-center text-center">
                <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-charcoal text-beige shadow-card">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                  <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-beige text-xs font-bold text-charcoal">
                    {step}
                  </span>
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-charcoal">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-concrete">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
