import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'

/** Appears once the page is scrolled past the hero. */
export function BackToTop() {
  const { scrollY } = useScroll()
  const [shown, setShown] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > 600))

  return (
    <AnimatePresence>
      {shown && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-[70] flex h-11 w-11 items-center justify-center rounded-full border bg-surface text-accent shadow-glow sm:bottom-8 sm:right-8 sm:h-12 sm:w-12"
          style={{ borderColor: 'var(--border)' }}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <ArrowUp size={18} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
