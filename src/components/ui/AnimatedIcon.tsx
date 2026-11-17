import { motion, useInView, type TargetAndTransition } from 'framer-motion'
import { useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { useCalmMotion } from '../motion/motionPrefs'

/** Any lucide-react icon. */
export type IconComponent = LucideIcon

type HoverKind = 'rotate' | 'bounce' | 'swing' | 'none'

const hoverMap: Record<HoverKind, TargetAndTransition> = {
  rotate: { rotate: 90, scale: 1.1 },
  bounce: { y: -4, scale: 1.12 },
  swing: { rotate: [0, -14, 12, 0] },
  none: {},
}

/**
 * A lucide icon that draws itself in when it scrolls into view and reacts on
 * hover. `hover` is driven by the parent's `whileHover` when `inheritHover`
 * is set, so a whole card can animate its icon.
 */
export function AnimatedIcon({
  icon: Icon,
  size = 20,
  className = '',
  hover = 'bounce',
  strokeWidth = 1.8,
  draw = true,
}: {
  icon: IconComponent
  size?: number
  className?: string
  hover?: HoverKind
  strokeWidth?: number
  draw?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const calm = useCalmMotion()

  return (
    <motion.span
      ref={ref}
      aria-hidden
      className={`inline-flex items-center justify-center ${
        draw ? `icon-draw ${inView ? 'is-in' : ''}` : ''
      } ${className}`}
      whileHover={calm ? undefined : hoverMap[hover]}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
    >
      <Icon size={size} strokeWidth={strokeWidth} aria-hidden />
    </motion.span>
  )
}
