import { MapPin } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { QuoteButton } from './ActionButtons'
import { PROJECTS } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="bg-warm-white py-20 sm:py-28">
      <div className="container-content">
        <SectionHeading
          eyebrow="Recent Projects"
          title="Finishes we're proud to put our name on"
          description="A snapshot of rendering work completed for homeowners and builders right across the Gold Coast."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project) => (
            <figure
              key={project.title}
              className="group relative overflow-hidden rounded-2xl bg-charcoal shadow-card"
            >
              <img
                src={project.image}
                alt={`${project.title} — ${project.category} in ${project.location}`}
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-block rounded-full bg-beige px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-charcoal">
                  {project.category}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-warm-white">
                  {project.title}
                </h3>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-warm-white/75">
                  <MapPin className="h-3.5 w-3.5 text-beige" aria-hidden="true" />
                  {project.location}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <QuoteButton label="Start Your Project" />
        </div>
      </div>
    </section>
  )
}
