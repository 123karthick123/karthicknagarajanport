import { motion, useScroll, useSpring } from 'framer-motion'

/** Accent bar across the top of the viewport that tracks reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
      }}
    />
  )
}
