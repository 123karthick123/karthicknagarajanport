import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import { useCalmMotion } from '../motion/motionPrefs'

const EXPO = [0.76, 0, 0.24, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const

/** How long the underline is, as a fraction of the viewport height. */
const UNDERLINE = 0.3

/** name in → underline draws → rotates upright → grows to full height */
type Phase = 'name' | 'rotate' | 'grow' | 'ready'

const AT_ROTATE = 1500
const AT_GROW = 2250
const AT_READY = 2950

interface PageLoaderProps {
  /** true once the page's assets and fonts are in */
  ready: boolean
  /** called when the curtain has finished opening and the loader can unmount */
  onDone: () => void
}

/**
 * Intro curtain:
 *  1. the name types in at the centre of a black screen, underlined,
 *  2. the underline rotates left onto its end, becoming a vertical line,
 *  3. the line grows out of the centre to the top and bottom edges,
 *  4. the screen splits along it and slides away.
 *
 * Everything pivots on the centre of the line, so the whole sequence stays
 * anchored to the middle of the screen. Reduced motion gets a plain fade.
 */
export function PageLoader({ ready, onDone }: PageLoaderProps) {
  const calm = useCalmMotion()
  const [phase, setPhase] = useState<Phase>(calm ? 'ready' : 'name')

  useEffect(() => {
    if (calm) return
    const timers = [
      window.setTimeout(() => setPhase('rotate'), AT_ROTATE),
      window.setTimeout(() => setPhase('grow'), AT_GROW),
      window.setTimeout(() => setPhase('ready'), AT_READY),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [calm])

  const open = ready && phase === 'ready'

  if (calm) {
    return (
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        onAnimationComplete={() => open && onDone()}
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-xl font-extrabold text-white">{profile.name}</p>
      </motion.div>
    )
  }

  /* the line: a full-height hairline that starts rotated flat as the underline */
  const lineState =
    phase === 'name'
      ? { rotate: 90, scaleY: UNDERLINE, y: 46, opacity: 1 }
      : phase === 'rotate'
        ? { rotate: 0, scaleY: UNDERLINE, y: 0, opacity: 1 }
        : { rotate: 0, scaleY: 1, y: 0, opacity: open ? 0 : 1 }

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden" role="status">
      <span className="sr-only">Loading</span>

      {/* left half of the curtain */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-black"
        initial={{ x: 0 }}
        animate={{ x: open ? '-100%' : 0 }}
        transition={{ duration: 1.1, ease: EXPO }}
        onAnimationComplete={() => {
          if (open) onDone()
        }}
      />
      {/* right half */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-black"
        initial={{ x: 0 }}
        animate={{ x: open ? '100%' : 0 }}
        transition={{ duration: 1.1, ease: EXPO }}
      />

      {/* the name, above the underline */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        {/* accent glow behind the lettering */}
        <motion.div
          aria-hidden
          className="absolute h-40 w-[min(90vw,560px)] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(var(--glow), .5), transparent 70%)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            phase === 'name'
              ? { opacity: [0, 1, 0.75], scale: 1 }
              : { opacity: 0, scale: 1.15, transition: { duration: 0.6 } }
          }
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />

        <motion.p
          className="relative text-center font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.042, delayChildren: 0.12 } },
            out: { transition: { staggerChildren: 0.022 } },
          }}
          initial="hidden"
          animate={phase === 'name' ? 'show' : 'out'}
        >
          {['Karthick', 'Nagarajan'].map((word, wi) => (
            <span key={word} className={wi === 1 ? 'grad-word' : undefined}>
              {[...word].map((char, ci) => (
                <span key={`${word}-${ci}`} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { y: '110%', opacity: 0 },
                      show: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
                      out: {
                        y: '-120%',
                        opacity: 0,
                        transition: { duration: 0.45, ease: 'easeIn' },
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
              {wi === 0 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </motion.p>
      </div>

      {/* the line — underline, then vertical seam */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          aria-hidden
          className="h-screen w-px"
          style={{
            background: 'linear-gradient(180deg, rgb(var(--glow)), #fff 45%, rgb(var(--glow)))',
            boxShadow: '0 0 14px 1px rgba(var(--glow), .7)',
          }}
          initial={{ rotate: 90, scaleY: 0, y: 46, opacity: 1 }}
          animate={lineState}
          transition={{
            rotate: { duration: 0.75, ease: EXPO },
            y: { duration: 0.75, ease: EXPO },
            scaleY: { duration: phase === 'name' ? 0.6 : 0.7, ease: EASE_OUT, delay: phase === 'name' ? 0.45 : 0 },
            opacity: { duration: 0.4, ease: 'easeOut' },
          }}
        />
      </div>
    </div>
  )
}
