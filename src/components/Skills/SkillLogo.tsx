import { useState } from 'react'

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/icons'

/**
 * Brand logo for a skill card. The marks come from devicon over a CDN; if that
 * is blocked or offline we fall back to a tinted monogram so the card never
 * collapses into an empty box.
 */
export function SkillLogo({ logo, name, tint }: { logo: string; name: string; tint: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        aria-hidden
        className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-lg font-extrabold"
        style={{ background: `${tint}1f`, color: tint }}
      >
        {name.charAt(0)}
      </span>
    )
  }

  return (
    <img
      src={`${CDN}/${logo}.svg`}
      alt=""
      aria-hidden
      width={44}
      height={44}
      loading="lazy"
      decoding="async"
      className="h-11 w-11 object-contain"
      onError={() => setFailed(true)}
    />
  )
}
