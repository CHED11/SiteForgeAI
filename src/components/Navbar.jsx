import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo'
import { BUSINESS, NAV_LINKS } from '../data/site'
import { scrollToId } from '../lib/scroll'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Switch to a solid header once the user scrolls past the hero top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-warm-white/95 shadow-card backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-content flex h-[72px] items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNav(e, '#home')}
          aria-label="Render'N'co home"
        >
          <Logo variant={scrolled || open ? 'dark' : 'dark'} />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-sm font-medium text-charcoal/80 transition-colors hover:text-charcoal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={BUSINESS.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-charcoal"
          >
            <Phone className="h-4 w-4 text-beige-dark" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href="#enquiry"
            onClick={(e) => handleNav(e, '#enquiry')}
            className="btn-primary !px-5 !py-2.5"
          >
            Free Quote
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-lg text-charcoal lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-charcoal/10 bg-warm-white transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-[480px]' : 'max-h-0'
        }`}
      >
        <ul className="container-content flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="block rounded-lg px-3 py-3 text-base font-medium text-charcoal hover:bg-warm-100"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-3 flex flex-col gap-3 px-1">
            <a href={BUSINESS.phoneHref} className="btn-dark w-full">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {BUSINESS.phoneDisplay}
            </a>
            <a
              href="#enquiry"
              onClick={(e) => handleNav(e, '#enquiry')}
              className="btn-primary w-full"
            >
              Request Free Quote
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
