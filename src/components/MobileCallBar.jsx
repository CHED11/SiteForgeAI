import { Phone, MessageSquare } from 'lucide-react'
import { BUSINESS } from '../data/site'
import { scrollToId } from '../lib/scroll'

// Fixed bottom action bar on mobile for one-tap calling / quote requests.
export default function MobileCallBar() {
  const handleQuote = (e) => {
    e.preventDefault()
    scrollToId('#enquiry')
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-white/10 bg-charcoal lg:hidden">
      <a
        href={BUSINESS.phoneHref}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-warm-white"
      >
        <Phone className="h-4 w-4 text-beige" aria-hidden="true" />
        Call Now
      </a>
      <a
        href="#enquiry"
        onClick={handleQuote}
        className="flex items-center justify-center gap-2 bg-beige py-3.5 text-sm font-semibold text-charcoal"
      >
        <MessageSquare className="h-4 w-4" aria-hidden="true" />
        Free Quote
      </a>
    </div>
  )
}
