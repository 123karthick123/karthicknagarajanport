/** Height of the fixed nav bar, in px. */
const NAV_H = 64

/**
 * Scroll a section into view so it sits in the middle of the viewport.
 * Sections taller than the screen are aligned just under the nav instead,
 * since centring them would hide their heading.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  const rect = el.getBoundingClientRect()
  const absoluteTop = window.scrollY + rect.top
  const viewport = window.innerHeight
  const fits = rect.height < viewport - NAV_H - 24

  const target = fits
    ? absoluteTop - (viewport - rect.height) / 2
    : absoluteTop - NAV_H - 16

  const max = document.documentElement.scrollHeight - viewport
  window.scrollTo({
    top: Math.min(Math.max(0, target), Math.max(0, max)),
    behavior: 'smooth',
  })

  if (history.replaceState) history.replaceState(null, '', `#${id}`)
}

/** Click handler for in-page anchors — keeps the href for middle-click / SEO. */
export function onSectionLinkClick(id: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    scrollToSection(id)
  }
}
