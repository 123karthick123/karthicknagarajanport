import { motion, useInView } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'
import { useRef, useState } from 'react'
import { skillCards, skills } from '../../data/profile'
import { onSectionLinkClick } from '../../lib/scroll'
import { Reveal, RevealText } from '../motion/RevealText'
import { EASE_OUT, useCalmMotion } from '../motion/motionPrefs'
import { Eyebrow } from '../ui/Section'
import { SkillLogo } from './SkillLogo'

/** every tool that does not get its own logo card, flattened into one strip */
const extras = Array.from(new Set(skills.flatMap((g) => g.items))).filter(
  (item) => !skillCards.some((card) => card.name === item),
)

export function Skills() {
  const calm = useCalmMotion()
  const gridRef = useRef<HTMLUListElement>(null)
  const inView = useInView(gridRef, { once: true, margin: '-80px' })
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="skills" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* ---------------------------------------------------------- copy */}
        <div>
          <Eyebrow icon={Layers}>My Skills</Eyebrow>
          <RevealText
            as="h2"
            className="t-h2"
            text="Let's explore popular Skills & Experience"
            accentWords={['Skills', '&', 'Experience']}
          />
          <Reveal delay={0.12}>
            <p className="lede t-body mt-5">
              A year-plus of shipping React and React Native against real APIs — admin dashboards,
              field-agent apps, and the Node and Express services behind them, down to the MongoDB
              schemas. The numbers are how confident I am reaching for each one without the docs
              open.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="#projects"
              onClick={onSectionLinkClick('projects')}
              className="group mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
            >
              See the work
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- cards */}
        <ul ref={gridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {skillCards.map((card, i) => {
            const isActive = active === card.name
            return (
              <motion.li
                key={card.name}
                initial={{ opacity: 0, y: calm ? 0 : 22 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: calm ? 0.3 : 0.6,
                  ease: EASE_OUT,
                  delay: calm ? 0 : i * 0.06,
                }}
                onMouseEnter={() => setActive(card.name)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(card.name)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                whileHover={calm ? undefined : { y: -6 }}
                className="flex h-full flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-colors sm:gap-4 sm:p-5"
                style={{
                  background: 'var(--surface)',
                  borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                }}
              >
                <motion.span
                  animate={isActive && !calm ? { scale: 1.12, rotate: -6 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <SkillLogo logo={card.logo} name={card.name} tint={card.tint} />
                </motion.span>

                {/* flex-1 + centring keeps one- and two-line names on the same baseline */}
                <h3 className="flex flex-1 items-center justify-center text-balance font-display text-sm font-bold leading-tight sm:text-base">
                  {card.name}
                </h3>

                {/* level pill — the fill grows to the percentage once in view */}
                <div
                  className="relative mt-auto w-full overflow-hidden rounded-lg py-1.5"
                  style={{ background: 'var(--surface-2)' }}
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 left-0 block"
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, var(--accent), var(--accent-2))'
                        : `${card.tint}55`,
                      transformOrigin: 'left',
                    }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${card.level}%` } : undefined}
                    transition={{
                      duration: calm ? 0.3 : 0.9,
                      ease: EASE_OUT,
                      delay: calm ? 0 : 0.25 + i * 0.06,
                    }}
                  />
                  <span
                    className="relative font-mono text-xs font-semibold"
                    style={{ color: isActive ? '#fff' : 'var(--text)' }}
                  >
                    {card.level}%
                  </span>
                  <span className="sr-only">confidence</span>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>

      {/* ------------------------------------------------------ everything else */}
      {extras.length > 0 && <Toolbox items={extras} />}
    </section>
  )
}

/**
 * The "also in the toolbox" strip. Each chip springs in on its own beat, then
 * breathes on a long loop so the block never looks like a static tag dump, and
 * lifts into the accent gradient under the pointer.
 */
function Toolbox({ items }: { items: string[] }) {
  const calm = useCalmMotion()
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className="shell mt-14 sm:mt-20">
      <Reveal className="flex items-center gap-3">
        <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Also in the toolbox
        </p>
      </Reveal>

      <ul ref={ref} className="mt-5 flex flex-wrap gap-2.5">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: calm ? 0 : 14, scale: calm ? 1 : 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{
              type: calm ? 'tween' : 'spring',
              duration: calm ? 0.25 : undefined,
              stiffness: 320,
              damping: 22,
              delay: calm ? 0 : i * 0.035,
            }}
            whileHover={calm ? undefined : { y: -4, scale: 1.06 }}
            className="group relative cursor-default overflow-hidden rounded-lg border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-white"
          >
            {/* gradient wash slides up from under the chip on hover */}
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }}
            />
            {/* the slow breathe — paused while hovered so it does not fight the lift */}
            <motion.span
              className="relative block"
              animate={calm ? undefined : { y: [0, -1.5, 0] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (i % 7) * 0.45,
              }}
            >
              {item}
            </motion.span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
