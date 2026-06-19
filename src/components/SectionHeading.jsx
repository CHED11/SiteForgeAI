// Reusable section header: small eyebrow label, main heading and optional
// supporting text. Keeps spacing + hierarchy consistent across the page.
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  variant = 'dark',
}) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  const titleColor = variant === 'light' ? 'text-warm-white' : 'text-charcoal'
  const descColor = variant === 'light' ? 'text-warm-white/70' : 'text-concrete'

  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-6 bg-beige" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-4 section-heading ${titleColor}`}>{title}</h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed ${descColor} sm:text-lg`}>
          {description}
        </p>
      )}
    </div>
  )
}
