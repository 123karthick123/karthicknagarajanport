import { motion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { EASE_OUT, useCalmMotion } from './motionPrefs'

interface RevealTextProps {
  text: string
  /** words listed here get the animated gradient treatment */
  accentWords?: readonly string[]
  as?: ElementType
  className?: string
  delay?: number
  /** split into lines instead of words — each line rises as one block */
  lines?: string[]
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const riseWord: Variants = {
  hidden: { y: '110%', rotate: 3 },
  show: { y: '0%', rotate: 0, transition: { duration: 0.75, ease: EASE_OUT } },
}

const fadeWord: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
}

/**
 * Headline reveal: each word (or line) rises out of a clipped mask when the
 * element scrolls into view, once. Reduced motion gets a single soft fade.
 */
export function RevealText({
  text,
  accentWords = [],
  as: Tag = 'h2',
  className = '',
  delay = 0,
  lines,
}: RevealTextProps) {
  const calm = useCalmMotion()
  const child = calm ? fadeWord : riseWord
  const accent = new Set(accentWords.map((w) => w.toLowerCase().replace(/[.,]/g, '')))

  const chunks = lines ?? [text]

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        variants={container(calm ? 0.04 : 0.065, delay)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {chunks.map((chunk, li) => (
          <span className="mask-line" key={li}>
            {chunk.split(' ').map((word, wi) => {
              const isAccent = accent.has(word.toLowerCase().replace(/[.,]/g, ''))
              return (
                <span
                  key={`${li}-${wi}`}
                  className="inline-block overflow-hidden align-bottom"
                  style={{ paddingBottom: '0.06em' }}
                >
                  <motion.span
                    className={`inline-block ${isAccent ? 'grad-word' : ''}`}
                    variants={child}
                  >
                    {word}
                  </motion.span>
                  {wi < chunk.split(' ').length - 1 && <span>&nbsp;</span>}
                </span>
              )
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

/** Paragraph / block reveal: short fade and rise, with optional stagger index. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 22,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const calm = useCalmMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: calm ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: calm ? 0.35 : 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
