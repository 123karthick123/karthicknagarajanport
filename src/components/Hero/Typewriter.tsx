import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useCalmMotion } from '../motion/motionPrefs'

const TYPE_MS = 70
const ERASE_MS = 35
const HOLD_MS = 1600
const GAP_MS = 420

/**
 * Boxed headline typewriter: types one role, holds, erases, moves to the next.
 * The box is sized to the longest role so the layout never jumps, and reduced
 * motion gets the first role printed statically with no caret animation.
 */
export function Typewriter({
  words,
  className = '',
  bare = false,
}: {
  words: readonly string[]
  className?: string
  /** drop the bordered box and render the text on its own */
  bare?: boolean
}) {
  const calm = useCalmMotion()
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [erasing, setErasing] = useState(false)

  const word = words[index % words.length] ?? ''
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  useEffect(() => {
    if (calm) return
    let id: number
    if (!erasing && count < word.length) {
      id = window.setTimeout(() => setCount((c) => c + 1), TYPE_MS)
    } else if (!erasing) {
      id = window.setTimeout(() => setErasing(true), HOLD_MS)
    } else if (count > 0) {
      id = window.setTimeout(() => setCount((c) => c - 1), ERASE_MS)
    } else {
      id = window.setTimeout(() => {
        setErasing(false)
        setIndex((i) => (i + 1) % words.length)
      }, GAP_MS)
    }
    return () => window.clearTimeout(id)
  }, [calm, count, erasing, word, words.length])

  const shown = calm ? words[0] : word.slice(0, count)

  return (
    <div
      className={
        bare
          ? `inline-grid max-w-full ${className}`
          : `inline-grid max-w-full rounded-lg border-2 px-3 py-1.5 sm:rounded-xl sm:px-5 sm:py-2.5 ${className}`
      }
      style={bare ? undefined : { borderColor: 'var(--text)', background: 'var(--card-top)' }}
    >
      {/* invisible sizer keeps the box a fixed width while the text types */}
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 whitespace-pre font-display font-extrabold"
      >
        {longest}
        <span className="pl-2">|</span>
      </span>

      <p className="col-start-1 row-start-1 whitespace-pre font-display font-extrabold">
        {/* the typed text churns every frame, so readers get the list once */}
        <span className="sr-only">{words.join(', ')}</span>
        <span aria-hidden>{shown}</span>
        <motion.span
          aria-hidden
          className="inline-block translate-y-[0.06em] pl-1.5 font-normal"
          style={{ color: 'var(--accent)' }}
          animate={calm ? undefined : { opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.49, 0.5, 1], ease: 'linear' }}
        >
          |
        </motion.span>
      </p>
    </div>
  )
}
