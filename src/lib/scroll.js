// Smoothly scroll to a section by its id (e.g. "#contact" or "contact").
// Falls back gracefully and updates the URL hash without a jump.
export function scrollToId(target) {
  const id = target.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return

  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  el.scrollIntoView({
    behavior: prefersReduced ? 'auto' : 'smooth',
    block: 'start',
  })

  // Keep the address bar in sync for shareable deep links.
  if (history.replaceState) {
    history.replaceState(null, '', `#${id}`)
  }
}
