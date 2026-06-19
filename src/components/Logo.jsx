// Render'N'co logo — a premium "R" monogram in a rounded charcoal tile paired
// with a clean wordmark. Designed to read well on vehicles, uniforms and the
// site header. `variant` switches the wordmark colour for dark backgrounds.
export default function Logo({ variant = 'dark', className = '' }) {
  const wordColor = variant === 'light' ? 'text-warm-white' : 'text-charcoal'
  const subColor = variant === 'light' ? 'text-beige-light' : 'text-concrete'

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-charcoal shadow-card">
        <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
          <path
            d="M18 46V18h12.5c5.4 0 9 3.1 9 8 0 3.6-1.9 6.2-5 7.3L41 46h-6.6l-6-11.2H24V46h-6Zm6-16.1h6c2.4 0 3.8-1.2 3.8-3.4S32.4 23 30 23h-6v6.9Z"
            fill="#C2A98A"
          />
          <rect x="18" y="50" width="28" height="3" rx="1.5" fill="#F7F4EF" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-extrabold tracking-tight ${wordColor}`}
        >
          Render'N'co
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-widest2 ${subColor}`}
        >
          Gold Coast Rendering
        </span>
      </span>
    </span>
  )
}
