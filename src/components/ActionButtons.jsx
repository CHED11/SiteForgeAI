import { Phone, ArrowRight } from 'lucide-react'
import { BUSINESS } from '../data/site'
import { scrollToId } from '../lib/scroll'

// "Call Now" — always dials the business number via tel: link.
export function CallButton({ className = '', variant = 'primary', label = 'Call Now' }) {
  const base = variant === 'light' ? 'btn-outline-light' : 'btn-dark'
  return (
    <a href={BUSINESS.phoneHref} className={`${base} ${className}`}>
      <Phone className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  )
}

// "Request Free Quote" — smooth-scrolls to the enquiry form section.
export function QuoteButton({ className = '', label = 'Request Free Quote' }) {
  const handleClick = (e) => {
    e.preventDefault()
    scrollToId('#enquiry')
  }
  return (
    <a href="#enquiry" onClick={handleClick} className={`btn-primary ${className}`}>
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  )
}
