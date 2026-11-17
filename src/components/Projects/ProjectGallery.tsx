import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE_OUT, useCalmMotion } from '../motion/motionPrefs'

const AUTOPLAY_MS = 4200

/**
 * The screenshot panel beside a project. It is deliberately inert — no
 * buttons, no click target — and simply cycles the shots while the row is on
 * screen, crossfading with a slow Ken Burns drift.
 */
export function ProjectGallery({ shots, name }: { shots: string[]; name: string }) {
  const calm = useCalmMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (calm || !inView || shots.length < 2) return
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % shots.length), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [calm, inView, index, shots.length])

  return (
    <div
      ref={ref}
      aria-hidden={false}
      className="relative aspect-[16/11] select-none overflow-hidden rounded-2xl border border-line bg-surface-2"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={shots[index]}
          src={shots[index]}
          alt={`${name} screenshot ${index + 1} of ${shots.length}`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
          initial={{ opacity: 0, scale: calm ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: calm ? 1 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: calm ? 0.25 : 0.9, ease: EASE_OUT },
            scale: { duration: calm ? 0 : AUTOPLAY_MS / 1000 + 1, ease: 'linear' },
          }}
        />
      </AnimatePresence>

      {shots.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
          {shots.map((shot, i) => (
            <span
              key={shot}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === index ? 20 : 6,
                background: i === index ? 'var(--accent)' : 'rgba(255,255,255,.5)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
