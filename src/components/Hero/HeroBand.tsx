import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { profile, skillCards } from '../../data/profile'
import { onSectionLinkClick } from '../../lib/scroll'
import { useCalmMotion } from '../motion/motionPrefs'

/** the ticker contents — the logo-grid skills plus the rest of the daily stack */
const TICKER = [
  ...skillCards.map((s) => s.name),
  'Express.js',
  'REST APIs',
  'JWT & RBAC',
  'Next.js',
  'Docker',
  'LLM APIs',
]

const SCROLL_SECONDS = 38

/**
 * The strip across the foot of the hero: an endless ticker of the stack over a
 * status row. It fills the dead space under the portrait and gives the band a
 * floor instead of letting the photo run off the bottom of the screen.
 */
export function HeroBand() {
  const calm = useCalmMotion()

  return (
    <div className="absolute inset-x-0 bottom-0 z-10">
      {/* ------------------------------------------------------------ ticker */}
      <div
        className="group/tick relative overflow-hidden border-y py-3"
        style={{
          borderColor: 'rgba(255,255,255,.12)',
          background: 'rgba(7,7,10,.55)',
          backdropFilter: 'blur(6px)',
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <motion.ul
          className="flex w-max items-center gap-10 pr-10"
          animate={calm ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: SCROLL_SECONDS, ease: 'linear', repeat: Infinity }}
          style={{ willChange: 'transform' }}
        >
          {/* rendered twice so the loop has no seam */}
          {[...TICKER, ...TICKER].map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 sm:text-xs"
            >
              {item}
              <span
                aria-hidden
                className="h-1 w-1 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
            </li>
          ))}
        </motion.ul>
      </div>

      {/* ------------------------------------------------------------- status */}
      <div className="shell flex items-center justify-between gap-4 py-4 sm:py-5">
        <a
          href="#about"
          onClick={onSectionLinkClick('about')}
          aria-label="Scroll to the About section"
          className="flex items-center gap-3"
        >
          <motion.span
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white"
            animate={calm ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} aria-hidden />
          </motion.span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            Scroll
          </span>
        </a>

        <div className="flex items-center gap-3 text-right">
          <span className="relative flex h-2 w-2 flex-none">
            {!calm && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--accent-2)' }}
                animate={{ scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <span
              className="relative h-2 w-2 rounded-full"
              style={{ background: 'var(--accent-2)' }}
            />
          </span>
          {/* the role and location are dropped on phones — the dot and status carry it */}
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60 sm:text-[11px]">
            Available for work
            <span className="hidden sm:inline"> · {profile.role} · Madurai, India</span>
          </p>
        </div>
      </div>
    </div>
  )
}
