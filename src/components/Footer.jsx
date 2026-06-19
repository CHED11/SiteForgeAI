import { Phone, Clock, MapPin } from 'lucide-react'
import Logo from './Logo'
import { BUSINESS, NAV_LINKS } from '../data/site'
import { SERVICES } from '../data/services'
import { scrollToId } from '../lib/scroll'

export default function Footer() {
  const year = new Date().getFullYear()

  const handleNav = (e, href) => {
    e.preventDefault()
    scrollToId(href)
  }

  return (
    <footer className="bg-charcoal-900 text-warm-white/70">
      <div className="container-content py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-warm-white/60">
              Gold Coast rendering specialists with over {BUSINESS.experienceYears}{' '}
              years of experience. Quality acrylic render, texture coatings,
              repairs and renovations.
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="btn-primary mt-6 !px-5 !py-2.5"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {BUSINESS.phoneDisplay}
            </a>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-warm-white">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="transition-colors hover:text-beige"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-warm-white">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    onClick={(e) => handleNav(e, '#services')}
                    className="transition-colors hover:text-beige"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-warm-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-beige" aria-hidden="true" />
                <a href={BUSINESS.phoneHref} className="hover:text-beige">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-beige" aria-hidden="true" />
                <span>{BUSINESS.hours}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-beige" aria-hidden="true" />
                <span>{BUSINESS.serviceArea}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-xs text-warm-white/50 sm:flex-row">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p>Gold Coast, Queensland · ABN available on request</p>
        </div>
      </div>
    </footer>
  )
}
